#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const requireFile = async (path) => {
  try {
    const fileStat = await stat(path);
    if (!fileStat.isFile()) {
      errors.push(`Expected file: ${path}`);
    }
  } catch {
    errors.push(`Missing file: ${path}`);
  }
};

const requireDir = async (path) => {
  try {
    const dirStat = await stat(path);
    if (!dirStat.isDirectory()) {
      errors.push(`Expected directory: ${path}`);
    }
  } catch {
    errors.push(`Missing directory: ${path}`);
  }
};

const parseJson = async () => {
  const packagePath = join(repoRoot, "package.json");
  try {
    return JSON.parse(await readFile(packagePath, "utf8"));
  } catch {
    errors.push("package.json is not valid JSON");
    return null;
  }
};

const validateSkills = async (pkg) => {
  const skillsDir = join(repoRoot, "skills");
  const skillEntries = await readdir(skillsDir, { withFileTypes: true });
  const skillFolders = skillEntries.filter((entry) => entry.isDirectory());

  for (const folder of skillFolders) {
    const skillPath = join(skillsDir, folder.name, "SKILL.md");
    await requireFile(skillPath);
    const content = await readFile(skillPath, "utf8");
    const nameMatch = content.match(/^name:\s*([^\n]+)$/m);
    const expectedName = folder.name;
    if (!nameMatch) {
      errors.push(`Missing frontmatter name in ${skillPath}`);
      continue;
    }
    const actualName = nameMatch[1].trim();
    if (actualName !== expectedName) {
      errors.push(`Skill name mismatch in ${skillPath}: ${actualName} != ${expectedName}`);
    }
  }

  const manifestSkills = pkg?.agents?.skills ?? [];
  if (manifestSkills.length !== skillFolders.length) {
    errors.push(`agents.skills count (${manifestSkills.length}) does not match skills folder count (${skillFolders.length})`);
  }

  for (const entry of manifestSkills) {
    const path = join(repoRoot, entry.path.replace(/^\.\//, ""), "SKILL.md");
    await requireFile(path);
  }
};

const validateReadmeCount = async () => {
  const readmePath = join(repoRoot, "README.md");
  const content = await readFile(readmePath, "utf8");
  const countMatch = content.match(/### Skills \((\d+)\)/);
  if (!countMatch) {
    errors.push("README does not include '### Skills (N)'");
    return;
  }
  const declared = Number(countMatch[1]);
  const skillEntries = await readdir(join(repoRoot, "skills"), { withFileTypes: true });
  const actual = skillEntries.filter((entry) => entry.isDirectory()).length;
  if (declared !== actual) {
    errors.push(`README skill count (${declared}) does not match actual (${actual})`);
  }
};

const validatePlatformAssets = async () => {
  for (const platform of ["cursor", "claude", "copilot", "opencode"]) {
    await requireDir(join(repoRoot, "agents", platform));
  }

  for (const script of [
    "install-cursor-agents.mjs",
    "install-claude-skills.mjs",
    "install-claude-agents.mjs",
    "install-copilot-assets.mjs",
    "install-opencode-skills.mjs",
    "install-opencode-agents.mjs",
  ]) {
    await requireFile(join(repoRoot, "scripts", script));
  }
};

const validateMarkdownLinks = async () => {
  const markdownFiles = [];
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (entry.name.endsWith(".md")) {
        markdownFiles.push(full);
      }
    }
  };
  await walk(repoRoot);

  for (const file of markdownFiles) {
    const content = await readFile(file, "utf8");
    const linkMatches = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
    for (const match of linkMatches) {
      const target = match[1];
      if (target.startsWith("http://") || target.startsWith("https://") || target.startsWith("#")) {
        continue;
      }
      const normalized = target.split("#")[0];
      if (!normalized || normalized.startsWith("mailto:")) {
        continue;
      }
      const resolved = resolve(dirname(file), normalized);
      try {
        await stat(resolved);
      } catch {
        errors.push(`Broken markdown link in ${file}: ${target}`);
      }
    }
  }
};

const pkg = await parseJson();
if (pkg) {
  await validateSkills(pkg);
}
await validateReadmeCount();
await validatePlatformAssets();
await validateMarkdownLinks();

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Validation passed.");
