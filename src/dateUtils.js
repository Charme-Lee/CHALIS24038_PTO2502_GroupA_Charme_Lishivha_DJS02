/**
 * @file DateUtils.js
 * @module DateUtils
 * @description Utility functions for formatting dates into long and relative formats.
 */

/**
 * An object containing date-related utility methods.
 * @type {object}
 * @exports DateUtils
 */
export const DateUtils = {
  /**
   * Converts an ISO date string into a long, human-readable format.
   * Example: "2025-09-27" → "September 27, 2025"
   *
   * @param {string} dateString - An ISO 8601 date string.
   * @returns {string} A formatted date string or "Invalid Date" if parsing fails.
   */
  longFormat(dateString) {
    const d = new Date(dateString);
    return isNaN(d)
      ? "Invalid Date"
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  },

  /**
   * Formats an ISO date string into a relative "time ago" string.
   * Examples:
   *  - "just now"
   *  - "5 minutes ago"
   *  - "3 days ago"
   *  - "2 months ago"
   *  - "1 year ago"
   *
   * @param {string} dateString - An ISO 8601 date string.
   * @returns {string} A human-friendly relative time string or "Invalid Date" if parsing fails.
   */
  relativeFormat(dateString) {
    const d = new Date(dateString);
    if (isNaN(d)) return "Invalid Date";

    const diff = (Date.now() - d) / 1000; // seconds difference
    const units = [
      { s: 60, name: "second" },
      { s: 60, name: "minute" },
      { s: 24, name: "hour" },
      { s: 30, name: "day" },
      { s: 12, name: "month" },
    ];

    let interval = diff;
    let unit = "year";

    for (const u of units) {
      if (interval < u.s) break;
      interval /= u.s;
      unit = u.name;
    }

    const n = Math.floor(interval);
    return n <= 0 ? "just now" : `${n} ${unit}${n > 1 ? "s" : ""} ago`;
  },
};
