"""Data models for TMDB Shows & Movies."""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

from .const import (
    MEDIA_TYPE_TV,
    STATUS_WANT_TO_WATCH,
    TMDB_BACKDROP_BASE,
    TMDB_IMAGE_BASE,
)


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _extract_trailer(videos_data: dict) -> str:
    for video in videos_data.get("results", []):
        if (
            video.get("site") == "YouTube"
            and video.get("type") == "Trailer"
            and video.get("key")
        ):
            return f"https://www.youtube.com/watch?v={video['key']}"
    return ""


@dataclass
class WatchlistItem:
    """Represents a single movie or TV show in the watchlist."""

    item_id: str
    tmdb_id: int
    media_type: str  # "movie" or "tv"
    status: str = STATUS_WANT_TO_WATCH

    # TMDB metadata (populated/refreshed from API)
    title: str = ""
    poster_path: str = ""       # full URL
    backdrop_path: str = ""     # full URL
    overview: str = ""
    genres: list[str] = field(default_factory=list)
    vote_average: float = 0.0
    release_date: str = ""      # ISO date string
    runtime: int = 0            # minutes (movie avg, or TV avg episode)
    networks: list[str] = field(default_factory=list)   # TV only
    seasons: int = 0            # TV only
    trailer_url: str = ""

    # Timestamps
    added_at: str = field(default_factory=_now_iso)
    updated_at: str = field(default_factory=_now_iso)

    # User data
    rating: int | None = None   # personal 1-10
    notes: str = ""

    # TV progress tracking
    current_season: int | None = None
    current_episode: int | None = None

    # TV episode availability (from TMDB)
    # Each is a dict with keys: season_number, episode_number, name, air_date
    last_episode_to_air: dict | None = None
    next_episode_to_air: dict | None = None

    # Watch providers by region (from TMDB watch/providers)
    # { flatrate: [{provider_id, provider_name, logo_path}], rent: [...], buy: [...] }
    watch_providers: dict | None = None

    # -----------------------------------------------------------------------
    # Serialisation
    # -----------------------------------------------------------------------

    def to_dict(self) -> dict[str, Any]:
        return {
            "item_id": self.item_id,
            "tmdb_id": self.tmdb_id,
            "media_type": self.media_type,
            "status": self.status,
            "title": self.title,
            "poster_path": self.poster_path,
            "backdrop_path": self.backdrop_path,
            "overview": self.overview,
            "genres": self.genres,
            "vote_average": self.vote_average,
            "release_date": self.release_date,
            "runtime": self.runtime,
            "networks": self.networks,
            "seasons": self.seasons,
            "trailer_url": self.trailer_url,
            "added_at": self.added_at,
            "updated_at": self.updated_at,
            "rating": self.rating,
            "notes": self.notes,
            "current_season": self.current_season,
            "current_episode": self.current_episode,
            "last_episode_to_air": self.last_episode_to_air,
            "next_episode_to_air": self.next_episode_to_air,
            "has_new_episode": self.has_new_episode,
            "watch_providers": self.watch_providers,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> WatchlistItem:
        return cls(
            item_id=data["item_id"],
            tmdb_id=data["tmdb_id"],
            media_type=data["media_type"],
            status=data.get("status", STATUS_WANT_TO_WATCH),
            title=data.get("title", ""),
            poster_path=data.get("poster_path", ""),
            backdrop_path=data.get("backdrop_path", ""),
            overview=data.get("overview", ""),
            genres=data.get("genres", []),
            vote_average=data.get("vote_average", 0.0),
            release_date=data.get("release_date", ""),
            runtime=data.get("runtime", 0),
            networks=data.get("networks", []),
            seasons=data.get("seasons", 0),
            trailer_url=data.get("trailer_url", ""),
            added_at=data.get("added_at", _now_iso()),
            updated_at=data.get("updated_at", _now_iso()),
            rating=data.get("rating"),
            notes=data.get("notes", ""),
            current_season=data.get("current_season"),
            current_episode=data.get("current_episode"),
            last_episode_to_air=data.get("last_episode_to_air"),
            next_episode_to_air=data.get("next_episode_to_air"),
            watch_providers=data.get("watch_providers"),
        )

    def to_entity_attributes(self) -> dict[str, Any]:
        """Return dict suitable for HA sensor extra_state_attributes."""
        return {
            "item_id": self.item_id,
            "tmdb_id": self.tmdb_id,
            "media_type": self.media_type,
            "poster_path": self.poster_path,
            "backdrop_path": self.backdrop_path,
            "overview": self.overview,
            "genres": self.genres,
            "vote_average": self.vote_average,
            "release_date": self.release_date,
            "runtime": self.runtime,
            "networks": self.networks,
            "seasons": self.seasons,
            "trailer_url": self.trailer_url,
            "added_at": self.added_at,
            "updated_at": self.updated_at,
            "rating": self.rating,
            "notes": self.notes,
            "current_season": self.current_season,
            "current_episode": self.current_episode,
            "last_episode_to_air": self.last_episode_to_air,
            "next_episode_to_air": self.next_episode_to_air,
            "has_new_episode": self.has_new_episode,
            "watch_providers": self.watch_providers,
        }

    @property
    def has_new_episode(self) -> bool:
        """True if there is an aired episode beyond the user's current progress."""
        if self.media_type != MEDIA_TYPE_TV:
            return False
        if self.status == "watched":
            return False
        ep = self.last_episode_to_air
        if not ep:
            return False
        latest_s = ep.get("season_number", 0)
        latest_e = ep.get("episode_number", 0)
        cur_s = self.current_season or 0
        cur_e = self.current_episode or 0
        # No progress tracked — any aired episode counts as available
        if cur_s == 0 and cur_e == 0:
            return latest_s > 0 and latest_e > 0
        return (latest_s, latest_e) > (cur_s, cur_e)

    # -----------------------------------------------------------------------
    # Metadata update from TMDB API response
    # -----------------------------------------------------------------------

    def update_from_tmdb(self, data: dict[str, Any], region: str = "US") -> None:
        """Merge fresh TMDB detail response into this item."""
        is_tv = self.media_type == MEDIA_TYPE_TV

        self.title = data.get("name" if is_tv else "title", self.title)
        self.overview = data.get("overview", self.overview)
        self.vote_average = round(data.get("vote_average", self.vote_average), 1)

        raw_poster = data.get("poster_path") or ""
        self.poster_path = f"{TMDB_IMAGE_BASE}{raw_poster}" if raw_poster else self.poster_path

        raw_backdrop = data.get("backdrop_path") or ""
        self.backdrop_path = (
            f"{TMDB_BACKDROP_BASE}{raw_backdrop}" if raw_backdrop else self.backdrop_path
        )

        self.genres = [g["name"] for g in data.get("genres", [])]

        if is_tv:
            self.release_date = data.get("first_air_date", self.release_date)
            self.seasons = data.get("number_of_seasons", self.seasons)
            self.networks = [n["name"] for n in data.get("networks", [])]
            ep_runtimes = data.get("episode_run_time", [])
            self.runtime = ep_runtimes[0] if ep_runtimes else self.runtime

            # Episode availability — extract only the fields we need
            def _ep(raw: dict | None) -> dict | None:
                if not raw:
                    return None
                return {
                    "season_number": raw.get("season_number"),
                    "episode_number": raw.get("episode_number"),
                    "name": raw.get("name"),
                    "air_date": raw.get("air_date"),
                }

            self.last_episode_to_air = _ep(data.get("last_episode_to_air"))
            self.next_episode_to_air = _ep(data.get("next_episode_to_air"))
        else:
            self.release_date = data.get("release_date", self.release_date)
            self.runtime = data.get("runtime", self.runtime) or self.runtime

        # Extract trailer from appended videos
        videos = data.get("videos", {})
        trailer = _extract_trailer(videos)
        if trailer:
            self.trailer_url = trailer

        # Extract watch providers for the configured region
        providers_data = data.get("watch/providers", {})
        region_data = providers_data.get("results", {}).get(region, {})
        if region_data:
            self.watch_providers = {
                k: [
                    {
                        "provider_id": p.get("provider_id"),
                        "provider_name": p.get("provider_name"),
                        "logo_path": p.get("logo_path"),
                    }
                    for p in v
                ]
                for k, v in region_data.items()
                if k in ("flatrate", "rent", "buy") and isinstance(v, list)
            }
        else:
            self.watch_providers = None

        self.updated_at = _now_iso()
