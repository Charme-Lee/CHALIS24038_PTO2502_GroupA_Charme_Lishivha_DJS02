# DJS02 – Web Component: Podcast Preview

## Overview

This project demonstates a modular podcast discovery app built with native Web Components. The app uses a reusable <podcast-preview> element (Shadow DOM encapsulated) to display podcasts in a responsive grid with advanced filtering and sorting. Clicking a card fires a custom event that opens a detailed modal view.

---

## 🚀 Features

- 🧩 Reusable Web Component: <podcast-preview> fully encapsulated with Shadow DOM.

- 🎨Custom Events: Decoupled communication (podcast-selected).

- 📖 Advanced Filtering & Sorting: By genre, popularity, recency, and title.

- 📱 Responsive Design: Grid + modal optimized for desktop and mobile.

- ➕ Modular Code: ES Modules, utility services (DateUtils, GenreService), and JSDoc documentation.

---

## 🛠️ Technology Stack

- HTML5
- CSS3
- JavaScript (ES6+):
  - JSDoc for self-documenting code
  - Custom Elements API
  - Shadow DOM

## ⚙️ Setup Instructions

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Interact with the previews and modal.

## 🧩 Usage Instructions

1. Open `index.html` in your browser.
2. The landing page shows a grid of **podcast cards**.
3. Each card includes:
   - Cover image
   - Title
   - Genres
   - Number of seasons
   - Last updated date
4. Click a card to open the **modal**.
5. Close the modal by:
   - Clicking the close (×) button
