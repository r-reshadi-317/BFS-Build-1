import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If a global supabase client is present, attempt to read the current session/user
    async function init() {
      try {
        if (window?.supabase?.auth?.getSession) {
          const { data } = await window.supabase.auth.getSession();
          setUser(data?.session?.user ?? null);
        } else if (window?.supabase?.auth?.session) {
          // older clients
          setUser(window.supabase.auth.session()?.user ?? null);
        } else {
          // try heuristics: look for stored email in localStorage
          const keys = Object.keys(localStorage);
          for (const k of keys) {
            try {
              const v = localStorage.getItem(k);
              if (!v) continue;
              if (/@/.test(v)) {
                setUser({ email: v, user_metadata: {} });
                break;
              }
              const j = JSON.parse(v);
              if (j?.user?.email) {
                setUser(j.user);
                break;
              }
              if (j?.email) {
                setUser({ email: j.email, user_metadata: j.user_metadata ?? {} });
                break;
              }
            } catch {
              // ignore
            }
          }
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (window?.supabase?.auth?.signInWithPassword) {
      const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data?.user ?? data?.session?.user ?? null);
      return data;
    }

    // fallback: store a lightweight marker so ProfileView can detect email
    localStorage.setItem("user_email", email);
    setUser({ email, user_metadata: {} });
    return { user: { email } };
  }, []);

  const signOut = useCallback(async () => {
    if (window?.supabase?.auth?.signOut) {
      try {
        await window.supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
      setUser(null);
      return;
    }

    // fallback: remove user_email marker
    try {
      localStorage.removeItem("user_email");
      setUser(null);
    } catch (e) {
      // ignore
    }
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isConfigured: Boolean(window?.supabase),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
