# Mania v3: design system

Everything below is taken from the live code: `assets/app.css`, `assets/app.js`, `index.html` and `data/site.js`.

**Concept: "La Hora Dorada" (the golden hour).** Scrolling the page is an afternoon at Mania. The page colours move from midday sand to a coral and gold sunset to a navy night, driven by scroll position.

---

## 1. Colours

### Fixed tokens (`:root`)
| Token | Hex / value | Use |
|---|---|---|
| `--sand` | `#F4EEE3` | Intro, hero mask panel, category view, sheets, reveal circle |
| `--navy` | `#0A1B2C` | Night background, dock |
| `--brand` | `#00477A` | Logo colour in the intro, "Scroll" hint |
| `--sun` | `#FF6B3D` | Primary buttons, picks heart, active dock button |
| `--on-sun` | `#1A0F08` | Text on sun-coloured buttons |
| `--gold` | `#F4B860` | Rating stars, footer lights, text selection |
| `--card` | `rgba(255,255,255,.55)` (night: `.06`) | Reserved surface |
| Body ink (day) | `#0E2A3D` | Text on light backgrounds |
| Body ink (night) | `#F4EEE3` | Text once the background turns dark |
| `--muted` | ink at 66% (day) / `rgba(244,238,227,.7)` (night) | Secondary text |
| `--line` | ink at 14% (day) / `rgba(244,238,227,.16)` (night) | Dividers, borders |
| Hover of sun button | `#FF8259` | Pointer devices only |
| Status open / closed | `#8BF0B5` / `#FFC0A8` | "Open now" dot and text on the hero video |

### Scroll-driven palette (`STOPS` in `app.js`)
`--bg` and `--accent` are interpolated between these stops with smoothstep easing. The scroll position is 0 at the top and 1 at the bottom.

| Position | Background | Accent | Moment |
|---|---|---|---|
| 0.00 | `#F4EEE3` (244,238,227) | `#1E9FAE` (30,159,174) | Noon |
| 0.30 | `#F2E7D6` (242,231,214) | `#1E9FAE` | Early afternoon |
| 0.55 | `#F6D2B6` (246,210,182) | `#D6542C` (214,84,44) | Late afternoon |
| 0.72 | `#D67C5C` (214,124,92) | `#FFD68C` (255,214,140) | Sunset |
| 0.86 | `#1A2842` (26,40,66) | `#F4B860` (244,184,96) | Dusk |
| 1.00 | `#0A1B2C` (10,27,44) | `#F4B860` | Night |

- When the background's relative luminance drops below 0.5, `html.night` is added and the ink flips to cream (body colour transition 350ms).
- `<meta name="theme-color">` follows `--bg`.
- The category view and sheets always stay light, with their own fixed day tokens.

### Overlays
- **Hero video shade:** `linear-gradient(180deg, navy .35 → 0 at 26% → .25 at 44% → .82 at 70% → .92)`, faded in with the hero copy.
- **Signature card:** transparent to `rgba(10,27,44,.85)` from 45%.
- **Category header:** navy `.45` → 0 at 35% → `.75`.
- **Story:** `rgba(6,30,44, .25 + progress × .45)`.

---

## 2. Typography

Fonts are self-hosted and subset to the 179 characters used across all 10 languages (`tools/subset-fonts.mjs`).

| Role | Font | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, weight 200–800, width 75–100%; optical size pinned at 32) | `fonts/bricolage-grotesque-subset.woff2`, 60 KB, preloaded |
| Body | **Atkinson Hyperlegible Next** (variable, weight 200–800) | `fonts/atkinson-hyperlegible-next-subset.woff2`, 25 KB |
| Fallbacks | Arial, metric-matched (`size-adjust` 104% / 103%) | Prevents layout shift during font swap |

| Element | Size | Weight / width | Line-height / tracking |
|---|---|---|---|
| Hero title | `clamp(2.6rem, 12vw, 6.5rem)` | 800, stretch 80% | .92 / −.035em, max 11ch |
| Section titles | `clamp(2.4rem, 11vw, 5.5rem)` | 700, 82% | .95 / −.035em |
| Menu index row names | `clamp(1.75rem, 8.4vw, 3.6rem)` | 700, 82% | 1 / −.03em |
| Category view title | `clamp(2.6rem, 13vw, 5rem)` | 700, 80% | .92 / −.035em |
| Story lines | `clamp(2.4rem, 12vw, 6.5rem)` | 800, 78% | .98 / −.04em |
| Rating number | `clamp(5rem, 28vw, 11rem)` | 800 | .85 / −.05em |
| Quote | `clamp(1.3rem, 5.4vw, 2rem)` | 600 display | 1.3 |
| Signature card name | 1.625rem | 700, 86% | 1.05 / −.02em |
| Dish name | 1.1875rem | 600 display | 1.25 / −.01em |
| Price | 1.125rem | 700 display, tabular numbers | — |
| Body / descriptions | 1rem | 400 Atkinson | 1.5 (descriptions 1.45) |
| Buttons | 1rem | 700 Atkinson | — |
| Dock | .9375rem | 700 | — |
| Small labels (dish number, card meta) | .75–.8125rem | 700, tracking .12–.16em uppercase where used | — |

