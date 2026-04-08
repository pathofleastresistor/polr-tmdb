import { LitElement, html, css, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";

const STATUS_LABELS = {
  want_to_watch: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
  paused: "Paused",
};

const STATUS_COLORS = {
  want_to_watch: "var(--secondary-text-color, #6d6d6d)",
  watching: "#1976d2",
  watched: "#2e7d32",
  paused: "#e65100",
};

const MEDIA_ICONS = { movie: "mdi:movie", tv: "mdi:television" };

function fmtDate(dateStr) {
  if (!dateStr) return "";
  // Parse as local noon to avoid timezone shifting the date
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w300";
const TMDB_IMAGE_ORIGIN = "https://image.tmdb.org";
function tmdbImg(url) {
  return typeof url === "string" && url.startsWith(TMDB_IMAGE_ORIGIN) ? url : null;
}

class TmdbShowsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    narrow: { type: Boolean },
    _view: { state: true },       // "list" | "search"
    _items: { state: true },
    _searchQuery: { state: true },
    _searchType: { state: true },
    _searchResults: { state: true },
    _searchDone: { state: true }, // true after at least one search has run
    _searching: { state: true },
    _adding: { state: true },
    _detail: { state: true },
    _statusFilter: { state: true },
  };

  constructor() {
    super();
    this._view = "list";
    this._items = [];
    this._searchQuery = "";
    this._searchType = "tv";
    this._searchResults = [];
    this._searchDone = false;
    this._searching = false;
    this._adding = new Set();
    this._detail = null;
    this._statusFilter = "all";
    this._unsubEvents = null;
    this._loaded = false;
    this._seasonCache = {};
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._loaded) {
      this._loaded = true;
      this._loadItems();
      this._subscribeEvents();
    }
  }

  get hass() { return this._hass; }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubEvents) this._unsubEvents.then((fn) => fn?.());
  }

  async _loadItems() {
    try {
      this._items = await this.hass.connection.sendMessagePromise({ type: "polr_tmdb/items" }) || [];
    } catch (e) { console.error("polr_tmdb/items", e); }
  }

  async _subscribeEvents() {
    this._unsubEvents = this.hass.connection.subscribeEvents((event) => {
      this._loadItems();
      if (this._detail && event.data.item?.item_id === this._detail.item_id) {
        this._detail = event.data.action === "remove" ? null : event.data.item;
      }
    }, "polr_tmdb_updated");
  }

  async _doSearch() {
    if (!this._searchQuery.trim()) return;
    this._searching = true;
    this._searchResults = [];
    try {
      this._searchResults = await this.hass.connection.sendMessagePromise({
        type: "polr_tmdb/search",
        query: this._searchQuery.trim(),
        media_type: this._searchType,
      }) || [];
    } catch (e) { console.error("search", e); }
    finally {
      this._searching = false;
      this._searchDone = true;
    }
  }

  _goToSearch() {
    this._searchResults = [];
    this._searchDone = false;
    this._searchQuery = "";
    this._view = "search";
  }

  _goToList() {
    this._view = "list";
  }

  async _addItem(tmdbId, mediaType) {
    // Optimistically mark as adding
    this._adding = new Set([...this._adding, tmdbId]);
    try {
      await this.hass.connection.sendMessagePromise({
        type: "polr_tmdb/add", tmdb_id: tmdbId, media_type: mediaType, status: "want_to_watch",
      });
      // Force reload so the list reflects the new item immediately
      await this._loadItems();
    } catch (e) { console.error("add", e); }
    finally {
      const s = new Set(this._adding); s.delete(tmdbId); this._adding = s;
    }
  }

  async _removeItem(itemId) {
    if (!confirm("Remove from watchlist?")) return;
    await this.hass.connection.sendMessagePromise({ type: "polr_tmdb/remove", item_id: itemId });
    this._detail = null;
  }

  async _updateItem(itemId, fields) {
    const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => v != null));
    try {
      await this.hass.connection.sendMessagePromise({ type: "polr_tmdb/update", item_id: itemId, ...clean });
    } catch (e) { console.error("update", e); }
  }

  async _fetchSeasonEpisodes(tmdbId, seasonNumber) {
    const key = `${tmdbId}:${seasonNumber}`;
    if (this._seasonCache[key]) return;
    try {
      const episodes = await this.hass.connection.sendMessagePromise({
        type: "polr_tmdb/season", tmdb_id: tmdbId, season_number: seasonNumber,
      });
      this._seasonCache[key] = episodes || [];
      this.requestUpdate();
    } catch (e) { console.error("season fetch", e); }
  }

  _getSeasonEpisodes(tmdbId, seasonNumber) {
    if (!seasonNumber) return [];
    const key = `${tmdbId}:${seasonNumber}`;
    if (!this._seasonCache[key]) { this._fetchSeasonEpisodes(tmdbId, seasonNumber); return null; }
    return this._seasonCache[key];
  }

  get _filteredItems() {
    if (this._statusFilter === "all") return this._items;
    return this._items.filter((i) => i.status === this._statusFilter);
  }

  _isAdded(tmdbId) { return this._items.some((i) => i.tmdb_id === tmdbId); }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    return html`
      <div class="panel">
        <div class="header">
          ${this._view === "search"
            ? html`<ha-icon-button class="back-btn" .label=${"Back"} @click=${this._goToList}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </ha-icon-button>`
            : html`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`}
          <span class="title" style="${this._view === "search" ? "" : "margin-left:4px"}">
            ${this._view === "search" ? "Add Show or Movie" : "Shows & Movies"}
          </span>
          ${this._view === "list"
            ? html`<button class="add-fab" @click=${this._goToSearch}>
                <ha-icon icon="mdi:plus"></ha-icon> Add
              </button>`
            : nothing}
        </div>

        ${this._view === "list" ? this._renderList() : this._renderSearch()}
      </div>

      ${this._detail ? this._renderDetailDialog() : nothing}
    `;
  }

  _renderList() {
    return html`
      <div class="filter-bar">
        ${["all", "want_to_watch", "watching", "watched", "paused"].map((s) => html`
          <button
            class="chip ${this._statusFilter === s ? "chip-active" : ""}"
            @click=${() => (this._statusFilter = s)}
          >${s === "all" ? "All" : STATUS_LABELS[s]}</button>
        `)}
      </div>
      <div class="grid">
        ${this._filteredItems.length === 0
          ? html`<div class="empty"><ha-icon icon="mdi:television-off"></ha-icon><p>Nothing here yet.<br>Tap + Add to get started.</p></div>`
          : repeat(this._filteredItems, (i) => i.item_id, (item) => this._renderPoster(item))}
      </div>
    `;
  }

  _renderPoster(item) {
    return html`
      <button class="poster-card" @click=${() => (this._detail = item)}>
        ${tmdbImg(item.poster_path)
          ? html`<img class="poster-img" src="${tmdbImg(item.poster_path)}" alt="${item.title}" loading="lazy" />`
          : html`<div class="poster-placeholder"><ha-icon icon="${MEDIA_ICONS[item.media_type] || "mdi:movie"}"></ha-icon></div>`}
        <span class="status-badge" style="background:${STATUS_COLORS[item.status]}">${STATUS_LABELS[item.status]}</span>
        ${item.vote_average ? html`<span class="rating-badge">★ ${item.vote_average}</span>` : nothing}
        ${this._hasNewEpisode(item) ? html`<span class="new-ep-badge"><ha-icon icon="mdi:new-box"></ha-icon></span>` : nothing}
        <div class="poster-title">${item.title}</div>
      </button>
    `;
  }

  _renderSearch() {
    return html`
      <div class="search-bar">
        <div class="search-type-toggle">
          <button class="type-btn ${this._searchType === "tv" ? "type-active" : ""}" @click=${() => { this._searchType = "tv"; this._searchDone = false; this._searchResults = []; }}>
            <ha-icon icon="mdi:television"></ha-icon> TV
          </button>
          <button class="type-btn ${this._searchType === "movie" ? "type-active" : ""}" @click=${() => { this._searchType = "movie"; this._searchDone = false; this._searchResults = []; }}>
            <ha-icon icon="mdi:movie"></ha-icon> Movie
          </button>
        </div>
        <ha-textfield
          class="search-input"
          placeholder="Search TMDB…"
          .value=${this._searchQuery}
          @input=${(e) => { this._searchQuery = e.target.value; this._searchDone = false; }}
          @keydown=${(e) => e.key === "Enter" && this._doSearch()}
        ></ha-textfield>
        ${this._searchQuery ? html`
          <ha-icon-button .label=${"Clear"} @click=${() => { this._searchQuery = ""; this._searchResults = []; this._searchDone = false; }}>
            <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        ` : nothing}
        <ha-icon-button
          .label=${"Search"}
          @click=${this._doSearch}
          ?disabled=${this._searching}
        ><ha-icon icon="${this._searching ? "mdi:loading" : "mdi:magnify"}"></ha-icon></ha-icon-button>
      </div>

      ${this._searching
        ? html`<div class="loading"><ha-spinner></ha-spinner></div>`
        : this._searchResults.length > 0
        ? html`<div class="grid">${repeat(this._searchResults, (r) => r.id, (r) => this._renderSearchResult(r))}</div>`
        : this._searchDone
        ? html`<div class="empty"><ha-icon icon="mdi:magnify-close"></ha-icon><p>No results for "${this._searchQuery}"</p></div>`
        : html`<div class="search-hint"><ha-icon icon="mdi:magnify"></ha-icon><p>Search for a TV show or movie to add it to your watchlist.</p></div>`}
    `;
  }

  _renderSearchResult(result) {
    const tmdbId = result.id;
    const title = result.title || result.name || "Unknown";
    const year = (result.release_date || result.first_air_date || "").slice(0, 4);
    const poster = result.poster_path ? `${TMDB_IMAGE_BASE}${result.poster_path}` : "";
    const added = this._isAdded(tmdbId);
    const adding = this._adding.has(tmdbId);

    return html`
      <div class="poster-card search-card">
        ${poster
          ? html`<img class="poster-img" src="${poster}" alt="${title}" loading="lazy" />`
          : html`<div class="poster-placeholder"><ha-icon icon="${MEDIA_ICONS[this._searchType]}"></ha-icon></div>`}
        ${result.vote_average ? html`<span class="rating-badge">★ ${result.vote_average.toFixed(1)}</span>` : nothing}
        <div class="poster-title">${title}${year ? html` <span class="year">${year}</span>` : nothing}</div>
        <button
          class="add-btn ${added ? "add-btn-done" : ""}"
          ?disabled=${added || adding}
          @click=${(e) => { e.stopPropagation(); if (!added && !adding) this._addItem(tmdbId, this._searchType); }}
        >
          <ha-icon icon="${adding ? "mdi:loading" : added ? "mdi:check" : "mdi:plus"}"></ha-icon>
        </button>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // New episode helper
  // ---------------------------------------------------------------------------

  _hasNewEpisode(item) {
    if (item.status === "watched") return false;
    if (item.has_new_episode) return true;
    const next = item.next_episode_to_air;
    if (!next?.air_date) return false;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    if (next.air_date > today) return false;
    const curS = item.current_season || 0, curE = item.current_episode || 0;
    if (curS === 0 && curE === 0) return true;
    return next.season_number > curS || (next.season_number === curS && next.episode_number > curE);
  }

  // ---------------------------------------------------------------------------
  // Progress section
  // ---------------------------------------------------------------------------

  _renderProgress(item) {
    const numSeasons = item.seasons || 0;
    const selectedSeason = item.current_season || "";
    const episodes = selectedSeason ? this._getSeasonEpisodes(item.tmdb_id, selectedSeason) : [];
    const last = item.last_episode_to_air;
    const next = item.next_episode_to_air;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const airedEpisodes = episodes ? episodes.filter((ep) => !ep.air_date || ep.air_date <= today) : [];
    const nextAiredLocally = next && next.air_date && next.air_date <= today;
    const curS = item.current_season || 0, curE = item.current_episode || 0;
    const userBehindNext = next && (next.season_number > curS || (next.season_number === curS && next.episode_number > curE));
    const showNewAlert = item.has_new_episode || (nextAiredLocally && userBehindNext);
    const newEp = item.has_new_episode ? last : (nextAiredLocally && userBehindNext ? next : null);

    return html`
      <div class="section-label">Progress ${numSeasons ? `· ${numSeasons} seasons` : ""}</div>

      ${showNewAlert && newEp ? html`
        <div class="new-ep-alert">
          <ha-icon icon="mdi:new-box"></ha-icon>
          <div>
            <strong>New episode available</strong>
            <div class="new-ep-detail">S${newEp.season_number}E${newEp.episode_number}${newEp.name ? ` · ${newEp.name}` : ""}${newEp.air_date ? ` · aired ${fmtDate(newEp.air_date)}` : ""}</div>
          </div>
        </div>
      ` : nothing}

      ${next && !nextAiredLocally ? html`
        <div class="upcoming-ep">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span>Next: S${next.season_number}E${next.episode_number}${next.name ? ` · ${next.name}` : ""}${next.air_date ? ` · ${fmtDate(next.air_date)}` : ""}</span>
        </div>
      ` : nothing}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${(e) => {
            const v = parseInt(e.target.value) || null;
            const fields = { current_season: v };
            if (item.status === "want_to_watch") fields.status = "watching";
            this._updateItem(item.item_id, fields);
            this._detail = { ...item, ...fields, current_episode: null };
          }}>
            <option value="">—</option>
            ${Array.from({ length: numSeasons }, (_, i) => i + 1).map((s) => html`
              <option value="${s}" ?selected=${selectedSeason === s}>Season ${s}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!selectedSeason || episodes === null}
            @change=${(e) => {
              const v = e.target.value ? parseInt(e.target.value, 10) : null;
              if (v) { this._updateItem(item.item_id, { current_episode: v }); this._detail = { ...item, current_episode: v }; }
            }}>
            <option value="">—</option>
            ${episodes === null
              ? html`<option disabled>Loading…</option>`
              : airedEpisodes.map((ep) => html`
                  <option value="${ep.episode_number}" ?selected=${item.current_episode === ep.episode_number}>
                    E${ep.episode_number}${ep.name ? ` · ${ep.name}` : ""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${last ? html`<div class="ep-latest-hint">Latest aired: S${last.season_number}E${last.episode_number}</div>` : nothing}
    `;
  }

  // ---------------------------------------------------------------------------
  // Detail dialog
  // ---------------------------------------------------------------------------

  _renderDetailDialog() {
    const item = this._detail;
    return html`
      <ha-dialog open @closed=${() => (this._detail = null)} .heading=${item.title}>
        <div class="dlg-body">
          ${tmdbImg(item.backdrop_path)
            ? html`<div class="dlg-backdrop" style="background-image:url('${tmdbImg(item.backdrop_path)}')"></div>`
            : nothing}
          <button class="dlg-delete-btn" title="Remove from watchlist" @click=${() => this._removeItem(item.item_id)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <div class="dlg-content">
            <div class="dlg-left">
              ${tmdbImg(item.poster_path) ? html`<img class="dlg-poster" src="${tmdbImg(item.poster_path)}" alt="${item.title}" />` : nothing}
            </div>
            <div class="dlg-right">
              <div class="dlg-meta">
                ${[item.release_date?.slice(0,4), item.genres?.slice(0,3).join(", "), item.vote_average ? `★ ${item.vote_average}` : null, item.networks?.[0]].filter(Boolean).join(" · ")}
              </div>
              <p class="dlg-overview">${item.overview}</p>

              <div class="section-label">Status</div>
              <div class="chip-row">
                ${["want_to_watch","watching","watched","paused"].map((s) => html`
                  <button class="chip ${item.status === s ? "chip-active" : ""}"
                    style="${item.status === s ? `background:${STATUS_COLORS[s]};color:#fff;border-color:transparent` : ""}"
                    @click=${async () => { await this._updateItem(item.item_id, { status: s }); this._detail = { ...item, status: s }; }}
                  >${STATUS_LABELS[s]}</button>
                `)}
              </div>

              ${item.media_type === "tv" ? this._renderProgress(item) : nothing}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map((n) => html`
                  <button class="star ${(item.rating || 0) >= n ? "star-on" : ""}"
                    @click=${async () => { await this._updateItem(item.item_id, { rating: n }); this._detail = { ...item, rating: n }; }}>★</button>
                `)}
                ${item.rating ? html`<span class="rating-val">${item.rating}/10</span>` : nothing}
              </div>

              <div class="section-label">Notes</div>
              <ha-textfield type="textarea" label="Notes" .value=${item.notes || ""}
                @change=${(e) => { this._updateItem(item.item_id, { notes: e.target.value }); this._detail = { ...item, notes: e.target.value }; }}
              ></ha-textfield>

              ${item.watch_providers && Object.keys(item.watch_providers).length > 0 ? html`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${item.watch_providers.flatrate?.length ? html`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${item.watch_providers.flatrate.map((p) => html`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${p.logo_path}" title="${p.provider_name}" alt="${p.provider_name}" />
                      `)}
                    </div>
                  ` : nothing}
                  ${item.watch_providers.rent?.length ? html`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${item.watch_providers.rent.map((p) => html`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${p.logo_path}" title="${p.provider_name}" alt="${p.provider_name}" />
                      `)}
                    </div>
                  ` : nothing}
                  ${item.watch_providers.buy?.length ? html`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${item.watch_providers.buy.map((p) => html`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${p.logo_path}" title="${p.provider_name}" alt="${p.provider_name}" />
                      `)}
                    </div>
                  ` : nothing}
                </div>
              ` : nothing}

              ${item.trailer_url ? html`
                <div class="dlg-footer">
                  <ha-button @click=${() => window.open(item.trailer_url, "_blank")}>
                    <ha-icon icon="mdi:play" slot="icon"></ha-icon>Trailer
                  </ha-button>
                </div>
              ` : nothing}
            </div>
          </div>
        </div>
        <ha-button slot="primaryAction" dialogAction="close">Close</ha-button>
      </ha-dialog>
    `;
  }

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  static styles = css`
    :host { display: block; min-height: 100%; background: var(--primary-background-color); color: var(--primary-text-color); }
    .panel { display: flex; flex-direction: column; min-height: 100%; max-width: 100%; }

    /* Header */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 8px 0 16px; height: 56px;
      background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
      position: sticky; top: 0; z-index: 10;
    }
    .title { font-size: 1.1rem; font-weight: 600; }
    .back-btn { --mdc-icon-button-size: 40px; color: var(--primary-text-color); }
    .add-fab {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 16px; border-radius: 20px;
      background: var(--primary-color); color: #fff; border: none;
      font-size: 0.9rem; font-weight: 500; cursor: pointer;
      --mdc-icon-size: 18px;
    }

    /* Filter chips */
    .filter-bar {
      display: flex; gap: 6px; padding: 12px 16px; overflow-x: auto;
      position: sticky; top: 56px; z-index: 9;
      background: var(--primary-background-color);
    }
    .chip {
      padding: 4px 12px; border-radius: 16px; border: 1px solid var(--divider-color);
      background: none; color: var(--secondary-text-color); cursor: pointer;
      font-size: 0.82rem; white-space: nowrap; transition: all 0.15s;
    }
    .chip:hover { border-color: var(--primary-color); color: var(--primary-color); }
    .chip-active { background: var(--primary-color) !important; border-color: var(--primary-color) !important; color: #fff !important; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }

    /* Poster grid */
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; padding: 8px; box-sizing: border-box;
      align-content: start; min-width: 0;
    }
    .poster-card {
      position: relative; border-radius: 8px; overflow: hidden; cursor: pointer;
      background: var(--card-background-color); border: none; padding: 0; text-align: left;
      display: flex; flex-direction: column; transition: transform 0.15s, box-shadow 0.15s;
    }
    .poster-card:hover { transform: scale(1.03); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
    .poster-img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; flex-shrink: 0; }
    .poster-placeholder {
      width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center;
      background: var(--secondary-background-color); flex-shrink: 0;
      --mdc-icon-size: 48px; color: var(--secondary-text-color);
    }
    .status-badge {
      position: absolute; top: 5px; left: 5px;
      padding: 2px 5px; border-radius: 3px; font-size: 0.6rem;
      font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.4px;
    }
    .rating-badge {
      position: absolute; top: 5px; right: 5px;
      background: rgba(0,0,0,0.65); padding: 2px 5px; border-radius: 3px;
      font-size: 0.7rem; color: #ffd600;
    }
    .new-ep-badge {
      position: absolute; top: 24px; right: 5px;
      background: var(--warning-color, #ff9800); border-radius: 4px;
      padding: 1px 4px; color: #fff; --mdc-icon-size: 14px; line-height: 1;
      display: flex; align-items: center;
    }
    .poster-title {
      padding: 5px 7px; font-size: 0.78rem; font-weight: 500;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;
    }

    /* Search */
    .search-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; flex-shrink: 0; }
    .search-type-toggle { display: flex; border-radius: 8px; overflow: hidden; border: 1px solid var(--divider-color); flex-shrink: 0; }
    .type-btn {
      display: flex; align-items: center; gap: 4px; padding: 0 12px; height: 36px;
      border: none; background: none; color: var(--secondary-text-color); cursor: pointer;
      font-size: 0.82rem; transition: all 0.15s;
    }
    .type-btn ha-icon { --mdc-icon-size: 16px; }
    .type-active { background: var(--primary-color); color: #fff; }
    .search-input { flex: 1; }
    .loading { display: flex; justify-content: center; padding: 40px; }

    /* Search hint / empty */
    .search-hint, .empty {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 48px 16px; color: var(--secondary-text-color);
      --mdc-icon-size: 48px; text-align: center;
    }
    .search-hint p, .empty p { margin: 12px 0 0; line-height: 1.6; }
    .empty { grid-column: 1/-1; }

    /* Search result add button */
    .search-card { position: relative; }
    .add-btn {
      position: absolute; bottom: 26px; right: 4px;
      width: 32px; height: 32px; border-radius: 50%; border: none;
      background: var(--primary-color); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5); --mdc-icon-size: 18px;
      transition: background 0.2s;
    }
    .add-btn:disabled { cursor: default; }
    .add-btn-done { background: var(--success-color, #2e7d32); }
    .year { color: var(--secondary-text-color); font-size: 0.75rem; }

    /* Dialog */
    ha-dialog { --mdc-dialog-min-width: min(680px, 95vw); --mdc-dialog-max-width: 680px; --dialog-content-overflow: visible; }
    .dlg-body { margin: -24px; position: relative; overflow: visible; }
    .dlg-backdrop { width: 100%; height: 180px; background-size: cover; background-position: center top; overflow: visible; }
    .dlg-delete-btn {
      position: absolute; top: 40px; right: 8px;
      background: rgba(180,0,0,0.85); border: none; border-radius: 50%;
      width: 36px; height: 36px; cursor: pointer; color: #fff;
      display: flex; align-items: center; justify-content: center;
      --mdc-icon-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.6); z-index: 100;
    }
    .dlg-delete-btn:hover { background: rgba(180,0,0,1); }
    .dlg-content { display: flex; gap: 14px; padding: 16px; }
    .dlg-left { flex-shrink: 0; }
    .dlg-poster { width: 90px; border-radius: 6px; display: block; }
    .dlg-right { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .dlg-right ha-textfield { width: 100%; }
    .dlg-meta { font-size: 0.82rem; color: var(--secondary-text-color); margin-bottom: 8px; }
    .dlg-overview { font-size: 0.84rem; line-height: 1.5; max-height: 80px; overflow-y: auto; margin: 0 0 4px; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .dlg-footer { display: flex; gap: 8px; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--divider-color); align-items: center; }
    .remove-btn { --primary-color: var(--error-color, #c62828); margin-left: auto; }

    .section-label {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--secondary-text-color); margin: 12px 0 5px;
    }
    .new-ep-alert {
      display: flex; align-items: flex-start; gap: 8px;
      background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
      border: 1px solid var(--warning-color, #ff9800);
      border-radius: 8px; padding: 8px 10px; margin-bottom: 8px;
      font-size: 0.82rem; --mdc-icon-size: 20px; color: var(--warning-color, #ff9800);
    }
    .new-ep-alert strong { display: block; color: var(--primary-text-color); }
    .new-ep-detail { color: var(--secondary-text-color); font-size: 0.78rem; margin-top: 2px; }
    .upcoming-ep {
      display: flex; align-items: center; gap: 6px; font-size: 0.78rem;
      color: var(--secondary-text-color); margin-bottom: 8px; --mdc-icon-size: 16px;
    }
    .ep-latest-hint { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 4px; }
    .progress-row { display: flex; gap: 12px; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; }
    .select-label span { font-size: 0.72rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select {
      width: 100%; padding: 6px 8px; border-radius: 6px;
      border: 1px solid var(--divider-color); background: var(--card-background-color);
      color: var(--primary-text-color); font-size: 0.84rem; cursor: pointer;
    }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--disabled-text-color, #555); padding: 0; line-height: 1; }
    .star-on { color: #ffd600; }
    .rating-val { margin-left: 6px; font-size: 0.8rem; color: var(--secondary-text-color); }
  `;
}

customElements.define("polr-tmdb-panel", TmdbShowsPanel);
