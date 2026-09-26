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


# ---------------------------------------------------------------------------
# Images and cast
# ---------------------------------------------------------------------------

from custom_components.polr_tmdb.media import rank_logos  # noqa: E402


class TestRichImages:
    def test_rank_logos_prefers_language_then_english_then_textless(self):
        logos = [
            {"file_path": "/none.png", "iso_639_1": None, "vote_average": 9},
            {"file_path": "/en.png", "iso_639_1": "en", "vote_average": 5},
            {"file_path": "/fr_low.png", "iso_639_1": "fr", "vote_average": 1},
            {"file_path": "/fr_high.png", "iso_639_1": "fr", "vote_average": 4},
        ]
        assert [l["file_path"] for l in rank_logos(logos, "fr-CA")] == [
            "/fr_high.png", "/fr_low.png", "/en.png", "/none.png",
        ]

    def test_logo_tagline_cast_and_stills(self):
        item = make_item()
        item.update_from_tmdb({
            "name": "Breaking Bad",
            "tagline": "Remember my name",
            "images": {"logos": [{"file_path": "/logo.png", "iso_639_1": "en"}]},
            "aggregate_credits": {"cast": [
                {"name": "Bryan Cranston", "roles": [{"character": "Walter White"}], "profile_path": "/bc.jpg"},
                {"name": "Extra", "roles": [], "profile_path": None},
            ]},
            "last_episode_to_air": {"season_number": 5, "episode_number": 16, "name": "Felina",
                                    "air_date": "2013-09-29", "still_path": "/still.jpg"},
            "videos": {"results": []},
        })
        assert item.logo_path == "https://image.tmdb.org/t/p/w500/logo.png"
        assert item.tagline == "Remember my name"
        assert item.cast == [
            {"name": "Bryan Cranston", "character": "Walter White",
             "profile_path": "https://image.tmdb.org/t/p/w185/bc.jpg"},
            {"name": "Extra", "character": "", "profile_path": ""},
        ]
        assert item.last_episode_to_air["still_path"] == "https://image.tmdb.org/t/p/w780/still.jpg"

    def test_movie_credits_and_missing_appends_keep_existing(self):
        item = make_item(media_type="movie", logo_path="https://x/old.png", cast=[{"name": "A"}])
        # A response without images/credits appended leaves them alone
        item.update_from_tmdb({"title": "Film", "videos": {"results": []}})
        assert item.logo_path == "https://x/old.png"
        assert item.cast == [{"name": "A"}]
        item.update_from_tmdb({"title": "Film", "images": {"logos": []},
                               "credits": {"cast": [{"name": "B", "character": "C"}]}})
        assert item.logo_path == ""
        assert item.cast == [{"name": "B", "character": "C", "profile_path": ""}]

    def test_cast_stays_out_of_sensor_attributes(self):
        item = make_item(cast=[{"name": "A"}], logo_path="https://x/l.png")
        attrs = item.to_entity_attributes()
        assert "cast" not in attrs
        assert attrs["logo_path"] == "https://x/l.png"

    def test_round_trip(self):
        item = make_item(cast=[{"name": "A"}], logo_path="L", tagline="T")
        again = WatchlistItem.from_dict(item.to_dict())
        assert (again.cast, again.logo_path, again.tagline) == ([{"name": "A"}], "L", "T")
