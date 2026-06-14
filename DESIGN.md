---
name: HardStack
description: A bilingual technical blog about open-source, self-hosted, and AI tools
colors:
  primary: "#c2571a"
  neutral-bg: "#fafafa"
  neutral-surface: "#ffffff"
  neutral-paper: "#efe7d2"
  ink: "#1c1814"
  ink-muted: "#5c5548"
  ink-faint: "#6b6356"
  border: "#e8e0d4"
  link: "#205ea6"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Noto Serif SC, serif"
    fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, Noto Serif SC, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Playfair Display, Georgia, Noto Serif SC, serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Inter, Atkinson, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  mono:
    fontFamily: "SF Mono, Fira Code, Cascadia Code, Consolas, monospace"
    fontSize: "0.88em"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.25rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "3rem"
components:
  button-subscribe:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.625rem 1.5rem"
  button-subscribe-hover:
    backgroundColor: "#da702c"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.625rem 1.5rem"
  card-article:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  card-article-hover:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  input-subscribe:
    rounded: "{rounded.full}"
    padding: "0.625rem 1rem"
  chip-category:
    rounded: "{rounded.full}"
    padding: "0.15rem 0.6rem"
---

# Design System: HardStack

## 1. Overview

**Creative North Star: "The Craft Bench"**

HardStack is a workshop, not a showroom. Every element serves the craft of reading a well-researched technical guide — the visual system exists to get out of the way, then reward attention with precision.

The personality is sharp, minimalist, technical. Text comes first; chrome earns its place. The palette is warm but not sweet — grounded in earthy neutrals and a single burnt-orange accent that reads as heat from the forge, not decoration. Typography pairs a serif editorial heading (Playfair Display) with a clean sans body (Inter), creating a rhythm that says "take this seriously."

This system explicitly rejects: generic tech-blog clutter, AI-generated design tells (gradient text, glassmorphism, numbered section markers by default, side-stripe borders), Medium-clone aesthetics, and anything that prioritizes "looking designed" over readability.

**Key Characteristics:**
- Text-first, chrome-second. Margins and white space are the primary design material.
- Bilingual by construction — English and Chinese CJC glyphs coexist in the same layout without friction.
- One accent color, used on ≤5% of any given screen. Its rarity is the point.
- Flat by default, with subtle elevation on interactive states.
- Warm neutrals that feel like a workshop bench, not a coffee shop.

## 2. Colors

A restrained palette grounded in warm earthy neutrals with a single burnt-orange accent. The colors evoke craft materials — oil paper, cast iron, raw canvas — rather than digital defaults.

### Primary
- **Ember** (`#c2571a`): The sole accent. Used for the subscribe button, hover states on links and cards, category pill accents, and the reading-mode indicator. Never exceeds ~5% of any given screen.

### Neutral
- **Raw Canvas** (`#fafafa`): Body background. The default reading surface. Near-zero chroma off-white — avoids the AI cream default.
- **Workshop Paper** (`#efe7d2`): The original brand paper. Used in the header background (`--paper`), secondary surfaces, and as a visual anchor for the "paper" template.
- **White Surface** (`#ffffff`): Card backgrounds, subscribe input background.
- **Type Black** (`#1c1814`): Body and heading text. High-contrast, warm-leaning almost-black.
- **Cast Iron** (`#5c5548`): Muted body text, metadata, secondary copy. Maintains 4.5:1+ against Raw Canvas.
- **Worn Steel** (`#6b6356`): Faint text, placeholder copy, decorative numbering. Also at 4.5:1+.
- **Workbench Edge** (`#e8e0d4`): Borders, dividers, horizontal rules, code block borders.
- **Deep Reference** (`#205ea6`): Link color. A cool tonal contrast to the warm palette — signals "navigation, not content."

### Named Rules
**The One Ember Rule.** The burnt-orange accent is used on ≤5% of any given screen. Its rarity is what gives it power. If Ember appears everywhere, it signals nothing.

**The Warm-But-Not-Sweet Rule.** Neutrals lean warm (toward ochre, not pink or yellow) to feel material and grounded. They should never read as "creamy" or "toasted" — those are coffee-shop adjectives, not workshop adjectives.

## 3. Typography

**Display Font:** Playfair Display (Georgia, Noto Serif SC, serif)
**Body Font:** Inter (Helvetica Neue, Arial)
**Label/Mono Font:** SF Mono, Fira Code, Cascadia Code (technical metadata and code)

**Character:** A deliberate contrast — editorial serif for headings gives authority and rhythm; clean geometric sans for body gives readability at small sizes. The pairing says "expert analysis, not blog post." Chinese text uses system serif/sans stacks that harmonize with the Latin faces without duplicating their character.

### Hierarchy
- **Display** (700, `clamp(2.2rem, 5.5vw, 3.5rem)`, 1.1): Hero page heading. Letter-spacing `-0.02em`. Used once per page — the main HardStack title.
- **Headline** (700, `clamp(1.8rem, 4vw, 2.5rem)`, 1.3): Article page titles. The same editorial serif at smaller scale.
- **Title** (600, `1rem`, 1.3): Article card titles on the home page. Truncated to one line.
- **Body** (400, `1em` / 16px, 1.75): Page copy. Prose articles use `1.05em` at `1.85` line-height for extended reading. Max line length 65ch (880px container).
- **Label** (600, `0.75rem`, 0.06em uppercase): Meta information — dates, categories, difficulty badges, reading time. Wide tracking signals "metadata, not content."
- **Mono** (400, `0.85–0.88em`): Code blocks, inline code, code-related metadata.

