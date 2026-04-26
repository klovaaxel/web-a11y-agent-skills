#!/usr/bin/env node

import { copyFile, mkdir, readdir, rm, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(repoRoot, "agents", "claude");
const targetDir =
  process.env.WEB_A11Y_AGENT_SKILLS_CLAUDE_AGENT_DIR ??
  join(homedir(), ".claude", "agents");
const useSymlink = process.argv.includes("--symlink");

await mkdir(targetDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((file) => file.endsWith(".md"));

for (const file of files) {
  const source = join(sourceDir, file);
  const target = join(targetDir, basename(file));

  await rm(target, { force: true });

  if (useSymlink) {
    await symlink(source, target);
    continue;
  }

  await copyFile(source, target);
}

console.log(
  `Installed ${files.length} Claude accessibility subagents to ${targetDir}${
    useSymlink ? " as symlinks" : ""
  }.`,
);
