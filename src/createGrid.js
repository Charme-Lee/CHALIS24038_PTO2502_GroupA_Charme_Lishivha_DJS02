// createGrid.js
import { createModal } from "./CreateModal.js";
import { podcasts } from "./data.js";

/**
 * Factory for managing the podcast grid view.
 * Sets up rendering and modal handling for podcast cards.
 * @returns {{ render(podcasts: object[]): void }} Public API with render method.
 */
export const createGrid = () => {
  const container = document.getElementById("podcast-grid");
  const modal = createModal();

  /**
   * Handles the custom 'podcast-selected' event dispatched by a podcast card.
   * Opens the modal with matching podcast details if found.
   */
  container.addEventListener(
    "podcast-selected",
    ({ detail: { podcastId } }) => {
      const podcast = podcasts.find((p) => p.id === podcastId);
      podcast
        ? modal.open(podcast)
        : console.error("Podcast not found:", podcastId);
    }
  );

  /**
   * Renders podcast cards into the grid.
   * @param {object[]} list Array of podcast objects to display.
   */
  const render = (list) => {
    container.innerHTML = "";
    list.forEach((podcast) => {
      const card = document.createElement("podcast-preview");
      card.data = podcast;
      container.appendChild(card);
    });
  };

  return { render };
};
