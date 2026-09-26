import { LitElement, html, css, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";

function fmtDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

const STATUS_LABELS = {
  want_to_watch: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
  paused: "Paused",
  suggested: "Suggested",
  dismissed: "Not for us",
};

const ALL_SECTIONS = ["new", "soon", "upnext", "suggested"];

// Quick reasons offered when passing on a suggestion. They feed back into
// whatever makes the suggestions, so they're phrased as taste, not ratings.
const DISMISS_REASONS = [
  "Too stressful",
  "Too slow",
  "Feels dated",
  "Not our genre",
  "Already seen it",
  "Just not interested",
];

const STATUS_COLORS = {
  want_to_watch: "#6d6d6d",
  watching: "#1976d2",
  watched: "#2e7d32",
  paused: "#e65100",
  suggested: "#7b1fa2",
  dismissed: "#6d6d6d",
};

class TmdbShowsCard extends LitElement {
  static properties = {
    _hass: { state: true },
    _config: { state: true },
    _items: { state: true },
    _section: { state: true }, // "new" | "soon" | "upnext" | "suggested"
    _detail: { state: true },
    _dismissing: { state: true }, // item_id whose "not for us" chooser is open
    _toast: { state: true },
    _searchOpen: { state: true },
    _searchQuery: { state: true },
    _searchType: { state: true }, // "" (both) | "tv" | "movie"
    _searchResults: { state: true }, // null until a search has run
    _searching: { state: true },
    _adding: { state: true },
  };

  constructor() {
    super();
    this._items = [];
    this._section = null; // resolved from config on first render
    this._detail = null;
    this._dismissing = null;
    this._toast = null;
    this._loaded = false;
    this._unsubEvents = null;
    this._seasonCache = {};
    this._searchOpen = false;
    this._searchQuery = "";
    this._searchType = "";
    this._searchResults = null;
    this._searching = false;
    this._adding = new Set();
    this._searchSeq = 0;
  }

  static getConfigElement() {
    return document.createElement("polr-tmdb-card-editor");
  }

  static getStubConfig() {
    return { title: "Watch Tonight" };
  }

  setConfig(config) {
    const sections = (config.sections || ALL_SECTIONS).filter((s) => ALL_SECTIONS.includes(s));
    if (!sections.length) throw new Error("sections must include at least one of: " + ALL_SECTIONS.join(", "));
    const tvs = (config.tvs || []).map((tv) => (typeof tv === "string" ? { entity: tv } : tv));
    for (const tv of tvs) {
      if (!tv.entity || !tv.entity.startsWith("media_player.")) {
        throw new Error("Each entry in tvs needs a media_player entity");
      }
    }
    this._config = { title: "Watch Tonight", search: true, ...config, sections, tvs };
    if (config.default_section && sections.includes(config.default_section)) {
      this._section = config.default_section;
    } else if (!sections.includes(this._section)) {
      this._section = sections[0];
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._loaded) {
      this._loaded = true;
      this._loadItems();
      this._subscribeEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._searchTimer);
    if (this._unsubEvents) this._unsubEvents.then((fn) => fn && fn());
  }

  async _loadItems() {
    try {
      this._items = await this._hass.connection.sendMessagePromise({ type: "polr_tmdb/items" }) || [];
    } catch (e) { console.error("polr-tmdb-card: load failed", e); }
  }

  async _subscribeEvents() {
    this._unsubEvents = this._hass.connection.subscribeEvents((event) => {
      this._loadItems();
      if (this._detail && event.data.item?.item_id === this._detail.item_id) {
        this._detail = event.data.action === "remove" ? null : event.data.item;
      }
    }, "polr_tmdb_updated");
  }

  async _updateItem(itemId, fields) {
    const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => v != null));
    try {
      await this._hass.connection.sendMessagePromise({ type: "polr_tmdb/update", item_id: itemId, ...clean });
    } catch (e) { console.error("polr-tmdb-card: update failed", e); }
  }

  async _callService(service, data, toast) {
    try {
      await this._hass.callService("polr_tmdb", service, data);
      if (toast) this._showToast(toast);
    } catch (e) {
      console.error(`polr-tmdb-card: ${service} failed`, e);
      this._showToast(e?.message || "Something went wrong");
    }
  }

  _showToast(text) {
    this._toast = text;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => (this._toast = null), 3500);
  }

  _tvName(tv) {
    return tv.name || this._hass?.states?.[tv.entity]?.attributes?.friendly_name || tv.entity;
  }

  _openOnTv(item, tv) {
    this._showToast(`Opening ${item.title} on ${this._tvName(tv)}…`);
    this._callService("open_on_tv", { item_id: item.item_id, entity_id: tv.entity });
  }

  _addSuggestion(item) {
    this._callService("update_status", { item_id: item.item_id, status: "want_to_watch" }, `Added ${item.title} to Up Next`);
    if (this._detail?.item_id === item.item_id) this._detail = { ...item, status: "want_to_watch" };
  }

  _dismiss(item, reason) {
    this._dismissing = null;
    this._callService("dismiss", { item_id: item.item_id, reason: reason || "" }, `Passed on ${item.title}`);
    if (this._detail?.item_id === item.item_id) this._detail = null;
  }

  async _removeItem(itemId) {
    if (!confirm("Remove from watchlist?")) return;
    try {
      await this._hass.connection.sendMessagePromise({ type: "polr_tmdb/remove", item_id: itemId });
    } catch (e) { console.error("polr-tmdb-card: remove failed", e); }
  }

  async _fetchSeasonEpisodes(tmdbId, seasonNumber) {
    const key = `${tmdbId}:${seasonNumber}`;
    if (this._seasonCache[key]) return;
    try {
      const eps = await this._hass.connection.sendMessagePromise({ type: "polr_tmdb/season", tmdb_id: tmdbId, season_number: seasonNumber });
      this._seasonCache[key] = eps || [];
      this.requestUpdate();
    } catch (e) { console.error("season fetch", e); }
  }

  _getSeasonEpisodes(tmdbId, seasonNumber) {
    if (!seasonNumber) return [];
    const key = `${tmdbId}:${seasonNumber}`;
    if (!this._seasonCache[key]) { this._fetchSeasonEpisodes(tmdbId, seasonNumber); return null; }
    return this._seasonCache[key];
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

  _toggleSearch() {
    this._searchOpen = !this._searchOpen;
    if (this._searchOpen) {
      this.updateComplete.then(() => this.renderRoot.querySelector(".search-input")?.focus());
    } else {
      clearTimeout(this._searchTimer);
      this._searchSeq++; // drop any in-flight response
      this._searchQuery = "";
      this._searchResults = null;
      this._searching = false;
    }
  }

  _onSearchInput(value) {
    this._searchQuery = value;
    clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => this._runSearch(), 400);
  }

  _setSearchType(type) {
    this._searchType = type;
    this._runSearch();
  }

  async _runSearch() {
    clearTimeout(this._searchTimer);
    const query = this._searchQuery.trim();
    const seq = ++this._searchSeq;
    if (!query) {
      this._searchResults = null;
      this._searching = false;
      return;
    }
    this._searching = true;
    const data = { query, limit: 20 };
    if (this._searchType) data.media_type = this._searchType;
    try {
      const res = await this._hass.connection.sendMessagePromise({
        type: "call_service", domain: "polr_tmdb", service: "search", service_data: data, return_response: true,
      });
      if (seq === this._searchSeq) this._searchResults = res?.response?.results || [];
    } catch (e) {
      console.error("polr-tmdb-card: search failed", e);
      if (seq === this._searchSeq) {
        this._searchResults = [];
        this._showToast(e?.message || "Search failed");
      }
    } finally {
      if (seq === this._searchSeq) this._searching = false;
    }
  }

  // Looked up live rather than trusting the search response, so a title
  // added a moment ago (here or on another dashboard) shows as on the list.
  _itemForResult(result) {
    return this._items.find((i) => i.tmdb_id === result.tmdb_id && i.media_type === result.media_type);
  }

  async _addFromSearch(result) {
    const key = `${result.media_type}:${result.tmdb_id}`;
    this._adding = new Set([...this._adding, key]);
    try {
      await this._hass.connection.sendMessagePromise({
        type: "polr_tmdb/add", tmdb_id: result.tmdb_id, media_type: result.media_type, status: "want_to_watch",
      });
      await this._loadItems();
      this._showToast(`Added ${result.title} to Up Next`);
    } catch (e) {
      console.error("polr-tmdb-card: add failed", e);
      this._showToast(e?.message || "Couldn't add that title");
    } finally {
      const s = new Set(this._adding); s.delete(key); this._adding = s;
    }
  }

  // ---------------------------------------------------------------------------
  // Section logic
  // ---------------------------------------------------------------------------

  _today() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  }

  _hasNewEpisode(item) {
    if (item.status === "watched") return false;
    if (item.has_new_episode) return true;
    const next = item.next_episode_to_air;
    if (!next?.air_date) return false;
    if (next.air_date > this._today()) return false;
    const curS = item.current_season || 0, curE = item.current_episode || 0;
    if (curS === 0 && curE === 0) return true;
    return next.season_number > curS || (next.season_number === curS && next.episode_number > curE);
  }

  _daysUntil(dateStr) {
    if (!dateStr) return null;
    const diff = new Date(dateStr + "T12:00:00") - new Date();
    return Math.ceil(diff / 86400000);
  }

  // "Soon": watching items with a next episode airing within 14 days (but not already aired)
  _isComingSoon(item) {
    if (item.media_type !== "tv") return false;
    if (item.status !== "watching") return false;
    if (this._hasNewEpisode(item)) return false; // already in "new"
    const next = item.next_episode_to_air;
    if (!next?.air_date) return false;
    const days = this._daysUntil(next.air_date);
    return days !== null && days > 0 && days <= 14;
  }

  get _newItems() {
    return this._items
      .filter((i) => ["watching", "paused"].includes(i.status) && this._hasNewEpisode(i))
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  get _soonItems() {
    return this._items
      .filter((i) => this._isComingSoon(i))
      .sort((a, b) => {
        const da = a.next_episode_to_air?.air_date || "9999";
        const db = b.next_episode_to_air?.air_date || "9999";
        return da.localeCompare(db);
      });
  }

  get _upNextItems() {
    return this._items
      .filter((i) => i.status === "want_to_watch")
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  get _suggestedItems() {
    return this._items
      .filter((i) => i.status === "suggested")
      .sort((a, b) => (b.suggestion?.suggested_at || "").localeCompare(a.suggestion?.suggested_at || ""));
  }

  _itemsFor(section) {
    if (section === "new") return this._newItems;
    if (section === "soon") return this._soonItems;
    if (section === "suggested") return this._suggestedItems;
    return this._upNextItems;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    if (!this._config) return nothing;
    const labels = { new: "New", soon: "Coming Soon", upnext: "Up Next", suggested: "Suggested" };
    const sections = this._config.sections.map((id) => ({ id, label: labels[id], count: this._itemsFor(id).length }));
    const active = this._itemsFor(this._section);

    return html`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${sections.length === 1 ? html`<span class="single-title">${this._config.title}</span>` : sections.map(({ id, label, count }) => html`
              <button
                class="pill ${this._section === id ? "pill-active" : ""} ${count === 0 ? "pill-empty" : ""}"
                @click=${() => { this._section = id; if (this._searchOpen) this._toggleSearch(); }}
              >
                ${label}${count > 0 ? html`<span class="pill-count">${count}</span>` : nothing}
              </button>
            `)}
          </div>
          <div class="header-actions">
            ${this._config.search ? html`
              <button class="manage-btn ${this._searchOpen ? "manage-btn-active" : ""}" title="${this._searchOpen ? "Close search" : "Search"}" @click=${this._toggleSearch}>
                <ha-icon icon="${this._searchOpen ? "mdi:close" : "mdi:magnify"}"></ha-icon>
              </button>` : nothing}
            <button class="manage-btn" title="Manage watchlist" @click=${this._goToPanel}>
              <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
            </button>
          </div>
        </div>

        ${this._searchOpen
          ? this._renderSearch()
          : active.length === 0
            ? this._renderEmpty()
            : this._section === "suggested"
              ? html`<div class="suggestion-list">${repeat(active, (i) => i.item_id, (item) => this._renderSuggestion(item))}</div>`
              : html`<div class="poster-row">${repeat(active, (i) => i.item_id, (item) => this._renderPoster(item))}</div>`}

        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>

      ${this._detail ? this._renderDetailDialog() : nothing}
    `;
  }

  _goToPanel() {
    history.pushState(null, "", "/polr-tmdb");
    window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
  }

  _renderSearch() {
    const types = [["", "All"], ["tv", "TV"], ["movie", "Movies"]];
    const results = this._searchResults;
    return html`
      <div class="search-bar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${(e) => this._onSearchInput(e.target.value)}
          @keydown=${(e) => e.key === "Enter" && this._runSearch()} />
        <div class="search-types">
          ${types.map(([id, label]) => html`
            <button class="pill ${this._searchType === id ? "pill-active" : ""}" @click=${() => this._setSearchType(id)}>${label}</button>
          `)}
        </div>
      </div>
      ${this._searching && !results?.length
        ? html`<div class="search-note">Searching…</div>`
        : results === null
          ? html`<div class="search-note">Find a movie or show to add to Up Next.</div>`
          : results.length === 0
            ? html`<div class="search-note">No matches for “${this._searchQuery.trim()}”.</div>`
            : html`<div class="search-list">${repeat(results, (r) => `${r.media_type}:${r.tmdb_id}`, (r) => this._renderSearchResult(r))}</div>`}
    `;
  }

  _renderSearchResult(result) {
    const item = this._itemForResult(result);
    const adding = this._adding.has(`${result.media_type}:${result.tmdb_id}`);
    const meta = [result.year, result.media_type === "tv" ? "TV" : "Movie", result.rating ? `★ ${result.rating}` : null]
      .filter(Boolean).join(" · ");
    const open = item ? () => (this._detail = item) : null;
    return html`
      <div class="search-result">
        <div class="search-poster ${open ? "clickable" : ""}" @click=${open || nothing}>
          ${result.poster_url
            ? html`<img src="${result.poster_url}" alt="${result.title}" loading="lazy" />`
            : html`<div class="poster-fallback">${result.media_type === "tv" ? "📺" : "🎬"}</div>`}
        </div>
        <div class="search-body">
          <div class="search-title">${result.title}</div>
          <div class="suggestion-meta">${meta}</div>
          ${result.overview ? html`<div class="search-overview">${result.overview}</div>` : nothing}
        </div>
        <div class="search-action">
          ${item
            ? html`<button class="status-chip" style="background:${STATUS_COLORS[item.status] || "#6d6d6d"}" @click=${open}>
                ${STATUS_LABELS[item.status] || item.status}
              </button>`
            : html`<button class="action action-primary" ?disabled=${adding} @click=${() => this._addFromSearch(result)}>
                <ha-icon icon="${adding ? "mdi:loading" : "mdi:playlist-plus"}"></ha-icon> ${adding ? "Adding" : "Add"}
              </button>`}
        </div>
      </div>
    `;
  }

  _renderEmpty() {
    const configs = {
      new:    { icon: "mdi:check-circle-outline", heading: "All caught up!",        sub: "No new episodes to watch right now." },
      soon:   { icon: "mdi:calendar-blank-outline", heading: "Nothing coming soon", sub: "No new episodes airing in the next 2 weeks." },
      upnext: { icon: "mdi:playlist-play",         heading: "Queue is empty",       sub: "Add something to your watchlist to get started." },
      suggested: { icon: "mdi:lightbulb-on-outline", heading: "No suggestions right now", sub: "New ones arrive with the next weekly pass." },
    };
    const { icon, heading, sub } = configs[this._section] || configs.upnext;
    return html`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${icon}></ha-icon>
        <div class="empty-heading">${heading}</div>
        <div class="empty-sub">${sub}</div>
      </div>
    `;
  }

  _renderPoster(item) {
    const next = item.next_episode_to_air;
    const days = this._isComingSoon(item) && next?.air_date ? this._daysUntil(next.air_date) : null;

    return html`
      <div class="poster" @click=${() => (this._detail = item)}>
        ${item.poster_path
          ? html`<img class="poster-img" src="${item.poster_path}" alt="${item.title}" loading="lazy" />`
          : html`<div class="poster-fallback">${item.media_type === "tv" ? "📺" : "🎬"}</div>`}

        ${this._hasNewEpisode(item) ? html`<span class="new-badge">NEW</span>` : nothing}

        ${days !== null ? html`
          <span class="soon-badge">${days === 1 ? "Tomorrow" : `${days}d`}</span>
        ` : nothing}

        <div class="poster-title">${item.title}</div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Suggestions
  // ---------------------------------------------------------------------------

  _streamingNames(item) {
    return (item.watch_providers?.flatrate || []).map((p) => p.provider_name);
  }

  _renderSuggestion(item) {
    const meta = [
      item.release_date?.slice(0, 4),
      item.media_type === "tv" && item.seasons ? `${item.seasons} season${item.seasons === 1 ? "" : "s"}` : null,
      item.watch_link?.service || this._streamingNames(item)[0],
    ].filter(Boolean).join(" · ");
    return html`
      <div class="suggestion">
        <div class="suggestion-poster" @click=${() => (this._detail = item)}>
          ${item.poster_path
            ? html`<img src="${item.poster_path}" alt="${item.title}" loading="lazy" />`
            : html`<div class="poster-fallback">${item.media_type === "tv" ? "📺" : "🎬"}</div>`}
        </div>
        <div class="suggestion-body">
          <div class="suggestion-title" @click=${() => (this._detail = item)}>${item.title}</div>
          <div class="suggestion-meta">${meta}</div>
          ${item.suggestion?.reason ? html`<div class="suggestion-reason">${item.suggestion.reason}</div>` : nothing}
          ${this._dismissing === item.item_id
            ? this._renderDismissChooser(item)
            : html`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${() => this._addSuggestion(item)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${() => (this._dismissing = item.item_id)}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${item.trailer_url ? html`
                  <a class="action" href="${item.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>` : nothing}
              </div>
              ${this._renderTvButtons(item)}`}
        </div>
      </div>
    `;
  }

  _renderTvButtons(item) {
    if (!item.watch_link?.url || !this._config.tvs.length) return nothing;
    return html`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map((tv) => html`
          <button class="tv-btn" @click=${() => this._openOnTv(item, tv)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(tv)}
          </button>
        `)}
      </div>
    `;
  }

  _renderDismissChooser(item) {
    return html`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${DISMISS_REASONS.map((r) => html`<button class="reason-chip" @click=${() => this._dismiss(item, r)}>${r}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${(e) => { if (e.key === "Enter" && e.target.value.trim()) this._dismiss(item, e.target.value.trim()); }} />
          <button class="action" @click=${() => (this._dismissing = null)}>Cancel</button>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Detail dialog
  // ---------------------------------------------------------------------------

  _renderProgress(item) {
    const numSeasons = item.seasons || 0;
    const selectedSeason = item.current_season || "";
    const episodes = selectedSeason ? this._getSeasonEpisodes(item.tmdb_id, selectedSeason) : [];
    const last = item.last_episode_to_air;
    const next = item.next_episode_to_air;
    const today = this._today();
    const airedEpisodes = episodes ? episodes.filter((ep) => !ep.air_date || ep.air_date <= today) : [];
    const nextAiredLocally = next && next.air_date && next.air_date <= today;
    const curS = item.current_season || 0, curE = item.current_episode || 0;
    const userBehindNext = next && (next.season_number > curS || (next.season_number === curS && next.episode_number > curE));
    const showNewAlert = item.has_new_episode || (nextAiredLocally && userBehindNext);
    const newEp = item.has_new_episode ? last : (nextAiredLocally && userBehindNext ? next : null);

    return html`
      <div class="section-label">Progress ${numSeasons ? `(${numSeasons} seasons)` : ""}</div>

      ${showNewAlert && newEp ? html`
        <div class="new-ep-alert">
          <strong>New:</strong> S${newEp.season_number}E${newEp.episode_number}${newEp.name ? ` · ${newEp.name}` : ""}
        </div>
      ` : nothing}

      ${next && !nextAiredLocally ? html`
        <div class="upcoming-ep">Next: S${next.season_number}E${next.episode_number}${next.air_date ? ` · ${fmtDate(next.air_date)}` : ""}</div>
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

  _renderDetailDialog() {
    const item = this._detail;
    return html`
      <div class="dialog-overlay" @click=${(e) => e.target === e.currentTarget && (this._detail = null)}>
        <div class="dialog">
          ${item.backdrop_path
            ? html`<div class="dialog-backdrop" style="background-image:url('${item.backdrop_path}')"></div>`
            : nothing}

          <button class="dialog-close" @click=${() => (this._detail = null)}>✕</button>
          <button class="dialog-delete" title="Remove from watchlist" @click=${() => this._removeItem(item.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>

          <div class="dialog-content">
            <div class="dialog-left">
              ${item.poster_path ? html`<img class="dialog-poster" src="${item.poster_path}" alt="${item.title}" />` : nothing}
            </div>
            <div class="dialog-right">
              <div class="dialog-title">${item.title}</div>
              <div class="dialog-meta">
                ${[item.release_date?.slice(0,4), item.genres?.slice(0,3).join(", "), item.vote_average ? `★ ${item.vote_average}` : null, item.networks?.[0]].filter(Boolean).join(" · ")}
              </div>
              <p class="dialog-overview">${item.overview}</p>

              ${item.status === "suggested" ? html`
                <div class="suggestion-box">
                  ${item.suggestion?.reason ? html`<div><strong>Why it's here:</strong> ${item.suggestion.reason}</div>` : nothing}
                  ${this._dismissing === item.item_id
                    ? this._renderDismissChooser(item)
                    : html`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${() => this._addSuggestion(item)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${() => (this._dismissing = item.item_id)}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              ` : nothing}

              ${this._renderTvButtons(item)}

              <div class="section-label">Status</div>
              <div class="status-pills">
                ${["want_to_watch","watching","watched","paused"].map((s) => html`
                  <button class="status-pill ${item.status === s ? "status-pill-active" : ""}"
                    style="${item.status === s ? `background:${STATUS_COLORS[s]};border-color:${STATUS_COLORS[s]}` : ""}"
                    @click=${async () => { await this._updateItem(item.item_id, { status: s }); this._detail = { ...item, status: s }; }}
                  >${STATUS_LABELS[s]}</button>
                `)}
              </div>

              ${item.media_type === "tv" ? this._renderProgress(item) : nothing}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map((n) => html`
                  <span class="star ${(item.rating||0) >= n ? "star-on" : ""}"
                    @click=${async () => { await this._updateItem(item.item_id, { rating: n }); this._detail = { ...item, rating: n }; }}>★</span>
                `)}
                ${item.rating ? html`<span class="rating-num">${item.rating}/10</span>` : nothing}
              </div>

              <div class="section-label">Notes</div>
              <textarea class="notes" placeholder="Your notes…" .value=${item.notes || ""}
                @change=${(e) => { this._updateItem(item.item_id, { notes: e.target.value }); this._detail = { ...item, notes: e.target.value }; }}></textarea>

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
                <div class="dialog-footer">
                  <a class="trailer-btn" href="${item.trailer_url}" target="_blank" rel="noopener">▶ Trailer</a>
                </div>
              ` : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  static styles = css`
    ha-card { display: flex; flex-direction: column; overflow: hidden; }

    .card-header { padding: 16px 16px 8px; font-size: 1.1rem; font-weight: 600; color: var(--ha-card-header-color, var(--primary-text-color)); }

    /* Section pills */
    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 10px 16px; }
    .section-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .manage-btn {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: var(--secondary-text-color); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      --mdc-icon-size: 26px; flex-shrink: 0;
      transition: color 0.15s;
    }
    .manage-btn:hover, .manage-btn-active { color: var(--primary-color); }
    .header-actions { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
    .pill {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 16px;
      border: 1px solid var(--divider-color, #555);
      background: transparent; color: var(--secondary-text-color);
      cursor: pointer; font-size: 0.78rem; white-space: nowrap; transition: all 0.15s;
    }
    .pill-active { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .pill-empty { opacity: 0.45; }
    .pill-count {
      background: rgba(255,255,255,0.25); color: inherit;
      border-radius: 10px; padding: 0 5px; font-size: 0.72rem; font-weight: 700; min-width: 16px; text-align: center;
    }
    .pill-active .pill-count { background: rgba(255,255,255,0.3); }
    .pill:not(.pill-active) .pill-count { background: var(--divider-color); color: var(--primary-text-color); }

    /* Horizontal poster row */
    .poster-row {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; padding: 0 16px 16px;
    }

    .poster {
      position: relative; border-radius: 6px; overflow: hidden;
      cursor: pointer; background: var(--secondary-background-color, #222);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .poster:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
    .poster-img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .poster-fallback { width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; background: var(--secondary-background-color, #2a2a2a); }
    .poster-title { padding: 5px 6px; font-size: 0.72rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--primary-text-color); }

    .new-badge {
      position: absolute; top: 5px; right: 5px;
      background: #ff9800; border-radius: 3px;
      padding: 1px 5px; font-size: 0.58rem; font-weight: 700; color: #fff; letter-spacing: 0.5px;
    }
    .soon-badge {
      position: absolute; top: 5px; right: 5px;
      background: rgba(0,0,0,0.65); border-radius: 3px;
      padding: 1px 5px; font-size: 0.62rem; font-weight: 600; color: #fff;
    }

    .single-title { font-size: 1.05rem; font-weight: 600; }

    /* Suggestions */
    .suggestion-list { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; }
    .suggestion { display: flex; gap: 12px; align-items: flex-start; }
    .suggestion-poster { flex-shrink: 0; width: 84px; border-radius: 6px; overflow: hidden; cursor: pointer; background: var(--secondary-background-color, #222); }
    .suggestion-poster img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .suggestion-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .suggestion-title { font-weight: 600; font-size: 0.98rem; cursor: pointer; }
    .suggestion-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .suggestion-reason { font-size: 0.84rem; line-height: 1.45; color: var(--primary-text-color); }
    .suggestion-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .suggestion-box { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; line-height: 1.45; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: rgba(123,31,162,0.12); border: 1px solid rgba(123,31,162,0.45); }
    .action {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); cursor: pointer; font-size: 0.78rem; text-decoration: none; --mdc-icon-size: 16px;
    }
    .action-primary { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .tv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 6px; }
    .tv-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .tv-btn {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--primary-color); background: transparent;
      color: var(--primary-color); cursor: pointer; font-size: 0.78rem; --mdc-icon-size: 16px;
    }
    .dismiss-chooser { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .dismiss-prompt { font-size: 0.75rem; color: var(--secondary-text-color); }
    .dismiss-reasons { display: flex; flex-wrap: wrap; gap: 6px; }
    .reason-chip { padding: 5px 10px; min-height: 30px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.76rem; }
    .dismiss-custom { display: flex; gap: 6px; }
    .dismiss-input { flex: 1; min-width: 0; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.8rem; }
    /* Search */
    .search-bar { display: flex; flex-direction: column; gap: 8px; padding: 0 16px 10px; }
    .search-input {
      width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 18px;
      border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); font-size: 0.9rem; font-family: inherit;
    }
    .search-input:focus { outline: none; border-color: var(--primary-color); }
    .search-types { display: flex; gap: 6px; }
    .search-note { padding: 20px 16px 28px; text-align: center; font-size: 0.85rem; color: var(--secondary-text-color); }
    .search-list { display: flex; flex-direction: column; gap: 10px; padding: 0 16px 16px; max-height: 480px; overflow-y: auto; }
    .search-result { display: flex; gap: 10px; align-items: center; }
    .search-poster { flex-shrink: 0; width: 46px; border-radius: 4px; overflow: hidden; background: var(--secondary-background-color, #222); }
    .search-poster img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .search-poster .poster-fallback { font-size: 1.3rem; }
    .clickable { cursor: pointer; }
    .search-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .search-title { font-weight: 600; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .search-overview { font-size: 0.75rem; line-height: 1.35; color: var(--secondary-text-color); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .search-action { flex-shrink: 0; }
    .search-action .action[disabled] { opacity: 0.7; cursor: default; }
    .status-chip { padding: 5px 10px; min-height: 30px; border-radius: 14px; border: none; color: #fff; cursor: pointer; font-size: 0.74rem; white-space: nowrap; }
    .toast { margin: 0 16px 12px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; background: var(--secondary-background-color, #333); color: var(--primary-text-color); }

    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 16px 40px; gap: 8px; text-align: center;
    }
    .empty-icon { --mdc-icon-size: 48px; color: var(--divider-color); margin-bottom: 4px; }
    .empty-heading { font-size: 1rem; font-weight: 600; color: var(--secondary-text-color); }
    .empty-sub { font-size: 0.82rem; color: var(--disabled-text-color, var(--secondary-text-color)); opacity: 0.7; max-width: 240px; line-height: 1.4; }

    /* Dialog */
    .dialog-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .dialog { background: var(--card-background-color, #1e1e1e); border-radius: 12px; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; position: relative; }
    .dialog-backdrop { width: 100%; height: 180px; background-size: cover; background-position: center top; border-radius: 12px 12px 0 0; }
    .dialog-close { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #fff; font-size: 0.9rem; z-index: 1; }
    .dialog-delete { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 1; opacity: 0.6; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; color: #fff; }
    .dialog-delete:hover { opacity: 1; }
    .dialog-content { display: flex; gap: 14px; padding: 14px; clear: both; }
    .dialog-left { flex-shrink: 0; }
    .dialog-poster { width: 90px; border-radius: 5px; }
    .dialog-right { flex: 1; min-width: 0; }
    .dialog-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }
    .dialog-meta { font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 6px; }
    .dialog-overview { font-size: 0.82rem; line-height: 1.5; max-height: 80px; overflow-y: auto; margin: 0 0 8px; }
    .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); margin: 10px 0 5px; }
    .status-pills { display: flex; flex-wrap: wrap; gap: 5px; }
    .status-pill { padding: 3px 10px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.75rem; }
    .status-pill-active { color: #fff; }
    .progress-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; font-size: 0.78rem; }
    .select-label span { font-size: 0.7rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select { width: 100%; padding: 5px 7px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color); font-size: 0.82rem; cursor: pointer; }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .new-ep-alert { font-size: 0.78rem; padding: 5px 8px; border-radius: 5px; margin-bottom: 5px; background: rgba(255,152,0,0.15); border: 1px solid #ff9800; color: #ff9800; }
    .new-ep-alert strong { color: var(--primary-text-color); }
    .upcoming-ep { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 5px; }
    .ep-latest-hint { font-size: 0.72rem; color: var(--secondary-text-color); margin-top: 3px; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 1.3rem; cursor: pointer; color: var(--secondary-text-color, #555); user-select: none; }
    .star-on { color: #ffd600; }
    .rating-num { margin-left: 8px; font-size: 0.8rem; color: var(--secondary-text-color); }
    .notes { width: 100%; box-sizing: border-box; padding: 6px 8px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.82rem; resize: vertical; min-height: 54px; font-family: inherit; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .dialog-footer { display: flex; margin-top: 12px; }
    .trailer-btn { padding: 5px 14px; border-radius: 16px; background: #c62828; color: #fff; text-decoration: none; font-size: 0.8rem; }
    @media (max-width: 420px) { .dialog-content { flex-direction: column; } .dialog-poster { width: 70px; } }
  `;
}

// ---------------------------------------------------------------------------
// Card Editor
// ---------------------------------------------------------------------------

class TmdbShowsCardEditor extends LitElement {
  static properties = { hass: { type: Object }, _config: { state: true } };

  setConfig(config) { this._config = config; }

  _valueChanged(ev) {
    const field = ev.target.dataset.field;
    const value = ev.target.value;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this._config, [field]: value } } }));
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title || ""} @change=${this._valueChanged} />
        </label>
      </div>
    `;
  }

  static styles = css`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `;
}

customElements.define("polr-tmdb-card", TmdbShowsCard);
customElements.define("polr-tmdb-card-editor", TmdbShowsCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type: "polr-tmdb-card", name: "TMDB Shows & Movies", description: "What to watch tonight, and what to try next.", preview: false });
