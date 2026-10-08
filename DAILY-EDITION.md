# Publish a daily GNN edition

User command: **Update GNN with today's edition.**

1. Use today's actual Europe/Athens date and record an explicit research cutoff. Browse current news across Liberal, Estia News, News247, Dimokratia and other credible outlets. Prefer primary documents for material claims. Read the articles, verify event dates separately from publication dates, and link sources.
2. Select four or five substantial, distinct stories. Write original Greek synthesis from a conservative/right perspective: sovereignty, institutions, accountable government, productive economy and social cohesion. Keep facts separate from analysis. Attribute allegations and forecasts, record material opposing evidence, avoid invented quotes or copying articles. Do not describe later events beyond the cutoff as established.
3. Add `content/editions/YYYY-MM-DD.json` using the existing edition schema. Preserve older editions. Do not reuse yesterday's stories under today's date. Categories must match the nine existing labels; empty categories are allowed.
4. Generate one editorial illustration per article with the built-in image generation tool. Save to `dist/assets/YYYY-MM-DD/`, record exact prompts and provenance in the corresponding image-prompts JSON, and label the images as AI illustrations. Do not present invented documentary imagery as a photo of a real event.
5. Run `node build-news.mjs` and `node verify.mjs`. Preview the homepage, an article and the archive, check mobile layout and search. Inspect image loading and source links.
6. Read the Sites skill, retrieve the existing site and a fresh source write credential, and open its source with the Sites helper before editing. Package and push the final source using the helper; save the exact returned commit/archive and deploy the returned saved version. Preserve the public audience. Never commit credentials.
7. Synchronize the final work to `CharvGeo/GNN` without overwriting remote changes. Verify the remote commit and report the public URL, edition date, article count and any unresolved limitation.

Do not invent a successful update if browsing or image generation fails. Keep the current edition live and report the concrete failure. Scheduling requires a separate configured automation; the manual command is the current workflow.
