import { NotesDashboard } from "@/components/notes-dashboard";
import { getAllNotes, getSearchableText } from "@/lib/notes";

export default function HomePage() {
  const notes = getAllNotes().map((note) => ({
    ...note,
    searchableText: getSearchableText(note),
  }));

  return <NotesDashboard notes={notes} />;
}
