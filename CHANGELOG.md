# Changelog

All notable changes to the Quality Principles app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.0] - 2026-03-11

### Added

- **Tag filter pill buttons** — new `src/components/TagFilter.js` component replaces the old checkbox-based tag filter with an accessible pill-button bar (`role="group"`, `aria-pressed`). Styled via new `.tag-pill` / `.tag-pill--active` classes in `src/App.css`.
- **Tag helper utility** — `src/components/utils.js` with `getAllUniqueTags()` to extract distinct tags from the principles dataset.
- **Tag data in principles** — `src/resources/principles.json` now includes a `tags` array on every principle, enabling tag-based filtering on the Overview page.
- **Tag integration in Overview** — `src/components/Overview.js` wired up tag state management and renders the `TagFilter` component with filtering logic.
- **Redesigned welcome modal** — `src/components/FirstTimeModal.js` rewritten with a backdrop overlay, `role="dialog"` and `aria-labelledby` accessibility attributes, an inline SVG star icon, and refreshed copy ("A curated collection of quality principles…").
- **Modal CSS overhaul** — `src/App.css` gained `.modal-backdrop`, `.modal-icon`, `.modal-body`, `.modal-hint`, and `.modal-cta` styles with gradient background, glassmorphism card, and smooth entrance animation.
- **Data quality report** — `src/resources/json-analysis-report.md` documents the structure, foreign keys, and coverage of `principles.json`.
- **4 new Cypress component tests** for tag-filter pills (render count, toggle state, filter results, show-all default) in `src/App.cy.js`.
- **1 new Cypress component test** for modal content verification (`should display new modal content`) in `src/App.cy.js`.

### Changed

- **npm dependencies updated** — `package-lock.json` refreshed; all packages brought to latest compatible versions (`chore/update-packages`).
- **`src/App.js`** — removed unused Twitter share import and simplified component tree.
- **`src/components/HeaderBar.js`** — stripped Twitter/X icon link from the header; simplified to LinkedIn-only social link.
- **`src/index.js`** — removed redundant `React.StrictMode` wrapper and streamlined entry point.
- **`src/components/Home.js`** — minor text/formatting correction.
- **`src/App.css`** — consolidated and cleaned up legacy styles; added tag-pill and modal styles.
- **`src/resources/principles.json`** — reformatted for consistency and added `tags` field to all entries.

### Fixed

- **Cypress component tests repaired** — `src/App.cy.js` had a broken assertion referencing a non-existent test-id; corrected to match current DOM (`fix/cypress-tests`).
- **Removed stale Twitter test assertions** — `src/App.cy.js` no longer asserts the presence of `Tweet principle` test-id or `twitter` role link, which were removed with the Twitter integration.

### Removed

- **Twitter/X integration** — share-to-Twitter button removed from `src/App.js`; Twitter icon link removed from `src/components/HeaderBar.js`; related test assertions removed from `src/App.cy.js`.
- **`@mui/material` dependency** — removed from `package.json` (unused after prior refactors).
- **`src/resources/Icons.jsx`** — deleted unused custom SVG icon component file.
- **Console.log statements** — removed debug logging from `src/components/FirstTimeModal.js`.
