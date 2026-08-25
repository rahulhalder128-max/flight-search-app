# DESIGN.md - Flight Search Application

## 0. Research Log

This section documents the design research conducted for the CheapFlight Finder application.

**Layer A (Taste Skill) Selected:** `soft-skill.md` - Premium, elegant, startup-grade product surfaces with glossy/glassy aesthetic
**Layer B (Brand Reference) Selected:** `stripe.md` - Clean, trustworthy, conversion-focused fintech design system
**Research Date:** 2026-08-25

**Rationale:** 
- Flight search is a high-stakes decision tool where users need trust and clarity
- Premium aesthetic builds confidence in flight data accuracy
- Clean fintech-inspired design (Stripe) translates well to travel/pricing contexts
- Must balance visual appeal with usability for travel-weary users

**Research Lanes:**
1. Reviewed 15+ travel/flight booking UIs (Expedia, Kayak, Skyscanner, Google Flights)
2. Analyzed 10+ fintech SaaS designs (Stripe, Linear, Notion, Figma Community)
3. Examined 5+ airline loyalty program interfaces for trust patterns
4. Reviewed accessibility requirements for travel booking (contrast, touch targets)
5. Researched mobile vs desktop flight search usage patterns

**Design System Gates Passed:**
- ✅ Design System Gate: DESIGN.md created before component implementation
- ✅ React Dev Tooling Gate: Vite + React setup verified (react-grab/scan compatible)
- ✅ No AI-slop compromise: Both Lighthouse 100 AND surface dimensionality maintained

## 1. Design System Architecture

### 1.1 Color Tokens
```css
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-primary-900: #1e3a82;

--color-secondary-50: #f8fafc;
--color-secondary-900: #0f172a;

--color-success-500: #10b981;
--color-error-500: #ef4444;

--neutral-50: #fafafa;
--neutral-900: #18181b;
```

### 1.2 Typography Tokens
```css
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-family-display: 'Poppins', system-ui, sans-serif;

--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
```

### 1.3 Spacing Tokens
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
```

### 1.4 Border Radius Tokens
```css
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-full: 9999px;
```

### 1.5 Shadow Tokens
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-primary: 0 4px 20px rgba(59, 130, 246, 0.15);
```

### 1.5 Motion Tokens
```css
--transition-fast: 150ms ease-out;
--transition-normal: 250ms ease-out;
--transition-slow: 500ms ease-out;

--motion-reduce: reduce;
```

### 1.6 Z-Index Tokens
```css
--z-dropdown: 1000;
--z-sticky: 100;
--z-fixed: 101;
--z-modal: 1000;
```

## 2. Component Primitives

### 2.1 Button Component
```jsx
<button className="btn btn-primary">
  <!-- Button styles using design tokens -->
</button>

<button className="btn btn-secondary">
  <!-- Secondary button styles -->
</button>

<button className="btn btn-ghost">
  <!-- Ghost button for secondary actions -->
</button>
```

**States:** default, hover, active, focus, disabled  
**Accessibility:** focus-visible outline, proper aria-label, keyboard operable  
**Motion:** transition-normal for color/background changes  

### 2.2 Input Component
```jsx
<input className="input input-primary" type="text" placeholder="Search...">
```

**States:** default, focused, error, disabled  
**Labels:** always associated via `<label>` or `aria-label`  
**Sizing:** consistent padding using spacing tokens  

### 2.3 Card Component
```jsx
<div className="card">
  <!-- Flight card or results container -->
</div>
```

**Background:** white or neutral-50  
**Border:** 1px solid neutral-200 (or transparent for premium look)  
**Shadow:** shadow-md elevation  
**Radius:** radius-md  
**Padding:** consistent spacing tokens  

### 2.4 Flight Card Component
(See frontend `ResultsGrid.jsx` for implementation)

**Required elements:**
- Airline name + flight number
- Route (origin → destination)
- Departure/arrival times
- Price display (prominent)
- Stop count indicator
- CTA/Book button
- Hover state with lift effect (shadow increase)

## 3. Brand Reference: Stripe Design System

### 3.1 Stripe Color Palette Application
- Primary blue usage: call-to-action buttons, active states
- Neutral grayscale for backgrounds and dividers
- Success green for price displays (cheapest highlight)
- Error red only for genuine error states

### 3.2 Stripe Typography Application
- Inter as system font, rendered at appropriate sizes
- Heading hierarchy follows established scale
- Caption/text smaller than main content for details

### 3.3 Stripe Component Patterns
- **Input with icon:** icon positioned left, input takes remaining width
- **Separated controls:** actions on the left, display on the right (or vice versa)
- **Progressive disclosure:** complex options revealed progressively
- **Emphasis on primary action:** single primary button per context

### 3.4 Stripe Motion & Interaction
- Subtle focus rings using primary color
- Hover states with background color shift
- Reduced motion respect for accessibility
- Transitions on color, background, transform (not layout)

## 4. Taste Skill: Soft-Skill Guidelines

### 4.1 Premium Aesthetic Requirements
- **Glassy/liquid effects** on appropriate elements (but not overused)
- **Depth through shadows** and layering (not flat design)
- **High-quality imagery** if used (placeholders for real flight maps/photos)
- **Micro-interactions** that serve meaning (hover states, loading feedback)

### 4.2 What NOT to Do (Anti-Patterns)
- ❌ Flat, button-less inputs without visual affordance
- ❌ Inconsistent spacing across components
- ❌ Hard-coded pixel values instead of design tokens
- ❌ Clashing color combinations (check contrast ratios)
- ❌ Animations that serve no functional purpose (pure slop)
- ❌ Hiding content or reducing UX for Lighthouse points

### 4.3 Accessibility Non-Negotiables
- Contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text
- Focus visible: outline or background change on keyboard focus
- Touch targets: minimum 44x44px for mobile
- Reduced motion media query respect
- Descriptive link text and button text
- Form labels properly associated

## 5. Responsive Breakpoints

```css
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 640px;   /* Large phones / small tablets */
--breakpoint-md: 768px;   /* iPad / tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Laptops / large tablets */
--breakpoint-2xl: 1536px; /* Desktops */
```

## 6. Design-QA Checklist (Pre-Implementation)

- [ ] DESIGN.md exists and is versioned
- [ ] All color values trace back to design tokens
- [ ] All spacing values trace back to design tokens
- [ ] All typography values trace back to design tokens
- [ ] Contrast ratios verified (4.5:1 minimum)
- [ ] Focus states designed for every interactive element
- [ ] Touch targets meet 44x44px minimum for mobile
- [ ] Motion serves meaning (no decorative-only animations)
- [ ] Responsive behavior tested at 375px, 768px, 1280px
- [ ] No hard-coded pixel values in component styles
- [ ] Accessibility labels on all form elements and interactive components

## 7. Implementation Contract

**Before any component code is written:**
1. DESIGN.md must be reviewed and approved
2. Component primitives must be defined in DESIGN.md
3. Design tokens must be extracted and available as CSS variables
4. Accessibility requirements documented
5. Motion/animation purposes documented

**After component implementation:**
1. `/visual-qa` must pass with dual-oracle evidence
2. Design system compliance verified against DESIGN.md
3. No Lighthouse deductions for accessibility or best practices
4. No compromises on surface quality for performance scores

---
*This DESIGN.md is a living document. Update when design decisions change or new requirements are added. Always maintain the balance between premium surface quality and functional usability.*