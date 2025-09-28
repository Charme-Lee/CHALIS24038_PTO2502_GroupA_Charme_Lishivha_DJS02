// createModal.js

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

  /** Close modal. */
  const close = () => modal.classList.add("hidden");

  // --- Event listeners ---
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => e.target === modal && close());

  return { open, close };
};
