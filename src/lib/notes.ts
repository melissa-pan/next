import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type NoteSummary = {
  slug: string;
  title: string;
  summary: string;
  headings: string[];
  body: string;
  fileName: string;
  relativePath: string;
  updatedAt: string;
  sessionLabel: string;
  readingTime: string;
};

const WORKSPACE_DIRECTORY = process.cwd();
const NOTES_DIRECTORY = path.join(process.cwd(), "Notes");
const LINKABLE_DIRECTORIES = new Set(["Notes", "Slides"]);

function normalizeSlashes(value: string) {
  return value.split(path.sep).join("/");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildUniqueSlug(value: string, usedSlugs: Set<string>) {
  const baseSlug = slugify(value) || "note";
  let slug = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(slug);
  return slug;
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getTitle(fileName: string, content: string) {
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch?.[1]) {
    return headingMatch[1].trim();
  }

  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function getHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => /^##+\s+/.test(line))
    .map((line) => line.replace(/^##+\s+/, "").trim())
    .slice(0, 6);
}

function getSummary(content: string) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((section) => ({
      raw: section.trim(),
      clean: stripMarkdown(section),
    }))
    .filter((section) => section.clean);

  const firstMeaningfulParagraph = paragraphs.find(
    (paragraph) => !/^#{1,6}\s+/.test(paragraph.raw),
  );

  return (
    firstMeaningfulParagraph?.clean.slice(0, 220) ??
    "Meeting summary will appear here once notes are added."
  );
}

function getReadingTime(content: string) {
  const wordCount = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 220));
  return `${minutes} min read`;
}

function getSessionLabel(index: number) {
  return `Session ${index + 1}`;
}

export const getAllNotes = cache((): NoteSummary[] => {
  if (!fs.existsSync(NOTES_DIRECTORY)) {
    return [];
  }

  const usedSlugs = new Set<string>();
  const markdownFiles = fs
    .readdirSync(NOTES_DIRECTORY)
    .filter((file) => file.toLowerCase().endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(NOTES_DIRECTORY, fileName);
      const stat = fs.statSync(fullPath);

      return {
        fileName,
        fullPath,
        updatedMs: stat.mtimeMs,
      };
    })
    .sort((a, b) => b.updatedMs - a.updatedMs);

  return markdownFiles.map(({ fileName, fullPath, updatedMs }, index) => {
    const body = fs.readFileSync(fullPath, "utf8");
    const title = getTitle(fileName, body);
    const relativePath = normalizeSlashes(
      path.relative(WORKSPACE_DIRECTORY, fullPath),
    );

    return {
      slug: buildUniqueSlug(title || fileName, usedSlugs),
      title,
      summary: getSummary(body),
      headings: getHeadings(body),
      body,
      fileName,
      relativePath,
      updatedAt: new Date(updatedMs).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      sessionLabel: getSessionLabel(index),
      readingTime: getReadingTime(body),
    };
  });
});

export function getNoteBySlug(slug: string) {
  return getAllNotes().find((note) => note.slug === slug);
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function toFileRoute(relativePath: string) {
  return `/files/${relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

export function resolveNoteHref(note: NoteSummary, href: string) {
  if (!href || href.startsWith("#") || isExternalHref(href)) {
    return href;
  }

  const notePath = normalizeSlashes(note.relativePath);
  const sourceDirectory = path.posix.dirname(notePath);
  const resolvedRelativePath = path.posix
    .resolve("/", sourceDirectory, href)
    .slice(1);
  const [topLevelDirectory] = resolvedRelativePath.split("/");

  if (!LINKABLE_DIRECTORIES.has(topLevelDirectory)) {
    return href;
  }

  if (resolvedRelativePath.toLowerCase().endsWith(".md")) {
    const linkedNote = getAllNotes().find(
      (candidate) => candidate.relativePath === resolvedRelativePath,
    );

    if (linkedNote) {
      return `/notes/${linkedNote.slug}`;
    }
  }

  return toFileRoute(resolvedRelativePath);
}

export function getSearchableText(note: NoteSummary) {
  return [note.title, note.summary, note.headings.join(" "), stripMarkdown(note.body)]
    .join(" ")
    .toLowerCase();
}
