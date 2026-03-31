# NEXT Notes Website

A small `Next.js` site for publishing weekly meetup notes, blog-style summaries, and practical research tips from the NEXT meetup.

## What it does

- reads markdown files directly from `Notes/`
- creates a dashboard of uploaded sessions
- renders each note on its own page
- supports keyword search across titles, summaries, headings, and full note text

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Adding new notes

1. Drop a new `.md` file into `Notes/`.
2. Start the dev server or rebuild the site.
3. The new note will appear automatically on the dashboard.

## Next step ideas

- add note frontmatter for custom dates, authors, tags, and summaries
- index note content for semantic search or chat
- add deployment via Vercel or GitHub Actions
