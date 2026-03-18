# Evara Design Tokens

Complete token reference for the Evara "Luminous Editorial" design system.

---

## Color Palette (48 Tokens)

### Primary
| Token | Hex | CSS Variable |
|:------|:----|:-------------|
| `primary` | `#865043` | Earthy terracotta — CTAs, brand, active states |
| `primary-container` | `#f4af9e` | Gradient endpoint, badge background |
| `primary-fixed` | `#ffdad2` | Editorial highlight backgrounds |
| `primary-fixed-dim` | `#fcb6a5` | Inverse primary, dimmed fixed |
| `on-primary` | `#ffffff` | Text on primary backgrounds |
| `on-primary-container` | `#734034` | Text on primary-container |
| `on-primary-fixed` | `#351007` | Darkest text on fixed surfaces |
| `on-primary-fixed-variant` | `#6a392d` | Variant text on fixed surfaces |

### Secondary
| Token | Hex | Usage |
|:------|:----|:------|
| `secondary` | `#695b57` | Supporting text, membership dates |
| `secondary-container` | `#f2ded9` | Secondary badges, profile borders |
| `secondary-fixed` | `#f2ded9` | Fixed secondary surface |
| `secondary-fixed-dim` | `#d5c3be` | Dimmed fixed secondary |
| `on-secondary` | `#ffffff` | Text on secondary |
| `on-secondary-container` | `#70615d` | Text on secondary-container |
| `on-secondary-fixed` | `#231916` | Text on fixed secondary |
| `on-secondary-fixed-variant` | `#514440` | Variant text on fixed |

### Tertiary
| Token | Hex | Usage |
|:------|:----|:------|
| `tertiary` | `#675c58` | Tertiary elements |
| `tertiary-container` | `#cbbdb7` | Tertiary container areas |
| `tertiary-fixed` | `#eedfda` | Fixed tertiary surface |
| `tertiary-fixed-dim` | `#d2c4be` | Dimmed tertiary |
| `on-tertiary` | `#ffffff` | Text on tertiary |
| `on-tertiary-container` | `#564c48` | Text on tertiary-container |
| `on-tertiary-fixed` | `#211a17` | Text on fixed tertiary |
| `on-tertiary-fixed-variant` | `#4e4541` | Variant text |

### Error
| Token | Hex | Usage |
|:------|:----|:------|
| `error` | `#ba1a1a` | Destructive actions, sign out |
| `error-container` | `#ffdad6` | Error backgrounds (20% opacity) |
| `on-error` | `#ffffff` | Text on error |
| `on-error-container` | `#93000a` | Text on error-container |

### Surface Hierarchy
| Token | Hex | Layer Purpose |
|:------|:----|:--------------|
| `background` | `#fff8f6` | Page base |
| `surface` | `#fff8f6` | Same as background |
| `surface-bright` | `#fff8f6` | Bright surface variant |
| `surface-dim` | `#e3d8d5` | Dimmed state |
| `surface-tint` | `#865043` | Tint overlay color |
| `surface-variant` | `#ebe0dd` | Variant surface |
| `surface-container-lowest` | `#ffffff` | Interactive "lifted" elements ← TOUCH TARGETS |
| `surface-container-low` | `#fdf1ee` | Section backgrounds, AI bubbles |
| `surface-container` | `#f7ebe8` | Secondary grouping |
| `surface-container-high` | `#f1e6e3` | Hover/focus states |
| `surface-container-highest` | `#ebe0dd` | Secondary buttons, glassmorphism |

