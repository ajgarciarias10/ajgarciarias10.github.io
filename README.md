# ajgarciarias10.github.io

Personal landing page — <https://ajgarciarias10.github.io>

Single static `index.html`, no build step. Bilingual (EN/ES) with a selector in the
top-right corner; the choice is remembered in `localStorage` and defaults to the
browser language.

## Editing

- **Content and copy** — `index.html`. English lives in the markup; the Spanish
  translations are in the `I18N.es` dictionary at the bottom of the file. Every
  translatable node carries a `data-i18n="key"` attribute, so adding a string means
  adding the attribute *and* the matching key in the dictionary.
- **Images and CV** — see [`assets/README.md`](assets/README.md).
- **Colours** — the CSS custom properties under `:root`.

## Deploy

Push to `main`. GitHub Pages serves the repository root
(Settings → Pages → Deploy from a branch → `main` / `/root`).
