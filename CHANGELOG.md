# Changelog

## [1.3.0] - 2026-09-26

The card is now the whole UI: search and your full list open as dialogs from
it, and the sidebar panel is gone.

### Added
- `polr_tmdb.search` service: searches TMDB by title (movies, shows, or both
  merged by popularity) and returns each match's TMDB ID, year, overview,
  rating and poster, plus its `item_id` and `status` if it's already on the
  list. Lets automations and assistants find a title before calling
  `add_to_watchlist` or `suggest`
- Card: **Search** dialog. Filter by All / TV / Movies; **+** adds a title to
  Up Next in one tap, and tapping a poster opens a preview (overview, genres,
  trailer, where to watch) with **Add to Up Next** and **Watching now**.
  Titles already on the list show their status. Hide it with `search: false`
- Card: **Library** dialog with the whole list, filtered by status
- Card: dialogs go full screen on phones and close with Esc
- `polr_tmdb/preview` websocket command: a title's full details without adding
  it

### Removed
- The *Shows & Movies* sidebar panel and the `polr_tmdb/search` websocket
  command it used. Everything it did is in the card

### Fixed
- Adding or suggesting a movie no longer returns a TV show that happens to
  share its TMDB ID (and vice versa); TMDB IDs are only unique per media type
- The card stopped receiving live updates after Home Assistant re-attached it
  (for example when switching dashboard views)

## [1.2.1] - 2026-09-24

### Fixed
- The sidebar panel now ships inside the integration and is served by it, so a
  HACS integration install is enough to get it. Previously it loaded from
  `/local/polr_tmdb/panel.js`, which only existed on a dev machine. Requires
  Home Assistant 2024.7 or newer

## [1.2.0] - 2026-09-24

### Added
- Discovery statuses: `suggested` (proposed with a reason, not yet taken on) and
  `dismissed` (passed on, with the reason remembered so it isn't suggested again)
- `polr_tmdb.suggest` service: adds a title as suggested with a reason and
  source, or refreshes the reason if it's already suggested. Never touches a
  title the household already has on the list or dismissed, so a scheduled
  suggester can re-run safely. Returns `outcome` and `item_id` when asked
- `polr_tmdb.dismiss` service with an optional reason
- Watch links: every item can store an https link that opens it in its
  streaming app on a Google TV (`polr_tmdb.set_watch_link`, or pass it to
  `suggest`)
- `polr_tmdb.open_on_tv` service: opens an item's watch link on an Android TV
  Remote media player, waking the TV first and giving it a few seconds to
  settle (links sent the moment the TV reports "on" get dropped)
- Card: "Suggested" section with the reason, Add / Not for us buttons and quick
  dismiss reasons; "Open on" buttons for configured TVs on suggestions and in
  the detail dialog; new `sections`, `default_section` and `tvs` options
- Panel: Suggested and Not for us filters; reasons shown in the detail dialog

### Changed
- "All" in the panel hides dismissed titles
- Dismissed titles are skipped by the daily metadata refresh

### Fixed
- Sensors created at startup now update as soon as a service or the card
  changes their item, instead of waiting for the next daily refresh

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
