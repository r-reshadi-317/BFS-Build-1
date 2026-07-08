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
  { id: "stats", label: "Statistics", icon: "📈" },
];

function userLabel(user) {
  if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
  if (user?.email) return user.email.split("@")[0];
  return "Account";
}

export function Header({ currentView, onNavigate, theme, onToggleTheme, scheduleSyncRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [signingOut, setSigningOut] = useState(false);

  const {
    user,
    loading: authLoading,
    syncing,
    syncError,
    signOut,
    scheduleSyncToCloud,
    clearSyncError,
  } = useAuth();

  useEffect(() => {
    scheduleSyncRef.current = user
      ? () => scheduleSyncToCloud(user.id)
      : null;
  }, [user, scheduleSyncToCloud, scheduleSyncRef]);

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

  function openAuth(mode) {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
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
            {!authLoading && (
              user ? (
                <div className="auth-user">
                  <span className="auth-user-label" title={user.email}>
                    {userLabel(user)}
                    {syncing && " · syncing…"}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm auth-btn"
                    onClick={handleSignOut}
                    disabled={signingOut}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm primary auth-btn"
                  onClick={() => openAuth("signin")}
                >
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

        {syncError && (
          <div className="sync-error-bar">
            <span>{syncError}</span>
            <button type="button" className="sync-error-dismiss" onClick={clearSyncError}>
              Dismiss
            </button>
          </div>
        )}

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

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
