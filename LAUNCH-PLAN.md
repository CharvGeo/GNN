# GNN launch plan

## Recommended route
Build and host the new GNN site with Sites, initially at its supplied address. Use the navy-and-gold branding, Greek interface, and the nine categories in the supplied category image. Keep the historical archive clearly separate from current news. Avoid an account/signup system at launch because it is unnecessary for reading news and would slow delivery.

## Prepared now
- Ten historical excerpts recovered from the saved Blogger HTML, with original post IDs and URLs.
- Four original YouTube references; availability and individual titles are unverified.
- Searchable responsive archive and portable JSON data. Month/year comes from original post URLs; no day or author is invented.
- Raw source remains unchanged in the parent folder.
- Live Blogger and feed retrieval failed in this session. This is not proof that the original blog has been deleted.

## Next implementation pass
1. Build the main homepage, category pages, article pages, About/editor profile, and archive navigation. Use supplied images and real supplied articles; do not present mockup headlines as current reporting.
2. Add durable article storage and a protected editor interface: title, category, text, image, draft/published status, original source, publication time. Verify persistence and editor access before public launch. Browser-local storage is not sufficient for a live newsroom.
3. Test mobile navigation, search, article links, publishing, and archive separation; publish at the supplied hosted address. Public reader access must be configured and checked; initial Sites creation is private.
4. Recover the remaining old posts from the public feed if it becomes reachable. If not, a one-time Blogger export is optional and does not block the new site's launch. Preserve original dates, URLs, authors where available, and whether each recovered item is complete.
5. Attach greeknews-international.gr after ownership and DNS access are available. Hosting returns exact required DNS records. Domain registration/ownership has not been verified. Do not redirect the old blog until the replacement is available and redirects are supported.

## Minimal user involvement
The assistant can implement, import, check, and deploy the site. User involvement should be limited to account authentication if requested by the platform, one-time domain access/DNS changes, and supplying or approving the first current articles. No credentials should be pasted into chat. The first public version can launch on the supplied address while the custom domain is pending.

## Editorial operation
Start with manual or assistant-assisted publishing of approved articles. Use external RSS as attributed headline links if feeds are available and suitable; do not treat RSS access as permission to republish full articles. Add automatic ingestion only after sources, publication rules, and failure handling have been decided. Do not fabricate news to fill categories. Keep backups/exportable article data.

## Completion criteria
Public address works without owner login; navigation and archive search work on mobile; editor publishing persists; current articles have actual dates and authors; historical excerpts remain marked; domain connection is optional for first launch.
