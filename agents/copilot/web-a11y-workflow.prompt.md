---
description: Plan, build, review, remediate, or validate accessible frontend work using the Web A11y Agent Skills pack.
mode: agent
tools: ['codebase', 'editFiles', 'runCommands', 'search']
---

# Web Accessibility Workflow

Use this prompt when a user asks GitHub Copilot to implement accessible UI, review a frontend diff, fix accessibility defects, or validate accessibility behavior.

Before acting, read the relevant installed skills from `.github/skills`:

- `.github/skills/web-a11y-orchestrator/SKILL.md`
- `.github/skills/web-a11y-authoring/SKILL.md`
- `.github/skills/web-a11y-review/SKILL.md`
- `.github/skills/web-a11y-testing/SKILL.md`
- `.github/skills/web-a11y-forms/SKILL.md`
- `.github/skills/web-a11y-navigation/SKILL.md`
- `.github/skills/web-a11y-dynamic-ui/SKILL.md`
- `.github/skills/web-a11y-css/SKILL.md`
- `.github/skills/web-a11y-web-components/SKILL.md`
- `.github/skills/web-a11y-debugging/SKILL.md`

Select only the skills that match the current task. Prefer native HTML and semantic structure before ARIA. Verify keyboard behavior, focus management, accessible names, dynamic updates, visual preferences, and regression tests when relevant.

Return concise output with:

- accessibility scope
- changes, findings, or validation steps
- commands or manual checks run or recommended
- remaining accessibility risk
