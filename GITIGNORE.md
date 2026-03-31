# Git Ignore and Commit Guide

This project now has a working `.gitignore`, but it also helps to be explicit about what belongs in git and what should stay local only.

## Commit these files

These are part of the website and should be version-controlled:

- `src/` for the actual app code
- `Notes/` for weekly markdown notes
- `Slides/` for slide decks you want the site to link to
- `package.json` for dependencies and scripts
- `package-lock.json` so installs are reproducible
- `tsconfig.json`, `eslint.config.mjs`, `next-env.d.ts` for project configuration
- `README.md` and other documentation files
- `LICENSE`
- `.gitignore`

## Keep these locally, but do not commit them

These are generated files, editor state, or machine-specific artifacts:

- `node_modules/`
- `.next/`
- `out/`
- `dist/`
- `.vercel/`
- `.turbo/`
- `.obsidian/`
- `.DS_Store`
- npm or yarn debug log files

## Never commit these

These should stay out of git unless you have a very specific reason:

- `.env` files
- API keys, access tokens, credentials, or secrets
- private drafts or scratch files that are not part of the site

## Practical rule of thumb

Commit:

- source code
- content you want published
- config needed for teammates or deployment
- lockfiles needed for reproducible installs

Do not commit:

- build output
- installed dependencies
- personal editor files
- secrets

## For this repo specifically

If you are about to make a normal website commit, the safe set is usually:

- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `eslint.config.mjs`
- `next-env.d.ts`
- `src/`
- `Notes/`
- `Slides/`

And you should usually ignore:

- `.obsidian/`
- `.next/`
- `node_modules/`
- `.env*`
