"""Tests for WatchlistItem data model."""
import pytest
from custom_components.polr_tmdb.media import WatchlistItem


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def make_item(**kwargs) -> WatchlistItem:
    defaults = dict(
        item_id="abc123",
        tmdb_id=1396,
        media_type="tv",
        status="watching",
        title="Breaking Bad",
    )
    defaults.update(kwargs)
    return WatchlistItem(**defaults)


def ep(season, episode):
    return {"season_number": season, "episode_number": episode, "name": "", "air_date": ""}


# ---------------------------------------------------------------------------
# has_new_episode
# ---------------------------------------------------------------------------

class TestHasNewEpisode:
    def test_movie_always_false(self):
        item = make_item(media_type="movie", last_episode_to_air=ep(1, 1))
        assert item.has_new_episode is False

    def test_watched_always_false(self):
        item = make_item(status="watched", last_episode_to_air=ep(2, 5), current_season=1, current_episode=3)
        assert item.has_new_episode is False

    def test_no_aired_episode(self):
        item = make_item(last_episode_to_air=None)
        assert item.has_new_episode is False

    def test_no_progress_with_aired_episode(self):
        """Unstarted show with aired episodes should show new."""
        item = make_item(last_episode_to_air=ep(1, 1), current_season=None, current_episode=None)
        assert item.has_new_episode is True

    def test_no_progress_no_aired_episode(self):
        item = make_item(last_episode_to_air=ep(0, 0), current_season=None, current_episode=None)
        assert item.has_new_episode is False

    def test_ahead_of_progress_same_season(self):
        item = make_item(last_episode_to_air=ep(2, 5), current_season=2, current_episode=3)
        assert item.has_new_episode is True

    def test_ahead_of_progress_later_season(self):
        item = make_item(last_episode_to_air=ep(3, 1), current_season=2, current_episode=10)
        assert item.has_new_episode is True

    def test_at_latest_episode(self):
        item = make_item(last_episode_to_air=ep(2, 5), current_season=2, current_episode=5)
        assert item.has_new_episode is False

    def test_progress_beyond_aired(self):
        # Shouldn't happen in practice but should not crash
        item = make_item(last_episode_to_air=ep(2, 5), current_season=2, current_episode=6)
        assert item.has_new_episode is False

    def test_want_to_watch_with_aired(self):
        item = make_item(status="want_to_watch", last_episode_to_air=ep(1, 3))
        assert item.has_new_episode is True

    def test_paused_with_new_episode(self):
        item = make_item(status="paused", last_episode_to_air=ep(2, 1), current_season=1, current_episode=8)
        assert item.has_new_episode is True


# ---------------------------------------------------------------------------
# to_dict / from_dict round-trip
# ---------------------------------------------------------------------------

class TestSerialization:
    def test_round_trip(self):
        item = make_item(
            rating=8,
            notes="Great show",
            current_season=2,
            current_episode=5,
            last_episode_to_air=ep(3, 1),
            next_episode_to_air=ep(3, 2),
            genres=["Drama", "Crime"],
            networks=["AMC"],
            seasons=5,
            vote_average=9.5,
        )
        restored = WatchlistItem.from_dict(item.to_dict())
        assert restored.item_id == item.item_id
        assert restored.tmdb_id == item.tmdb_id
        assert restored.rating == 8
        assert restored.notes == "Great show"
        assert restored.current_season == 2
        assert restored.current_episode == 5
        assert restored.genres == ["Drama", "Crime"]
        assert restored.last_episode_to_air == ep(3, 1)

    def test_has_new_episode_in_dict(self):
        """has_new_episode must be included in to_dict for the JS frontend."""
        item = make_item(last_episode_to_air=ep(2, 1), current_season=1, current_episode=5)
        d = item.to_dict()
        assert "has_new_episode" in d
        assert d["has_new_episode"] is True

    def test_from_dict_missing_optional_fields(self):
        """from_dict should handle missing optional fields gracefully."""
        minimal = {"item_id": "x", "tmdb_id": 123, "media_type": "movie"}
        item = WatchlistItem.from_dict(minimal)
        assert item.rating is None
        assert item.genres == []
        assert item.networks == []


# ---------------------------------------------------------------------------
# update_from_tmdb
# ---------------------------------------------------------------------------

class TestUpdateFromTmdb:
    def test_tv_fields(self):
        item = make_item(media_type="tv")
        item.update_from_tmdb({
            "name": "Better Call Saul",
            "overview": "A lawyer.",
            "vote_average": 8.92,
            "poster_path": "/abc.jpg",
            "backdrop_path": "/def.jpg",
            "genres": [{"name": "Drama"}, {"name": "Crime"}],
            "first_air_date": "2015-02-08",
            "number_of_seasons": 6,
            "networks": [{"name": "AMC"}],
            "episode_run_time": [47],
            "last_episode_to_air": {"season_number": 6, "episode_number": 13, "name": "Saul Gone", "air_date": "2022-08-15"},
            "next_episode_to_air": None,
            "videos": {"results": []},
        })
        assert item.title == "Better Call Saul"
        assert item.vote_average == 8.9
        assert item.seasons == 6
        assert item.networks == ["AMC"]
        assert item.runtime == 47
        assert item.genres == ["Drama", "Crime"]
        assert item.last_episode_to_air["season_number"] == 6
        assert item.next_episode_to_air is None
        assert item.poster_path.endswith("/abc.jpg")

    def test_movie_fields(self):
        item = make_item(media_type="movie", title="Old Title")
        item.update_from_tmdb({
            "title": "The Dark Knight",
            "overview": "Batman.",
            "vote_average": 9.0,
            "release_date": "2008-07-18",
            "runtime": 152,
            "genres": [{"name": "Action"}],
            "poster_path": None,
            "backdrop_path": None,
            "videos": {"results": []},
        })
        assert item.title == "The Dark Knight"
        assert item.runtime == 152
        assert item.release_date == "2008-07-18"
        assert item.networks == []  # movie has no networks

    def test_trailer_extracted(self):
        item = make_item()
        item.update_from_tmdb({
            "name": "Show",
            "videos": {"results": [
                {"site": "YouTube", "type": "Trailer", "key": "abc123"},
            ]},
        })
        assert item.trailer_url == "https://www.youtube.com/watch?v=abc123"

    def test_trailer_ignores_non_youtube(self):
        item = make_item(trailer_url="existing")
        item.update_from_tmdb({
            "name": "Show",
            "videos": {"results": [
                {"site": "Vimeo", "type": "Trailer", "key": "xyz"},
            ]},
        })
        assert item.trailer_url == "existing"

    def test_vote_average_rounded(self):
        item = make_item()
        item.update_from_tmdb({"name": "Show", "vote_average": 7.666, "videos": {"results": []}})
        assert item.vote_average == 7.7
