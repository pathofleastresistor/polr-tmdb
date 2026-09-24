"""Service tests for suggest / dismiss / set_watch_link / open_on_tv."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.polr_tmdb.const import DOMAIN

TV_DETAILS = {
    "name": "Shrinking",
    "overview": "A grieving therapist...",
    "vote_average": 8.2,
    "poster_path": "/p.jpg",
    "backdrop_path": "/b.jpg",
    "genres": [{"name": "Comedy"}],
    "first_air_date": "2023-01-27",
    "number_of_seasons": 3,
    "networks": [{"name": "Apple TV+"}],
    "episode_run_time": [30],
    "last_episode_to_air": {"season_number": 3, "episode_number": 10, "name": "x", "air_date": "2026-04-01"},
    "next_episode_to_air": None,
    "videos": {"results": []},
    "watch/providers": {"results": {}},
}

APPLE_LINK = "https://tv.apple.com/us/show/shrinking/umc.cmc.apzybj6eqf6pzccd97kev7bs"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield


@pytest.fixture
async def setup_integration(hass: HomeAssistant):
    entry = MockConfigEntry(domain=DOMAIN, data={"api_key": "k", "language": "en", "region": "US"})
    entry.add_to_hass(hass)
    with (
        patch("custom_components.polr_tmdb.api.TmdbShowsApi.async_get_tv_details",
              new=AsyncMock(return_value=TV_DETAILS)),
        patch("custom_components.polr_tmdb.api.TmdbShowsApi.async_get_movie_details",
              new=AsyncMock(return_value={})),
        patch("custom_components.polr_tmdb._async_register_panel", new=AsyncMock()),
        patch("custom_components.polr_tmdb.coordinator.asyncio.sleep", new=AsyncMock()),
    ):
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        yield entry


def _store(hass):
    return hass.data[DOMAIN]["store"]


async def _suggest(hass, **data):
    payload = {"tmdb_id": 136311, "media_type": "tv", "reason": "Warm ensemble"}
    payload.update(data)
    return await hass.services.async_call(
        DOMAIN, "suggest", payload, blocking=True, return_response=True
    )


async def test_suggest_creates_suggested_item(hass, setup_integration):
    resp = await _suggest(hass, watch_link_url=APPLE_LINK, watch_link_service="Apple TV", source="weekly")
    assert resp["outcome"] == "created"
    item = _store(hass).get_by_tmdb_id(136311)
    assert item.status == "suggested"
    assert item.title == "Shrinking"
    assert item.suggestion["reason"] == "Warm ensemble"
    assert item.suggestion["source"] == "weekly"
    assert item.watch_link == {"service": "Apple TV", "url": APPLE_LINK}
    state = hass.states.get("sensor.polr_tmdb_shrinking")
    assert state.state == "suggested"
    assert state.attributes["watch_link"]["url"] == APPLE_LINK


async def test_resuggest_updates_reason(hass, setup_integration):
    await _suggest(hass)
    resp = await _suggest(hass, reason="Now with S3 out")
    assert resp["outcome"] == "updated"
    assert _store(hass).get_by_tmdb_id(136311).suggestion["reason"] == "Now with S3 out"


async def test_suggest_never_overrides_watching(hass, setup_integration):
    await hass.services.async_call(
        DOMAIN, "add_to_watchlist", {"tmdb_id": 136311, "media_type": "tv", "status": "watching"}, blocking=True
    )
    resp = await _suggest(hass, watch_link_url=APPLE_LINK, watch_link_service="Apple TV")
    assert resp["outcome"] == "skipped"
    item = _store(hass).get_by_tmdb_id(136311)
    assert item.status == "watching"
    assert item.suggestion is None
    # ...but a missing link is still filled in
    assert item.watch_link["url"] == APPLE_LINK


async def test_dismissed_is_not_resuggested(hass, setup_integration):
    await _suggest(hass)
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    await hass.services.async_call(DOMAIN, "dismiss", {"item_id": item_id, "reason": "Too  stressful"}, blocking=True)
    item = _store(hass).get_by_id(item_id)
    assert item.status == "dismissed"
    assert item.dismiss_reason == "Too stressful"
    assert hass.states.get("sensor.polr_tmdb_shrinking").state == "dismissed"

    resp = await _suggest(hass, reason="Try again?")
    assert resp["outcome"] == "skipped"
    assert _store(hass).get_by_id(item_id).status == "dismissed"


async def test_existing_sensor_updates_immediately(hass, setup_integration):
    """Regression: sensors created at startup must refresh on mutation."""
    await _suggest(hass)
    entry = setup_integration
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    await hass.services.async_call(
        DOMAIN, "update_status", {"item_id": item_id, "status": "want_to_watch"}, blocking=True
    )
    assert hass.states.get("sensor.polr_tmdb_shrinking").state == "want_to_watch"


async def test_set_watch_link_validates_and_clears(hass, setup_integration):
    await _suggest(hass)
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN, "set_watch_link", {"item_id": item_id, "url": "http://insecure.example"}, blocking=True
        )
    await hass.services.async_call(
        DOMAIN, "set_watch_link", {"item_id": item_id, "url": APPLE_LINK, "service": "Apple TV"}, blocking=True
    )
    assert _store(hass).get_by_id(item_id).watch_link["url"] == APPLE_LINK
    await hass.services.async_call(DOMAIN, "set_watch_link", {"item_id": item_id, "url": ""}, blocking=True)
    assert _store(hass).get_by_id(item_id).watch_link is None


def _mock_media_player(hass, state):
    """Register fake media_player services that record calls and flip state."""
    calls: list[ServiceCall] = []
    entity_id = "media_player.theater_tv"
    hass.states.async_set(entity_id, state)

    async def turn_on(call):
        calls.append(call)
        hass.states.async_set(entity_id, "on")

    async def play_media(call):
        calls.append(call)

    hass.services.async_register("media_player", "turn_on", turn_on)
    hass.services.async_register("media_player", "play_media", play_media)
    return entity_id, calls


async def test_open_on_tv_wakes_then_sends_link(hass, setup_integration):
    await _suggest(hass, watch_link_url=APPLE_LINK, watch_link_service="Apple TV")
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    entity_id, calls = _mock_media_player(hass, "off")
    with patch("custom_components.polr_tmdb._sleep", new=AsyncMock()) as sleep:
        await hass.services.async_call(
            DOMAIN, "open_on_tv", {"item_id": item_id, "entity_id": entity_id}, blocking=True
        )
    assert [c.service for c in calls] == ["turn_on", "play_media"]
    assert calls[1].data["media_content_type"] == "url"
    assert calls[1].data["media_content_id"] == APPLE_LINK
    sleep.assert_awaited()  # settled before sending


async def test_open_on_tv_skips_wake_when_on(hass, setup_integration):
    await _suggest(hass, watch_link_url=APPLE_LINK)
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    entity_id, calls = _mock_media_player(hass, "on")
    await hass.services.async_call(
        DOMAIN, "open_on_tv", {"item_id": item_id, "entity_id": entity_id}, blocking=True
    )
    assert [c.service for c in calls] == ["play_media"]


async def test_open_on_tv_requires_link(hass, setup_integration):
    await _suggest(hass)
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    entity_id, _ = _mock_media_player(hass, "on")
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN, "open_on_tv", {"item_id": item_id, "entity_id": entity_id}, blocking=True
        )


async def test_open_on_tv_rejects_non_media_player(hass, setup_integration):
    await _suggest(hass, watch_link_url=APPLE_LINK)
    item_id = _store(hass).get_by_tmdb_id(136311).item_id
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN, "open_on_tv", {"item_id": item_id, "entity_id": "light.kitchen"}, blocking=True
        )
