# Mania v3: skills and MCP servers

## Where things are installed
- **Project-level skills** live in `C:\Users\cioba\Desktop\VS Code\.agents\skills\` and are linked into `C:\Users\cioba\Desktop\VS Code\.claude\skills\`. The installer was `npx skills add …`.
  - They load only when Claude Code is started from the `VS Code` folder.
- **User-level settings** are in `C:\Users\cioba\.claude\settings.json` and `C:\Users\cioba\.claude.json`.
  - They apply in every folder.

## Skills used for v3

| Skill | Level | What it was used for in v3 |
|---|---|---|
| `find-skills` (vercel-labs/skills) | Project | Searched the skills registry for scroll storytelling, video websites and awwwards-style skills. Nothing new was needed, so nothing was installed. |
| `animate` (emilkowalski/skill) | Project | Not loaded again for v3. Its rules carry over from v2, where it was used: the easing tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`), the duration choices, transform/opacity-only motion, and reduced-motion fallbacks. The "See the menu" transition (menu grows from the tap point) was built with it in v2 and reused. |
| `impeccable`, `design-taste-frontend`, `emil-design-eng`, `apple-design`, `mobile-native`, `high-end-visual-design`, `gpt-taste`, `riso`, `immersive` | Project | Not loaded again for v3. In v2 a design-brief agent read them, and that brief's rules were applied again here: contrast targets, 44px touch targets, 16px inputs, safe areas, hover gating, no fake reviews, an honest "illustrative photos" note, and real menu data only. |
| `update-config`, `mempalace` | Project | Not used for v3 itself; they belong to the earlier MemPalace setup. |

To be clear: the v3 concept, code and video prompts were written directly in this session, following the rules above. No skill file was re-read for v3, to save tokens, as requested.

## MCP servers used for v3

| Server | Level | Used for |
|---|---|---|
| **magnific** (`https://mcp.magnific.com`, HTTP) | **Project** (local scope for `C:\Users\cioba\Desktop\VS Code`, stored in `~/.claude.json`) | `account_balance`, `video_models_list`, `simulate_cost` (free cost checks), `creations_upload_image` (11 source photos), `video_generate` (11 Kling 2.5 clips), `creations_wait`. |
| **mempalace** (`mempalace-light-mcp.exe`) | **User** (all projects) | Not called directly. Its auto-save hooks (Stop / SessionEnd / PreCompact in `~/.claude/settings.json`) quietly file the conversation into the local palace at `C:\Users\cioba\.mempalace`. |

## Other tools (not skills or MCP)

| Tool | Where | Used for |
|---|---|---|
| **Playwright** (`@playwright/test`, headless Chromium) | `C:\Users\cioba\Desktop\VS Code\node_modules` | Phone and desktop screenshots, feature tests (search, picks, categories, back button, languages), slow-4G performance checks. Never the user's own Chrome. |
| **ffmpeg 9.0.2** | winget, `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg…` | Seamless ping-pong loops, compression, posters. |
| **sharp**, **mupdf**, **subset-font** | Session scratchpad `tools/node_modules` | Contact sheets of QA screenshots. v2 assets (photos, menu pages, font subsets) were reused as-is. |
| **git + Cloudflare** | Repo `breinzz18/mania-v3` | Deploys to `mania-v3.comebientf.com` on every push to `main`. |

**Not used:** 21st.dev skills (the CLI isn't logged in), `brag` / Hyperframes, `ui-ux-pro-max`, and `framer-motion-animator` (the site is plain JavaScript, not React).
