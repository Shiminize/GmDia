
# Component Development Rules: Adherence to `index.css` Design System

**Core Principle:** All new and modified components MUST strictly adhere to the established design system defined in `/client/src/index.css`. Do not introduce new styles or deviate from the existing typography, color palette, spacing, or component definitions. The goal is to maintain visual consistency and a centralized styling architecture.

---

### 1. Color Palette

-   **DO NOT** use hardcoded color values (e.g., `#FFFFFF`, `rgb(255, 255, 255)`, `white`).
-   **MUST** use the predefined CSS custom properties for colors via Tailwind CSS utility classes.
    -   For background colors, use utilities like `bg-primary`, `bg-secondary`, `bg-accent`.
    -   For text colors, use utilities like `text-foreground`, `text-primary-foreground`, `text-muted-foreground`.
    -   For borders, use `border-border`.
-   **Example:**
    -   **Incorrect:** `<div style={{ color: '#1A1A1A' }}>...</div>`
    -   **Correct:** `<div className="text-primary">...</div>`

### 2. Typography

-   **DO NOT** use inline `style` attributes to define `font-family`, `font-size`, `font-weight`, or `line-height`.
-   **MUST** use the predefined typography utility classes.
    -   **Font Families:** Apply fonts using `font-heading`, `font-body`, or `font-accent`.
    -   **Font Sizes:** Use responsive text size utilities like `text-base`, `text-lg`, `text-4xl`.
    -   **Font Weights:** Use weight utilities like `font-normal`, `font-medium`, `font-bold`.
    -   **Line Heights:** Use leading utilities like `leading-normal`, `leading-relaxed`, `leading-tight`.
-   **Example:**
    -   **Incorrect:** `<h1 style={{ fontFamily: 'Playfair Display', fontSize: '36px' }}>Title</h1>`
    -   **Correct:** `<h1 className="font-heading text-4xl">Title</h1>`

### 3. Spacing & Sizing

-   **DO NOT** use hardcoded `margin`, `padding`, or `width`/`height` values.
-   **MUST** use Tailwind's spacing scale, which is configured to use the `--space-*` variables from `index.css`.
    -   Use utilities like `p-4` (padding), `m-8` (margin), `gap-2` (grid/flex gap).
-   **MUST** use the predefined border-radius variables via Tailwind utilities like `rounded-medium` or `rounded-lg`.
-   **Example:**
    -   **Incorrect:** `<div style={{ margin: '10px', borderRadius: '12px' }}>...</div>`
    -   **Correct:** `<div className="m-2.5 rounded-xl">...</div>` (Assuming `m-2.5` and `rounded-xl` map to your desired values)

### 4. Components & Utilities

-   **MUST** reuse existing component classes defined in `index.css` under the `@layer components` section.
    -   For buttons, use `.btn-primary`, `.btn-secondary`, `.btn-outline`.
    -   For cards, use `.card-luxury`.
    -   For links, use `.link-primary`.
-   **MUST** leverage utility classes from the `@layer utilities` section for effects and layouts (e.g., `.interactive-scale`, `.responsive-grid`).
-   **DO NOT** create new, one-off CSS classes or use inline styles for functionality that can be achieved with existing utilities.

### 5. Prohibitions

-   **Strictly Forbidden:** The use of the inline `style` attribute for any property (color, font, spacing, etc.) that is governed by the `index.css` design system.
-   **Strictly Forbidden:** Adding new CSS rules to component-specific files or `<style>` tags if a utility or variable for the desired effect already exists in `index.css`.

By following these rules, we ensure that every component is a seamless and consistent part of the application's user interface.
