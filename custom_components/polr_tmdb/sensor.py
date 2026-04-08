"""Sensor platform for TMDB Shows & Movies."""
from __future__ import annotations

import logging

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import slugify

from .const import DOMAIN, MEDIA_TYPE_TV
from .coordinator import TmdbShowsCoordinator
from .media import WatchlistItem

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up TMDB Shows sensors from a config entry."""
    data = hass.data[DOMAIN]
    coordinator: TmdbShowsCoordinator = data["coordinator"]
    store = data["store"]

    # Store the callback so __init__.py can dynamically add new sensors
    data["async_add_entities"] = async_add_entities

    # Create sensors for items already in the store
    entities = [
        TmdbShowsSensor(coordinator, item)
        for item in store.get_all()
    ]
    async_add_entities(entities, update_before_add=True)


class TmdbShowsSensor(CoordinatorEntity, SensorEntity):
    """One sensor entity per watchlist item.

    State = watch status (e.g. 'watching').
    Attributes = all WatchlistItem metadata fields.
    """

    _attr_has_entity_name = True

    def __init__(self, coordinator: TmdbShowsCoordinator, item: WatchlistItem) -> None:
        super().__init__(coordinator)
        self._item_id = item.item_id
        self._item = item
        self._attr_unique_id = f"polr_tmdb_{item.item_id}"
        self.entity_id = f"sensor.polr_tmdb_{slugify(item.title or item.item_id)}"

    # ------------------------------------------------------------------
    # Entity properties
    # ------------------------------------------------------------------

    @property
    def name(self) -> str:
        return self._item.title or f"TMDB {self._item.tmdb_id}"

    @property
    def state(self) -> str:
        return self._item.status

    @property
    def icon(self) -> str:
        return "mdi:television" if self._item.media_type == MEDIA_TYPE_TV else "mdi:movie"

    @property
    def extra_state_attributes(self) -> dict:
        return self._item.to_entity_attributes()

    # ------------------------------------------------------------------
    # Coordinator update callback
    # ------------------------------------------------------------------

    def _handle_coordinator_update(self) -> None:
        """Refresh internal item reference from the store after coordinator update."""
        fresh = self.coordinator.store.get_by_id(self._item_id)
        if fresh is not None:
            self._item = fresh
        self.async_write_ha_state()

    # ------------------------------------------------------------------
    # Public helper called by __init__.py after store mutations
    # ------------------------------------------------------------------

    def refresh_from_store(self) -> None:
        """Pull the latest item state from the store and write to HA."""
        fresh = self.coordinator.store.get_by_id(self._item_id)
        if fresh is not None:
            self._item = fresh
        self.async_write_ha_state()
