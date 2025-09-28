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

    const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 }, // 365 * 24 * 60 * 60
      { label: "month", seconds: 2592000 }, // 30 * 24 * 60 * 60
      { label: "day", seconds: 86400 }, // 24 * 60 * 60
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const { label, seconds: s } of intervals) {
      const count = Math.floor(seconds / s);
      if (count >= 1) {
        return `${count} ${label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  },
};
