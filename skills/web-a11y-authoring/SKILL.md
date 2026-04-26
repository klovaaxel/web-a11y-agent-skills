---
name: web-a11y-authoring
description: Builds accessible pages and components with semantic HTML, correct names/roles/states, keyboard support, focus management, and native controls first. Use when implementing or refactoring frontend UI.
---

# Web A11y Authoring

## Core Rules

1. Prefer native HTML controls before ARIA or custom widgets.
2. Use links for navigation and buttons for actions.
3. Ensure every interactive control has a clear accessible name.
4. Keep DOM order aligned with reading and interaction order.
5. Preserve visible focus and keyboard operation for every interaction.
6. Use ARIA only to supplement semantics that cannot be expressed natively.

## Authoring Checklist

```markdown
Authoring checklist

- [ ] Page has meaningful title, language, landmarks, and heading structure
- [ ] Controls expose role, name, state, and value correctly
- [ ] Interactions work with keyboard alone
- [ ] Focus is visible, logical, and intentionally managed
- [ ] Hidden content is not accidentally focusable or announced
- [ ] Native control behavior is preserved under custom styling
```

## Common Patterns

- Toggle button: native `button` with synchronized state such as `aria-pressed`.
- Disclosure: button with synchronized `aria-expanded` and hidden content state.
- Dialog: intentional initial focus, contained interaction while open, focus restored on close.
- Icon-only control: visible or programmatic accessible name that describes the action.

## Output

Describe the semantic choices, ARIA states used, keyboard behavior, and manual test plan.
