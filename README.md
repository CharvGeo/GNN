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

## External headlines

The homepage loads Olympia.gr and Onsports.gr RSS titles through rss2json, without an API key. It checks every 15 minutes while visible and stores the most recent successful data in browser localStorage. A source-controlled snapshot renders immediately and remains available if the external service fails. Partial failures retain each source's previous data and display a status notice. Third-party service caching and rate limits can affect freshness.

Refresh the deploy-time fallback with `node refresh-feed-snapshot.mjs`, then rebuild. Run `node check-feeds.mjs` for source URL and date validation checks. API responses are rendered as plain text and only links to the configured publisher domains are accepted. External headlines are not added to historical edition pages or the GNN article RSS.
