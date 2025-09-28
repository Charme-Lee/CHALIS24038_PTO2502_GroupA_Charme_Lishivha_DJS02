// createModal.js
import { DateUtils } from "./DateUtils.js";
import { GenreService } from "./GenreService.js";
import { seasons } from "./data.js";

/**
 * Factory for managing the podcast detail modal.
 * @returns {{ open(podcast: object): void, close(): void }} Modal API.
 */
export const createModal = () => {
  // --- Cached DOM elements ---
  const modal = document.getElementById("podcast-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalGenres = document.getElementById("modal-genres");
  const modalUpdated = document.getElementById("modal-updated");
  const modalSeasonsList = document.getElementById("modal-seasons-list");

  /**
   * Open modal and populate with podcast details.
   * @param {object} podcast Podcast data object.
   */
  const open = (podcast) => {
    const podcastSeasons = seasons.find((s) => s.id === podcast.id);

    // Main details
    modalTitle.textContent = podcast.title;
    modalImage.src = podcast.image;
    modalImage.alt = `Cover art for ${podcast.title}`;
    modalDescription.textContent = podcast.description;
    modalUpdated.textContent = `Last updated: ${DateUtils.longFormat(
      podcast.updated
    )}`;

    // Genres
    modalGenres.innerHTML = "";
    GenreService.getNames(podcast.genres).forEach((name) => {
      const tag = document.createElement("span");
      tag.className = "modal-genre-tag";
      tag.textContent = name;
      modalGenres.appendChild(tag);
    });

    // Seasons
    modalSeasonsList.innerHTML = "";
    podcastSeasons?.seasonDetails?.forEach((season) => {
      const li = document.createElement("li");
      li.className = "season-item";
      li.innerHTML = `
        <h4>Season ${season.season}: ${season.title}</h4>
        <p class="episode-count">${season.episodes} episodes</p>
      `;
      modalSeasonsList.appendChild(li);
    });

    modal.classList.remove("hidden");
  };

  /** Close modal. */
  const close = () => modal.classList.add("hidden");

  // --- Event listeners ---
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => e.target === modal && close());

  return { open, close };
};
