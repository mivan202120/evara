---
name: evara-brand-identity
description: |
  The definitive brand identity and UX design system for Evara — a premium AI-powered fitness app.
  Use when: building any UI component, screen, page, or visual element for Evara. This skill
  defines the exact color palette, typography, component patterns, spacing, shadows, and layout
  rules that every piece of Evara content must follow. Make sure to use this skill whenever
  creating HTML, React components, CSS, Tailwind configurations, mockups, or any visual asset
  for the Evara project, even if the user doesn't explicitly reference "brand" or "design system."
  Keywords: evara, design, UI, UX, brand, component, color, typography, layout, tailwind, screen.
---

# Evara — The Luminous Editorial Design System

> Evara treats fitness data and coaching as high-end lifestyle content. The interface feels like flipping through a premium wellness magazine, where the UI recedes to let the user's progress and the AI coaching shine.

## Creative North Star: "The Digital Curator"

This design system rejects the cluttered, high-intensity aesthetic of traditional fitness apps. We embrace **The Digital Curator** — a North Star that uses **intentional asymmetry** and **editorial pacing** to create a premium wellness experience.

**The feeling**: Warm, grounded, human. Like a luxury beauty brand, not a tech utility.

---

## When to Use

- Building ANY Evara screen, view, or component
- Creating new pages or features
- Styling existing elements
- Generating mockups or prototypes
- Writing CSS, Tailwind config, or HTML for Evara

## When NOT to Use

- Non-Evara projects (this is project-specific)
- Backend logic or API design (no visual component)

---

## Core Design Principles

### 1. The "No-Line" Rule
**1px solid borders are strictly prohibited for sectioning.** Define boundaries through background shifts instead. Use `surface-container-low` against `background` to create visual separation without lines.

### 2. Tonal Layering (Not Shadows)
Depth is achieved by "stacking" surface colors — place `surface-container-lowest` cards on `surface-container-low` backgrounds. This creates a natural, organic lift that feels physical rather than digital.

### 3. Editorial Pacing
Break the rigid grid. Use large display typography to create "breathing" moments. Asymmetric margins create movement. Space is a luxury feature — never crowd the screen.

