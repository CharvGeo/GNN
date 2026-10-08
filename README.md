# GNN

Greek daily news synthesis with a conservative editorial perspective, linked sources, and clearly identified AI illustrations.

Live site: https://gnn-archive.gardenoasis2.chatgpt.site/

## Daily update

Tell Codex: **Update GNN with today's edition.** Follow `DAILY-EDITION.md`. This is an on-demand workflow; there is no unattended scheduled job yet.

## Files and build

- `content/editions/YYYY-MM-DD.json`: original articles and source references.
- `content/editions/YYYY-MM-DD-image-prompts.json`: illustration provenance.
- `dist/`: complete deployable static site, including images and the recovered Blogger archive.
- `build-news.mjs`: generates the homepage, article/category/edition pages, RSS and sitemap. Keeps previous editions.
- `build-archive.mjs`: optional original snapshot importer; requires the saved Blogger HTML in the parent folder. The recovered archive is already committed in `dist/`.

Requires Node.js. No npm dependencies or API keys are needed to build existing content.

```sh
node build-news.mjs
node verify.mjs
node serve.mjs
```

Preview: http://127.0.0.1:4173

Publishing uses the Sites source/package workflow and the existing project ID in `.openai/hosting.json`. GitHub stores the source; pushing to GitHub alone does not publish to Sites. Root-relative links currently target a domain root, not a GitHub Pages project subpath.

The Blogger recovery contains ten excerpts from May 2012, not the complete historical blog. No full-text recovery is claimed.
