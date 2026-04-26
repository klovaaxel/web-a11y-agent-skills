# Contributing

## Scope

This repository publishes reusable accessibility skills and agent assets for multiple platforms:

- Cursor
- Claude Code
- GitHub Copilot
- OpenCode

## Change Workflow

1. Update skill content in `skills/<skill-name>/`.
2. Update platform agent or prompt assets in `agents/<platform>/` when behavior changes.
3. Update install scripts in `scripts/` if files or target directories change.
4. Update `README.md` counts, install examples, and compatibility notes.
5. Run `npm run validate`.

## Adding A New Skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Ensure frontmatter `name` matches `<skill-name>`.
3. Include a `description` with explicit trigger wording (`Use when ...`).
4. Keep `SKILL.md` focused; move deeper material into nearby reference files.
5. Add the skill entry to `package.json` under `agents.skills`.
6. Add README entries:
   - intent-oriented use-case section
   - included skills list
   - per-skill install example where relevant

## Platform Assets

- Cursor agents: `agents/cursor/*.md`
- Claude agents: `agents/claude/*.md`
- Copilot prompts: `agents/copilot/*.prompt.md`
- OpenCode agents: `agents/opencode/*.md`

If skill paths or names change, update all platform references.

## Validation Requirements

- `npm run validate` passes.
- README skill count matches filesystem count.
- Markdown links resolve.
- Installer scripts still target correct paths.
