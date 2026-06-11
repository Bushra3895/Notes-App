import NoteItem from "./NoteItem";

function NotesList({ notes, onDelete, onPin, onEdit }) {
  if (notes.length === 0) {
    return (
      <div className="notes-grid">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">No notes found</div>
          <div className="empty-desc">
            Add a new note above or try a different search.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="notes-section-label">
        {notes.length} note{notes.length !== 1 ? "s" : ""}
      </div>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onPin={onPin}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
}

export default NotesList;