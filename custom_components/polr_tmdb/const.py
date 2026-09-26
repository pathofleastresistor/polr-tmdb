"""Constants for TMDB Shows & Movies integration."""

DOMAIN = "polr_tmdb"

STORAGE_KEY = "polr_tmdb_watchlist"
STORAGE_VERSION = 1

TMDB_API_BASE = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"
TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"
TMDB_LOGO_BASE = "https://image.tmdb.org/t/p/w500"      # title treatment art
TMDB_STILL_BASE = "https://image.tmdb.org/t/p/w780"     # episode stills
TMDB_PROFILE_BASE = "https://image.tmdb.org/t/p/w185"   # cast headshots

# Cast members kept per title (with headshots) for the detail dialog
MAX_CAST = 12

CONF_API_KEY = "api_key"
CONF_LANGUAGE = "language"
CONF_REGION = "region"

# Watch statuses
STATUS_WANT_TO_WATCH = "want_to_watch"
STATUS_WATCHING = "watching"
STATUS_WATCHED = "watched"
STATUS_PAUSED = "paused"
# Discovery statuses: a show proposed to the household (by a person or an
# automation) that nobody has committed to yet, and one they've turned down.
STATUS_SUGGESTED = "suggested"
STATUS_DISMISSED = "dismissed"

ALL_STATUSES = [
    STATUS_WANT_TO_WATCH,
    STATUS_WATCHING,
    STATUS_WATCHED,
    STATUS_PAUSED,
    STATUS_SUGGESTED,
    STATUS_DISMISSED,
]

# Statuses that mean the household has taken the show on. A suggestion never
# overwrites one of these.
COMMITTED_STATUSES = [STATUS_WANT_TO_WATCH, STATUS_WATCHING, STATUS_WATCHED, STATUS_PAUSED]

# Limits on free-text fields written by services
MAX_REASON_LENGTH = 500
MAX_URL_LENGTH = 2000

# Media types
MEDIA_TYPE_MOVIE = "movie"
MEDIA_TYPE_TV = "tv"

ALL_MEDIA_TYPES = [MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV]

# Update interval in hours
COORDINATOR_UPDATE_INTERVAL_HOURS = 24

# Event fired on watchlist mutations
EVENT_TMDB_SHOWS_UPDATED = "polr_tmdb_updated"
