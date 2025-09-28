// GenreService.js
import { genres } from "./data.js";

/**
 * Utility for genre lookups.
 */
export const GenreService = {
  /**
   * Returns genre titles matching given IDs.
   * @param {number[]} ids Array of genre IDs.
   * @returns {string[]} Genre titles.
   */
  getNames: (ids) =>
    Array.isArray(ids)
      ? genres.filter((g) => ids.includes(g.id)).map((g) => g.title)
      : [],
};
