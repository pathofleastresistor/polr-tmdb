"""TMDB Shows & Movies integration for Home Assistant."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.frontend import async_register_built_in_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.entity_registry import async_get as async_get_entity_registry

from .api import TmdbShowsApi
from .const import (
    ALL_MEDIA_TYPES,
    ALL_STATUSES,
    CONF_API_KEY,
    CONF_LANGUAGE,
    CONF_REGION,
    DOMAIN,
    EVENT_TMDB_SHOWS_UPDATED,
    MEDIA_TYPE_TV,
    STATUS_WANT_TO_WATCH,
)
from .coordinator import TmdbShowsCoordinator
from .sensor import TmdbShowsSensor
from .store import WatchlistStore

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up TMDB Shows & Movies from a config entry."""
    api_key: str = entry.data[CONF_API_KEY]
    language: str = entry.data.get(CONF_LANGUAGE, "en")
    region: str = entry.data.get(CONF_REGION, "US")

    api = TmdbShowsApi(hass, api_key, language, region)
    store = WatchlistStore(hass)
    await store.async_load()

    coordinator = TmdbShowsCoordinator(hass, api, store)

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN] = {
        "api": api,
        "store": store,
        "coordinator": coordinator,
        # sensor platform will populate this after setup
        "async_add_entities": None,
        # map item_id -> TmdbShowsSensor for live refresh
        "sensors": {},
    }

    # Set up sensor platform first so async_add_entities is registered
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Initial coordinator refresh (populates TMDB metadata for existing items)
    await coordinator.async_config_entry_first_refresh()

    # Register panel
    await _async_register_panel(hass)

    # Register HA services
    _async_register_services(hass)

    # Register WebSocket commands
    _async_register_websocket(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        hass.data.pop(DOMAIN, None)
    return unloaded


# ---------------------------------------------------------------------------
# Panel
# ---------------------------------------------------------------------------

async def _async_register_panel(hass: HomeAssistant) -> None:
    """Register the sidebar panel for managing the watchlist."""
    async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title="Shows & Movies",
        sidebar_icon="mdi:television-play",
        frontend_url_path="polr-tmdb",
        config={
            "_panel_custom": {
                "name": "polr-tmdb-panel",
                "module_url": "/local/polr_tmdb/panel.js?v=9",
                "embed_iframe": False,
                "trust_external": False,
            }
        },
        require_admin=False,
    )


# ---------------------------------------------------------------------------
# Helper: find sensor for an item_id
# ---------------------------------------------------------------------------

def _get_sensor(hass: HomeAssistant, item_id: str) -> TmdbShowsSensor | None:
    return hass.data[DOMAIN]["sensors"].get(item_id)


def _refresh_sensor(hass: HomeAssistant, item_id: str) -> None:
    sensor = _get_sensor(hass, item_id)
    if sensor:
        sensor.refresh_from_store()


def _remove_sensor_entity(hass: HomeAssistant, item_id: str) -> None:
    """Remove a sensor entity from the entity registry."""
    entity_registry = async_get_entity_registry(hass)
    for entity_id, entry in list(entity_registry.entities.items()):
        if entry.unique_id == f"polr_tmdb_{item_id}":
            entity_registry.async_remove(entity_id)
            break
    hass.data[DOMAIN]["sensors"].pop(item_id, None)


# ---------------------------------------------------------------------------
# Core watchlist mutation logic (shared by services and websocket handlers)
# ---------------------------------------------------------------------------

async def _do_add(hass: HomeAssistant, tmdb_id: int, media_type: str, status: str) -> dict:
    """Add an item: store → fetch metadata → create sensor → fire event."""
    store: WatchlistStore = hass.data[DOMAIN]["store"]
    api: TmdbShowsApi = hass.data[DOMAIN]["api"]
    coordinator: TmdbShowsCoordinator = hass.data[DOMAIN]["coordinator"]
    async_add_entities = hass.data[DOMAIN]["async_add_entities"]

    # Check duplicate
    existing = store.get_by_tmdb_id(tmdb_id)
    if existing:
        return existing.to_dict()

    item = await store.async_add_item(tmdb_id, media_type, status)

    # Immediately fetch TMDB metadata
    try:
        if media_type == MEDIA_TYPE_TV:
            tmdb_data = await api.async_get_tv_details(tmdb_id)
        else:
            tmdb_data = await api.async_get_movie_details(tmdb_id)
        await store.async_update_metadata(item.item_id, tmdb_data, region=api.get_region())
    except Exception:
        _LOGGER.warning("Could not fetch initial metadata for tmdb_id=%s", tmdb_id)

    # Refresh item from store (now has metadata)
    item = store.get_by_id(item.item_id)

    # Create sensor entity dynamically
    if async_add_entities:
        sensor = TmdbShowsSensor(coordinator, item)
        hass.data[DOMAIN]["sensors"][item.item_id] = sensor
        async_add_entities([sensor], update_before_add=True)

    item_dict = item.to_dict()
    hass.bus.async_fire(EVENT_TMDB_SHOWS_UPDATED, {"action": "add", "item": item_dict})
    return item_dict


