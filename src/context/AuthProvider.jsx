import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { pullUserData, pushUserData, isCloudSyncAvailable } from "../services/cloudSync.js";
import { applyCloudSyncPayload, ACTIVE_SET_KEY } from "../storage/studyStorage.js";
import { mapAuthError } from "../utils/authValidation.js";

const AuthContext = createContext(null);

const SYNC_DEBOUNCE_MS = 800;

export function AuthProvider({ children, onCloudDataApplied, onRequestLocalPush }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const syncTimerRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const applyCloudData = useCallback((cloudData) => {
    const applied = applyCloudSyncPayload(cloudData);
    onCloudDataApplied?.(applied);
    return applied;
  }, [onCloudDataApplied]);

  const syncFromCloud = useCallback(async (userId) => {
    if (!isCloudSyncAvailable()) return;

    setSyncing(true);
    setSyncError(null);

    const activeSetIdAtPullStart = localStorage.getItem(ACTIVE_SET_KEY);

    try {
      const cloud = await pullUserData(userId);

      if (!cloud) {
        await onRequestLocalPush?.(userId);
        return;
      }

      const activeSetIdNow = localStorage.getItem(ACTIVE_SET_KEY);
      const userChangedActiveSet = activeSetIdNow !== activeSetIdAtPullStart;

      applyCloudData({
        customSets: cloud.customSets,
        activeSetId: userChangedActiveSet ? activeSetIdNow : cloud.activeSetId,
        progressBySet: cloud.progressBySet,
      });
    } catch (err) {
      setSyncError(mapAuthError(err.message));
      throw err;
    } finally {
      setSyncing(false);
    }
  }, [applyCloudData, onRequestLocalPush]);

  const syncToCloud = useCallback(async (userId) => {
    if (!isCloudSyncAvailable()) return;

    setSyncError(null);
    await onRequestLocalPush?.(userId);
  }, [onRequestLocalPush]);

  const scheduleSyncToCloud = useCallback((userId) => {
    if (!userId || !isCloudSyncAvailable()) return;

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = setTimeout(() => {
      syncToCloud(userId).catch((err) => {
        setSyncError(mapAuthError(err.message));
      });
    }, SYNC_DEBOUNCE_MS);
  }, [syncToCloud]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!mounted) return;
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);

      if (initialSession?.user) {
        syncFromCloud(initialSession.user.id).catch(() => {});
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (!mounted) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (event === "SIGNED_IN" && nextSession?.user) {
        await syncFromCloud(nextSession.user.id).catch(() => {});
      }

      if (event === "SIGNED_OUT") {
        setSyncError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [syncFromCloud]);

  const signUp = useCallback(async (email, password) => {
    if (!supabase) throw new Error("Authentication is not configured.");

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) throw new Error(mapAuthError(error.message));
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error("Authentication is not configured.");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw new Error(mapAuthError(error.message));
    return data;
  }, []);

  // TEMP: Google OAuth disabled — re-enable when Google provider is configured in Supabase.
  // const signInWithGoogle = useCallback(async () => {
  //   if (!supabase) throw new Error("Authentication is not configured.");
  //
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: window.location.origin,
  //     },
  //   });
  //
  //   if (error) throw new Error(mapAuthError(error.message));
  // }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(mapAuthError(error.message));
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    if (!supabase) throw new Error("Authentication is not configured.");

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });

    if (error) throw new Error(mapAuthError(error.message));
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    syncing,
    syncError,
    isConfigured: isSupabaseConfigured,
    isCloudSyncAvailable: isCloudSyncAvailable(),
    signUp,
    signIn,
    // signInWithGoogle, // TEMP: re-enable with Google OAuth
    signOut,
    requestPasswordReset,
    syncFromCloud,
    syncToCloud,
    scheduleSyncToCloud,
    clearSyncError: () => setSyncError(null),
  }), [
    user,
    session,
    loading,
    syncing,
    syncError,
    signUp,
    signIn,
    // signInWithGoogle,
    signOut,
    requestPasswordReset,
    syncFromCloud,
    syncToCloud,
    scheduleSyncToCloud,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

/** Push local sets/progress to cloud — called from AuthProvider via App wiring. */
export async function pushLocalStateToCloud(userId, sets, activeSetId) {
  await pushUserData(userId, sets, activeSetId);
}
