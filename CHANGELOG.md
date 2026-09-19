# Changelog

## [1.1.0] - 2026-09-19

### Added
- Watch providers: streaming, rental and purchase availability from TMDB, with
  provider logos in the detail dialog of both the Lovelace card and the panel
- Configurable region setting for watch provider lookups (default: US)

### Changed
- Integration setup no longer blocks on the initial TMDB metadata refresh. The
  panel, services and websocket commands register first and the refresh runs as
  a background task, cutting roughly 11 seconds off setup. Sensors, the card and
  the panel come up immediately on stored metadata and update once it lands
- Dropped a redundant pre-add entity update that queued a second full pass over
  the watchlist after every startup, and again on every item added
- New brand icon: film strip, play button and checkmark badge in TMDB's palette

### Fixed
- The "New" tab no longer surfaces want-to-watch shows, only ones already started
- Hardened against issues found in a security audit: removed shell interpolation
  from the build script, sanitized websocket error messages sent to the frontend,
  capped the notes field at 10000 characters, capped the honored `Retry-After`
  value at 60s, and restricted rendered image URLs to the TMDB origin

## [1.0.0] - 2026-04-07

### Added
- Initial release
- Watchlist management for TV shows and movies via TMDB API
- Statuses: Want to Watch, Watching, Watched, Paused
- TV progress tracking (season + episode)
- New episode detection with badges
- Coming Soon section (episodes airing within 14 days)
- Personal ratings (1–10) and notes
- Lovelace card with New / Coming Soon / Up Next sections
- HA sidebar panel for searching and managing the watchlist
- HA services for automation integration
- Real-time sync across dashboards via HA events
- Sensor entities per watchlist item
