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

            // Prefer JSON with an email property
            try {
              const j = JSON.parse(v);
              if (j?.user?.email) {
                setUser(j.user);
                break;
              }
              if (j?.email && typeof j.email === "string") {
                setUser({ email: j.email, user_metadata: j.user_metadata ?? {} });
                break;
              }
            } catch (e) {
              // not JSON — fall back to raw email detection below
            }

            // If v itself looks exactly like an email address, use it. Avoid matching large blobs.
            const possibleEmail = String(v).trim();
            if (possibleEmail.length < 128 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(possibleEmail)) {
              setUser({ email: possibleEmail, user_metadata: {} });
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
        // After initial detection, check for a small locally persisted profile blob and merge it so UI stays consistent across reloads
        try {
          const rawProfile = localStorage.getItem("user_profile");
          if (rawProfile) {
            try {
              const profile = JSON.parse(rawProfile);
              if (profile && Object.keys(profile).length > 0) {
                setUser((prev) => {
                  // If we already detected a user, merge metadata; otherwise, restore minimal user using stored email marker
                  if (prev) {
                    return { ...prev, user_metadata: { ...(prev.user_metadata || {}), ...profile } };
                  }
                  const emailMarker = localStorage.getItem("user_email");
                  if (emailMarker) {
                    return { email: emailMarker, user_metadata: { ...profile } };
                  }
                  return prev;
                });
              }
            } catch (e) {
              // ignore malformed profile
            }
          }
        } catch (e) {
          // ignore
        }
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
      localStorage.removeItem("user_profile");
      setUser(null);
    } catch (e) {
      // ignore
    }
  }, []);

  const updateProfile = useCallback(async ({ full_name, avatar_url }) => {
    // If supabase client provides an update user API, use it
    if (window?.supabase?.auth?.updateUser) {
      try {
        const { data, error } = await window.supabase.auth.updateUser({ data: { full_name, avatar_url } });
        if (error) throw error;
        // supabase returns { data: { user } } shape in some versions
        const updatedUser = data?.user ?? data?.session?.user ?? data ?? null;
        if (updatedUser) {
          setUser(updatedUser);
        }
        return updatedUser;
      } catch (e) {
        throw e;
      }
    }

    // Fallback: persist small profile blob locally and update in-memory
    try {
      const email = (user && user.email) || localStorage.getItem("user_email") || null;
      const newUser = { email, user_metadata: { full_name, avatar_url } };
      localStorage.setItem("user_profile", JSON.stringify(newUser.user_metadata));
      setUser(newUser);
      return newUser;
    } catch (e) {
      throw e;
    }
  }, [user]);

  const value = {
    user,
    loading,
    signIn,
    signOut,
    updateProfile,
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
