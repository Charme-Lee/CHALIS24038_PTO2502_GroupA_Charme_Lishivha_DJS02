import { podcasts, genres } from "./data.js";
import { createGrid } from "./createGrid.js";
import "./PodcastPreview.js";

// --- DOM Element Caching ---
const genresDropdown = document.getElementById("genres-dropdown");
const sortDropdown = document.getElementById("sort-dropdown");

// Instantiate the podcast grid
const podcastGrid = createGrid();

/**
 * Populates the genres dropdown.
 */
const populateGenresDropdown = () => {
  if (!genresDropdown) return;

  // Add default "All Genres" option
  genresDropdown.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.title;
    genresDropdown.appendChild(option);
  });
};

/**
 * Sort podcasts by the selected criteria.
 * @param {Array} list - Podcasts to sort.
 * @param {string} sortBy - Sorting criteria.
 * @returns {Array} Sorted podcasts.
 */
const sortPodcasts = (list, sortBy) => {
  const sortedList = [...list];

  const sortMethods = {
    "updated-filter": (a, b) => new Date(b.updated) - new Date(a.updated),
    "newest-filter": (a, b) =>
      new Date(b.releaseDate || b.updated) -
      new Date(a.releaseDate || a.updated),
    "popular-filter": (a, b) =>
      (b.seasons?.length || 0) - (a.seasons?.length || 0) ||
      a.title.localeCompare(b.title),
  };

  return sortedList.sort(sortMethods[sortBy] || sortMethods["updated-filter"]);
};

/**
 * Filters and sorts podcasts based on dropdown selections.
 */
const filterAndSortPodcasts = () => {
  const selectedGenreId = genresDropdown?.value || "all";
  const sortBy = sortDropdown?.value || "updated-filter";

  let filteredPodcasts = [...podcasts];

  // Filter by genre
  if (selectedGenreId !== "all") {
    filteredPodcasts = filteredPodcasts.filter((podcast) =>
      podcast.genres.includes(Number(selectedGenreId))
    );
  }

  // Sort and render podcasts
  podcastGrid.render(sortPodcasts(filteredPodcasts, sortBy));
};

// --- Event Listeners & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  if (genresDropdown)
    genresDropdown.addEventListener("change", filterAndSortPodcasts);
  if (sortDropdown)
    sortDropdown.addEventListener("change", filterAndSortPodcasts);

  populateGenresDropdown();
  filterAndSortPodcasts();
});
