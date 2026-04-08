"""Async TMDB API client for TMDB Shows & Movies."""
from __future__ import annotations

import asyncio
import logging
from typing import Any

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import TMDB_API_BASE

_LOGGER = logging.getLogger(__name__)

# Simple in-memory cache: { cache_key: (timestamp, data) }
_CACHE: dict[str, tuple[float, Any]] = {}
_CACHE_TTL_SECONDS = 300  # 5 minutes for search results


def _cache_get(key: str) -> Any | None:
    import time
    entry = _CACHE.get(key)
    if entry and (time.monotonic() - entry[0]) < _CACHE_TTL_SECONDS:
        return entry[1]
    return None


def _cache_set(key: str, value: Any) -> None:
    import time
    _CACHE[key] = (time.monotonic(), value)


class TmdbShowsApiError(Exception):
    """Raised when a TMDB API call fails."""


class TmdbShowsApi:
    """Async TMDB API client.

    Uses HA's shared aiohttp ClientSession so we don't open new connections.
    Authentication is via api_key query parameter (TMDB v3).
    """

    def __init__(self, hass: HomeAssistant, api_key: str, language: str = "en", region: str = "US") -> None:
        self._hass = hass
        self._api_key = api_key
        self._language = language
        self._region = region
        self._image_config: dict | None = None

    def _session(self) -> aiohttp.ClientSession:
        return async_get_clientsession(self._hass)

    def _params(self, extra: dict | None = None) -> dict:
        params = {"api_key": self._api_key, "language": self._language}
        if extra:
            params.update(extra)
        return params

    async def _get(self, path: str, params: dict | None = None) -> dict[str, Any]:
        url = f"{TMDB_API_BASE}{path}"
        all_params = self._params(params)
        try:
            async with self._session().get(
                url, params=all_params, timeout=aiohttp.ClientTimeout(total=15)
            ) as resp:
                if resp.status == 401:
                    raise TmdbShowsApiError("Invalid TMDB API key (401)")
                if resp.status == 429:
                    retry_after = min(int(resp.headers.get("Retry-After", "5")), 60)
                    _LOGGER.warning("TMDB rate-limited, sleeping %ds", retry_after)
                    await asyncio.sleep(retry_after)
                    return await self._get(path, params)
                if resp.status != 200:
                    raise TmdbShowsApiError(f"TMDB returned HTTP {resp.status} for {path}")
                return await resp.json()
        except aiohttp.ClientError as err:
            raise TmdbShowsApiError(f"Network error calling TMDB: {err}") from err

    # -----------------------------------------------------------------------
    # Public endpoints
    # -----------------------------------------------------------------------

    async def async_search(self, query: str, media_type: str) -> list[dict[str, Any]]:
        """Search TMDB for movies or TV shows.

        Returns a list of result dicts from TMDB (first page only, max 20).
        Results are cached for 5 minutes per (query, media_type) pair.
        """
        cache_key = f"search:{media_type}:{query.lower()}"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        data = await self._get(f"/search/{media_type}", {"query": query})
        results = data.get("results", [])
        _cache_set(cache_key, results)
        return results

    async def async_get_movie_details(self, tmdb_id: int) -> dict[str, Any]:
        """Fetch full movie details including videos and watch providers."""
        return await self._get(
            f"/movie/{tmdb_id}",
            {"append_to_response": "videos,watch/providers"},
        )

    async def async_get_tv_details(self, tmdb_id: int) -> dict[str, Any]:
        """Fetch full TV show details including videos and watch providers."""
        return await self._get(
            f"/tv/{tmdb_id}",
            {"append_to_response": "videos,watch/providers"},
        )

    def get_region(self) -> str:
        """Return the configured region code."""
        return self._region

    async def async_get_image_config(self) -> dict[str, Any]:
        """Fetch (and cache) TMDB image configuration."""
        if self._image_config is None:
            data = await self._get("/configuration")
            self._image_config = data.get("images", {})
        return self._image_config

    async def async_get_season_details(self, tmdb_id: int, season_number: int) -> dict[str, Any]:
        """Fetch episode list for a specific season."""
        return await self._get(f"/tv/{tmdb_id}/season/{season_number}")

    async def async_validate_api_key(self) -> bool:
        """Return True if the API key is valid."""
        try:
            await self._get("/configuration")
            return True
        except TmdbShowsApiError:
            return False
