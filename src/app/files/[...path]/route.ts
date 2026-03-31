import fs from "node:fs";
import path from "node:path";

const WORKSPACE_DIRECTORY = process.cwd();
const ALLOWED_ROOT_DIRECTORIES = new Set(["Notes", "Slides"]);

const CONTENT_TYPES: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function getContentType(filePath: string) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { path: pathSegments } = await params;

  if (pathSegments.length === 0 || !ALLOWED_ROOT_DIRECTORIES.has(pathSegments[0])) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.resolve(WORKSPACE_DIRECTORY, ...pathSegments);
  const relativeToWorkspace = path.relative(WORKSPACE_DIRECTORY, filePath);

  if (
    relativeToWorkspace.startsWith("..") ||
    path.isAbsolute(relativeToWorkspace) ||
    !fs.existsSync(filePath)
  ) {
    return new Response("Not found", { status: 404 });
  }

  const stat = fs.statSync(filePath);

  if (!stat.isFile()) {
    return new Response("Not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Length": stat.size.toString(),
      "Content-Type": getContentType(filePath),
      "Content-Disposition": "inline",
    },
  });
}
