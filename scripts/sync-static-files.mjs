import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, "next-notes");
const publicFilesRoot = path.join(repoRoot, "public", "files");
const syncedDirectories = ["Notes", "Slides"];

fs.mkdirSync(publicFilesRoot, { recursive: true });

for (const directoryName of syncedDirectories) {
  const sourceDirectory = path.join(contentRoot, directoryName);
  const targetDirectory = path.join(publicFilesRoot, directoryName);

  fs.rmSync(targetDirectory, { force: true, recursive: true });

  if (!fs.existsSync(sourceDirectory)) {
    continue;
  }

  fs.mkdirSync(path.dirname(targetDirectory), { recursive: true });
  fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
}
