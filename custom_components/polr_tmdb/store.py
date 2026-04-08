"""Persistent storage for the TMDB Shows watchlist."""
from __future__ import annotations

import logging
import uuid
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STATUS_WANT_TO_WATCH, STORAGE_KEY, STORAGE_VERSION
from .media import WatchlistItem

_LOGGER = logging.getLogger(__name__)


class WatchlistStore:
    """Async-safe wrapper around HA Store for watchlist persistence."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._items: dict[str, WatchlistItem] = {}  # keyed by item_id

    # -----------------------------------------------------------------------
    # Load / save
    # -----------------------------------------------------------------------

    async def async_load(self) -> None:
        """Load items from disk."""
        raw: dict[str, Any] | None = await self._store.async_load()
        if raw and "items" in raw:
            for item_data in raw["items"]:
                try:
                    item = WatchlistItem.from_dict(item_data)
                    self._items[item.item_id] = item
                except Exception:
                    _LOGGER.exception("Failed to deserialise watchlist item: %s", item_data)
        _LOGGER.debug("Loaded %d watchlist items", len(self._items))

    async def async_save(self) -> None:
        """Persist items to disk atomically."""
        await self._store.async_save({"items": [i.to_dict() for i in self._items.values()]})

    # -----------------------------------------------------------------------
    # Accessors
    # -----------------------------------------------------------------------

    def get_all(self) -> list[WatchlistItem]:
        return list(self._items.values())

    def get_by_id(self, item_id: str) -> WatchlistItem | None:
        return self._items.get(item_id)

    def get_by_tmdb_id(self, tmdb_id: int) -> WatchlistItem | None:
        return next((i for i in self._items.values() if i.tmdb_id == tmdb_id), None)

    # -----------------------------------------------------------------------
    # Mutations
    # -----------------------------------------------------------------------

    async def async_add_item(
        self,
        tmdb_id: int,
        media_type: str,
        status: str = STATUS_WANT_TO_WATCH,
    ) -> WatchlistItem:
        """Create and persist a new watchlist item."""
        item = WatchlistItem(
            item_id=uuid.uuid4().hex,
            tmdb_id=tmdb_id,
            media_type=media_type,
            status=status,
        )
        self._items[item.item_id] = item
        await self.async_save()
        _LOGGER.debug("Added watchlist item: tmdb_id=%s type=%s", tmdb_id, media_type)
        return item

    async def async_remove_item(self, item_id: str) -> WatchlistItem | None:
        """Remove an item by item_id. Returns the removed item or None."""
        item = self._items.pop(item_id, None)
        if item is not None:
            await self.async_save()
            _LOGGER.debug("Removed watchlist item: %s", item_id)
        return item

    async def async_update_item(self, item_id: str, **kwargs: Any) -> WatchlistItem | None:
        """Update arbitrary fields on a watchlist item."""
        item = self._items.get(item_id)
        if item is None:
            _LOGGER.warning("Cannot update unknown item_id: %s", item_id)
            return None

        allowed_fields = {
            "status", "rating", "notes", "current_season", "current_episode",
            "title", "poster_path", "backdrop_path", "overview", "genres",
            "vote_average", "release_date", "runtime", "networks", "seasons", "trailer_url",
        }
        for key, value in kwargs.items():
            if key in allowed_fields:
                setattr(item, key, value)

        from .media import _now_iso
        item.updated_at = _now_iso()

        await self.async_save()
        _LOGGER.debug("Updated watchlist item %s: %s", item_id, kwargs)
        return item

    async def async_update_metadata(self, item_id: str, tmdb_data: dict, region: str = "US") -> WatchlistItem | None:
        """Apply fresh TMDB API response to an existing item."""
        item = self._items.get(item_id)
        if item is None:
            return None
        item.update_from_tmdb(tmdb_data, region=region)
        await self.async_save()
        return item
