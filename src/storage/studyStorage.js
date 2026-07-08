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

export function persistSets(sets) {
  localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify({ sets }));
}

export function persistActiveSetId(id) {
  localStorage.setItem(ACTIVE_SET_KEY, id);
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

export function readProgress(setId) {
  const bySet = loadProgressBySet();
  return { ...PROGRESS_DEFAULTS, ...(bySet[setId] || {}) };
}

export function writeProgress(setId, progress) {
  const bySet = loadProgressBySet();
  bySet[setId] = progress;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
}

export function deleteProgressForSet(setId) {
  const bySet = loadProgressBySet();
  delete bySet[setId];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet }));
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

export function applyCloudSyncPayload({ customSets, activeSetId, progressBySet }) {
  const safeCustomSets = (Array.isArray(customSets) ? customSets : []).map(ensureSetShape);
  const allSets = [buildDefaultSet(), ...safeCustomSets];

  let hasSavedActive = false;
  try {
    hasSavedActive = localStorage.getItem(ACTIVE_SET_KEY) != null;
  } catch {
    /* ignore */
  }

  const localActiveId = loadActiveSetId(allSets);

  persistSets(allSets);

  const resolvedActiveId = hasSavedActive && allSets.some((s) => s.id === localActiveId)
    ? localActiveId
    : (activeSetId && allSets.some((s) => s.id === activeSetId)
      ? activeSetId
      : allSets[0].id);

  persistActiveSetId(resolvedActiveId);

  const safeProgress = progressBySet && typeof progressBySet === "object" ? progressBySet : {};
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ bySet: safeProgress }));

  return { sets: allSets, activeSetId: resolvedActiveId };
}
