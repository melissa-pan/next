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

    if (!normalizedQuery) {
      return notes;
    }

    return notes.filter((note) => note.searchableText.includes(normalizedQuery));
  }, [notes, query]);

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">NEXT meetup knowledge base</p>
          <h1>Weekly notes, research tips, and a searchable archive.</h1>
          <p className="hero-copy">
            This dashboard pulls directly from the `Notes/` folder, so each new
            markdown file becomes part of the site automatically.
          </p>
        </div>

        <div className="hero-panel">
          <div>
            <span className="stat-value">{notes.length}</span>
            <span className="stat-label">uploaded sessions</span>
          </div>
          <div>
            <span className="stat-value">Keyword</span>
            <span className="stat-label">search ready now</span>
          </div>
          <div>
            <span className="stat-value">Semantic</span>
            <span className="stat-label">can be added next</span>
          </div>
        </div>
      </section>

      <section className="search-section">
        <label className="search-label" htmlFor="keyword-search">
          Search across titles, summaries, headings, and full note text
        </label>
        <input
          id="keyword-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: Claude Code, experiments, planning, evaluation..."
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
