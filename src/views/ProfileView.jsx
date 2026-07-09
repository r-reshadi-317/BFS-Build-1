import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { loadProgressBySet, loadSetsFromStorage } from "../storage/studyStorage.js";

export function ProfileView({ onNavigate }) {
  const { user, signOut } = useAuth();
  const [progressTotals, setProgressTotals] = useState({ totalAnswered: 0, totalCorrect: 0, bookmarks: 0, flashKnown: 0, flashReview: 0 });
  const [setsCount, setSetsCount] = useState({ total: 0, custom: 0 });
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const bySet = loadProgressBySet();
    const totals = { totalAnswered: 0, totalCorrect: 0, bookmarks: 0, flashKnown: 0, flashReview: 0 };
    Object.values(bySet).forEach((p) => {
      totals.totalAnswered += Number(p.totalAnswered || 0);
      totals.totalCorrect += Number(p.totalCorrect || 0);
      totals.bookmarks += Array.isArray(p.bookmarks) ? p.bookmarks.length : 0;
      totals.flashKnown += Array.isArray(p.flashKnown) ? p.flashKnown.length : 0;
      totals.flashReview += Array.isArray(p.flashReview) ? p.flashReview.length : 0;
    });
    setProgressTotals(totals);

    const sets = loadSetsFromStorage();
    const custom = sets.filter((s) => !s.isBuiltIn).length;
    setSetsCount({ total: sets.length, custom });
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      onNavigate?.("home");
    } catch (err) {
      // ignore — Auth modal / higher level handles errors
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
          <strong>Email:</strong> {user?.email ?? "(not signed in)"}
        </p>
        {user && (
          <p>
            <strong>Display name:</strong> {user.user_metadata?.full_name ?? user.email.split("@")[0]}
          </p>
        )}
        <div className="inline-actions" style={{ marginTop: "0.75rem" }}>
          <button type="button" className="btn bad" onClick={handleSignOut} disabled={signingOut || !user}>
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
