# Example Agent Output

Example prompt:

```text
Use a11y-code-reviewer to review this modal diff.
```

Example response:

```markdown
Findings

- High: The close control is a div with an onClick handler, so keyboard users cannot reach or activate it. Fix: use a button with an accessible name such as "Close dialog" and preserve visible focus.
- High: Focus is not moved into the dialog on open or restored to the opener on close, so screen reader and keyboard users can lose context. Fix: focus the dialog heading or first actionable control on open and restore focus after close.
- Medium: The dialog has no accessible name. Fix: connect the visible heading with aria-labelledby on the dialog container.

Test gaps
- Add a keyboard smoke test for open, tab order, Escape close, and focus restoration.
- Add an automated check that the dialog has role="dialog", aria-modal="true", and a valid accessible name.

Strong patterns
- The visible heading is clear and can be reused as the dialog name.
- The backdrop click behavior does not block keyboard dismissal once Escape handling is added.
```

This is illustrative output, not a recorded review from a specific pull request.
