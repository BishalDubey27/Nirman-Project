# Nirman Project - Frontend Design System

This document outlines the design tokens and system implemented across the Nirman Project's frontend application, aligning with the new exported Stitch UI mocks.

## 1. Typography

The application uses a two-font system from Google Fonts:
- **Headline/Display Font**: `Space Grotesk` (Weights: 500, 700). Used for major numerical stats, primary headings, and brand identity.
- **Body/Label Font**: `Inter` (Weights: 300, 400, 500, 600, 700). Used for all body text, navigation tabs, inputs, and button labels.

## 2. Color Palette (Dark Theme First)

The UI defaults to a dense, dark workspace design.

### Structural Colors
- **Background**: `#111316` (Deep black/gray)
- **Surface**: `#111316`
- **Surface Container Lowest**: `#0c0e11`
- **Surface Container Low**: `#1a1c1f`
- **Surface Container**: `#1e2023`
- **Surface Container High**: `#282a2d`
- **Surface Container Highest**: `#333538`

### Primary Brand (Cyan/Teal spectrum)
- **Primary**: `#c3f5ff`
- **On Primary**: `#00363d`
- **Primary Container**: `#00e5ff`
- **Primary Fixed Dim**: `#00daf3`

### Secondary / Status (Green spectrum - Health & Success)
- **Secondary**: `#40e56c`
- **On Secondary**: `#003912`
- **Secondary Container**: `#02c953`

### Tertiary / Warning (Yellow/Orange spectrum)
- **Tertiary Fixed Dim**: `#ffb950`
- **Tertiary Container**: `#ffc779`

### Error / Escalation (Red spectrum)
- **Error**: `#ffb4ab`
- **On Error**: `#690005`
- **Error Container**: `#93000a`

### Accents & Borders
- **Outline**: `#849396`
- **Outline Variant**: `#3b494c`

## 3. Component System

### Top App Bar
- Placed `fixed top-0`, `h-16`, styled with `#1c1f24` background. Contains brand logo (`Space Grotesk`) and a fast navigation toggle.

### Bottom Navigation Bar
- Mobile/Tablet focused sticky bar at the bottom: `fixed bottom-0`.
- Includes a subtle backdrop blur: `bg-[#111316]/80 backdrop-blur-xl`.
- Icons use Material Symbols Outlined.

### Cards (Bento Grid Style)
- Containers default to `bg-surface-container-high` or `bg-surface-container-low`.
- Feature `rounded-xl` and `border border-white/5` to create subtle separation against the dark background.
- Employs absolute positioning for blurred gradient orbs (e.g., `blur-[80px]`) behind key metrics to give a glow effect.

## 4. UI Library Mapping
- **Icons**: Material Symbols Outlined
- **Framework**: Tailwind CSS configured with `darkMode: "class"`
- **Interactivity**: First-time users will be guided via a `react-joyride` implementation highlighting major UI segments over these brand colors.