- The search input is 16px (prevents iOS zoom).
- Headings use `text-wrap: balance`, and long words use `hyphens: auto`.

---

## 3. Spacing, radius, shadows, layout

- **Gutter:** 20px on phones, 48px from 900px wide. **Max width** 1200px (`.wrap`).
- **Sections:** `padding: 96px 0 24px`; heading block gap 12px, 28px below.
- **Dish rows:** 15px vertical padding with a 1px `--line` divider. **Index rows:** 18px (22px on desktop).
- **Radius:** `--r: 18px` for cards, photos and map; buttons and pills 999px; sheets 24px (top corners on mobile); thumbs 12px; flags 3px.
- **Shadows:** dock `0 20px 50px rgba(0,0,0,.3)`; footer lights `drop-shadow(0 0 6px gold)`. Everything else is flat; dividers do the separation.
- **Glass** (`backdrop-filter: blur(10px)`) is used only on the top-bar button, hero glass button, category view buttons and signature-card hearts.
- **Touch targets** are 44px minimum; buttons are 54px, dock buttons 50px.
- **Safe areas:** `env(safe-area-inset-top/bottom)` on the bar, dock, sheets, hero copy and category view.

---

## 4. Motion

Easing tokens:
- `--ease-out: cubic-bezier(.23,1,.32,1)` for entrances and UI
- `--ease-in-out: cubic-bezier(.77,0,.175,1)` for movement
- `--ease-drawer: cubic-bezier(.32,.72,0,1)` for sheets and the category view
- Intro exit: `cubic-bezier(.87,0,.13,1)`

| What | How | Duration / easing |
|---|---|---|
| **Intro** (every visit, skipped in table mode and with reduced motion; 3 s safety timeout) | Logo rises 14px and unmasks (clip-path); the wave line draws (stroke-dashoffset); the sand panel lifts −112% | 500ms out; line 520ms in-out, +100ms; lift 650ms, +720ms. Tap to skip. |
| **Hero logo window** | Sand panel with the logo cut out (mask-composite exclude) over the video. Scroll progress p over a 230svh section: `scale = 1 + min((p/.62)^2.4, 1) × 38` (origin 34% 41%); mask fades out over p .42–.62; hint fades by p .17; copy fades in over p .58–.80 and rises 30px | Scroll-linked (rAF) |
| **Scroll hint line** | scaleY 0→1→0, switching origin | 1.6s in-out, infinite |
| **Open-now dot** | Expanding ring (box-shadow) | 2.2s out, infinite |
| **Palette** | `--bg` / `--accent` interpolated on scroll; ink flips at luminance .5 | rAF; body colour 350ms |
| **Section headings** | Words slide up from 105% when 15% into view; second line +80ms | 900ms out |
| **Top-bar button** | Glass on the video, then sand with a hairline after the hero | 300ms |
| **Dock** | Hidden while the hero is opening (p < .55); slides up | 400ms drawer |
| **"See the menu"** (from v2) | Sand circle grows from the tap point via clip-path; the page jumps to the menu; title, search and first rows rise 26px in a 45ms cascade; the circle fades | 520ms in-out; rows 420ms out, +60ms + i×45ms; fade 260ms |
| **Category view** | Slides up from 100%; title rises 24px; dish rows rise in a 30ms cascade; drag the header down to close (>140px or fast flick) | 500ms drawer in / 260ms out; title 700ms +120ms; rows 500ms +180ms + i×30ms |
| **Index row** | Name shifts 6px on press / 10px on hover and takes the accent colour | 350ms out |
| **Heart** | Fills with a growing circle (clip-path); press scales .88; vibrates 8ms on Android | 240ms out / 100ms |
| **Sheets** (language, picks) | Slide up on mobile; centred scale/fade from 720px; drag to dismiss (>110px) | 450ms drawer / 240ms out |
| **Story** | Sticky over a 260svh section; three lines go from opacity .16 to 1 as scroll passes each third | 500ms out |
| **Footer lights** | Gold bulbs pulse opacity .55↔1, alternating | 3s, infinite |
| **Buttons** | Press scale .97 (dock .95) | 160ms / 120ms |
| **Videos** | Play only while within 120px of the viewport (IntersectionObserver), pause when out | — |

