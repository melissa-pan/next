import fs from "node:fs";
import path from "node:path";

const workspaceDirectory = process.cwd();
const publicFilesDirectory = path.join(workspaceDirectory, "public", "files");
const rootDirectoriesToCopy = ["Notes", "Slides"];

fs.mkdirSync(publicFilesDirectory, { recursive: true });

for (const directoryName of rootDirectoriesToCopy) {
  const sourceDirectory = path.join(workspaceDirectory, directoryName);
  const destinationDirectory = path.join(publicFilesDirectory, directoryName);

  fs.rmSync(destinationDirectory, { force: true, recursive: true });

  if (!fs.existsSync(sourceDirectory)) {
    continue;
  }

  fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true });
}
