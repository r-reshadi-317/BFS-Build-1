import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader.jsx";
import { useStudySets } from "../hooks/useStudySets.js";

const PROGRESS_KEY_V1 = "fbla-bfs-progress-v1";
const PROGRESS_KEY = "fbla-bfs-progress-v2";

export function ProfileView({ onNavigate }) {
  const { sets } = useStudySets();
  const [progressTotals, setProgressTotals] = useState({ totalAnswered: 0, totalCorrect: 0, bookmarks: 0, flashKnown: 0, flashReview: 0 });
  const [setsCount, setSetsCount] = useState({ total: 0, custom: 0 });
  const [signingOut, setSigningOut] = useState(false);
  const [detectedEmail, setDetectedEmail] = useState(null);

  useEffect(() => {
    // load progress by set (migrate v1 if present)
    function migrateV1Progress() {
      try {
        const v1 = JSON.parse(localStorage.getItem(PROGRESS_KEY_V1));
        if (!v1) return null;
        const bySet = { "fbla-bfs-default": { ...v1 } };
        localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
        return bySet;
      } catch {
        return null;
      }
    }

    function loadBySet() {
      try {
        const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY));
        if (raw?.bySet) return raw.bySet;
      } catch {
        /* ignore */
      }
      const migrated = migrateV1Progress();
      if (migrated) return migrated;
      return {};
    }

    const bySet = loadBySet();
    const totals = { totalAnswered: 0, totalCorrect: 0, bookmarks: 0, flashKnown: 0, flashReview: 0 };
    Object.values(bySet).forEach((p) => {
      totals.totalAnswered += Number(p.totalAnswered || 0);
      totals.totalCorrect += Number(p.totalCorrect || 0);
      totals.bookmarks += Array.isArray(p.bookmarks) ? p.bookmarks.length : 0;
      totals.flashKnown += Array.isArray(p.flashKnown) ? p.flashKnown.length : 0;
      totals.flashReview += Array.isArray(p.flashReview) ? p.flashReview.length : 0;
    });
    setProgressTotals(totals);

    const custom = sets.filter((s) => !s.isBuiltIn).length;
    setSetsCount({ total: sets.length, custom });

    // Try to detect an email in localStorage if an auth system stored it
    const possible = [
      "user_email",
      "email",
      "auth_email",
      "sb:email",
      "supabase.auth.token",
      "supabase.auth.user",
    ];
    for (const k of possible) {
      try {
        const v = localStorage.getItem(k);
        if (!v) continue;

        // Try parse JSON first
        try {
          const j = JSON.parse(v);
          if (j?.email && typeof j.email === "string") {
            setDetectedEmail(j.email);
            break;
          }
          if (j?.user?.email && typeof j.user.email === "string") {
            setDetectedEmail(j.user.email);
            break;
          }
        } catch (e) {
          // not JSON
        }

        // If v itself looks exactly like an email address, and not too large, use it
        const possibleEmail = String(v).trim();
        if (possibleEmail.length < 128 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(possibleEmail)) {
          setDetectedEmail(possibleEmail);
          break;
        }
      } catch (e) {
        /* ignore */
      }
    }
  }, [sets]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      // If a global supabase client exists, try to sign out through it
      if (window?.supabase?.auth?.signOut) {
        try { await window.supabase.auth.signOut(); } catch (e) { /* ignore */ }
      }

      // Remove common localStorage auth keys as a fallback
      const keys = Object.keys(localStorage).filter((k) => /auth|supabase|session|token|sb-|user/i.test(k));
      keys.forEach((k) => localStorage.removeItem(k));

      // Reload to reflect signed-out state
      window.location.reload();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <section className="view active">
      <PageHeader activeSetName="" title="Profile" lead="Account information and overall progress" />

      <div className="panel">
        <h3>Account</h3>
        <p>
          <strong>Email:</strong> {detectedEmail ?? "(not signed in)"}
        </p>
        {detectedEmail && (
          <p>
            <strong>Display name:</strong> {detectedEmail.split("@")[0]}
          </p>
        )}
        <div className="inline-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="btn bad"
            onClick={handleSignOut}
            disabled={signingOut || (!detectedEmail && !window?.supabase?.auth?.signOut)}
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
          <button type="button" className="btn" onClick={() => onNavigate?.("study-sets")}>
            Manage sets
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: "1rem" }}>
        <h3>Usage & stats</h3>
        <p>
          <strong>Saved sets:</strong> {setsCount.total} ({setsCount.custom} custom)
        </p>
        <p>
          <strong>Total questions answered:</strong> {progressTotals.totalAnswered}
        </p>
        <p>
          <strong>Total correct answers:</strong> {progressTotals.totalCorrect}
        </p>
        <p>
          <strong>Bookmarks:</strong> {progressTotals.bookmarks}
        </p>
        <p>
          <strong>Flashcards known / review:</strong> {progressTotals.flashKnown} / {progressTotals.flashReview}
        </p>
      </div>
    </section>
  );
}
