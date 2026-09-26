"""Tests for suggestion rules, text cleaning, and watch link validation."""
import pytest

from custom_components.polr_tmdb.discovery import (
    SUGGEST_CREATE,
    SUGGEST_SKIP,
    SUGGEST_UPDATE,
    build_watch_link,
    clean_text,
    plan_suggestion,
    summarize_search_result,
)
from custom_components.polr_tmdb.media import WatchlistItem


class TestPlanSuggestion:
    def test_new_title_is_created(self):
        assert plan_suggestion(None) == SUGGEST_CREATE

    def test_already_suggested_is_updated(self):
        assert plan_suggestion("suggested") == SUGGEST_UPDATE

    @pytest.mark.parametrize("status", ["want_to_watch", "watching", "watched", "paused"])
    def test_household_decision_is_never_overridden(self, status):
        assert plan_suggestion(status) == SUGGEST_SKIP

    def test_dismissed_is_not_resuggested(self):
        assert plan_suggestion("dismissed") == SUGGEST_SKIP


class TestCleanText:
    def test_collapses_whitespace(self):
        assert clean_text("  warm \n\n ensemble\tcomedy ") == "warm ensemble comedy"

    def test_caps_length(self):
        assert len(clean_text("x" * 2000)) == 500

    def test_none_is_empty(self):
        assert clean_text(None) == ""


class TestBuildWatchLink:
    def test_valid_https(self):
        link = build_watch_link("https://play.hbomax.com/show/abc", "HBO Max")
        assert link == {"service": "HBO Max", "url": "https://play.hbomax.com/show/abc"}

    def test_service_defaults_to_host(self):
        link = build_watch_link("https://tv.apple.com/us/show/x/umc.cmc.1", None)
        assert link["service"] == "tv.apple.com"

    def test_empty_clears(self):
        assert build_watch_link("", "HBO Max") is None
        assert build_watch_link(None, None) is None

    @pytest.mark.parametrize("url", [
        "http://play.hbomax.com/show/abc",
        "javascript:alert(1)",
        "netflix://title/80100172",
        "https://",
        "not a url",
    ])
    def test_rejects_non_https(self, url):
        with pytest.raises(ValueError):
            build_watch_link(url, "x")

    def test_rejects_overlong(self):
        with pytest.raises(ValueError):
            build_watch_link("https://example.com/" + "a" * 2100, "x")


class TestModelFields:
    def _item(self, **kw):
        base = dict(item_id="i1", tmdb_id=1, media_type="tv", title="Show")
        base.update(kw)
        return WatchlistItem(**base)

    def test_round_trip_discovery_fields(self):
        item = self._item(
            status="suggested",
            suggestion={"reason": "Warm ensemble", "source": "weekly", "suggested_at": "2026-09-27T15:00:00+00:00"},
            watch_link={"service": "Apple TV", "url": "https://tv.apple.com/us/show/x/umc.cmc.1"},
        )
        restored = WatchlistItem.from_dict(item.to_dict())
        assert restored.status == "suggested"
        assert restored.suggestion["reason"] == "Warm ensemble"
        assert restored.watch_link["service"] == "Apple TV"

    def test_dismiss_reason_round_trip(self):
        item = self._item(status="dismissed", dismiss_reason="Too stressful")
        assert WatchlistItem.from_dict(item.to_dict()).dismiss_reason == "Too stressful"

    def test_old_items_load_without_new_fields(self):
        item = WatchlistItem.from_dict({"item_id": "x", "tmdb_id": 2, "media_type": "tv"})
        assert item.suggestion is None
        assert item.watch_link is None
        assert item.dismiss_reason == ""

    def test_attributes_expose_discovery_fields(self):
        attrs = self._item(watch_link={"service": "HBO Max", "url": "https://x.com/a"}).to_entity_attributes()
        assert "watch_link" in attrs and "suggestion" in attrs and "dismiss_reason" in attrs

    @pytest.mark.parametrize("status", ["suggested", "dismissed"])
    def test_unstarted_discovery_items_have_no_new_episode(self, status):
        item = self._item(
            status=status,
            last_episode_to_air={"season_number": 1, "episode_number": 3, "name": "", "air_date": ""},
        )
        assert item.has_new_episode is False


class TestSummarizeSearchResult:
    def test_tv_result(self):
        raw = {"id": 136311, "name": "Shrinking", "first_air_date": "2023-01-27",
               "vote_average": 8.234, "poster_path": "/p.jpg", "overview": "A  grieving\ntherapist"}
        out = summarize_search_result(raw, "tv")
        assert out == {
            "tmdb_id": 136311, "media_type": "tv", "title": "Shrinking", "year": "2023",
            "overview": "A grieving therapist", "rating": 8.2,
            "poster_url": "https://image.tmdb.org/t/p/w500/p.jpg",
            "backdrop_url": None,
            "item_id": None, "status": None,
        }

    def test_movie_with_missing_fields(self):
        out = summarize_search_result({"id": 1, "title": "Obscure"}, "movie")
        assert out["title"] == "Obscure"
        assert out["year"] is None
        assert out["rating"] is None
        assert out["poster_url"] is None
        assert out["overview"] == ""

    def test_marks_existing_item(self):
        out = summarize_search_result({"id": 1, "title": "X"}, "movie", {"item_id": "abc", "status": "watched"})
        assert out["item_id"] == "abc"
        assert out["status"] == "watched"

    def test_long_overview_is_capped(self):
        out = summarize_search_result({"id": 1, "overview": "x" * 1000}, "movie")
        assert len(out["overview"]) == 300