async def _do_remove(hass: HomeAssistant, item_id: str) -> dict | None:
    store: WatchlistStore = hass.data[DOMAIN]["store"]
    item = await store.async_remove_item(item_id)
    if item is None:
        return None
    _remove_sensor_entity(hass, item_id)
    item_dict = item.to_dict()
    hass.bus.async_fire(EVENT_TMDB_SHOWS_UPDATED, {"action": "remove", "item": item_dict})
    return item_dict


async def _do_update(hass: HomeAssistant, item_id: str, **kwargs) -> dict | None:
    store: WatchlistStore = hass.data[DOMAIN]["store"]
    item = await store.async_update_item(item_id, **kwargs)
    if item is None:
        return None
    _refresh_sensor(hass, item_id)
    item_dict = item.to_dict()
    hass.bus.async_fire(EVENT_TMDB_SHOWS_UPDATED, {"action": "update", "item": item_dict})
    return item_dict


# ---------------------------------------------------------------------------
# HA Services
# ---------------------------------------------------------------------------

def _async_register_services(hass: HomeAssistant) -> None:

    async def svc_add_to_watchlist(call: ServiceCall) -> None:
        await _do_add(
            hass,
            tmdb_id=call.data["tmdb_id"],
            media_type=call.data["media_type"],
            status=call.data.get("status", STATUS_WANT_TO_WATCH),
        )

    async def svc_remove_from_watchlist(call: ServiceCall) -> None:
        await _do_remove(hass, item_id=call.data["item_id"])

    async def svc_update_status(call: ServiceCall) -> None:
        await _do_update(hass, call.data["item_id"], status=call.data["status"])

    async def svc_update_progress(call: ServiceCall) -> None:
        await _do_update(
            hass,
            call.data["item_id"],
            current_season=call.data.get("season"),
            current_episode=call.data.get("episode"),
        )

    async def svc_update_rating(call: ServiceCall) -> None:
        await _do_update(hass, call.data["item_id"], rating=call.data["rating"])

    hass.services.async_register(
        DOMAIN,
        "add_to_watchlist",
        svc_add_to_watchlist,
        schema=vol.Schema({
            vol.Required("tmdb_id"): cv.positive_int,
            vol.Required("media_type"): vol.In(ALL_MEDIA_TYPES),
            vol.Optional("status", default=STATUS_WANT_TO_WATCH): vol.In(ALL_STATUSES),
        }),
    )
    hass.services.async_register(
        DOMAIN,
        "remove_from_watchlist",
        svc_remove_from_watchlist,
        schema=vol.Schema({vol.Required("item_id"): str}),
    )
    hass.services.async_register(
        DOMAIN,
        "update_status",
        svc_update_status,
        schema=vol.Schema({
            vol.Required("item_id"): str,
            vol.Required("status"): vol.In(ALL_STATUSES),
        }),
    )
    hass.services.async_register(
        DOMAIN,
        "update_progress",
        svc_update_progress,
        schema=vol.Schema({
            vol.Required("item_id"): str,
            vol.Optional("season"): cv.positive_int,
            vol.Optional("episode"): cv.positive_int,
        }),
    )
    hass.services.async_register(
        DOMAIN,
        "update_rating",
        svc_update_rating,
        schema=vol.Schema({
            vol.Required("item_id"): str,
            vol.Required("rating"): vol.All(cv.positive_int, vol.Range(min=1, max=10)),
        }),
    )


# ---------------------------------------------------------------------------
# WebSocket API (used by Lovelace card and panel)
# ---------------------------------------------------------------------------

