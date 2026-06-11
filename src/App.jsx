import { useState } from "react";
import "./App.css";
import NoteInput from "./components/NoteInput";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "🚀 Built a full-stack e-commerce platform using React, Node.js & MongoDB. Implemented JWT authentication, payment gateway integration, and admin dashboard.",
      pinned: true,
      created: new Date("2026-06-01").toISOString(),
    },
    {
      id: 2,
      text: "📱 Developed a responsive weather app using React & OpenWeather API. Features real-time data, 5-day forecast, and geolocation support.",
      pinned: false,
      created: new Date("2026-06-05").toISOString(),
    },
    {
      id: 3,
      text: "🎯 Completed Advanced JavaScript course — covered closures, promises, async/await, event loop, and design patterns.",
      pinned: false,
      created: new Date("2026-06-08").toISOString(),
    },
    {
      id: 4,
      text: "💡 Learning DSA: solved 30+ problems on arrays, linked lists & binary search. Targeting FAANG interviews.",
      pinned: true,
      created: new Date("2026-06-10").toISOString(),
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const addNote = (text) => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now(),
      text,
      pinned: false,
      created: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const editNote = (id, newText) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: newText } : n)));
  };

  const filtered = notes
    .filter((n) => n.text.toLowerCase().includes(search.toLowerCase()))
    .filter((n) => {
      if (activeFilter === "pinned") return n.pinned;
      return true;
    })
    .sort((a, b) => b.pinned - a.pinned);

  const stats = {
    total: notes.length,
    pinned: notes.filter((n) => n.pinned).length,
  };

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">NoteFlow</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            <span className="nav-icon">📋</span>
            <span>All Notes</span>
            <span className="nav-badge">{stats.total}</span>
          </button>
          <button
            className={`nav-item ${activeFilter === "pinned" ? "active" : ""}`}
            onClick={() => setActiveFilter("pinned")}
          >
            <span className="nav-icon">📌</span>
            <span>Pinned</span>
            <span className="nav-badge">{stats.pinned}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="footer-stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Notes</span>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-stat">
            <span className="stat-number">{stats.pinned}</span>
            <span className="stat-label">Pinned</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="header-top">
            <div>
              <h1 className="main-title">
                {activeFilter === "pinned" ? "Pinned Notes" : "All Notes"}
              </h1>
              <p className="main-subtitle">
                {filtered.length} note{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </header>

        <NoteInput onAdd={addNote} />
        <NotesList
          notes={filtered}
          onDelete={deleteNote}
          onPin={togglePin}
          onEdit={editNote}
        />
      </main>
    </div>
  );
}

export default App;