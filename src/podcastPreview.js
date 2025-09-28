import { DateUtils } from "./DateUtils.js";
import { GenreService } from "./GenreService.js";

/**
 * @class PodcastPreview
 * @extends HTMLElement
 * @description Custom element that displays a podcast card using Shadow DOM. Fires a 'podcast-selected' event when clicked.
 */
class PodcastPreview extends HTMLElement {
  /** @private {Object} Internal podcast data */
  _podcastData = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._getTemplate();
    this.shadowRoot.addEventListener("click", this._handleClick.bind(this));
  }

  /**
   * Sets the podcast data and triggers a re-render.
   * @param {Object} podcast - Podcast object containing id, title, image, seasons, genres, and updated.
   */
  set data(podcast) {
    this._podcastData = podcast;
    this._render();
  }

  /**
   * Dispatches a custom 'podcast-selected' event.
   * @private
   */
  _handleClick() {
    const { id } = this._podcastData;
    if (!id) return;

    this.dispatchEvent(
      new CustomEvent("podcast-selected", {
        bubbles: true,
        composed: true,
        detail: { podcastId: id },
      })
    );
  }

  /**
   * Updates the component's UI with the current podcast data.
   * @private
   */
  _render() {
    const { title, image, seasons, genres, updated, id } = this._podcastData;
    if (!id) return;

    this._setCoverImage(image, title);
    this._setTitle(title);
    this._setSeasons(seasons);
    this._setGenres(genres);
    this._setUpdatedDate(updated);
  }

  /**
   * Sets the cover image.
   * @param {string} src
   * @param {string} title
   */
  _setCoverImage(src, title) {
    const img = this.shadowRoot.querySelector(".podcast-cover");
    if (img) {
      img.src = src;
      img.alt = `${title} cover`;
    }
  }

  /**
   * Sets the podcast title.
   * @param {string} title
   */
  _setTitle(title) {
    const el = this.shadowRoot.querySelector(".podcast-title");
    if (el) el.textContent = title || "Untitled Podcast";
  }

  /**
   * Sets the season count text.
   * @param {number|string} seasons
   */
  _setSeasons(seasons) {
    const count = Number(seasons) || 0;
    const text = `${count} season${count !== 1 ? "s" : ""}`;
    const el = this.shadowRoot.querySelector(".seasons-count p");
    if (el) el.textContent = text;
  }

  /**
   * Renders genre tags.
   * @param {Array<number>} genreIds
   */
  _setGenres(genreIds) {
    const container = this.shadowRoot.querySelector(".genre-tags");
    if (!container) return;

    container.innerHTML = "";
    const names = GenreService.getNames?.(genreIds) || [];

    names.forEach((name) => {
      const span = document.createElement("span");
      span.className = "genre-tag";
      span.textContent = name;
      container.appendChild(span);
    });
  }

  /**
   * Sets the last updated text.
   * @param {string} dateStr
   */
  _setUpdatedDate(dateStr) {
    const el = this.shadowRoot.querySelector(".last-updated");
    if (el) el.textContent = `Updated: ${DateUtils.relativeFormat(dateStr)}`;
  }
  /**
   * Returns the HTML and CSS template.
   * @private
   * @returns {string}
   */
  _getTemplate() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

        :host {
          display: block;
          cursor: pointer;
        }

        .podcast-card {
          background: var(--card-bg-color, #fff);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .podcast-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .podcast-cover {
          width: 100%;
          height: 240px;
          object-fit: contain;
          background: #f4f4f4;
        }

        .podcast-info {
          padding: 10px;
        }

        .podcast-title {
          font-size: 1.1rem;
          margin: 0 0 6px 0;
          color: var(--primary-color, #0077cc);
        }

        .podcast-details-top {
          display: flex;
          flex-direction: column;
        }

        .seasons-count {
          font-size: 0.85rem;
          color: var(--light-text-color, #666);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }

        .seasons-icon {
          font-size: 16px;
          margin-right: 4px;
        }

        .genre-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 4px;
        }

        .genre-tag {
          font-size: 0.75rem;
          background-color: var(--accent-color, var(--primary-color, #0077cc));
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          white-space: nowrap;
        }

        .last-updated {
          font-size: 0.75rem;
          color: var(--light-text-color, #666);
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .podcast-card {
            width: 100%;
            max-width: none;
          }

          .podcast-cover {
            height: auto;
            max-height: 300px;
          }
        }
      </style>

      <div class="podcast-card">
        <img class="podcast-cover" src="" alt="">
        <div class="podcast-info">
          <h3 class="podcast-title"></h3>
          <div class="podcast-details-top">
            <div class="seasons-count">
              <span class="material-symbols-outlined seasons-icon">calendar_month</span>
              <p></p>
            </div>
            <div class="genre-tags"></div>
          </div>
          <p class="last-updated"></p>
        </div>
      </div>
    `;
  }
}

// Register custom element
window.customElements.define("podcast-preview", PodcastPreview);
