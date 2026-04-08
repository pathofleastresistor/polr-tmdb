"""Constants for TMDB Shows & Movies integration."""

DOMAIN = "polr_tmdb"

STORAGE_KEY = "polr_tmdb_watchlist"
STORAGE_VERSION = 1

TMDB_API_BASE = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"
TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

CONF_API_KEY = "api_key"
CONF_LANGUAGE = "language"

# Watch statuses
STATUS_WANT_TO_WATCH = "want_to_watch"
STATUS_WATCHING = "watching"
STATUS_WATCHED = "watched"
STATUS_PAUSED = "paused"

ALL_STATUSES = [STATUS_WANT_TO_WATCH, STATUS_WATCHING, STATUS_WATCHED, STATUS_PAUSED]

# Media types
MEDIA_TYPE_MOVIE = "movie"
MEDIA_TYPE_TV = "tv"

ALL_MEDIA_TYPES = [MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV]

# Update interval in hours
COORDINATOR_UPDATE_INTERVAL_HOURS = 24

# Event fired on watchlist mutations
EVENT_TMDB_SHOWS_UPDATED = "polr_tmdb_updated"