**Reduced motion:** no intro, no logo window (the hero is static with its copy shown), the story is not sticky and all lines are visible, no cascades or pulses, sheets fade, and videos are replaced by posters. **Save-Data** also shows posters instead of videos.

---

## 5. Section order

1. **Intro**: logo and wave line on sand.
2. **Hero** (230svh, sticky stage): logo window onto the terrace video. Then the title "Steaks, paella & pizza by the sea" (translated), Google rating, live open status, **See the menu** and **Book a table** buttons.
3. **Signature dishes**: a reel of 4 video cards with a progress bar.
4. **Menu**: sticky search, then the numbered index of 14 categories. Footer note shows the tax line and **View the printed menu**.
5. **Story** (260svh, sticky): "Since 1996 / Paseo Marítimo · Costa Adeje / headline + story text" over the aerial wave video.
6. **From our guests**: a snap strip of 12 photos with a lightbox.
7. **Rating**: 4.0, stars, 2,288 reviews, the real quote, **Read the reviews** and **Leave a review**.
8. **Find us**: photo map (iframe loads on tap), address, "Every day 09:30–23:00", Directions and Call.
9. **Footer (night)**: string lights, logo, address and phone, Google / Tripadvisor / Facebook, allergy note, "photos and videos are illustrative", copyright.
10. **Fixed**: language button (top right) and dock (bottom).

---

## 6. Components

- **Intro**: full-screen sand panel, navy logo (`.logo`, a CSS mask of `brand/logo.svg`), turquoise wave line, wave-shaped bottom edge.
- **Hero video**: `<img>` poster, which is the LCP image (preloaded per orientation), plus a muted inline looping `<video>`. Portrait (aspect ≤ 1) uses `hero-portrait`; landscape uses `hero-landscape`.
- **Language switcher**: a top-right pill (SVG flag + code) opens a bottom sheet with 10 rows (flag + native name). The choice is saved in localStorage; first visit detects `navigator.languages`; `?lang=xx` overrides. Switching re-renders all text and prices in place.
- **Search**: a pill input that is sticky under the bar. Accent-insensitive search over name, description, Spanish and English names, category and menu number. It replaces the index with a flat result list (category label above each dish, matches highlighted in gold) and shows an empty state.
- **Categories**: index rows (number, name, count or price, 54px thumbnail; 84×64 on desktop). Tapping opens a **full-screen category view**:
  - Header (46svh, 52svh on desktop) with the category video or photo, title and "11 / 14 · 6 dishes".
  - Dish list; pasta grouped into Spaghetti / Fettuccine / Penne; sauces shown as option pills with one price.
  - A **Next** button at the end.
  - Back button, Esc, the chevron button or dragging the header all close it. History state is used, so the phone's back gesture works.
- **Dish card (row)**: grid `1fr auto 44px` with number + name, description, detail pill (e.g. "price per person"), price and heart. The **signature card** is a 3:4.2 video card with "Nº 99 · Paella", name, price and a glass heart.
- **Picks**: hearts store `{menu number: quantity}` in localStorage. The dock shows "My picks n". The sheet lists dishes in the guest's language plus the Spanish name, quantity steppers and a total; the screen is kept awake (Wake Lock).
- **Call / Directions**: the dock is a navy pill fixed at the bottom with **Call** (sun-coloured until there are picks) and **Directions** (Google Maps directions link); **My picks** appears once something is hearted. Table mode (`?from=table`) shows only picks and skips the intro. Call and Directions buttons are repeated in the hero and Find us.

---

## 7. Mobile vs desktop

| | Phone (default) | Desktop (≥ 900px) |
|---|---|---|
| Gutter | 20px | 48px |
| Hero video | `hero-portrait` (720×1000 loop) | `hero-landscape` (1280×720 loop) |
| Hero copy | Stacked: title, rating, buttons | Two columns: text left, buttons right |
| Signature reel | 78vw cards (max 360px), swipe | 340px cards aligned to the 1200px grid |
| Index rows | 2.4rem number column, 54px thumb | 4rem column, 84×64 thumb, hover shift + accent |
| Category header | 46svh | 52svh |
| Sheets | Bottom sheets with drag handle | Centred dialogs (max 540px) |
| Visit section | Stacked | Map 1.2fr + details 1fr |
| Footer | Stacked | Three columns |
| Hover effects | None (gated to `hover: hover` and `pointer: fine`) | Buttons, rows |
| Dock labels | Hidden below 370px (icons only) | Shown |
