import { useCallback, useEffect, useMemo, useState } from "react";
import { resolveFlashcards } from "../utils/flashcards.js";
import {
  DEFAULT_SET_ID,
  createStudySetId,
  validateAndNormalizeStudySet,
  buildFormulaSheetFromQuestions,
} from "../utils/studySetValidation.js";
import {
  buildDefaultSet,
  loadSetsFromStorage,
  loadActiveSetId,
  persistSets,
  persistActiveSetId,
} from "../storage/studyStorage.js";

export function useStudySets({ syncVersion = 0, onDataChange } = {}) {
  const [sets, setSets] = useState(loadSetsFromStorage);
  const [activeSetId, setActiveSetId] = useState(() => loadActiveSetId(loadSetsFromStorage()));

  useEffect(() => {
    const loaded = loadSetsFromStorage();
    const storedActiveId = loadActiveSetId(loaded);
    setSets(loaded);
    // Keep in-memory selection when still valid — avoids flicker if storage was briefly stale.
    setActiveSetId((current) => (
      loaded.some((s) => s.id === current) ? current : storedActiveId
    ));
  }, [syncVersion]);

  const activeSet = useMemo(() => {
    const found = sets.find((s) => s.id === activeSetId) ?? sets[0] ?? buildDefaultSet();
    if (Array.isArray(found.formulaSheet)) return found;
    return {
      ...found,
      formulaSheet: buildFormulaSheetFromQuestions(found.questions ?? []),
    };
  }, [sets, activeSetId]);

  const notifyChange = useCallback((nextSets, nextActiveId) => {
    onDataChange?.(nextSets, nextActiveId ?? activeSetId);
  }, [onDataChange, activeSetId]);

  const selectSet = useCallback((id) => {
    setActiveSetId(id);
    persistActiveSetId(id);
    notifyChange(sets, id);
  }, [sets, notifyChange]);

  const addSet = useCallback((normalized, options = {}) => {
    const newSet = {
      id: createStudySetId(),
      name: normalized.name,
      description: normalized.description,
      questions: normalized.questions,
      studyGuide: normalized.studyGuide,
      flashcards: normalized.flashcards,
      formulaSheet: normalized.formulaSheet,
      isBuiltIn: false,
      createdAt: Date.now(),
    };

    setSets((prev) => {
      const next = [...prev, newSet];
      persistSets(next);
      const nextActiveId = options.activate ? newSet.id : activeSetId;
      if (options.activate) {
        setActiveSetId(newSet.id);
        persistActiveSetId(newSet.id);
      }
      notifyChange(next, nextActiveId);
      return next;
    });

    if (options.activate) {
      return newSet.id;
    }

    return newSet.id;
  }, [activeSetId, notifyChange]);

  const importFromJson = useCallback((raw, fallbackName, options = {}) => {
    const normalized = validateAndNormalizeStudySet(raw, fallbackName);
    return addSet(normalized, options);
  }, [addSet]);

  const deleteSet = useCallback((id) => {
    const target = sets.find((s) => s.id === id);
    if (!target || target.isBuiltIn) return false;

    setSets((prev) => {
      const next = prev.filter((s) => s.id !== id);
      persistSets(next);
      const nextActiveId = activeSetId === id ? DEFAULT_SET_ID : activeSetId;
      if (activeSetId === id) {
        setActiveSetId(DEFAULT_SET_ID);
        persistActiveSetId(DEFAULT_SET_ID);
      }
      notifyChange(next, nextActiveId);
      return next;
    });

    return true;
  }, [sets, activeSetId, notifyChange]);

  return {
    sets,
    activeSet,
    activeSetId,
    selectSet,
    importFromJson,
    deleteSet,
  };
}
