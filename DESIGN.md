---
name: HardStack
description: A bilingual technical blog about open-source, self-hosted, and AI tools
colors:
  primary: "#5B8C5A"
  primary-warm: "#C47A5A"
  neutral-bg: "#FBF7F0"
  neutral-surface: "#FFFFFF"
  neutral-paper: "#F5F0E8"
  ink: "#1B2A3D"
  ink-muted: "#5A6B7C"
  ink-faint: "#8E9AAB"
  border: "#E2DDD3"
  link: "#2D6A8F"
  dark-bg: "#0C0A09"
  dark-surface: "#1C1917"
  dark-accent: "#F97316"
typography:
  display:
    fontFamily: "Instrument Serif, Noto Serif SC, Georgia, serif"
    fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, Atkinson, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  mono:
    fontFamily: "JetBrains Mono, SF Mono, Fira Code, monospace"
    fontSize: "0.82em"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
---

# Design System: HardStack

## 1. Overview

**Creative North Star: "Technical Workshop"**

HardStack is a workshop, not a showroom. Every element serves the craft of reading a well-researched technical guide — the visual system exists to get out of the way, then reward attention with precision.

The personality is sharp, technical, and warm. Text comes first; chrome earns its place. The palette is grounded in warm cream neutrals with a matcha green accent — evoking natural materials and craft rather than digital defaults. Instrument Serif for display headings brings editorial authority; DM Sans for body text ensures readability; JetBrains Mono for labels and metadata signals technical precision.

This system explicitly rejects: generic tech-blog clutter, AI-generated design tells (gradient text, glassmorphism, numbered section markers by default, side-stripe borders), Medium-clone aesthetics, and anything that prioritizes "looking designed" over readability.

**Key Characteristics:**
- Text-first, chrome-second. Margins and white space are the primary design material.
- Bilingual by construction — English and Chinese CJC glyphs coexist in the same layout without friction.
- Two accent colors used sparingly: matcha green for primary actions, terracotta for category differentiation.
- Terminal-inspired UI elements (stats card, numbered lists, monospace labels) signal technical depth.
- Warm neutrals that feel like a craft workshop, not a coffee shop.

## 2. Colors

A restrained palette grounded in warm cream neutrals with matcha green and terracotta accents.

### Primary
- **Matcha Green** (`#5B8C5A`): Primary accent. Used for CTA buttons, link hovers, primary category pills, and the terminal stats highlights. Signals "go, read, explore."
- **Terracotta** (`#C47A5A`): Secondary accent. Used for AI Tools category pills, terminal card secondary highlights, and decorative elements. Warm contrast to the green.

### Neutral
- **Cream Background** (`#FBF7F0`): Body background. Warm off-white with a yellow undertone — avoids the cold AI default.
- **Surface White** (`#FFFFFF`): Card backgrounds, terminal card background.
- **Raised Surface** (`#F5F0E8`): Header glass background, hover states, terminal header.
- **Navy Ink** (`#1B2A3D`): Body and heading text. High-contrast, cool-leaning dark blue — not pure black.
- **Muted** (`#5A6B7C`): Secondary text, descriptions, metadata. Maintains 4.5:1+ against cream.
- **Faint** (`#8E9AAB`): Labels, monospace metadata, decorative numbering. Also at 4.5:1+.
- **Border** (`#E2DDD3`): Borders, dividers, horizontal rules. Warm gray.
- **Deep Reference** (`#2D6A8F`): Link color. Cool blue that contrasts with the warm palette.

### Dark Mode
- **Dark Background** (`#0C0A09`): Body background. Deep warm charcoal.
- **Dark Surface** (`#1C1917`): Card backgrounds, terminal card.
- **Dark Raised** (`#292524`): Hover states, terminal header.
- **Bright Ink** (`#FAFAF9`): Body text in dark mode.
- **Dark Accent** (`#F97316`): Orange accent in dark mode — high contrast, energetic.
- **Dark Link** (`#7DD3FC`): Light blue links in dark mode.

## 3. Typography

**Display Font:** Instrument Serif (Noto Serif SC, Georgia, serif)
**Body Font:** DM Sans (Atkinson, Helvetica Neue, Arial)
**Mono Font:** JetBrains Mono (SF Mono, Fira Code)

