import { QUESTIONS } from "../data/questions.js";
import { STUDY_GUIDE } from "../data/studyGuide.js";
import { resolveFlashcards } from "../utils/flashcards.js";
import { DEFAULT_SET_ID, buildFormulaSheetFromQuestions } from "../utils/studySetValidation.js";

export const SETS_STORAGE_KEY = "fbla-bfs-study-sets-v1";
export const ACTIVE_SET_KEY = "fbla-bfs-active-set-v1";
export const PROGRESS_KEY_V1 = "fbla-bfs-progress-v1";
export const PROGRESS_KEY = "fbla-bfs-progress-v2";

export const PROGRESS_DEFAULTS = {
  answered: {},
  incorrect: [],
  bookmarks: [],
  flashKnown: [],
  flashReview: [],
  formulaKnowledge: {},
  testsTaken: 0,
  totalCorrect: 0,
  totalAnswered: 0,
};

function ensureSetShape(set) {
  if (Array.isArray(set.formulaSheet)) return set;
  return {
    ...set,
    formulaSheet: buildFormulaSheetFromQuestions(set.questions ?? []),
  };
}

export function buildDefaultSet() {
  const flashcards = resolveFlashcards(QUESTIONS);
  return {
    id: DEFAULT_SET_ID,
    name: "FBLA Banking & Financial Systems (Built-in)",
    description: "Default national prep question bank, study guide, and flashcards.",
    questions: QUESTIONS,
    studyGuide: STUDY_GUIDE,
    flashcards,
    formulaSheet: buildFormulaSheetFromQuestions(QUESTIONS),
    isBuiltIn: true,
    createdAt: 0,
  };
}

export function loadSetsFromStorage() {
  try {
    const raw = JSON.parse(localStorage.getItem(SETS_STORAGE_KEY));
    if (raw?.sets?.length) {
      const sets = raw.sets.map(ensureSetShape);
      const hasDefault = sets.some((s) => s.id === DEFAULT_SET_ID);
      if (!hasDefault) {
        return [buildDefaultSet(), ...sets];
      }
      return sets;
    }
  } catch {
    /* ignore */
  }
  return [buildDefaultSet()];
}

export function loadActiveSetId(sets) {
  try {
    const saved = localStorage.getItem(ACTIVE_SET_KEY);
    if (saved && sets.some((s) => s.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return sets[0]?.id ?? DEFAULT_SET_ID;
}

export const SYNC_METADATA_KEY = "fbla-bfs-sync-metadata-v1";

export function persistSets(sets, { markLocalChange = true } = {}) {
  localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify({ sets }));
  if (markLocalChange) {
    localStorage.setItem(SYNC_METADATA_KEY, JSON.stringify({ lastLocalUpdateAt: Date.now() }));
  }
}

export function persistActiveSetId(id, { markLocalChange = true } = {}) {
  localStorage.setItem(ACTIVE_SET_KEY, id);
  if (markLocalChange) {
    localStorage.setItem(SYNC_METADATA_KEY, JSON.stringify({ lastLocalUpdateAt: Date.now() }));
  }
}

function migrateV1Progress() {
  try {
    const v1 = JSON.parse(localStorage.getItem(PROGRESS_KEY_V1));
    if (!v1) return null;
    const bySet = { [DEFAULT_SET_ID]: { ...PROGRESS_DEFAULTS, ...v1 } };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
    return bySet;
  } catch {
    return null;
  }
}

export function loadProgressBySet() {
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

export function loadLastLocalSyncTimestamp() {
  try {
    const raw = JSON.parse(localStorage.getItem(SYNC_METADATA_KEY));
    if (raw?.lastLocalUpdateAt && Number.isFinite(raw.lastLocalUpdateAt)) {
      return raw.lastLocalUpdateAt;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

export function markLocalDataChange() {
  localStorage.setItem(SYNC_METADATA_KEY, JSON.stringify({ lastLocalUpdateAt: Date.now() }));
}

export function readProgress(setId) {
  const bySet = loadProgressBySet();
  return { ...PROGRESS_DEFAULTS, ...(bySet[setId] || {}) };
}

export function writeProgress(setId, progress, { markLocalChange = true } = {}) {
  const bySet = loadProgressBySet();
  bySet[setId] = progress;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
  if (markLocalChange) {
    markLocalDataChange();
  }
}

export function persistProgressBySet(progressBySet, { markLocalChange = true } = {}) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet: progressBySet }));
  if (markLocalChange) {
    markLocalDataChange();
  }
}

export function deleteProgressForSet(setId, { markLocalChange = true } = {}) {
  const bySet = loadProgressBySet();
  delete bySet[setId];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
  if (markLocalChange) {
    markLocalDataChange();
  }
}

export function emptyProgress() {
  return { ...PROGRESS_DEFAULTS };
}

/** Custom (non-built-in) sets only — the built-in bank stays bundled locally. */
export function getCustomSets(sets) {
  return sets.filter((s) => !s.isBuiltIn);
}

export function collectLocalSyncPayload(sets, activeSetId) {
  return {
    customSets: getCustomSets(sets),
    activeSetId,
    progressBySet: loadProgressBySet(),
  };
}

export function applyCloudSyncPayload({ customSets, activeSetId, progressBySet }, cloudUpdatedAt = null) {
  const safeCustomSets = (Array.isArray(customSets) ? customSets : []).map(ensureSetShape);
  const allSets = [buildDefaultSet(), ...safeCustomSets];

  const localUpdatedAt = loadLastLocalSyncTimestamp();
  const remoteUpdatedAt = cloudUpdatedAt ? Date.parse(cloudUpdatedAt) : 0;
  const shouldApplyCloud = !remoteUpdatedAt || remoteUpdatedAt > localUpdatedAt;
  if (!shouldApplyCloud) {
    const existingSets = loadSetsFromStorage();
    return { sets: existingSets, activeSetId: loadActiveSetId(existingSets) };
  }

  const localActiveId = loadActiveSetId(allSets);

  persistSets(allSets, { markLocalChange: false });

  const resolvedActiveId = (activeSetId && allSets.some((s) => s.id === activeSetId))
    ? activeSetId
    : localActiveId || allSets[0].id;

  persistActiveSetId(resolvedActiveId, { markLocalChange: false });

  const safeProgress = progressBySet && typeof progressBySet === "object" ? progressBySet : {};
  persistProgressBySet(safeProgress, { markLocalChange: false });

  return { sets: allSets, activeSetId: resolvedActiveId };
}
