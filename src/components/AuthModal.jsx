import { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export function AuthModal({ open, onClose, initialMode = "signin" }) {
  const { signIn, isConfigured } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!email) throw new Error("Email is required");
      if (mode === "signin") {
        await signIn(email, password);
        onClose?.();
      } else {
        // Sign-up flow: if supabase is configured, use signUp, otherwise mimic
        if (window?.supabase?.auth?.signUp) {
          const { error } = await window.supabase.auth.signUp({ email, password });
          if (error) throw error;
          onClose?.();
        } else {
          // store marker
          localStorage.setItem("user_email", email);
          onClose?.();
        }
      }
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <h3>{mode === "signin" ? "Sign in" : "Create account"}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <div className="status-banner bad">{error}</div>}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Working…" : (mode === "signin" ? "Sign in" : "Create account")}
            </button>
            <button type="button" className="btn" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="button" className="btn" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Create account" : "Have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
