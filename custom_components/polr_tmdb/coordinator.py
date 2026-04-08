"""DataUpdateCoordinator for TMDB Shows & Movies metadata refresh."""
from __future__ import annotations

import asyncio
import logging
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import TmdbShowsApi, TmdbShowsApiError
from .const import COORDINATOR_UPDATE_INTERVAL_HOURS, DOMAIN, MEDIA_TYPE_TV
from .store import WatchlistStore

_LOGGER = logging.getLogger(__name__)


class TmdbShowsCoordinator(DataUpdateCoordinator):
    """Periodically refresh TMDB metadata for all watchlist items."""

    def __init__(
        self, hass: HomeAssistant, api: TmdbShowsApi, store: WatchlistStore
    ) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(hours=COORDINATOR_UPDATE_INTERVAL_HOURS),
        )
        self.api = api
        self.store = store

    async def _async_update_data(self) -> list:
        """Refresh TMDB metadata for every item in the watchlist.

        Returns the updated list so coordinator listeners (sensors) can
        call async_write_ha_state().
        """
        items = self.store.get_all()
        if not items:
            return []

        errors: list[str] = []

        for item in items:
            try:
                if item.media_type == MEDIA_TYPE_TV:
                    data = await self.api.async_get_tv_details(item.tmdb_id)
                else:
                    data = await self.api.async_get_movie_details(item.tmdb_id)

                await self.store.async_update_metadata(item.item_id, data, region=self.api.get_region())

            except TmdbShowsApiError as err:
                _LOGGER.warning(
                    "Failed to refresh metadata for %s (tmdb_id=%s): %s",
                    item.title or item.item_id,
                    item.tmdb_id,
                    err,
                )
                errors.append(item.item_id)

            # Small sleep to avoid hitting TMDB rate limits
            await asyncio.sleep(0.25)

        if errors:
            _LOGGER.info(
                "TMDB metadata refresh completed with %d error(s) out of %d items.",
                len(errors),
                len(items),
            )

        return self.store.get_all()
