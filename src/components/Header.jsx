import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "study-sets", label: "Study Sets", icon: "📦" },
  { id: "study", label: "Study Guide", icon: "📚" },
  { id: "practice", label: "Practice Tests", icon: "📝" },
  { id: "flashcards", label: "Flashcards", icon: "🃏" },
  { id: "formulas", label: "Formula Sheet", icon: "🧮" },
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "review", label: "Review", icon: "↩️" },
  { id: "bookmarks", label: "Bookmarks", icon: "⭐" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "stats", label: "Statistics", icon: "📈" },
];

export function Header({ currentView, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleNavigate(viewId) {
    onNavigate(viewId);
    setMenuOpen(false);
  }

  return (
    <header className="topbar">
      <div className="topbar-row">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon" />
        </button>

        <div className="brand">
          <span className="logo" aria-hidden="true">🏦</span>
          <span className="brand-text">Set Study</span>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-btn ${currentView === item.id ? "active" : ""}`}
            onClick={() => handleNavigate(item.id)}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
    </header>
  );
}
