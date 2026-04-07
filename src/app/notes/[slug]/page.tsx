import Link from "next/link";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getAllNotes, getNoteBySlug, resolveNoteHref } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllNotes().map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const markdownComponents: Components = {
    a: ({ href = "", children, ...props }) => {
      const resolvedHref = resolveNoteHref(note, href);
      const isExternalLink = /^(https?:|mailto:|tel:)/i.test(resolvedHref);

      return (
        <a
          {...props}
          href={resolvedHref}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <main className="note-page">
      <div className="note-page-shell">
        <Link className="back-link" href="/">
          Back to dashboard
        </Link>

        <header className="note-header">
          <p className="eyebrow">{note.sessionLabel}</p>
          <h1>{note.title}</h1>
          <div className="note-meta">
            <span>{note.readingTime}</span>
            <span>{note.fileName}</span>
          </div>
        </header>

        <article className="markdown-body">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
            {note.body}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
