# Design System Strategy: The Autonomous Pulse

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Foreman"**

This design system is engineered to move beyond the cold, static nature of traditional SaaS interfaces. It embraces a "Digital Foreman" aesthetic—authoritative, high-precision, and hyper-aware. We are not building a dashboard; we are building a mission-control cockpit for mobile. 

The system breaks the "template" look through **Intentional Asymmetry** and **Tonal Depth**. Instead of a standard vertical scroll of uniform boxes, we utilize overlapping "Glass" layers and varied card heights to create a sense of physical space. Autonomous AI states are treated as "living" entities with pulsing atmospheric glows, while human-required tasks are anchored in high-contrast, tactile surfaces.

---

## 2. Colors: Tonal Atmosphere
We do not use color simply for decoration; we use it to define the "health" of the project environment.

### The Palette
*   **Atmosphere (Background):** `#111316` (Deep Charcoal). This is our void; everything must emerge from here.
*   **The Cyber Pulse (Primary):** `#c3f5ff` and `#00daf3`. Used for active AI operations and high-tech highlights.
*   **The Health Signal (Secondary):** `#40e56c` (Emerald). Use this strictly for success states and "healthy" project metrics.
*   **The Risk Warning (Tertiary):** `#ffb950` (Amber). Used to signal human intervention or potential bottlenecks.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for secondary information sitting on a `surface` background. The eye should perceive depth through value changes, not lines.

### Signature Textures
*   **The AI Glow:** For active autonomous agents, use a radial gradient background: `primary` at 15% opacity fading to 0% over a 120px radius.
*   **Glassmorphism:** Floating action buttons and high-level overlays must use `surface_container` colors with a 20px `backdrop-blur`. This ensures the data beneath remains a visible "shadow," maintaining the user's context.

---

## 3. Typography: Editorial Precision
The typography strategy pairs the technical rigor of **Inter** with the futuristic, wide stance of **Space Grotesk**.

*   **Display & Headlines (Space Grotesk):** Use `display-md` (2.75rem) for high-level project names. The wider tracking of Space Grotesk feels engineered and custom.
*   **Data & Body (Inter):** All data-heavy views must use `body-md` (0.875rem) or `label-md`. Inter’s high x-height ensures legibility even when monitoring complex SaaS metrics on a small mobile screen.
*   **Hierarchy through Scale:** To move away from generic UI, create high contrast between titles and body. A `headline-lg` should often sit directly above a `label-sm` to create a sophisticated, editorial "Spec Sheet" look.

---

## 4. Elevation & Depth: Tonal Layering
We reject the standard Material Design drop-shadow. Instead, we use **Tonal Layering**.

*   **The Layering Principle:** 
    *   **Level 0 (Base):** `surface` (`#111316`)
    *   **Level 1 (Sections):** `surface-container-low`
    *   **Level 2 (Cards):** `surface-container-high`
*   **Ambient Shadows:** If a card must "float" (e.g., a critical risk alert), use a 24px blur shadow with 6% opacity, using a tint of `primary` (`#c3f5ff`) rather than black. This creates a "glow" rather than a "shadow."
*   **The Ghost Border:** If a container requires a boundary for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Primitives

### Autonomous vs. Human States
*   **Autonomous Agent Card:** Uses a subtle `primary` glow (`surface-tint`) and `primary_fixed_dim` typography. The card background should be `surface_container_highest`.
*   **Human-Required Card:** Uses a `tertiary_container` (Amber) left-edge accent (4px wide) and high-contrast `on_surface` text.

### Buttons & Interaction
*   **Primary Action:** A gradient-filled container (`primary` to `primary_container`) with `on_primary` text. Corners use the `md` (0.375rem) radius for a "tech-military" feel.
*   **Secondary Action:** "Ghost" style. No fill, with a `Ghost Border` (20% `outline`).
*   **The "Pulse" Indicator:** A 6px dot using `secondary` (Green) with a secondary-container outer ring for active, healthy project streams.

### Cards & Lists
*   **The No-Divider Rule:** Forbid the use of horizontal lines. Use 16px of vertical whitespace or a shift from `surface-container-low` to `surface-container-highest` to separate list items.
*   **Input Fields:** Use `surface_container_lowest` for the input track. The active state is signaled by a 1px `primary` bottom-border ONLY, rather than a full box stroke.

---

## 6. Do’s and Don'ts

### Do:
*   **DO** use wide letter-spacing (0.05em) for `label-sm` to give it a technical, "schematic" feel.
*   **DO** lean into "Container Nesting." A `surface-container-high` card should contain `surface-container-lowest` inner chips to create a sense of recessed tech.
*   **DO** use `backdrop-blur` on the Bottom Navigation bar to keep the "Pulse" of the data visible as it scrolls beneath.

### Don’t:
*   **DON'T** use 100% white (`#FFFFFF`) for text. Use `on_surface` (`#e2e2e6`) to reduce eye strain in high-tech, dark environments.
*   **DON'T** use standard 44px rounded buttons. Stick to the `md` (0.375rem) or `lg` (0.5rem) scale to maintain a sophisticated, non-bubblegum aesthetic.
*   **DON'T** use "Drop Shadows" to create depth. If the colors don't provide enough separation, your surface hierarchy is incorrect. Adjust your `surface-container` tiers instead.