def _async_register_websocket(hass: HomeAssistant) -> None:

    @callback
    @websocket_api.websocket_command({vol.Required("type"): "polr_tmdb/items"})
    def ws_items(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        store: WatchlistStore = hass.data[DOMAIN]["store"]
        connection.send_message(
            websocket_api.result_message(msg["id"], [i.to_dict() for i in store.get_all()])
        )

    @websocket_api.websocket_command({
        vol.Required("type"): "polr_tmdb/search",
        vol.Required("query"): str,
        vol.Required("media_type"): vol.In(ALL_MEDIA_TYPES),
    })
    @websocket_api.async_response
    async def ws_search(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        api: TmdbShowsApi = hass.data[DOMAIN]["api"]
        try:
            results = await api.async_search(msg["query"], msg["media_type"])
            connection.send_message(websocket_api.result_message(msg["id"], results))
        except Exception as err:
            _LOGGER.exception("search_failed: %s", err)
            connection.send_message(
                websocket_api.error_message(msg["id"], "search_failed", "Search request failed")
            )

    @websocket_api.websocket_command({
        vol.Required("type"): "polr_tmdb/add",
        vol.Required("tmdb_id"): int,
        vol.Required("media_type"): vol.In(ALL_MEDIA_TYPES),
        vol.Optional("status", default=STATUS_WANT_TO_WATCH): vol.In(ALL_STATUSES),
    })
    @websocket_api.async_response
    async def ws_add(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        try:
            item = await _do_add(hass, msg["tmdb_id"], msg["media_type"], msg.get("status", STATUS_WANT_TO_WATCH))
            connection.send_message(websocket_api.result_message(msg["id"], item))
        except Exception as err:
            _LOGGER.exception("add_failed: %s", err)
            connection.send_message(
                websocket_api.error_message(msg["id"], "add_failed", "Add request failed")
            )

    @websocket_api.websocket_command({
        vol.Required("type"): "polr_tmdb/remove",
        vol.Required("item_id"): str,
    })
    @websocket_api.async_response
    async def ws_remove(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        item = await _do_remove(hass, msg["item_id"])
        connection.send_message(websocket_api.result_message(msg["id"], item))

    @websocket_api.websocket_command({
        vol.Required("type"): "polr_tmdb/update",
        vol.Required("item_id"): str,
        vol.Optional("status"): vol.In(ALL_STATUSES),
        vol.Optional("rating"): vol.All(int, vol.Range(min=1, max=10)),
        vol.Optional("notes"): vol.All(str, vol.Length(max=10000)),
        vol.Optional("current_season"): int,
        vol.Optional("current_episode"): int,
    })
    @websocket_api.async_response
    async def ws_update(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        kwargs = {
            k: msg[k]
            for k in ("status", "rating", "notes", "current_season", "current_episode")
            if k in msg
        }
        item = await _do_update(hass, msg["item_id"], **kwargs)
        connection.send_message(websocket_api.result_message(msg["id"], item))

    @websocket_api.websocket_command({
        vol.Required("type"): "polr_tmdb/season",
        vol.Required("tmdb_id"): int,
        vol.Required("season_number"): int,
    })
    @websocket_api.async_response
    async def ws_season(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        api: TmdbShowsApi = hass.data[DOMAIN]["api"]
        try:
            data = await api.async_get_season_details(msg["tmdb_id"], msg["season_number"])
            # Return just episode numbers, names and air dates — enough for the dropdowns
            episodes = [
                {
                    "episode_number": ep["episode_number"],
                    "name": ep.get("name", ""),
                    "air_date": ep.get("air_date", ""),
                }
                for ep in data.get("episodes", [])
            ]
            connection.send_message(websocket_api.result_message(msg["id"], episodes))
        except Exception as err:
            _LOGGER.exception("season_fetch_failed: %s", err)
            connection.send_message(
                websocket_api.error_message(msg["id"], "season_fetch_failed", "Season fetch failed")
            )

    websocket_api.async_register_command(hass, ws_items)
    websocket_api.async_register_command(hass, ws_search)
    websocket_api.async_register_command(hass, ws_add)
    websocket_api.async_register_command(hass, ws_remove)
    websocket_api.async_register_command(hass, ws_update)
    websocket_api.async_register_command(hass, ws_season)