### Text & Outline
| Token | Hex | Usage |
|:------|:----|:------|
| `on-surface` | `#201a19` | Primary text (NEVER use #000000) |
| `on-surface-variant` | `#514440` | Secondary text, descriptions |
| `on-background` | `#201a19` | Text on background |
| `outline` | `#83746f` | Functional outlines |
| `outline-variant` | `#d5c3bd` | Ghost borders (20% opacity max) |

### Inverse (Dark Mode Seeds)
| Token | Hex |
|:------|:----|
| `inverse-surface` | `#352f2d` |
| `inverse-on-surface` | `#faeeeb` |
| `inverse-primary` | `#fcb6a5` |

---

## Typography Scale

### Font Imports
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Font Families
| Alias | Family | Weights |
|:------|:-------|:--------|
| `font-headline` | Plus Jakarta Sans | 700, 800 |
| `font-body` | Manrope | 400, 500, 600, 700 |
| `font-label` | Manrope | 500, 700 |

### Type Scale Mapping
| Component | Classes |
|:----------|:--------|
| Display (motivation/milestones) | `font-headline text-4xl md:text-5xl font-extrabold tracking-tight` |
| Page title | `font-headline text-3xl font-extrabold tracking-tight` |
| Section heading | `font-headline text-2xl font-bold` |
| Card title | `font-headline text-xl font-bold tracking-tight` |
| Body | `font-body text-sm leading-relaxed` |
| Label (uppercase) | `font-label text-[10px] font-bold uppercase tracking-widest` |
| Label (wide tracking) | `font-label text-xs uppercase tracking-[0.2em]` |

---

## Spacing Scale

| Token | Size | Usage |
|:------|:-----|:------|
| `gap-1` | 0.25rem | Fire icon spacing |
| `gap-2` | 0.5rem | Tight inline elements |
| `gap-3` | 0.75rem | Icon + text groups |
| `gap-4` | 1rem | Standard card gaps, grid gaps |
| `gap-6` | 1.5rem | Section internal spacing |
| `space-y-6` | 1.5rem | Section stacking |
| `space-y-10` | 2.5rem | Major section spacing |
| `px-6` | 1.5rem | Page horizontal padding |
| `py-4` | 1rem | TopAppBar vertical padding |
| `pb-32` | 8rem | Bottom padding for navbar clearance |
| `pt-24` | 6rem | Top padding for fixed header clearance |
| `mb-12` | 3rem | Large section separation |

---

## Border Radius

| Token | Size | Usage |
|:------|:-----|:------|
| `rounded` (DEFAULT) | 1rem (16px) | Standard cards, sections |
| `rounded-lg` | 2rem (32px) | Main cards, profile avatars |
| `rounded-xl` | 3rem (48px) | CTA buttons, large containers |
| `rounded-full` | 9999px | Pills, tags, avatars, nav tabs |

---

## Shadows

| Name | Spec | Tailwind |
|:-----|:-----|:---------|
| Editorial (card) | `0px 20px 40px rgba(134, 80, 67, 0.04)` | `shadow-[0px_20px_40px_rgba(134,80,67,0.04)]` |
| CTA glow (light) | `0px 20px 40px rgba(134, 80, 67, 0.15)` | `shadow-[0px_20px_40px_rgba(134,80,67,0.15)]` |
| CTA glow (strong) | `0px 20px 40px rgba(134, 80, 67, 0.3)` | `shadow-[0px_20px_40px_rgba(134,80,67,0.3)]` |
| Stats gradient card | `0px 20px 40px rgba(134, 80, 67, 0.12)` | `shadow-[0px_20px_40px_rgba(134,80,67,0.12)]` |
| BottomNav upward | `0px -20px 40px rgba(134, 80, 67, 0.08)` | `shadow-[0px_-20px_40px_rgba(134,80,67,0.08)]` |
| Progress glow | `0 0 15px rgba(244, 175, 158, 0.5)` | `shadow-[0_0_15px_rgba(244,175,158,0.5)]` |

> **Rule:** ALL shadows use the primary terracotta tint. NEVER use grayscale/black shadows.

---

## Gradients

| Name | Spec | Usage |
|:-----|:-----|:------|
| Primary CTA | `from-primary to-primary-container` at 135° | Primary buttons, active nav tab |
| Stats banner | `from-[#865043] to-[#f4af9e]` at 135° | Profile stats hero |
| Image overlay | `from-black/80 via-black/20 to-transparent` | Hero card text readability |
| Bottom fade | `from-background via-background to-transparent` | Footer fade-in |
| SVG chart fill | `from-primary/20 to-primary/0` vertical | Area chart gradient |

---

## Icon System

**Library:** Google Material Symbols Outlined

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

### Default settings
```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

### Filled variant (active states)
```css
style="font-variation-settings: 'FILL' 1;"
```

### Common Evara icons
| Context | Icon | Filled? |
|:--------|:-----|:--------|
| Home tab | `home` | Active: yes |
| Programs tab | `fitness_center` | Active: yes |
| Progress tab | `insert_chart` | Active: yes |
| Profile tab | `person` | Active: yes |
| AI Coach | `auto_awesome`, `smart_toy`, `psychology` | Yes |
| Streak fire | `local_fire_department` | Yes |
| Play workout | `play_arrow` | Yes |
| Achievement | `workspace_premium` | Yes |
| Timer | `timer`, `schedule` | No |
| Notifications | `notifications` | No |
| Navigation | `arrow_forward`, `chevron_right` | No |
