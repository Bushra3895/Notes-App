import { useState } from "react";

function NoteItem({ note, onDelete, onPin, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(note.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(note.text);
    setIsEditing(false);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`note-card ${note.pinned ? "pinned" : ""}`}>
      {isEditing ? (
        <>
          <textarea
            className="note-textarea edit-textarea"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>✓ Save</button>
            <button className="cancel-btn" onClick={handleCancel}>✕ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="note-text">{note.text}</p>
          <div className="note-footer">
            <span className="note-date">{formatDate(note.created)}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {note.pinned && (
                <span className="pin-indicator">📌 Pinned</span>
              )}
              <div className="note-actions">
                <button
                  className="icon-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="icon-btn pin-btn"
                  onClick={() => onPin(note.id)}
                  title={note.pinned ? "Unpin" : "Pin"}
                >
                  {note.pinned ? "📍" : "📌"}
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => onDelete(note.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteItem;