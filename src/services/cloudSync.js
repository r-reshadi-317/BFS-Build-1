import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { collectLocalSyncPayload } from "../storage/studyStorage.js";

const TABLE = "user_sync_data";

function assertConfigured() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Cloud sync is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
}

export async function pullUserData(userId) {
  assertConfigured();

  const { data, error } = await supabase
    .from(TABLE)
    .select("custom_sets, active_set_id, progress_by_set, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    customSets: data.custom_sets ?? [],
    activeSetId: data.active_set_id ?? null,
    progressBySet: data.progress_by_set ?? {},
    updatedAt: data.updated_at,
  };
}

export async function pushUserData(userId, sets, activeSetId) {
  assertConfigured();

  const payload = collectLocalSyncPayload(sets, activeSetId);

  const { error } = await supabase.from(TABLE).upsert(
    {
      user_id: userId,
      custom_sets: payload.customSets,
      active_set_id: payload.activeSetId,
      progress_by_set: payload.progressBySet,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
}

export function isCloudSyncAvailable() {
  return isSupabaseConfigured;
}