**Character:** Instrument Serif brings modern editorial authority — it's distinctive without being fussy. DM Sans is clean and geometric for body readability. JetBrains Mono signals technical precision for labels, stats, and metadata. The pairing says "expert analysis, not blog post."

### Hierarchy
- **Display** (400, `clamp(2.8rem, 5.5vw, 4.5rem)`, 1.08): Hero page heading. Letter-spacing `-0.02em`. Used once per page — the main HardStack title.
- **Heading** (700, inherited sizes): Article page titles, section headers.
- **Mono Label** (500, `0.7rem`, 0.15em uppercase): Terminal prompts, eyebrow text, section markers.
- **Body** (400, 16px, 1.65): Page copy. Prose articles use `1.05em` at `1.85` line-height for extended reading. Max line length 65ch (880px container).
- **Mono Data** (400, 0.68–0.82em): Article dates, read times, view counts, terminal stats.

### Named Rules
**The 65ch Rule.** Body text must never exceed 65 characters per line. The prose max-width (880px, ~65ch) is a hard constraint, not a suggestion.

## 4. Elevation

A hybrid system: flat at rest, subtle elevation on interactive states.

**Base (rest state):** All surfaces are flat. Article list uses 1px border with 1px gap for separation. Terminal card uses 1px border + subtle shadow.

**Interactive (hover/focus):** Article cards shift background to raised surface on hover. Terminal card maintains structure. CTA buttons translate up 1px with shadow glow.

**Glass:** The sticky header uses `backdrop-filter: blur(16px)` with `rgba(251, 247, 240, 0.88)` — warm cream glass that keeps navigation legible.

## 5. Components

### Terminal Card
- **Structure:** macOS-style window with dot controls (red/yellow/green), title bar, monospace content body.
- **Background:** White Surface at rest. Header uses Raised Surface.
- **Border:** `1px solid #E2DDD3`. Border-radius `8px`.
- **Content:** JetBrains Mono font, `$` prompt prefix, key-value pairs with colored values.

### Article List
- **Layout:** Single-column vertical list with 1px separator lines.
- **Structure:** Grid with `auto 1fr auto` — number | content | right metadata.
- **Number:** JetBrains Mono, 0.75rem, faint color. Zero-padded (`01`, `02`).
- **Hover:** Background shifts to raised surface. No transform.
- **Category Pills:** JetBrains Mono, uppercase, 3px border-radius. Matcha green for Guide/Default, terracotta for AI Tools/Review.

### Buttons
- **CTA (Primary):** Matcha green background, white text, 6px radius, 0.75rem 1.75rem padding.
- **Hover:** Lighter green, translateY(-1px), green glow shadow.

### Navigation (Header)
- **Style:** Glass header (`rgba(251, 247, 240, 0.88)` with `backdrop-filter: blur(16px)`), sticky top, bottom border.
- **Logo:** JetBrains Mono, 0.95rem, 500 weight. "HardStack" with green "Stack".
- **Links:** DM Sans, 0.82rem, muted at rest, accent on hover.

### Footer
- **Layout:** 3-column grid (brand | navigate | connect).
- **Brand:** JetBrains Mono, 0.95rem.
- **Headings:** JetBrains Mono, 0.62rem, uppercase, faint.
- **Bottom:** JetBrains Mono, 0.65rem, centered, faint.

## 6. Do's and Don'ts

### Do:
- **Do** lead with content. Test every design decision against "does this make the text easier or harder to read?"
- **Do** use monospace for labels, stats, and metadata — it signals technical precision.
- **Do** respect the 65ch max line length for body text.
- **Do** use `text-wrap: balance` on h1–h3 for even line lengths.
- **Do** keep the terminal card as the hero stats display — it's the signature visual element.
- **Do** use numbered article lists for the homepage and archive — they add rhythm and scannability.

### Don't:
- **Don't** use side-stripe borders (border-left/right > 1px as colored accent).
- **Don't** use gradient text (`background-clip: text`). Single solid colors only.
- **Don't** reach for numbered section markers (01/02/03) as default scaffolding outside of article lists.
- **Don't** let heading text overflow its container. Test clamp scales at every breakpoint.
- **Don't** use monospace as body text — it's for labels and data only.
- **Don't** add cards unless they're the truly best affordance.
- **Don't** animate layout properties. Use transform and opacity.
