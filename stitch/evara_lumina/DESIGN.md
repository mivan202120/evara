# Design System Strategy: The Luminous Editorial

## 1. Overview & Creative North Star: "The Digital Curator"
This design system rejects the cluttered, high-intensity aesthetic of traditional fitness apps. Instead, we embrace **The Digital Curator**—a North Star that treats fitness data and coaching as high-end lifestyle content. 

To move beyond a "template" look, we utilize **intentional asymmetry** and **editorial pacing**. This means breaking the rigid grid: images should often bleed off-edge or overlap container boundaries, and large `display-lg` typography should be used to create moments of "breath" rather than just information density. The goal is to make the user feel like they are flipping through a premium wellness magazine, where the interface recedes to let their progress and the AI coaching shine.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in warmth and human skin tones, moving away from "tech-blue" or "gym-black."

*   **The Primary Core:** Use `primary` (#865043) for high-impact actions. It is a sophisticated earthy terracotta that feels grounded and premium.
*   **The "No-Line" Rule:** **1px solid borders are strictly prohibited for sectioning.** To define boundaries, use background shifts. A section containing a workout summary should use `surface-container-low` (#fdf1ee) sitting against the main `background` (#fff8f6). 
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper. 
    *   *Base:* `surface`
    *   *Secondary Grouping:* `surface-container`
    *   *Prominent Floating Elements:* `surface-container-lowest` (pure white #ffffff) to create a "lifted" feel.
*   **The Glass & Gradient Rule:** For floating headers or navigation bars, use `surface` at 80% opacity with a `backdrop-filter: blur(20px)`. Main CTAs should utilize a subtle linear gradient from `primary` (#865043) to `primary_container` (#f4af9e) at a 135-degree angle to add "soul" and dimension.

---

## 3. Typography: The Editorial Voice
We pair the geometric confidence of **Plus Jakarta Sans** with the approachable clarity of **Manrope**.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Editorial Hooks." Use `display-lg` for daily motivation or big glute-gain milestones. The tracking should be slightly tightened (-2%) for a premium look.
*   **Titles & Body (Manrope):** Manrope provides a clean, modern bridge. `title-lg` should be used for workout names, while `body-md` handles all AI coaching insights.
*   **Hierarchy as Identity:** Always maintain a high contrast between headline sizes and body text. If a headline is `headline-lg`, ensure the supporting text is `body-md` to create the "white space" luxury feel common in high-end beauty brands.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-heavy" for this system. We use light and tone to imply physics.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural lift that feels organic rather than digital.
*   **Ambient Shadows:** Where a shadow is functional (e.g., a floating "Start Workout" button), use a diffused glow. 
    *   *Specs:* `box-shadow: 0px 20px 40px rgba(134, 80, 67, 0.08);` (Note the use of a tinted shadow using the Primary color rather than black).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use `outline_variant` (#d5c3bd) at **20% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** Use for overlays. A "Rest Timer" modal should be a `surface_container_highest` layer with 70% opacity and high blur, making the gym environment feel integrated into the UI.

---

## 5. Components: Softness & Intent

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `xl` (3rem) corner radius. Typography: `title-sm` (Manrope).
*   **Secondary:** `surface_container_high` background with `on_surface` text. No border.
*   **Tertiary:** Text-only using `primary` color, bold weight, with a 2px underline spaced 4px below the baseline.

### Cards & Lists
*   **The "No-Divider" Rule:** Forbid horizontal lines between list items. Use the **Spacing Scale** `6` (2rem) to separate items, or alternate background tints (`surface` vs `surface-container-low`).
*   **Rounding:** All main cards must use `lg` (2rem) corners. Interaction chips (e.g., "Glutes", "15 mins") use `full` (9999px) for a "pill" aesthetic.

### Input Fields
*   **Style:** Minimalist. Only a bottom "Ghost Border" (20% `outline_variant`) or a solid `surface_container` fill. 
*   **States:** On focus, the bottom border transitions to 100% `primary`.

### Specialized Components
*   **Progress Orbs:** Use soft radial gradients (Peach to Rose) instead of hard-line progress bars to track weekly goals.
*   **AI Coach Bubbles:** Use `surface_container_low` with a unique asymmetrical radius: `top-left: sm`, `top-right: xl`, `bottom-right: xl`, `bottom-left: xl`. This creates a distinct "chat" identity.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a header image might have more padding on the left than the right to create movement.
*   **Do** use `primary_fixed` (#ffdad2) for subtle background highlights behind text to create a "highlighter" editorial effect.
*   **Do** prioritize `surface_container_lowest` (#ffffff) for any element the user needs to touch/interact with.

### Don't
*   **Don't** use pure black (#000000). Always use `on_surface` (#201a19) for text to maintain the warm, premium tone.
*   **Don't** use standard Material Design "elevated" shadows. They feel too "utility" and break the "beauty brand" vibe.
*   **Don't** crowd the screen. If a screen feels full, increase the spacing to `10` (3.5rem) or `12` (4rem) and implement vertical scrolling. Space is a luxury feature.