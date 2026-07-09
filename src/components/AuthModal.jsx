import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { validateEmail, validatePassword } from "../utils/authValidation.js";

export function AuthModal({ open, onClose, initialMode = "signin" }) {
  const {
    signIn,
    signUp,
    // signInWithGoogle, // TEMP: re-enable with Google OAuth
    requestPasswordReset,
    isConfigured,
    syncing,
  } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError("");
      setMessage("");
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (mode === "reset") {
      setSubmitting(true);
      try {
        await requestPasswordReset(email);
        setMessage("If an account exists for that email, a reset link has been sent.");
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const passwordError = validatePassword(password, { isSignUp: mode === "signup" });
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
        setMessage("Check your email to verify your account, then sign in.");
        setMode("signin");
        setPassword("");
        setConfirmPassword("");
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // TEMP: Google OAuth disabled — uncomment handleGoogleSignIn + UI below to restore.
  // async function handleGoogleSignIn() {
  //   setError("");
  //   setSubmitting(true);
  //   try {
  //     await signInWithGoogle();
  //   } catch (err) {
  //     setError(err.message);
  //     setSubmitting(false);
  //   }
  // }

  return (
    <div className="auth-overlay" role="presentation" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="auth-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id="auth-modal-title" className="auth-title">
          {mode === "signup" && "Create account"}
          {mode === "signin" && "Sign in"}
          {mode === "reset" && "Reset password"}
        </h2>

        <p className="auth-lead muted">
          Save your study sets and progress across devices.
        </p>

        {!isConfigured && (
          <div className="status-banner bad auth-banner">
            Cloud accounts are not configured yet. Add your Supabase keys to <code>.env</code> to enable sign-in.
          </div>
        )}

        {error && <div className="status-banner bad auth-banner">{error}</div>}
        {message && <div className="status-banner good auth-banner">{message}</div>}
        {syncing && <p className="auth-sync-note muted">Syncing your data…</p>}

        {/* TEMP: Google OAuth — uncomment to restore
        <button
          type="button"
          className="btn auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={!isConfigured || submitting}
        >
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>
        */}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="auth-field">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          </label>

          {mode !== "reset" && (
            <label className="auth-field">
              Password
              <input
                type="password"
                name="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={submitting}
              />
            </label>
          )}

          {mode === "signup" && (
            <label className="auth-field">
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                disabled={submitting}
              />
            </label>
          )}

          <button
            type="submit"
            className="btn primary auth-submit"
            disabled={!isConfigured || submitting}
          >
            {submitting && "Please wait…"}
            {!submitting && mode === "signup" && "Create account"}
            {!submitting && mode === "signin" && "Sign in"}
            {!submitting && mode === "reset" && "Send reset link"}
          </button>
        </form>

        <div className="auth-links">
          {mode === "signin" && (
            <>
              <button type="button" className="auth-link" onClick={() => { setMode("signup"); setError(""); }}>
                Create an account
              </button>
              <button type="button" className="auth-link" onClick={() => { setMode("reset"); setError(""); }}>
                Forgot password?
              </button>
            </>
          )}
          {mode === "signup" && (
            <button type="button" className="auth-link" onClick={() => { setMode("signin"); setError(""); }}>
              Already have an account? Sign in
            </button>
          )}
          {mode === "reset" && (
            <button type="button" className="auth-link" onClick={() => { setMode("signin"); setError(""); }}>
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
