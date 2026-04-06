"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { NoteSummary } from "@/lib/notes";

type DashboardProps = {
  notes: Array<
    NoteSummary & {
      searchableText: string;
    }
  >;
};

export function NotesDashboard({ notes }: DashboardProps) {
  const [query, setQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

    if (queryTerms.length === 0) {
      return notes;
    }

    return notes.filter((note) =>
      queryTerms.every((term) => note.searchableText.includes(term)),
    );
  }, [notes, query]);

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>NEXT Notes</h1>
      </header>

      <section className="search-section">
        <input
          id="keyword-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notes"
          aria-label="Search notes"
        />
        <p className="search-meta">
          {filteredNotes.length} result{filteredNotes.length === 1 ? "" : "s"}
          {query ? ` for "${query}"` : " across all notes"}
        </p>
      </section>

      <section className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Link className="note-card" href={`/notes/${note.slug}`} key={note.slug}>
              <div className="card-topline">
                <span>{note.sessionLabel}</span>
                <span>{note.updatedAt}</span>
              </div>

              <div className="card-body">
                <h2>{note.title}</h2>
                <p>{note.summary}</p>
              </div>

              <div className="tag-row">
                {note.headings.slice(0, 3).map((heading) => (
                  <span className="tag" key={heading}>
                    {heading}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <span>{note.readingTime}</span>
                <span>Open note</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <h2>No notes match that keyword yet.</h2>
            <p>
              Try a broader term, or add more weekly markdown files into the
              `Notes/` folder.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
