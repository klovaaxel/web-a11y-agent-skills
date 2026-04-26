# Skill Quality Checklist

Use this checklist before shipping skill changes.

- Description states what the skill does and when to use it.
- Description includes clear triggers (for example, `Use when ...`).
- `SKILL.md` stays focused on workflow and decision guidance.
- Concrete examples are included when judgment is non-obvious.
- Deeper references are split into one-level-local files (for example, `PATTERNS.md`).
- Skill frontmatter `name` matches folder name.
- Platform assets (Cursor, Claude, Copilot, OpenCode) reflect current skill names and paths.
- Installer scripts exist and target expected platform directories.
- README skill counts, use-case sections, and compatibility matrix are accurate.
- `npm run validate` passes without errors.
