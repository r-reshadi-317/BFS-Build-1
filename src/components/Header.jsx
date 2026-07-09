import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { AuthModal } from "./AuthModal.jsx";

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
  const [authOpen, setAuthOpen] = useState(false);

  const { user, loading, signOut } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

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
    <>
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

          <div className="topbar-actions">
            {!loading && (
              user ? (
                <div className="auth-user">
                    {(() => {
                      const email = typeof user?.email === "string" ? user.email : null;
                      const isEmail = email && email.length < 128 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                      const label = isEmail ? email.split("@")[0] : (user?.user_metadata?.full_name || "Account");
                      const title = isEmail ? email : undefined;
                      return (
                        <>
                          <span className="auth-user-label" title={title} onClick={() => setAccountOpen((s) => !s)} style={{ cursor: "pointer" }}>
                            {label}
                          </span>

                          <div style={{ position: "relative", display: "inline-block", marginLeft: "0.5rem" }}>
                            <button type="button" className="btn btn-sm auth-btn" onClick={() => setAccountOpen((s) => !s)} aria-expanded={accountOpen}>
                              Account
                            </button>

                            {accountOpen && (
                              <div className="account-dropdown" role="menu" style={{ position: "absolute", right: 0, marginTop: "0.5rem", background: "var(--panel-bg, #fff)", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", borderRadius: 6, padding: "0.5rem", zIndex: 200 }}>
                                <button type="button" className="btn" style={{ display: "block", width: "100%", textAlign: "left" }} onClick={() => { setAccountOpen(false); onNavigate("profile"); window.location.hash = "#profile"; }}>
                                  Profile
                                </button>
                                <button type="button" className="btn" style={{ display: "block", width: "100%", textAlign: "left", marginTop: "0.25rem" }} onClick={async () => { setAccountOpen(false); try { await signOut(); } catch {} }}>
                                  Sign out
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <button type="button" className="btn btn-sm primary auth-btn" onClick={() => setAuthOpen(true)}>
                    Sign in
                  </button>
                )
              )}

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

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
