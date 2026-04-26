#!/usr/bin/env node

import { cp, mkdir, readdir, rm, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(repoRoot, "skills");
const targetDir =
  process.env.WEB_A11Y_AGENT_SKILLS_OPENCODE_SKILLS_DIR ??
  join(homedir(), ".config", "opencode", "skills");
const useSymlink = process.argv.includes("--symlink");

await mkdir(targetDir, { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });
const skills = entries.filter((entry) => entry.isDirectory());

for (const skill of skills) {
  const source = join(sourceDir, skill.name);
  const target = join(targetDir, basename(skill.name));

  await rm(target, { force: true, recursive: true });

  if (useSymlink) {
    await symlink(source, target, "dir");
    continue;
  }

  await cp(source, target, { recursive: true });
}

console.log(
  `Installed ${skills.length} OpenCode accessibility skills to ${targetDir}${
    useSymlink ? " as symlinks" : ""
  }.`,
);
