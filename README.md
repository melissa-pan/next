# NEXT Notes

This repository supports two ways of interacting with the same material:

1. through the website
2. through the raw note files directly

The content lives in `next-notes/`, which is intentionally kept focused on:

- `next-notes/Notes/`
- `next-notes/Slides/`

That means someone can open `next-notes/` in Obsidian, Cursor, Claude Code, or any markdown-based workflow without needing to work inside the full website codebase.

## Two interaction modes

### Website interaction

Use the `Next.js` app when you want a polished browsing experience.

The website:

- reads markdown notes from `next-notes/Notes/`
- links slide decks from `next-notes/Slides/`
- renders each note as its own page
- supports search across note titles, summaries, headings, and body text

For static site output, the build process syncs note and slide files into `public/files/` so downloads and markdown links continue to work on the deployed site.

### Raw note interaction

Use `next-notes/` directly when you want to read or edit the source material as files.

This is useful for people who prefer:

- Obsidian
- Cursor or Claude Code
- a plain markdown editor
- any local file-based note workflow

In that mode, the repository acts like a lightweight notes library instead of only a website.

## Project structure

```text
next/
├── next-notes/
│   ├── Notes/
│   └── Slides/
├── public/files/
├── src/
└── scripts/
```

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Adding content

1. Add markdown notes to `next-notes/Notes/`.
2. Add slide decks or related assets to `next-notes/Slides/`.
3. Run `npm run dev` for local work or `npm run build` for a production build.
4. The site will automatically pick up the content from `next-notes/`.

## Why this layout

This layout keeps the content portable.

- People using the website get navigation, search, and rendered note pages.
- People using note tools get direct access to the original markdown and slide files.
- Both workflows stay connected to the same source content.
