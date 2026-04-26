# Web A11y Agent Skills

Framework-agnostic web accessibility skills and Cursor subagents for AI coding agents.

This library helps agents plan, build, review, remediate, and validate accessible frontend work across semantic HTML, keyboard/focus behavior, forms, navigation, dynamic UI, CSS user preferences, web components, and accessibility testing.

## Status

Public preview. Skill names and install flow may still change before 1.0.

## What's Included

### Skills

- `web-a11y-orchestrator`: routes accessibility tasks to the right skills and coordinates the full workflow.
- `web-a11y-authoring`: builds accessible components and pages using semantic-first implementation.
- `web-a11y-review`: reviews UI changes for accessibility defects and missing tests.
- `web-a11y-testing`: validates UI with automation, keyboard checks, and screen reader smoke tests.
- `web-a11y-forms`: covers labels, descriptions, grouping, validation, errors, search, and multi-step flows.
- `web-a11y-navigation`: covers landmarks, headings, skip links, breadcrumbs, menus, disclosure, and wayfinding.
- `web-a11y-dynamic-ui`: covers filters, pagination, live regions, progress, sorting, and data tables.
- `web-a11y-css`: covers contrast, focus styles, reduced motion, forced colors, zoom, and CSS semantic integrity.
- `web-a11y-web-components`: covers custom elements, Shadow DOM, slots, focus delegation, and ARIA limitations.
- `web-a11y-debugging`: covers accessibility tree inspection, custom debug rules, CI checks, and tooling gaps.

### Cursor Subagents

- `a11y-orchestrator`
- `a11y-component-writer`
- `a11y-code-reviewer`
- `a11y-remediator`
- `a11y-test-driver`

## Install Skills

The recommended install path is the open agent skills CLI. It discovers `skills/*/SKILL.md` in this repository.

```bash
npx skills add klovaaxel/web-a11y-agent-skills -a cursor -g --skill '*'
```

List available skills without installing:

```bash
npx skills add klovaaxel/web-a11y-agent-skills --list
```

Install from a local checkout:

```bash
npx skills add . -a cursor -g --skill '*'
```

For project-local installation, omit `-g`:

```bash
npx skills add . -a cursor --skill '*'
```

## Install Cursor Subagents

Cursor subagents are not part of the portable Agent Skills standard, so install them separately:

```bash
node scripts/install-cursor-agents.mjs
```

Use symlinks during development:

```bash
node scripts/install-cursor-agents.mjs --symlink
```

By default, the script installs to `~/.cursor/agents`. Override with:

```bash
WEB_A11Y_AGENT_SKILLS_AGENT_DIR=/path/to/agents node scripts/install-cursor-agents.mjs
```

## Suggested Agent Workflow

Use these roles as a loop:

1. Ask `a11y-orchestrator` to identify the relevant accessibility passes.
2. Ask `a11y-component-writer` to implement the component or page.
3. Ask `a11y-code-reviewer` to review the changed UI.
4. Ask `a11y-remediator` to fix confirmed defects.
5. Ask `a11y-test-driver` to validate automation, keyboard, and screen reader smoke paths.

## Public Source Basis

These skills synthesize public web accessibility practice. Useful public references include:

- W3C WCAG
- WAI Tutorials
- WAI-ARIA Authoring Practices Guide
- MDN Web Docs
- WebAIM articles and tools
- axe and browser DevTools documentation

## Acknowledgements

This project is strongly influenced by *Web Accessibility Cookbook* by Manuel Matuzovic (O'Reilly). The book helped shape the skill pack's practical focus on real frontend patterns, implementation trade-offs, and verification workflows.

These skills are original agent workflows and are not a substitute for the book. If you want the complete recipes, examples, and explanations, buy or read the original work.

## License

MIT
