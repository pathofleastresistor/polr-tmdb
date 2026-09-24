"""Pure helpers for suggestions and watch links (no Home Assistant imports).

Kept separate from __init__.py so the rules can be unit tested directly.
"""
from __future__ import annotations

from urllib.parse import urlparse

from .const import (
    COMMITTED_STATUSES,
    MAX_REASON_LENGTH,
    MAX_URL_LENGTH,
    STATUS_DISMISSED,
    STATUS_SUGGESTED,
)

# What suggest() should do for a title, given the status of the matching
# watchlist item (None when the title isn't on the list yet).
SUGGEST_CREATE = "create"    # new item with status "suggested"
SUGGEST_UPDATE = "update"    # already suggested: refresh the reason
SUGGEST_SKIP = "skip"        # household already decided; leave it alone


def plan_suggestion(existing_status: str | None) -> str:
    """Decide how a suggestion interacts with what's already on the list.

    A suggestion never overrides a decision: a show the household has taken
    on (want to watch / watching / watched / paused) or turned down
    (dismissed) is skipped, so re-running the suggester is always safe.
    """
    if existing_status is None:
        return SUGGEST_CREATE
    if existing_status == STATUS_SUGGESTED:
        return SUGGEST_UPDATE
    if existing_status == STATUS_DISMISSED or existing_status in COMMITTED_STATUSES:
        return SUGGEST_SKIP
    return SUGGEST_SKIP


def clean_text(value: str | None, max_length: int = MAX_REASON_LENGTH) -> str:
    """Collapse whitespace and cap length for free-text fields."""
    if not value:
        return ""
    return " ".join(str(value).split())[:max_length]


def build_watch_link(url: str | None, service: str | None) -> dict | None:
    """Validate a watch link and return the stored shape, or None to clear.

    Only https URLs are accepted: the link is handed to the TV as an app
    link, and plain http or custom schemes aren't needed by any of the
    streaming apps this is meant for.

    Raises ValueError for a URL that isn't an https link with a host.
    """
    url = (url or "").strip()
    if not url:
        return None
    if len(url) > MAX_URL_LENGTH:
        raise ValueError("Watch link is too long")
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError("Watch link must be an https:// URL")
    return {"service": clean_text(service, 60) or parsed.netloc, "url": url}
