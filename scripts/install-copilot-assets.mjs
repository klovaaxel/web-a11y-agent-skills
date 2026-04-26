#!/usr/bin/env node

import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targetRoot = resolve(
  process.env.WEB_A11Y_AGENT_SKILLS_COPILOT_PROJECT_DIR ??
    process.argv.slice(2).find((arg) => !arg.startsWith("--")) ??
    process.cwd(),
);
const skillsTarget = join(targetRoot, ".github", "skills");
const promptsTarget = join(targetRoot, ".github", "prompts");

await mkdir(skillsTarget, { recursive: true });
await mkdir(promptsTarget, { recursive: true });

const skillsSource = join(repoRoot, "skills");
const skillEntries = await readdir(skillsSource, { withFileTypes: true });
const skills = skillEntries.filter((entry) => entry.isDirectory());

for (const skill of skills) {
  const source = join(skillsSource, skill.name);
  const target = join(skillsTarget, basename(skill.name));

  await rm(target, { force: true, recursive: true });
  await cp(source, target, { recursive: true });
}

const promptsSource = join(repoRoot, "agents", "copilot");
const prompts = (await readdir(promptsSource)).filter((file) =>
  file.endsWith(".prompt.md"),
);

for (const prompt of prompts) {
  await cp(join(promptsSource, prompt), join(promptsTarget, prompt));
}

console.log(
  `Installed ${skills.length} Copilot accessibility skills and ${prompts.length} prompt workflows to ${targetRoot}.`,
);