### 4. Warm, Human Palette
Colors are rooted in human skin tones — warm terracotta, peach, rose. Never "tech-blue" or "gym-black." Never use pure black (#000000).

---

## Typography

| Role | Font | Usage |
|:-----|:-----|:------|
| **Headlines** | Plus Jakarta Sans (700, 800) | Display titles, editorial hooks, milestones |
| **Body & Labels** | Manrope (400–800) | Body text, AI coaching insights, labels, buttons |

**Rules:**
- Headlines use tightened tracking (`tracking-tight` or `tracking-tighter`)
- Always maintain high contrast between headline sizes and body text
- Labels use uppercase + widest tracking (`tracking-widest`, `text-[10px]`)
- Apply `font-headline` to h1–h3, `font-body`/`font-label` to everything else

---

## Color System

The palette is Material Design 3 with a warm terracotta core.

| Token | Hex | Usage |
|:------|:----|:------|
| `primary` | `#865043` | CTAs, brand mark, active states |
| `primary-container` | `#f4af9e` | Gradient endpoints, badge backgrounds |
| `primary-fixed` | `#ffdad2` | Subtle editorial highlights, tag backgrounds |
| `background` / `surface` | `#fff8f6` | Page background |
| `surface-container-low` | `#fdf1ee` | Section backgrounds, AI coach bubbles |
| `surface-container` | `#f7ebe8` | Secondary grouping |
| `surface-container-lowest` | `#ffffff` | Interactive "lifted" elements |
| `on-surface` | `#201a19` | Primary text (never use #000000) |
| `on-surface-variant` | `#514440` | Secondary text |
| `outline` / `outline-variant` | `#83746f` / `#d5c3bd` | Minimal borders (20% opacity max) |
| `error` | `#ba1a1a` | Destructive actions |

> Read `references/design-tokens.md` for the complete 48-token palette and Tailwind config.

---

## Component Quick Reference

### Buttons
- **Primary**: Gradient `from-primary to-primary-container`, rounded-xl (3rem), headline font, shadow with tinted glow
- **Secondary**: `surface-container-highest` background, no border, `on-surface` text
- **Tertiary**: Text-only, `primary` color, bold, underline with offset

### Cards
- Use `rounded-lg` (2rem corners) on main cards
- Use `rounded-full` (pill) for chips and tags
- **No dividers** between list items — use spacing or alternating backgrounds
- Shadow: `0px 20px 40px rgba(134, 80, 67, 0.04)` (tinted, not black)

### Navigation
- **TopAppBar**: Fixed, glassmorphic (`bg-[#fff8f6]/80 backdrop-blur-xl`), Evara logo in primary color
- **BottomNavBar**: Floating pill shape, glass effect, active tab uses gradient circle with scale + translate-y

### AI Coach Bubbles
- Asymmetric radius: `rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl`
- Background: `surface-container-low`
- Left border accent: `border-l-4 border-primary/20`
- Coach avatar: `primary-container` circle with Material Symbol icon

### Progress Orbs
- Use SVG circles with gradient stroke (`from-primary to-primary-container`)
- Soft radial gradients instead of linear progress bars
- Center text overlay for percentage display

### Hero Cards
- Full-bleed image with gradient overlay (`from-black/80 via-black/20 to-transparent`)
- Overlaid text in white, badges in `primary-container`
- Gradient CTA button at the bottom

> Read `references/component-patterns.md` for complete HTML/Tailwind code for every component.

---

## Shadows & Elevation

| Context | Spec | Notes |
|:--------|:-----|:------|
| **Cards** | `0px 20px 40px rgba(134, 80, 67, 0.04)` | Tinted with primary, not black |
| **CTAs** | `0px 20px 40px rgba(134, 80, 67, 0.15–0.3)` | Stronger glow for action emphasis |
| **NavBar** | `0px -20px 40px rgba(134, 80, 67, 0.08)` | Upward tint for bottom bar |
| **Glassmorphism** | 80% opacity + `backdrop-blur-xl` | Headers and floating elements |

---

## Layout Patterns

### Bento Grid
- `grid grid-cols-2 gap-4` for metric cards
- `col-span-2` for featured/wide elements
- Each cell is self-contained with centered content

### Editorial Hero
- Full aspect ratio images (`aspect-[4/5]` mobile, `aspect-video` desktop)
- Gradient overlay from bottom
- Overlaid CTA with pill badges

### Asymmetric Cards
- Alternate `flex-row` and `flex-row-reverse` for visual rhythm
- Image takes 2/5 width, content takes 3/5
- Gradient fading from image edge into card background

---

## Do's and Don'ts

### ✅ Do
- Use `primary-fixed` (#ffdad2) for "highlighter" editorial text backgrounds
- Use asymmetrical margins to create movement
- Prioritize `surface-container-lowest` (#ffffff) for interactive elements
- Use `on-surface` (#201a19) for ALL text — never pure black
- Use tinted shadows with primary color — never grayscale
- Make buttons `active:scale-95` with `transition-transform`

### ❌ Don't
- Use 1px solid borders for sectioning (use background shifts)
- Use pure black (#000000) anywhere
- Use standard MD "elevated" shadows (too utility-looking)
- Crowd the screen — increase spacing to `10` (3.5rem) or `12` (4rem)
- Use "gym-black" or "tech-blue" color schemes
- Use standard progress bars (use orbs/soft gradients instead)

---

## Tailwind Config (Copy-Paste Ready)

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#865043",
        "primary-container": "#f4af9e",
        "primary-fixed": "#ffdad2",
        "primary-fixed-dim": "#fcb6a5",
        "on-primary": "#ffffff",
        "on-primary-container": "#734034",
        "on-primary-fixed": "#351007",
        "on-primary-fixed-variant": "#6a392d",
        "secondary": "#695b57",
        "secondary-container": "#f2ded9",
        "secondary-fixed": "#f2ded9",
        "secondary-fixed-dim": "#d5c3be",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#70615d",
        "on-secondary-fixed": "#231916",
        "on-secondary-fixed-variant": "#514440",
        "tertiary": "#675c58",
        "tertiary-container": "#cbbdb7",
        "tertiary-fixed": "#eedfda",
        "tertiary-fixed-dim": "#d2c4be",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#564c48",
        "on-tertiary-fixed": "#211a17",
        "on-tertiary-fixed-variant": "#4e4541",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "background": "#fff8f6",
        "on-background": "#201a19",
        "surface": "#fff8f6",
        "surface-bright": "#fff8f6",
        "surface-dim": "#e3d8d5",
        "surface-tint": "#865043",
        "surface-variant": "#ebe0dd",
        "surface-container": "#f7ebe8",
        "surface-container-low": "#fdf1ee",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#f1e6e3",
        "surface-container-highest": "#ebe0dd",
        "on-surface": "#201a19",
        "on-surface-variant": "#514440",
        "outline": "#83746f",
        "outline-variant": "#d5c3bd",
        "inverse-surface": "#352f2d",
        "inverse-on-surface": "#faeeeb",
        "inverse-primary": "#fcb6a5",
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans"],
        "body": ["Manrope"],
        "label": ["Manrope"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px",
      },
    },
  },
}
```

---

## Verification

After building any Evara screen or component, confirm:

- [ ] Uses `#fff8f6` (not white or gray) as page background
- [ ] No 1px solid borders for sectioning — only background shifts
- [ ] All text uses `on-surface` (#201a19), never pure #000000
- [ ] Headlines use Plus Jakarta Sans, body/labels use Manrope
- [ ] Shadows are tinted with primary (rgba(134, 80, 67, ...)), not grayscale
- [ ] CTA buttons use gradient from-primary to-primary-container
- [ ] Interactive elements use `surface-container-lowest` (#ffffff)
- [ ] Labels follow uppercase + tracking-widest + text-[10px] pattern
- [ ] TopAppBar uses glassmorphic style (80% opacity + backdrop-blur-xl)
- [ ] No standard progress bars — use SVG orbs or soft gradients

---

## References

- `references/design-tokens.md` — Complete token table, gradient specs, spacing scale
- `references/component-patterns.md` — Full HTML/Tailwind for every Evara component
- `stitch/evara_lumina/DESIGN.md` — Original "Luminous Editorial" creative brief

