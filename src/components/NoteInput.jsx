import { useState } from "react";

function NoteInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleAdd();
  };

  return (
    <div className="note-input-card">
      <div className="input-label">New Note</div>
      <textarea
        className="note-textarea"
        placeholder="Write something worth remembering... (Ctrl+Enter to save)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="input-footer">
        <span className="char-count">{text.length} characters</span>
        <button className="add-btn" onClick={handleAdd} disabled={!text.trim()}>
          <span>+</span> Add Note
        </button>
      </div>
    </div>
  );
}

export default NoteInput;