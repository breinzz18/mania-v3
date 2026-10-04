# Mania v3: generated assets (Freepik / Magnific)

**No new images were generated for v3.** Magnific generated only **11 videos**, each one image-to-video from the restaurant's existing photos. The still photos (`images/`) were supplied in the client folder and are also AI-made ("magnific_*.png"); v3 reuses the web versions made for v2.

## Shared settings for all 11 videos
| Setting | Value |
|---|---|
| Tool | Magnific MCP → `video_generate` (image-to-video, start frame only) |
| Model | **Kling 2.5** (`kling-25`) |
| Resolution / length | 720p, 5 seconds (24 fps output) |
| Cost | 140 credits each, **1,540 credits in total** (account had 20,000; 18,460 left) |
| Source upload | `creations_upload_image` from the public v2 URLs `https://mania-v2.comebientf.com/images/<file>` |
| Magnific location | the user's **Personal** project (no folder was passed) |
| Downloaded raw clip | `%TEMP%\v3raw\<name>.mp4` (temporary, not kept) |
| Web file | `sites/mania-v3/video/<name>.mp4` + `video/<name>.jpg` (poster) |
| Web encoding (ffmpeg 9.0.2) | forward + reversed concat for a seamless 10 s loop; `scale=<W>:-2:lanczos, fps=24`; libx264 `-crf 29 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart`, no audio. Poster = first frame, `-q:v 4` |

The model can't take an end frame at 720p, so loops are made by playing the clip forward then backward. That's why every prompt asks for a locked-off camera.

## The 11 videos

### 1. hero-portrait (phone hero)
- **Source photo:** `images/scene-sunset-terrace-portrait-1080.webp`. This is a 72%-wide centre crop of client file `magnific_a-wideangle-photograph-ta_rgR2zjCxtc.png` (sunset terrace).
- **Aspect:** 9:16 · **Output:** 812×1128 · **Web:** width 720, **631 KB** · Magnific: https://www.magnific.com/app/creation/mEgpuJohJQ
- **Prompt:** "Static locked-off camera, no camera movement. Golden-hour beach terrace restaurant. Gentle ocean waves roll softly onto the sand in the background, warm sunlight shimmers on the sea, beach umbrellas and palm leaves sway slightly in a light breeze, ice in the sangria glass glints. Calm, slow, realistic, cinematic natural motion. Keep the table and food still. No new people, no text, no logos."

### 2. hero-landscape (desktop hero)
- **Source:** `images/scene-sunset-terrace-1600.webp` (same client file as #1, uncropped).
- **Aspect:** 16:9 · **Web:** width 1280, **476 KB** · https://www.magnific.com/app/creation/ovjTfTE829
- **Prompt:** "Static locked-off camera, no camera movement. Golden-hour beach terrace restaurant. Gentle waves roll onto the sand, warm sunlight shimmers on the sea, umbrellas and palm leaves sway slightly in the breeze, ice in the sangria glints. Calm, slow, realistic cinematic natural motion. Table and food stay still. No new people, no text."

### 3. paella (signature #99 + Paella category)
- **Source:** `images/cat-paella-1600.webp`, from client file `magnific_a-closeup-slightly-overhe_MBHbkOIDCm.png`.
- **Aspect:** 16:9 · **Web:** 720, **292 KB** · https://www.magnific.com/app/creation/6AowzwxiJO
- **Prompt:** "Static locked-off camera, no camera movement. Seafood paella in a pan on a beach table. Soft steam rises gently from the hot rice, saffron rice glistens, people in the blurred background move slowly, light breeze. Slow, realistic, appetizing food commercial motion. The pan and food stay in place. No text."

### 4. prawns (signature #26 + Hot starters category)
- **Source:** `images/cat-hot-starters-1600.webp`, from `magnific_a-dynamic-closeup-of-sizz_lJzY00Vgv9.png`.
- **Aspect:** 16:9 · **Web:** 720, **408 KB** · https://www.magnific.com/app/creation/p8KntYKehw
- **Prompt:** "Static locked-off camera, no camera movement. Garlic prawns sizzling in a cast iron pan on a wooden table by the beach. Olive oil bubbles and sizzles, wisps of steam curl upward, chili flakes shimmer. Slow, realistic, appetizing food commercial motion. Pan stays in place. No text."

### 5. tbone (signature #72 + House specialties category)
- **Source:** `images/cat-house-specialties-1600.webp`, from `magnific_a-photograph-of-a-tbone-s_YMfEFr7WeC.png`.
- **Aspect:** 16:9 · **Web:** 720, **260 KB** · https://www.magnific.com/app/creation/TdH2BGXVNR
- **Prompt:** "Static locked-off camera, no camera movement. Grilled T-bone steak on a wooden board by the sea. Thin smoke and steam rise from the hot meat, juices glisten, waves roll gently in the background. Slow, realistic, appetizing food commercial motion. Steak stays in place. No text."

### 6. sangria (configured as ambient video; not currently placed on the page)
- **Source:** `images/guest-sangria-1600.webp`, from `magnific_act-as-a-professional-foo_LwAzBTKswO.png`.
- **Aspect:** 1:1 · **Web:** 720, **521 KB** · https://www.magnific.com/app/creation/6AowzJLiJO
- **Prompt:** "Static locked-off camera, no camera movement. Glass of red sangria with fruit on a seaside terrace table next to garlic prawns and bread. Ice cubes shift gently, condensation glistens, tiny bubbles rise, the sea sparkles in the background, grass moves in the breeze. Slow, realistic, refreshing drink commercial motion. No text."
- Not shown with a price, because sangria isn't on the printed food menu.

### 7. aerial (story section background)
- **Source:** `images/scene-aerial-shore-1600.webp`, from `magnific_aerial-drone-photograph-o_p8bk6nbehw.png`.
- **Aspect:** 9:16 · **Web:** re-encoded at width 540 with `hqdn3d=3:3:6:6` denoise and **CRF 32**, giving **1,055 KB** (the first pass at CRF 29 was 3 MB) · https://www.magnific.com/app/creation/vQUdHowa47
- **Prompt:** "Static top-down aerial drone shot, no camera movement. Turquoise ocean waves gently wash onto white sand and retreat, foam patterns flow softly, sunlight ripples through the clear water. Calm, slow, hypnotic, realistic. No people, no text."

### 8. pizza (signature #122 + Pizza category)
- **Source:** `images/cat-pizza-1600.webp`, from `magnific_a-closeup-slightly-overhe_P3DeB1042C.png`.
- **Aspect:** 16:9 · **Web:** 720, **279 KB** · https://www.magnific.com/app/creation/LwzqJklswO
- **Prompt:** "Static locked-off camera, no camera movement. Fresh Neapolitan margherita pizza on a wooden table. Melted mozzarella bubbles slightly, thin steam rises, basil leaves flutter subtly. Slow, realistic, appetizing food commercial motion. Pizza stays in place. No text."

### 9. pasta (Pasta category)
- **Source:** `images/cat-pasta-1600.webp`, from `magnific_a-photograph-of-spaghetti_N2dBI116D9.png`.
- **Aspect:** 16:9 · **Web:** 720, **256 KB** · https://www.magnific.com/app/creation/Bhx0aD2oQR
- **Prompt:** "Static locked-off camera, no camera movement. A fork holds a twirl of seafood spaghetti with prawns and mussels above a beach table. The pasta sways very slightly, a wisp of steam rises, the sea sparkles softly in the blurred background. Slow, realistic, appetizing food commercial motion. No text."

### 10. fish (Fish and seafood category)
- **Source:** `images/cat-fish-seafood-1600.webp`, from `magnific_a-photograph-of-a-whole-g_jU2GYXiLD0.png`.
- **Aspect:** 16:9 · **Web:** 720, **248 KB** · https://www.magnific.com/app/creation/tClDFYlmZJ
- **Prompt:** "Static locked-off camera, no camera movement. Whole grilled fish with lemon on a white plate at a beach table. Gentle steam rises from the fish, olive oil glistens, a glass of water catches sunlight, waves move softly in the background. Slow, realistic, appetizing food commercial motion. No text."

### 11. salads (Salads category)
- **Source:** `images/cat-salads-1600.webp`, from `magnific_an-overheadangle-photogra_mEsgwrmhJQ.png`.
- **Aspect:** 16:9 · **Web:** 720, **319 KB** · https://www.magnific.com/app/creation/mEgpHcbhJQ
- **Prompt:** "Static locked-off camera, no camera movement. Fresh mixed salad in a ceramic bowl on a wooden beach table. Lettuce leaves flutter very slightly in the sea breeze, droplets of dressing glisten, waves roll gently in the background. Slow, realistic, fresh food commercial motion. No text."

## Where each video is used (`data/site.js`)
- **videos.heroPortrait / heroLandscape:** hero.
- **videos.story:** aerial.
- **videos.ambient:** sangria (configured, not placed).
- **videos.categories:** paella, hot-starters → prawns, house-specialties → tbone, pizza, pasta, fish-seafood → fish, salads. The other 7 categories use their photo.
- **signature:** #99 paella, #26 prawns, #72 tbone, #122 pizza.

All 11 web files total **4.7 MB**. They are loaded only when on screen, and replaced by posters with reduced motion or Save-Data.