### Named Rules
**The 65ch Rule.** Body text must never exceed 75 characters per line. The prose max-width (880px, ~65ch) is a hard constraint, not a suggestion. Wider text is harder to sustain attention.

## 4. Elevation

A hybrid system: flat at rest, subtle elevation on interactive states. Depth is communicated through tonal layering (Raw Canvas body vs. White Surface cards vs. Workshop Paper header) rather than shadows. Shadows appear only as a response to interaction.

**Base (rest state):** All surfaces are flat. Cards sit on White Surface with a thin border (`1px solid #e8e0d4`) to define their edge. No shadow at rest.

**Interactive (hover/focus):** Article cards lift on hover — `translateX(4px)` shift with a soft shadow (`0 4px 20px rgba(0,0,0,0.06)`) and border transition to Ember. Buttons scale to `1.02`. Template cards rise `translateY(-2px)` with `0 8px 30px rgba(0,0,0,0.08)`.

**Overlay:** The locale-switcher dropdown uses a layered shadow: `0 1px 3px rgba(28,24,20,6%), 0 4px 12px rgba(28,24,20,4%)`. Just enough separation for a dropdown menu.

**Glass:** The sticky header uses `backdrop-filter: blur(12px)` with `rgba(250,250,250,0.85)` — just enough blur to keep navigation legible over scrolling content. This is the only glass element in the system.

## 5. Components

### Buttons
- **Shape:** Fully rounded pill (9999px radius).
- **Primary (Subscribe):** Ember background (`#c2571a`), white text, 600 weight, `0.875rem` size, `0.625rem 1.5rem` padding. No border.
- **Hover:** Brightens to `#da702c` with `scale(1.02)`.
- **Focus:** Ember-tinted ring via `box-shadow: 0 0 0 2px rgba(194,87,26,0.1)`.

### Cards / Article Cards
- **Corner Style:** Rounded (12px).
- **Background:** White Surface (`#ffffff`).
- **Border:** `1px solid #e8e0d4` at rest; shifts to Ember on hover.
- **Shadow Strategy:** None at rest. On hover: `translateX(4px)` + `0 4px 20px rgba(0,0,0,0.06)`.
- **Internal Padding:** 1.25rem.
- **Layout:** Horizontal flex — numbered indicator on the left (editorial serif, Worn Steel, 50% opacity), content stack on the right.

### Inputs / Subscribe Field
- **Style:** Pill-shaped (9999px), `1px solid #e8e0d4` border, White Surface background.
- **Text:** `0.875rem`, Cast Iron placeholder (`#6b6356`).
- **Focus:** Border shifts to Ember with subtle Ember glow (`0 0 0 2px rgba(194,87,26,0.1)`).
- **Padding:** `0.625rem 1rem`.

### Navigation (Header)
- **Style:** Glass header (`rgba(250,250,250,0.85)` with `backdrop-filter: blur(12px)`), sticky top, bottom border (`1px solid #e8e0d4`).
- **Links:** Clean text links, muted at rest, Ember on hover. No underline at rest; underline on hover.
- **Items:** Site title (Playfair Display), Blog, About, Search (Pagefind toggle), locale dropdown (pill-shaped toggle + dropdown menu), GitHub icon.

### Chips / Category Pills
- **Style:** Fully rounded (9999px), colored background with matching text. Three semantic variants:
  - AI Tools: blue (`#eff6ff` / `#1d4ed8`)
  - Guide: green (`#f0fdf4` / `#15803d`)
  - Review: amber (`#fffbeb` / `#b45309`)
  - Default: neutral (`#f5f3f0` / `#5c5548`)
- **Size:** `0.7rem`, uppercase, 600 weight, `0.15rem 0.6rem` padding.

## 6. Do's and Don'ts

### Do:
- **Do** lead with content. Test every design decision against "does this make the text easier or harder to read?"
- **Do** use Ember sparingly. It signals interaction and emphasis; overuse dilutes it.
- **Do** respect the 65ch max line length for body text. Use the prose container (880px).
- **Do** use `text-wrap: balance` on h1–h3 for even line lengths.
- **Do** keep interactive elements pill-shaped (9999px radius).
- **Do** use the glass header for its original purpose — just enough blur to keep navigation legible over scrolling content.
- **Do** write alt text that matches the brand voice: specific, concrete, workshop-grounded.

### Don't:
- **Don't** use side-stripe borders (border-left/right > 1px as colored accent). Rewrite with full borders, background tints, or nothing.
- **Don't** use gradient text (`background-clip: text`). Single solid colors only.
- **Don't** use glassmorphism decoratively. The header is the only glass element.
- **Don't** reach for numbered section markers (01/02/03) as default scaffolding. Numbers earn their place only when the order carries information.
- **Don't** put tiny uppercase tracked labels above every section. "Vol. I" on the hero is brand voice; repeating it as section grammar is AI scaffolding.
- **Don't** let heading text overflow its container. Test clamp scales at every breakpoint.
- **Don't** use monospace as a lazy shorthand for "technical." Mono is for code.
- **Don't** add cards unless they're the truly best affordance. No nested cards.
- **Don't** animate layout properties. Use transform and opacity.
- **Don't** use identical card grids with icon + heading + text repeated endlessly. Vary content density.
