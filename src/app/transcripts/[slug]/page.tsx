import Link from "next/link";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getAllTranscripts,
  getTranscriptBySlug,
  resolveNoteHref,
} from "@/lib/notes";

type TranscriptPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllTranscripts().map((transcript) => ({
    slug: transcript.slug,
  }));
}

export default async function TranscriptPage({ params }: TranscriptPageProps) {
  const { slug } = await params;
  const transcript = getTranscriptBySlug(slug);

  if (!transcript) {
    notFound();
  }

  const markdownComponents: Components = {
    a: ({ href = "", children, ...props }) => {
      const resolvedHref = resolveNoteHref(transcript, href);
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
          <p className="eyebrow">{transcript.sessionLabel}</p>
          <h1>{transcript.title}</h1>
          <div className="note-meta">
            <span>{transcript.updatedAt}</span>
            <span>{transcript.readingTime}</span>
            <span>{transcript.fileName}</span>
          </div>
        </header>

        <article className="markdown-body">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
            {transcript.body}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
