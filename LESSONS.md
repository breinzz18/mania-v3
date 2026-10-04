# Lessons learned (Mania v2 → v3): check these on every new client site

## Hosting and deploy (GitHub + Cloudflare)
1. **Cloudflare's new UI creates a Worker, not a Pages project.** "Workers & Pages → Create → import repo" ends with `npx wrangler deploy`, which **fails at the very end ("Deploying")** on a plain static site. Fix: every site repo ships a `wrangler.jsonc` with `"assets": { "directory": "./" }` and a matching `"name"`, plus an `.assetsignore` listing `.git*`, `tools`, `docs`, `wrangler.jsonc` and the `.md` docs, so they aren't published.
2. **Never connect an empty repo.** Push the site first. A build on an empty repo fails and Cloudflare doesn't retry by itself; a new push (or "Retry deployment") does.
3. **Cloudflare's GitHub app only sees repos you allowed it to.** GitHub → Settings → Applications → Cloudflare Workers and Pages → Configure → add the new repo.
4. **Never touch the old repo** (`meniuri-restaurante`, 2 live pages). Each new site gets its own repo and subdomain.
5. **Cache rules (`_headers`):** a path line must be followed directly by its indented headers. Don't insert another path line in between. Long cache only for `*.webp`, video, fonts and vendor, never for `manifest.js` or data files, which change when photos or menus change.
6. **A brand-new subdomain resolves late** in some resolvers. Playwright's Chromium cached the "not found" answer. For QA, pass `--host-resolver-rules=MAP <domain> <ip>`.
7. Push with `GCM_INTERACTIVE=never`. The stored GitHub login works without prompts.

## Menu data from PDFs
8. **PDF text drops the "fi" / "fl" ligatures** ("Tunsk" instead of "Tunfisk", "let" instead of "filet"). Always read the page images too, and run the ligature check in `tools/build-menu.mjs`.
9. **Item numbers are the key across languages.** Cross-check that every language has the same items and prices (the merge script reports differences).
10. **Typo fixes go in `data/corrections.json`**, never by hand in `menu.js`. Each fix must match exactly, so it's skipped and reported if the PDF text changes.
11. Report real PDF mistakes to the designer: e.g. Italian page 4 said "Tasse incluse", blueberry vs cranberry in one language, Spanish left in other languages.

## Code gotchas
12. **JavaScript `String.replace` turns `$$` into `$` in the replacement.** This broke the page once (the intro got stuck). Use `split(a).join(b)` for code edits.
13. **The intro must never block the page.** A safety `setTimeout` (3 s) removes it even if scripts fail.
14. **"Play once per session" looks broken to the client.** They thought the intro was deleted. Play it on every visit; skip it only for table QR links (`?from=table`).
15. **Emoji flags don't render on Windows** ("GB EN"). Use inline SVG flags.
16. In bash, quote heredocs (`<<'EOF'`). JS with backticks or `$(...)` inside double quotes gets mangled; write scripts to a file instead.
17. Newly installed CLIs (winget, uv) aren't on PATH until Claude Code restarts. Call them by full path in the meantime.

## Design and readability
18. **Light text or logos over bright photos (sunset sky) fail.** Use a stronger bottom gradient, a soft radial glow, and put text in the darker part of the image. Check the screenshot, not the code.
19. **Display text must use the display font explicitly.** A `<p class="hero__title">` silently fell back to the body font.
20. **Fixed corner logos collide with content** on long scroll pages. On v3 only the language pill stays fixed.
21. **Long menus bury everything below them** (v2: ~26 phone screens). Use category cards or an index with a full-screen category view. The page went down to ~8 screens.
22. **Mobile header:** one sticky bar, not two. Search and language can live in the category bar.
23. Signature or featured items must be **real menu items with real prices**. Don't put prices on things that aren't on the menu (sangria).
24. Keep the honest footer note: "Food photos and videos are illustrative."

## Performance (phones on 4G)
25. Subset fonts to the characters actually used: 161 KB became 85 KB.
26. Put the hero image in HTML with a `<link rel="preload">` per orientation. A portrait crop for phones is lighter and sharper than a cropped landscape.
27. Give `sizes` so phones pick about 960px images, not 1600px ones; mark lazy images `fetchpriority="low"`.
28. Don't download hidden things (the category grid photos loaded before the grid was opened).
29. No `backdrop-filter` on large sticky bars and no scroll-linked photo zoom on touch devices; keep them for desktop.
30. Measure on simulated slow 4G with a 4× CPU slowdown. The target is LCP under 2.5 s (v3: 2.2 s).

## Magnific video
31. **Always `simulate_cost` first.** Kling 2.5 at 720p with a start frame is 140 credits for 5 s; Seedance 2.5 is about 6,300, too expensive for web loops.
32. **Test one clip, then batch.** The account renders at most **8 videos at once**. Extra calls are rejected without charge; retry after about 10 minutes.
33. **Kling 720p can't take an end frame**, so ask for a locked-off camera and make the loop forward + reverse with ffmpeg. That gives a seamless 10 s loop.
34. Upload sources by public URL (the live site's `/images/…`) instead of local files.
35. **Water and waves compress badly** (3 MB). Denoise (`hqdn3d`), use a smaller width and CRF 32 to get about 1 MB.
36. Play videos only when visible (IntersectionObserver), always with a poster, and fall back to posters with reduced motion or Save-Data.

## Working with the client
37. Ask before spending credits or creating repos. Show costs up front.
38. If they say "use agents", consider the plan limits. On the Pro plan, prefer doing work in the main session; agents were worth it only for extracting 10 PDF languages in parallel.
39. Screenshot contact sheets must use the real viewport aspect (390×664 on an iPhone 13 in Playwright), or the sheet crops and gives false alarms.
