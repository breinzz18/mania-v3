# Mania v3: "La Hora Dorada" (the golden hour)

Scrolling the page is an afternoon at Mania. Page colours follow the scroll: midday sand, then a coral and gold sunset, then a navy night in the footer (`paint()` in assets/app.js; STOPS = position, background, accent; ink flips to cream when the background gets dark).

1. **Intro**, kept from v2: logo and wave line, then the paper lifts away.
2. **Hero**: the MANIA logo is a window cut into a sand panel (CSS mask with `exclude`). On scroll the window zooms about 39× until the terrace video fills the screen, then the copy rises in.
3. **Signature dishes**: a snap reel of real menu items (SITE.signature) as video loops.
4. **Menu**: an editorial numbered index. A full-screen category view with a video or photo header; "Next" goes on through the menu, the back button closes it, and you can drag the header down to close. Search shows flat results across all categories.
5. **Story**: lines light up over the aerial wave video (sticky).
6. Guests, Google rating, visit, night footer with string lights.

Videos: Magnific (Kling 2.5, 720p, 5 s, 140 credits each) from the restaurant's own photos. Each one is encoded as a forward-then-reverse loop with ffmpeg (seamless), CRF 29, no audio, plus a poster jpg. They play only while visible, and are off with reduced motion or Save-Data.
