# HardStack v2 Redesign Plan

## Goals
1. 从"能用"到"有设计感"
2. 每篇文章可选三种风格（Editorial / E-Ink / Code）
3. 首页从简陋列表变为内容中心

---

## Phase 1: Design Foundation

### 🎨 Color System (refined)
```
Paper (warm):   #faf6ef → #efe7d2 gradient
Accent:         #c2571a (rust) → #e05a24 (vibrant rust)
Link:           #2563eb (blue) → #1d64e0
Green tag:      #059669
Border:         rgba(0,0,0,0.08) → rgba(0,0,0,0.06)
```

### 🔤 Typography System
```
Scale:  12 / 14 / 16 / 18 / 20 / 24 / 30 / 38 / 48 / 60
Line-height: 1.6 (body) / 1.3 (heading) / 1.1 (display)
```
- Body: Atkinson (local woff) — keep, it's distinctive
- Headings: Atkinson Bold → increase font-weight distinction
- Mono: SF Mono / Fira Code — keep

### 📐 Spacing System
```
8px grid with 4px micro-adjustments
Section: 64-96px vertical (was 48px)
Card padding: 24-32px
Content max-width: 720-780px (template-dependent)
```

---

## Phase 2: Component Redesign

### Header
- Glassmorphism: `bg-[var(--color-paper)]/80 backdrop-blur-md`
- Logo + nav + search + locale switcher in one row
- Proper spacing and hover states
- Subtle bottom border with shadow

### Homepage Hero
- Large type headline (48-60px)
- Subtitle in muted color
- Stats line: "X articles · Y categories · Z min of reading"
- Optional: background gradient/pattern

### Blog Listing Cards
- Numbered list (like Linear's changelog)
- Each card: date + category + title + description
- Hover: slight lift, accent color
- Tags/badges for difficulty

### Article Layout
- Full-width header with background gradient
- Post meta as pill badges
- Body prose with refined spacing
- Code blocks with better styling
- Giscus aligned with content

### Footer
- Three columns: Blog info + Quick links + Social
- Subtle top border
- Smaller, less prominent

---

## Phase 3: Three Templates

### Editorial (replaces paper)
```
Warm cream #faf6ef background
Playfair Display headings (Google Fonts)
Merriweather body
Accent: #c2571a
Magazine feel, decorative drop caps
Wider: 780px
```

### E-Ink (replaces clean)
```
Warm white #fdfbf7
Pure Georgia serif throughout
No animations, paper-like
Max readability: 720px @ 1.8 line-height
Subtle paper texture overlay
```

### Code (replaces dark) 
```
Dark #0d1117 (GitHub-dark inspired)
Inter headings + body
JetBrains Mono for code
Accent: #58a6ff (GitHub blue)
Code blocks full-width
```

---

## Phase 4: Polish

- Smooth transitions on theme switch
- Hover effects on cards/links (150-200ms)
- Focus states for accessibility 
- prefers-reduced-motion support
- Print stylesheet
