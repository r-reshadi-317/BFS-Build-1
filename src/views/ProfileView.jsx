import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader.jsx";
import { useStudySets } from "../hooks/useStudySets.js";
import { useAuth } from "../context/AuthProvider.jsx";

const PROGRESS_KEY_V1 = "fbla-bfs-progress-v1";
const PROGRESS_KEY = "fbla-bfs-progress-v2";

export function ProfileView({ onNavigate }) {
  const { sets } = useStudySets();
  const { user: authUser, signOut: authSignOut, updateProfile } = useAuth();
  const [progressTotals, setProgressTotals] = useState({ totalAnswered: 0, totalCorrect: 0, bookmarks: 0, flashKnown: 0, flashReview: 0 });
  const [setsCount, setSetsCount] = useState({ total: 0, custom: 0 });
  const [signingOut, setSigningOut] = useState(false);
  const [detectedEmail, setDetectedEmail] = useState(null);

  const [editingName, setEditingName] = useState("");
  const [editingAvatar, setEditingAvatar] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);

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
      // Prefer the AuthProvider's signOut if provided
      if (typeof authSignOut === "function") {
        try {
          await authSignOut();
        } catch (e) {
          // ignore and fallback
        }
      }

      // If a global supabase client exists and signOut is available, call it as a fallback
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

  const displayEmail = authUser?.email ?? detectedEmail;

  // Populate editing fields from existing metadata when available
  useEffect(() => {
    const meta = authUser?.user_metadata ?? (() => {
      try {
        const raw = localStorage.getItem("user_profile");
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    })();
    setEditingName(meta?.full_name || authUser?.email?.split("@")[0] || "");
    setEditingAvatar(meta?.avatar_url || "");
  }, [authUser]);

  async function handleSaveProfile() {
    setProfileSaving(true);
    setProfileMessage(null);
    try {
      const result = await updateProfile({ full_name: editingName || null, avatar_url: editingAvatar || null });
      setProfileMessage({ type: "success", text: "Profile saved" });
    } catch (e) {
      setProfileMessage({ type: "error", text: e?.message || String(e) });
    } finally {
      setProfileSaving(false);
      setTimeout(() => setProfileMessage(null), 3000);
    }
  }

  return (
    <section className="view active">
      <PageHeader activeSetName="" title="Profile" lead="Account information and overall progress" />

      <div className="panel">
        <h3>Account</h3>
        <p>
          <strong>Email:</strong> {displayEmail ?? "(not signed in)"}
        </p>
        {displayEmail && (
          <p>
            <strong>Display name:</strong> {(authUser?.user_metadata?.full_name) || displayEmail.split("@")[0]}
          </p>
        )}

        <div style={{ marginTop: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Full name
            <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} placeholder="Your display name" />
          </label>

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Avatar URL
            <input type="url" value={editingAvatar} onChange={(e) => setEditingAvatar(e.target.value)} placeholder="https://...jpg" />
          </label>

          {editingAvatar && (
            <div style={{ marginBottom: "0.5rem" }}>
              <img src={editingAvatar} alt="avatar preview" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }} />
            </div>
          )}

          <div className="inline-actions" style={{ marginTop: "0.25rem" }}>
            <button type="button" className="btn primary" onClick={handleSaveProfile} disabled={profileSaving}>
              {profileSaving ? "Saving…" : "Save profile"}
            </button>
            <button type="button" className="btn" onClick={() => { setEditingName(""); setEditingAvatar(""); }} disabled={profileSaving}>
              Reset
            </button>
          </div>

          {profileMessage && (
            <div className={`status-banner ${profileMessage.type === "error" ? "bad" : "ok"}`} style={{ marginTop: "0.5rem" }}>
              {profileMessage.text}
            </div>
          )}

        </div>

        <div className="inline-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="btn bad"
            onClick={handleSignOut}
            disabled={signingOut || (!displayEmail && typeof authSignOut !== "function")}
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
