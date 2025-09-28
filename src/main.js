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
