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
};

const STATUS_COLORS = {
  want_to_watch: "#6d6d6d",
  watching: "#1976d2",
  watched: "#2e7d32",
  paused: "#e65100",
};

class TmdbShowsCard extends LitElement {
  static properties = {
    _hass: { state: true },
    _config: { state: true },
    _items: { state: true },
    _section: { state: true }, // "new" | "soon" | "upnext"
    _detail: { state: true },
  };

  constructor() {
    super();
    this._items = [];
    this._section = "new";
    this._detail = null;
    this._loaded = false;
    this._unsubEvents = null;
    this._seasonCache = {};
  }

  static getConfigElement() {
    return document.createElement("polr-tmdb-card-editor");
  }

  static getStubConfig() {
    return { title: "Watch Tonight" };
  }

  setConfig(config) {
    this._config = { title: "Watch Tonight", ...config };
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
      .filter((i) => i.status !== "watched" && this._hasNewEpisode(i))
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

  get _activeItems() {
    if (this._section === "new") return this._newItems;
    if (this._section === "soon") return this._soonItems;
    return this._upNextItems;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  render() {
    if (!this._config) return nothing;
    const newItems = this._newItems;
    const soonItems = this._soonItems;
    const upNextItems = this._upNextItems;
    const active = this._activeItems;

    // Auto-select first non-empty section
    const sections = [
      { id: "new", label: "New", count: newItems.length },
      { id: "soon", label: "Coming Soon", count: soonItems.length },
      { id: "upnext", label: "Up Next", count: upNextItems.length },
    ];

    return html`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${sections.map(({ id, label, count }) => html`
              <button
                class="pill ${this._section === id ? "pill-active" : ""} ${count === 0 ? "pill-empty" : ""}"
                @click=${() => (this._section = id)}
              >
                ${label}${count > 0 ? html`<span class="pill-count">${count}</span>` : nothing}
              </button>
            `)}
          </div>
          <button class="manage-btn" title="Manage watchlist" @click=${this._goToPanel}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
          </button>
        </div>

        ${active.length === 0
          ? this._renderEmpty()
          : html`<div class="poster-row">${repeat(active, (i) => i.item_id, (item) => this._renderPoster(item))}</div>`}
      </ha-card>

      ${this._detail ? this._renderDetailDialog() : nothing}
    `;
  }

  _goToPanel() {
    history.pushState(null, "", "/polr-tmdb");
    window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
  }

  _renderEmpty() {
    const configs = {
      new:    { icon: "mdi:check-circle-outline", heading: "All caught up!",        sub: "No new episodes to watch right now." },
      soon:   { icon: "mdi:calendar-blank-outline", heading: "Nothing coming soon", sub: "No new episodes airing in the next 2 weeks." },
      upnext: { icon: "mdi:playlist-play",         heading: "Queue is empty",       sub: "Add something to your watchlist to get started." },
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
  // Detail dialog (unchanged from before)
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
    .manage-btn:hover { color: var(--primary-color); }
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
window.customCards.push({ type: "polr-tmdb-card", name: "TMDB Shows & Movies", description: "What to watch tonight.", preview: false });
