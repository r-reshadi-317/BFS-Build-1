import { useCallback, useEffect, useState } from "react";
import {
  readProgress,
  writeProgress,
  emptyProgress,
  deleteProgressForSet as removeProgressForSet,
} from "../storage/studyStorage.js";

export function useProgress(activeSetId, { syncVersion = 0, onDataChange } = {}) {
  const [progress, setProgress] = useState(() => readProgress(activeSetId));

  useEffect(() => {
    setProgress(readProgress(activeSetId));
  }, [activeSetId, syncVersion]);

  const saveProgress = useCallback((next) => {
    setProgress((prev) => {
      const updated = typeof next === "function" ? next(prev) : next;
      writeProgress(activeSetId, updated);
      onDataChange?.();
      return updated;
    });
  }, [activeSetId, onDataChange]);

  const resetProgress = useCallback(() => {
    const cleared = emptyProgress();
    writeProgress(activeSetId, cleared);
    setProgress(cleared);
    onDataChange?.();
  }, [activeSetId, onDataChange]);

  const deleteProgressForSet = useCallback((setId) => {
    removeProgressForSet(setId);
    onDataChange?.();
    if (setId === activeSetId) {
      setProgress(emptyProgress());
    }
  }, [activeSetId, onDataChange]);

  return { progress, saveProgress, resetProgress, deleteProgressForSet };
}
