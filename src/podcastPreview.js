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
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this._getTemplate();
    this.shadowRoot.addEventListener('click', this._handleClick.bind(this));
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

    this.dispatchEvent(new CustomEvent('podcast-selected', {
      bubbles: true,
      composed: true,
      detail: { podcastId: id }
    }));
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
    const img = this.shadowRoot.querySelector('.podcast-cover');
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
    const el = this.shadowRoot.querySelector('.podcast-title');
    if (el) el.textContent = title || 'Untitled Podcast';
  }

  /**
   * Sets the season count text.
   * @param {number|string} seasons 
   */
  _setSeasons(seasons) {
    const count = Number(seasons) || 0;
    const text = `${count} season${count !== 1 ? 's' : ''}`;
    const el = this.shadowRoot.querySelector('.seasons-count p');
    if (el) el.textContent = text;
  }

  /**
   * Renders genre tags.
   * @param {Array<number>} genreIds 
   */
  _setGenres(genreIds) {
    const container = this.shadowRoot.querySelector('.genre-tags');
    if (!container) return;

    container.innerHTML = '';
    const names = GenreService.getNames?.(genreIds) || [];

    names.forEach(name => {
      const span = document.createElement('span');
      span.className = 'genre-tag';
      span.textContent = name;
      container.appendChild(span);
    });
  }

  /**
   * Sets the last updated text.
   * @param {string} dateStr 
   */
  _setUpdatedDate(dateStr) {
    const el = this.shadowRoot.querySelector('.last-updated');
    if (el) el.textContent = `Updated: ${DateUtils.relativeFormat(dateStr)}`;
  }