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
    _modal: { state: true }, // null | "search" | "library"
    _libraryFilter: { state: true },
    _previewLoading: { state: true },
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
    this._modal = null;
    this._libraryFilter = "all";
    this._previewLoading = false;
    this._previewSeq = 0;
    this._onKeydown = (e) => { if (e.key === "Escape") this._closeTopLayer(); };
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

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKeydown);
    // HA detaches and re-attaches cards when switching views; pick the
    // event subscription back up (and catch up on what we missed).
    if (this._loaded && !this._unsubEvents) {
      this._loadItems();
      this._subscribeEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKeydown);
    clearTimeout(this._searchTimer);
    if (this._unsubEvents) this._unsubEvents.then((fn) => fn && fn());
    this._unsubEvents = null;
  }

  async _loadItems() {
    try {
      this._items = await this._hass.connection.sendMessagePromise({ type: "polr_tmdb/items" }) || [];
    } catch (e) { console.error("polr-tmdb-card: load failed", e); }
  }

  async _subscribeEvents() {
    this._unsubEvents = this._hass.connection.subscribeEvents((event) => {
      this._loadItems();
      const changed = event.data.item;
      if (!this._detail || !changed) return;
      if (changed.item_id === this._detail.item_id) {
        this._detail = event.data.action === "remove" ? null : changed;
      } else if (!this._detail.item_id && this._sameTitle(changed, this._detail)) {
        // The title being previewed was just added (here or elsewhere):
        // switch the dialog over to the real item.
        this._detail = changed;
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
  // Modals: search and library open over the dashboard; the detail dialog
  // opens on top of either.
  // ---------------------------------------------------------------------------

  _openModal(name) {
    this._modal = name;
    if (name === "search") {
      this.updateComplete.then(() => this.renderRoot.querySelector(".search-input")?.focus());
    }
  }

  _closeModal() {
    this._modal = null;
    this._dismissing = null;
  }

  _closeDetail() {
    this._detail = null;
    this._dismissing = null;
    this._previewSeq++; // drop any in-flight preview
    this._previewLoading = false;
  }

  _closeTopLayer() {
    if (this._detail) this._closeDetail();
    else if (this._modal) this._closeModal();
  }

  _sameTitle(a, b) {
    return a.tmdb_id === b.tmdb_id && a.media_type === b.media_type;
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

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
    return this._items.find((i) => this._sameTitle(i, result));
  }

  _openResult(result) {
    const item = this._itemForResult(result);
    if (item) {
      this._detail = item;
      return;
    }
    this._openPreview(result);
  }

  // Show what the search already knows straight away, then fill in the
  // backdrop, genres, trailer and providers once TMDB answers.
  async _openPreview(result) {
    const seq = ++this._previewSeq;
    this._detail = {
      item_id: null, status: null,
      tmdb_id: result.tmdb_id, media_type: result.media_type, title: result.title,
      poster_path: result.poster_url, backdrop_path: result.backdrop_url, overview: result.overview,
      vote_average: result.rating, release_date: result.year || "",
    };
    this._previewLoading = true;
    try {
      const full = await this._hass.connection.sendMessagePromise({
        type: "polr_tmdb/preview", tmdb_id: result.tmdb_id, media_type: result.media_type,
      });
      if (seq === this._previewSeq && !this._detail?.item_id) this._detail = full;
    } catch (e) {
      console.error("polr-tmdb-card: preview failed", e);
    } finally {
      if (seq === this._previewSeq) this._previewLoading = false;
    }
  }

  async _addTitle(title, status = "want_to_watch") {
    const key = `${title.media_type}:${title.tmdb_id}`;
    this._adding = new Set([...this._adding, key]);
    try {
      const item = await this._hass.connection.sendMessagePromise({
        type: "polr_tmdb/add", tmdb_id: title.tmdb_id, media_type: title.media_type, status,
      });
      await this._loadItems();
      this._showToast(`Added ${title.title} to ${status === "watching" ? "Watching" : "Up Next"}`);
      if (this._detail && !this._detail.item_id && this._sameTitle(this._detail, title)) this._detail = item;
    } catch (e) {
      console.error("polr-tmdb-card: add failed", e);
      this._showToast(e?.message || "Couldn't add that title");
    } finally {
      const s = new Set(this._adding); s.delete(key); this._adding = s;
    }
  }

  _isAdding(title) {
    return this._adding.has(`${title.media_type}:${title.tmdb_id}`);
  }

  // ---------------------------------------------------------------------------
  // Library
  // ---------------------------------------------------------------------------

  _libraryItems(filter) {
    // "Not for us" titles only show under their own filter.
    const items = filter === "all"
      ? this._items.filter((i) => i.status !== "dismissed")
      : this._items.filter((i) => i.status === filter);
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
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
          <span class="card-title">${this._config.title}</span>
          <div class="header-actions">
            ${this._config.search ? html`
              <button class="icon-btn" title="Search" aria-label="Search" @click=${() => this._openModal("search")}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>` : nothing}
            <button class="icon-btn" title="Library" aria-label="Library" @click=${() => this._openModal("library")}>
              <ha-icon icon="mdi:bookshelf"></ha-icon>
            </button>
          </div>
        </div>
        ${sections.length > 1 ? html`
          <div class="section-bar">
            ${this._renderSegmented(sections.map(({ id, label, count }) => ({ id, label, count })), this._section, (id) => (this._section = id))}
          </div>` : nothing}

        ${active.length === 0
          ? this._renderEmpty()
          : this._section === "suggested"
            ? html`<div class="suggestion-list">${repeat(active, (i) => i.item_id, (item) => this._renderSuggestion(item))}</div>`
            : this._section === "new" || this._section === "soon"
              ? html`<div class="wide-row">${repeat(active, (i) => i.item_id, (item) => this._renderWideTile(item))}</div>`
              : html`<div class="poster-row">${repeat(active, (i) => i.item_id, (item) => this._renderPoster(item))}</div>`}

        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>

      ${this._modal === "search" ? this._renderSearchModal() : nothing}
      ${this._modal === "library" ? this._renderLibraryModal() : nothing}
      ${this._detail ? this._renderDetailDialog() : nothing}
    `;
  }

  // Segmented control in the style of HA's tile card features
  // (ha-control-select): one tinted track, the selected option filled.
  _renderSegmented(options, selected, onSelect) {
    return html`
      <div class="segmented" role="tablist">
        ${options.map((o) => html`
          <button class="segment ${o.id === selected ? "segment-selected" : ""}" role="tab"
            aria-selected=${o.id === selected ? "true" : "false"}
            style=${o.id === selected && o.color ? `--segment-color:${o.color}` : ""}
            @click=${() => onSelect(o.id)}>
            <span class="segment-label">${o.label}</span>
            ${o.count ? html`<span class="segment-count">${o.count}</span>` : nothing}
          </button>
        `)}
      </div>
    `;
  }

  _renderModal(title, body, toolbar = nothing) {
    return html`
      <div class="modal-overlay" @click=${(e) => e.target === e.currentTarget && this._closeModal()}>
        <div class="modal" role="dialog" aria-label="${title}">
          <div class="modal-header">
            <span class="modal-title">${title}</span>
            <button class="modal-close" title="Close" @click=${() => this._closeModal()}>✕</button>
          </div>
          ${toolbar}
          <div class="modal-body">${body}</div>
          ${this._toast && !this._detail ? html`<div class="toast">${this._toast}</div>` : nothing}
        </div>
      </div>
    `;
  }

  _renderSearchModal() {
    const types = [["", "All"], ["tv", "TV"], ["movie", "Movies"]];
    const results = this._searchResults;
    const toolbar = html`
      <div class="modal-toolbar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${(e) => this._onSearchInput(e.target.value)}
          @keydown=${(e) => e.key === "Enter" && this._runSearch()} />
        ${this._renderSegmented(types.map(([id, label]) => ({ id, label })), this._searchType, (id) => this._setSearchType(id))}
      </div>
    `;
    const body = this._searching && !results?.length
      ? html`<div class="modal-note">Searching…</div>`
      : results === null
        ? html`<div class="modal-note">Find a movie or show. Tap it for details, or + to add it to Up Next.</div>`
        : results.length === 0
          ? html`<div class="modal-note">No matches for “${this._searchQuery.trim()}”.</div>`
          : html`<div class="modal-grid">${repeat(results, (r) => `${r.media_type}:${r.tmdb_id}`, (r) => this._renderSearchTile(r))}</div>`;
    return this._renderModal("Search", body, toolbar);
  }

  _renderSearchTile(result) {
    const item = this._itemForResult(result);
    const adding = this._isAdding(result);
    const sub = [result.year, result.media_type === "tv" ? "TV" : "Movie"].filter(Boolean).join(" · ");
    return html`
      <div class="poster" @click=${() => this._openResult(result)}>
        ${result.poster_url
          ? html`<img class="poster-img" src="${result.poster_url}" alt="${result.title}" loading="lazy" />`
          : html`<div class="poster-fallback">${result.media_type === "tv" ? "📺" : "🎬"}</div>`}
        ${item
          ? html`<span class="status-badge" style="background:${STATUS_COLORS[item.status] || "#6d6d6d"}">${STATUS_LABELS[item.status] || item.status}</span>`
          : html`<button class="quick-add" title="Add to Up Next" ?disabled=${adding}
              @click=${(e) => { e.stopPropagation(); this._addTitle(result); }}>
              <ha-icon icon="${adding ? "mdi:loading" : "mdi:plus"}"></ha-icon>
            </button>`}
        <div class="poster-title">${result.title}</div>
        <div class="poster-sub">${sub}</div>
      </div>
    `;
  }

  _renderLibraryModal() {
    const filters = [
      ["all", "All"], ["watching", "Watching"], ["want_to_watch", "Want to Watch"], ["suggested", "Suggested"],
      ["paused", "Paused"], ["watched", "Watched"], ["dismissed", "Not for us"],
    ];
    const items = this._libraryItems(this._libraryFilter);
    const toolbar = html`
      <div class="modal-toolbar">
        <div class="chip-row">
          ${filters.map(([id, label]) => {
            const count = this._libraryItems(id).length;
            return html`
              <button class="chip ${this._libraryFilter === id ? "chip-selected" : ""}"
                @click=${() => (this._libraryFilter = id)}>
                ${this._libraryFilter === id ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}
                ${label}${count > 0 ? html`<span class="chip-count">${count}</span>` : nothing}
              </button>`;
          })}
        </div>
      </div>
    `;
    const body = items.length === 0
      ? html`<div class="modal-note">
          ${this._libraryFilter === "all" ? "Your list is empty." : "Nothing here."}
          ${this._config.search ? html`<button class="action" @click=${() => this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something</button>` : nothing}
        </div>`
      : html`<div class="modal-grid">${repeat(items, (i) => i.item_id, (item) => this._renderPoster(item, true))}</div>`;
    return this._renderModal("Library", body, toolbar);
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
        ${this._section === "upnext" && this._config.search ? html`
          <button class="action" @click=${() => this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something
          </button>` : nothing}
      </div>
    `;
  }

  // Title art: the transparent TMDB logo when there is one, else the name.
  _renderTitleArt(item, cls = "") {
    return item.logo_path
      ? html`<img class="title-logo ${cls}" src="${item.logo_path}" alt="${item.title}" loading="lazy" />`
      : html`<div class="title-text ${cls}">${item.title}</div>`;
  }

  _epLabel(ep) {
    return ep ? `S${ep.season_number} · E${ep.episode_number}${ep.name ? ` · ${ep.name}` : ""}` : "";
  }

  // Landscape tile for New / Coming Soon: the episode still when TMDB has
  // one, the show's backdrop otherwise, with the title logo on top.
  _renderWideTile(item) {
    const soon = this._isComingSoon(item);
    const ep = soon ? item.next_episode_to_air : item.last_episode_to_air;
    const days = soon && ep?.air_date ? this._daysUntil(ep.air_date) : null;
    const image = (!soon && ep?.still_path) || item.backdrop_path || item.poster_path;
    return html`
      <div class="wide-tile" @click=${() => (this._detail = item)}>
        ${image
          ? html`<img class="wide-img" src="${image}" alt="" loading="lazy" />`
          : html`<div class="wide-img wide-fallback">${item.media_type === "tv" ? "📺" : "🎬"}</div>`}
        <div class="wide-fade"></div>
        ${this._hasNewEpisode(item) ? html`<span class="new-badge">NEW</span>` : nothing}
        ${days !== null ? html`<span class="soon-badge">${days === 1 ? "Tomorrow" : `In ${days} days`}</span>` : nothing}
        <div class="wide-caption">
          ${this._renderTitleArt(item, "wide-logo")}
          ${ep ? html`<div class="wide-sub">${this._epLabel(ep)}</div>` : nothing}
        </div>
      </div>
    `;
  }

  _renderPoster(item, showStatus = false) {
    const next = item.next_episode_to_air;
    const days = this._isComingSoon(item) && next?.air_date ? this._daysUntil(next.air_date) : null;

    return html`
      <div class="poster" @click=${() => (this._detail = item)}>
        ${item.poster_path
          ? html`<img class="poster-img" src="${item.poster_path}" alt="${item.title}" loading="lazy" />`
          : html`<div class="poster-fallback">${item.media_type === "tv" ? "📺" : "🎬"}</div>`}

        ${this._hasNewEpisode(item) ? html`<span class="new-badge">NEW</span>` : nothing}
        ${showStatus && this._libraryFilter === "all" ? html`
          <span class="status-badge" style="background:${STATUS_COLORS[item.status] || "#6d6d6d"}">${STATUS_LABELS[item.status] || item.status}</span>
        ` : nothing}

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
        <div class="suggestion-banner" @click=${() => (this._detail = item)}>
          ${item.backdrop_path || item.poster_path
            ? html`<img class="wide-img ${item.backdrop_path ? "" : "img-blur"}" src="${item.backdrop_path || item.poster_path}" alt="" loading="lazy" />`
            : html`<div class="wide-img wide-fallback">${item.media_type === "tv" ? "📺" : "🎬"}</div>`}
          <div class="wide-fade"></div>
          <div class="wide-caption">
            ${this._renderTitleArt(item, "wide-logo")}
            <div class="wide-sub">${meta}</div>
          </div>
        </div>
        <div class="suggestion-body">
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
          <button class="action action-tint" @click=${() => this._openOnTv(item, tv)}>
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
          ${DISMISS_REASONS.map((r) => html`<button class="chip" @click=${() => this._dismiss(item, r)}>${r}</button>`)}
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

  // Status, progress, rating and notes: only for titles on the list.
  _renderItemControls(item) {
    return html`
      ${this._renderTvButtons(item)}

      <div class="section-label">Status</div>
      ${this._renderSegmented(
        ["want_to_watch", "watching", "watched", "paused"].map((s) => ({ id: s, label: STATUS_LABELS[s], color: STATUS_COLORS[s] })),
        item.status,
        async (s) => { await this._updateItem(item.item_id, { status: s }); this._detail = { ...item, status: s }; },
      )}

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
    `;
  }

  _renderPreviewActions(item) {
    const adding = this._isAdding(item);
    return html`
      <div class="preview-actions">
        <button class="action action-primary" ?disabled=${adding} @click=${() => this._addTitle(item, "want_to_watch")}>
          <ha-icon icon="${adding ? "mdi:loading" : "mdi:playlist-plus"}"></ha-icon> Add to Up Next
        </button>
        <button class="action" ?disabled=${adding} @click=${() => this._addTitle(item, "watching")}>
          <ha-icon icon="mdi:play-circle-outline"></ha-icon> Watching now
        </button>
      </div>
      ${this._previewLoading ? html`<div class="preview-loading">Loading details…</div>` : nothing}
    `;
  }

  _metaLine(item) {
    const hours = Math.floor((item.runtime || 0) / 60), mins = (item.runtime || 0) % 60;
    const length = item.media_type === "tv"
      ? (item.seasons ? `${item.seasons} season${item.seasons === 1 ? "" : "s"}` : null)
      : (item.runtime ? (hours ? `${hours}h ${mins}m` : `${mins}m`) : null);
    return [
      item.release_date?.slice(0, 4),
      length,
      item.genres?.slice(0, 2).join(", "),
      item.vote_average ? `★ ${Number(item.vote_average).toFixed(1)}` : null,
      item.networks?.[0],
    ].filter(Boolean).join(" · ");
  }

  _renderEpisodeCards(item) {
    const cards = [
      ["Next episode", item.next_episode_to_air],
      ["Latest episode", item.last_episode_to_air],
    ].filter(([, ep]) => ep?.episode_number);
    if (!cards.length) return nothing;
    return html`
      <div class="episode-cards">
        ${cards.map(([label, ep]) => html`
          <div class="episode-card">
            ${ep.still_path
              ? html`<img class="episode-still" src="${ep.still_path}" alt="" loading="lazy" />`
              : html`<div class="episode-still episode-still-empty"><ha-icon icon="mdi:television-classic"></ha-icon></div>`}
            <div class="episode-info">
              <div class="episode-label">${label}${ep.air_date ? html` · ${fmtDate(ep.air_date)}` : nothing}</div>
              <div class="episode-name">${this._epLabel(ep)}</div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _renderCast(item) {
    return html`
      <div class="section-label">Cast</div>
      <div class="cast-row">
        ${item.cast.map((c) => html`
          <div class="cast-member">
            ${c.profile_path
              ? html`<img class="cast-photo" src="${c.profile_path}" alt="${c.name}" loading="lazy" />`
              : html`<div class="cast-photo cast-photo-empty"><ha-icon icon="mdi:account"></ha-icon></div>`}
            <div class="cast-name">${c.name}</div>
            ${c.character ? html`<div class="cast-character">${c.character}</div>` : nothing}
          </div>
        `)}
      </div>
    `;
  }

  _renderDetailDialog() {
    const item = this._detail;
    return html`
      <div class="dialog-overlay" @click=${(e) => e.target === e.currentTarget && this._closeDetail()}>
        <div class="dialog">
          <div class="dialog-topbar">
            ${item.item_id ? html`
              <button class="dialog-btn" title="Remove from watchlist" @click=${() => this._removeItem(item.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            ` : nothing}
            <button class="dialog-btn" title="Close" @click=${() => this._closeDetail()}>✕</button>
          </div>

          <div class="hero">
            ${item.backdrop_path || item.poster_path
              ? html`<img class="hero-img ${item.backdrop_path ? "" : "img-blur"}" src="${item.backdrop_path || item.poster_path}" alt="" />`
              : nothing}
            <div class="hero-fade"></div>
            <div class="hero-caption">
              ${this._renderTitleArt(item, "hero-logo")}
              <div class="hero-meta">${this._metaLine(item)}</div>
              ${item.trailer_url ? html`
                <a class="action action-light" href="${item.trailer_url}" target="_blank" rel="noopener">
                  <ha-icon icon="mdi:play"></ha-icon> Trailer
                </a>` : nothing}
            </div>
          </div>

          <div class="dialog-content">
            ${item.poster_path && item.backdrop_path ? html`
              <div class="dialog-left"><img class="dialog-poster" src="${item.poster_path}" alt="${item.title}" /></div>
            ` : nothing}
            <div class="dialog-right">
              ${item.tagline ? html`<p class="tagline">${item.tagline}</p>` : nothing}
              <p class="dialog-overview">${item.overview}</p>
              ${item.media_type === "tv" ? this._renderEpisodeCards(item) : nothing}

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

              ${item.item_id ? this._renderItemControls(item) : this._renderPreviewActions(item)}

              ${item.cast?.length ? this._renderCast(item) : nothing}

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
    /* Controls follow HA's tile card features: borderless, tinted,
       42px tall with 12px corners (themes can override both). */
    :host {
      --polr-control-height: var(--feature-height, 42px);
      --polr-radius: var(--feature-border-radius, 12px);
      --polr-control-bg: color-mix(in srgb, var(--disabled-color, #bdbdbd) 20%, transparent);
      --polr-control-bg-hover: color-mix(in srgb, var(--disabled-color, #bdbdbd) 32%, transparent);
      --polr-font-size: var(--ha-font-size-m, 14px);
      --polr-font-weight: var(--ha-font-weight-medium, 500);
    }
    ha-card { display: flex; flex-direction: column; overflow: hidden; container-type: inline-size; }
    button, a.action { font-family: inherit; -webkit-tap-highlight-color: transparent; }

    .card-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 8px 4px 16px; min-height: 40px; }
    .card-title { font-size: var(--ha-card-header-font-size, 1.2rem); font-weight: 500; color: var(--ha-card-header-color, var(--primary-text-color)); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .header-actions { display: flex; align-items: center; gap: 0; flex-shrink: 0; }
    /* Same shape as ha-icon-button */
    .icon-btn {
      width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent; cursor: pointer;
      color: var(--secondary-text-color); display: flex; align-items: center; justify-content: center; --mdc-icon-size: 24px;
      transition: background-color 0.15s, color 0.15s;
    }
    .icon-btn:hover { background: var(--polr-control-bg); color: var(--primary-text-color); }
    .section-bar { padding: 8px 16px 12px; }

    /* Segmented control (ha-control-select) */
    .segmented {
      display: flex; height: var(--polr-control-height); border-radius: var(--polr-radius);
      background: var(--polr-control-bg); overflow: hidden;
    }
    .segment {
      flex: 1 1 auto; min-width: 0; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 0 8px; border: none; border-radius: var(--polr-radius); background: transparent; cursor: pointer;
      color: var(--primary-text-color); font-size: var(--polr-font-size); font-weight: var(--polr-font-weight);
      transition: background-color 0.18s, color 0.18s;
    }
    .segment:hover:not(.segment-selected) { background: var(--polr-control-bg); }
    .segment-selected { background: var(--segment-color, var(--primary-color)); color: var(--text-primary-color, #fff); }
    .segment-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .segment-count {
      flex-shrink: 0; min-width: 18px; height: 18px; padding: 0 5px; box-sizing: border-box; border-radius: 9px;
      font-size: 11px; font-weight: 700; line-height: 18px; text-align: center;
      background: var(--polr-control-bg-hover); color: inherit;
    }
    .segment-selected .segment-count { background: rgba(255,255,255,0.28); }
    /* Narrow cards (phones, sidebar columns): full labels beat counts */
    @container (max-width: 440px) {
      .section-bar .segment-count { display: none; }
      .section-bar .segment { padding: 0 4px; }
    }

    /* Buttons (ha-control-button) */
    .action {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      height: var(--polr-control-height); padding: 0 16px; box-sizing: border-box;
      border: none; border-radius: var(--polr-radius); background: var(--polr-control-bg);
      color: var(--primary-text-color); cursor: pointer; text-decoration: none; white-space: nowrap;
      font-size: var(--polr-font-size); font-weight: var(--polr-font-weight); --mdc-icon-size: 20px;
      transition: background-color 0.15s, filter 0.15s;
    }
    .action:hover { background: var(--polr-control-bg-hover); }
    .action[disabled] { opacity: 0.6; cursor: default; }
    .action-primary { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    .action-primary:hover { background: var(--primary-color); filter: brightness(1.08); }
    .action-tint { background: color-mix(in srgb, var(--primary-color) 20%, transparent); color: var(--primary-color); }
    .action-tint:hover { background: color-mix(in srgb, var(--primary-color) 30%, transparent); }
    .action-light { background: rgba(255,255,255,0.92); color: #111; }
    .action-light:hover { background: #fff; }

    /* Filter chips (ha-filter-chip) */
    .chip-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
    .chip-row::-webkit-scrollbar { display: none; }
    .chip {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; box-sizing: border-box;
      border-radius: 8px; border: 1px solid var(--outline-color, var(--divider-color, #555)); background: transparent;
      color: var(--primary-text-color); cursor: pointer; font-size: 13px; font-weight: 500; white-space: nowrap; --mdc-icon-size: 16px;
    }
    .chip:hover { background: var(--polr-control-bg); }
    .chip-selected { border-color: transparent; background: color-mix(in srgb, var(--primary-color) 20%, transparent); color: var(--primary-text-color); }
    .chip-selected:hover { background: color-mix(in srgb, var(--primary-color) 28%, transparent); }
    .chip-count { font-size: 11px; font-weight: 700; color: var(--secondary-text-color); }

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


    /* Wide art tiles (New, Coming Soon) and suggestion banners */
    .wide-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; padding: 0 16px 16px; }
    .wide-tile { position: relative; aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; cursor: pointer; background: var(--secondary-background-color, #222); }
    .wide-tile:hover .wide-img { transform: scale(1.04); }
    .wide-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease; }
    .wide-fallback { display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
    .img-blur { filter: blur(18px) brightness(0.7); transform: scale(1.2); }
    .wide-fade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 70%); }
    .wide-caption { position: absolute; left: 12px; right: 12px; bottom: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; color: #fff; }
    .title-logo { display: block; object-fit: contain; object-position: left bottom; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }
    .title-text { font-weight: 700; line-height: 1.15; text-shadow: 0 2px 8px rgba(0,0,0,0.7); }
    .wide-logo.title-logo { max-width: 65%; max-height: 52px; }
    .wide-logo.title-text { font-size: 1.1rem; }
    .wide-sub { font-size: 0.75rem; opacity: 0.9; text-shadow: 0 1px 4px rgba(0,0,0,0.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
    .wide-tile .new-badge, .wide-tile .soon-badge { top: 8px; right: 8px; font-size: 0.66rem; padding: 2px 7px; }

    /* Suggestions */
    .suggestion-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; padding: 4px 16px 16px; }
    .suggestion { display: flex; flex-direction: column; border-radius: 10px; overflow: hidden; background: var(--secondary-background-color, #222); }
    .suggestion-banner { position: relative; aspect-ratio: 16/9; cursor: pointer; overflow: hidden; }
    .suggestion-banner:hover .wide-img { transform: scale(1.03); }
    .suggestion .suggestion-body { padding: 10px 12px 12px; }
    .suggestion-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .suggestion-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .suggestion-reason { font-size: 0.84rem; line-height: 1.45; color: var(--primary-text-color); }
    .suggestion-actions { display: flex; gap: 8px; margin-top: 6px; }
    .suggestion-actions .action { flex: 1 1 0; min-width: 0; padding: 0 10px; }
    .suggestion-box { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; line-height: 1.45; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: rgba(123,31,162,0.12); border: 1px solid rgba(123,31,162,0.45); }
    .tv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
    .tv-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .dismiss-chooser { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .dismiss-prompt { font-size: 0.75rem; color: var(--secondary-text-color); }
    .dismiss-reasons { display: flex; flex-wrap: wrap; gap: 8px; }
    .dismiss-custom { display: flex; gap: 8px; }
    /* Text fields */
    .search-input, .dismiss-input, .notes, .ep-select {
      box-sizing: border-box; border-radius: var(--polr-radius); border: 1px solid transparent;
      background: var(--polr-control-bg); color: var(--primary-text-color); font-family: inherit;
      font-size: var(--polr-font-size);
    }
    .search-input:focus, .dismiss-input:focus, .notes:focus, .ep-select:focus { outline: none; border-color: var(--primary-color); }
    .search-input { width: 100%; height: var(--polr-control-height); padding: 0 14px; font-size: 16px; }
    .dismiss-input { flex: 1; min-width: 0; height: var(--polr-control-height); padding: 0 12px; }

    /* Modals (search, library) */
    .modal-overlay { position: fixed; inset: 0; z-index: 9998; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .modal {
      background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color);
      border-radius: 12px; width: 100%; max-width: 760px; height: min(760px, 90vh);
      display: flex; flex-direction: column; overflow: hidden;
    }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px; }
    .modal-title { font-size: 1.1rem; font-weight: 600; }
    .modal-close { background: none; border: none; color: var(--secondary-text-color); font-size: 1rem; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; }
    .modal-close:hover { color: var(--primary-text-color); background: var(--secondary-background-color, #333); }
    .modal-toolbar { display: flex; flex-direction: column; gap: 8px; padding: 0 16px 10px; }
    .modal-body { flex: 1; overflow-y: auto; padding: 0 16px 16px; }
    .modal-note { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 40px 16px; text-align: center; font-size: 0.88rem; color: var(--secondary-text-color); }
    .modal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
    .modal .toast { margin: 0 16px 12px; }
    .poster-sub { padding: 0 6px 6px; margin-top: -3px; font-size: 0.68rem; color: var(--secondary-text-color); }
    .status-badge {
      position: absolute; top: 5px; left: 5px; max-width: calc(100% - 44px);
      border-radius: 3px; padding: 1px 5px; font-size: 0.6rem; font-weight: 600; color: #fff;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .quick-add {
      position: absolute; top: 5px; right: 5px; width: 32px; height: 32px; border-radius: 50%;
      border: none; background: var(--primary-color); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center; --mdc-icon-size: 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    }
    .quick-add[disabled] { opacity: 0.7; cursor: default; }
    .preview-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 8px; }
    .preview-loading { font-size: 0.75rem; color: var(--secondary-text-color); }
    .empty-state .action { margin-top: 8px; }
    @media (max-width: 600px) {
      .modal-overlay { padding: 0; }
      .modal { max-width: none; height: 100%; border-radius: 0; }
      .modal-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
    }
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
    .dialog { background: var(--card-background-color, #1e1e1e); border-radius: 14px; width: 100%; max-width: 720px; max-height: 92vh; overflow-y: auto; position: relative; }
    .dialog-topbar { position: sticky; top: 0; height: 0; z-index: 3; display: flex; justify-content: flex-end; gap: 6px; padding-right: 10px; }
    .dialog-btn { margin-top: 10px; width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer; background: rgba(0,0,0,0.55); color: #fff; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; backdrop-filter: blur(6px); }
    .dialog-btn:hover { background: rgba(0,0,0,0.8); }
    .hero { position: relative; aspect-ratio: 16/9; max-height: 400px; width: 100%; overflow: hidden; background: #000; }
    .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
    /* Always darkens (never fades to the card colour): the caption is white
       in light themes too. */
    .hero-fade { position: absolute; inset: 0; background:
      linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 75%),
      linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%); }
    .hero-caption { position: absolute; left: 20px; right: 20px; bottom: 14px; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; color: #fff; }
    .hero-logo.title-logo { max-width: min(60%, 360px); max-height: 110px; }
    .hero-logo.title-text { font-size: 1.7rem; }
    .hero-meta { font-size: 0.82rem; opacity: 0.92; text-shadow: 0 1px 4px rgba(0,0,0,0.8); }
    .tagline { margin: 0 0 6px; font-style: italic; font-size: 0.88rem; color: var(--secondary-text-color); }
    .episode-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; margin: 4px 0 8px; }
    .episode-card { display: flex; gap: 10px; align-items: center; padding: 6px; border-radius: 8px; background: var(--secondary-background-color, #2a2a2a); }
    .episode-still { width: 96px; aspect-ratio: 16/9; border-radius: 5px; object-fit: cover; flex-shrink: 0; }
    .episode-still-empty { display: flex; align-items: center; justify-content: center; background: rgba(127,127,127,0.2); color: var(--secondary-text-color); --mdc-icon-size: 22px; }
    .episode-info { min-width: 0; }
    .episode-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .episode-name { font-size: 0.8rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .cast-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: thin; }
    .cast-member { flex: 0 0 76px; text-align: center; }
    .cast-photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; object-position: center 20%; display: block; margin: 0 auto 4px; background: var(--secondary-background-color, #2a2a2a); }
    .cast-photo-empty { display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); --mdc-icon-size: 30px; }
    .cast-name { font-size: 0.72rem; font-weight: 600; line-height: 1.2; }
    .cast-character { font-size: 0.66rem; color: var(--secondary-text-color); line-height: 1.2; margin-top: 1px; }
    .dialog-content { display: flex; gap: 16px; padding: 16px 20px 20px; }
    .dialog-left { flex-shrink: 0; }
    .dialog-poster { width: 110px; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.45); }
    .dialog-right { flex: 1; min-width: 0; }
    .dialog-overview { font-size: 0.86rem; line-height: 1.55; margin: 0 0 10px; }
    .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); margin: 10px 0 5px; }
    .progress-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; font-size: 0.78rem; }
    .select-label span { font-size: 0.7rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select { width: 100%; height: var(--polr-control-height); padding: 0 10px; cursor: pointer; }
    .ep-select option { background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color); }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .new-ep-alert { font-size: 0.85rem; padding: 10px 12px; border-radius: var(--polr-radius); margin-bottom: 6px; background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent); color: var(--warning-color, #ff9800); }
    .new-ep-alert strong { color: var(--primary-text-color); }
    .upcoming-ep { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 5px; }
    .ep-latest-hint { font-size: 0.72rem; color: var(--secondary-text-color); margin-top: 3px; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 1.3rem; cursor: pointer; color: var(--secondary-text-color, #555); user-select: none; }
    .star-on { color: #ffd600; }
    .rating-num { margin-left: 8px; font-size: 0.8rem; color: var(--secondary-text-color); }
    .notes { width: 100%; padding: 10px 12px; resize: vertical; min-height: 64px; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    @media (max-width: 600px) {
      .dialog-overlay { padding: 0; }
      .dialog { max-width: none; height: 100%; max-height: none; border-radius: 0; }
      .dialog-left { display: none; }
      .dialog-content { padding: 4px 16px 24px; }
      .hero-caption { left: 16px; right: 16px; }
      .hero-logo.title-logo { max-height: 80px; max-width: 70%; }
      .wide-row { grid-template-columns: 1fr; }
    }
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

// The integration loads this file on every page. An older copy may also be
// registered as a dashboard resource; whichever loads first wins, and the
// other must not throw on a duplicate define.
if (!customElements.get("polr-tmdb-card")) {
  customElements.define("polr-tmdb-card", TmdbShowsCard);
  customElements.define("polr-tmdb-card-editor", TmdbShowsCardEditor);
  window.customCards = window.customCards || [];
  window.customCards.push({ type: "polr-tmdb-card", name: "TMDB Shows & Movies", description: "What to watch tonight, and what to try next.", preview: false });
}
