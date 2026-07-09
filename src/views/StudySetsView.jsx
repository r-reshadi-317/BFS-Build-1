import { useEffect, useRef, useState } from "react";
import { StudySetValidationError, validateAndNormalizeStudySet } from "../utils/studySetValidation.js";
import { PageHeader } from "../components/PageHeader.jsx";

export function StudySetsView({
  activeSetName,
  sets,
  activeSetId,
  selectSet,
  importFromJson,
  updateSet,
  deleteSet,
  deleteProgressForSet,
  onEditInCreator,
}) {
  const fileRef = useRef(null);
  const editPanelRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [editingSetId, setEditingSetId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editStatus, setEditStatus] = useState(null);
  const [editErrors, setEditErrors] = useState([]);

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus(null);
    setErrors([]);

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const fallbackName = file.name.replace(/\.json$/i, "");
      importFromJson(json, fallbackName, { activate: false });
      setStatus(`Imported "${fallbackName}" successfully. Select it below to start studying.`);
    } catch (err) {
      if (err instanceof StudySetValidationError) {
        setErrors(err.errors);
      } else if (err instanceof SyntaxError) {
        setErrors(["Invalid JSON file. Check formatting and try again."]);
      } else {
        setErrors([err.message || "Upload failed."]);
      }
    }

    event.target.value = "";
  }

  function handleSelect(id) {
    selectSet(id);
    setStatus(`Switched to "${sets.find((s) => s.id === id)?.name ?? "study set"}".`);
  }

  function openEditor(set) {
    setEditingSetId(set.id);
    setEditStatus(null);
    setEditErrors([]);
    setEditText(JSON.stringify({
      name: set.name,
      description: set.description,
      questions: set.questions,
      studyGuide: set.studyGuide,
      flashcards: set.flashcards,
      formulaSheet: set.formulaSheet,
    }, null, 2));
  }

  function closeEditor() {
    setEditingSetId(null);
    setEditText("");
    setEditStatus(null);
    setEditErrors([]);
  }

  useEffect(() => {
    if (!editingSetId) return;
    editPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [editingSetId]);

  async function saveEditedSet() {
    const target = sets.find((s) => s.id === editingSetId);
    if (!target) return;

    setEditStatus(null);
    setEditErrors([]);

    try {
      const raw = JSON.parse(editText);
      const normalized = validateAndNormalizeStudySet(raw, target.name);
      updateSet(editingSetId, normalized);
      setEditStatus(`Saved changes to "${normalized.name}".`);
    } catch (err) {
      if (err instanceof StudySetValidationError) {
        setEditErrors(err.errors);
      } else if (err instanceof SyntaxError) {
        setEditErrors(["Invalid JSON. Fix formatting and try again."]);
      } else {
        setEditErrors([err.message || "Save failed."]);
      }
    }
  }

  function downloadSet(set) {
    const payload = {
      name: set.name,
      description: set.description,
      questions: set.questions,
      studyGuide: set.studyGuide,
      flashcards: set.flashcards,
      formulaSheet: set.formulaSheet,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${set.name.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase() || "study-set"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleDelete(id) {
    const set = sets.find((s) => s.id === id);
    if (!set || set.isBuiltIn) return;
    if (!confirm(`Delete "${set.name}" and its saved progress? This cannot be undone.`)) return;
 
    deleteProgressForSet(id);
    deleteSet(id);
    setStatus(`Deleted "${set.name}".`);
  }

  return (
    <section className="view active">
      <PageHeader
        activeSetName={activeSetName}
        title="Study Sets"
        lead="Upload JSON study packs or switch between saved sets. Progress is tracked separately for each set."
      />

      <div className="panel upload-panel">
        <h3>Upload a study set</h3>
        <p className="muted">
          JSON must include <code>questions</code> and <code>studyGuide</code> arrays.
          Optional <code>flashcards</code> array; if omitted, flashcards are generated from questions.
          Optional <code>formulaSheet</code> array; if omitted, formulas are derived from question{" "}
          <code>formulaUsed</code> fields.
        </p>

        <div className="upload-actions">
          <button type="button" className="btn primary" onClick={() => fileRef.current?.click()}>
            Choose JSON file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            className="hidden-input"
            onChange={handleUpload}
            aria-label="Upload study set JSON"
          />
        </div>

        <details className="schema-details">
          <summary>Expected JSON structure</summary>
          <pre className="schema-example">{`{
  "name": "My Custom Set",
  "description": "Optional description",
  "questions": [
    {
      "id": 1,
      "category": "Topic",
      "tags": ["tag1", "tag2"],
      "difficulty": "Medium",
      "question": "Question text?",
      "choices": ["A", "B", "C", "D"],
      "answer": 1,
      "explanation": "Why the answer is correct.",
      "studyGuideReference": "section-id"
    }
  ],
  "studyGuide": [
    {
      "id": "section-id",
      "title": "Section title",
      "category": "Topic",
      "html": "<p>Study content HTML</p>"
    }
  ],
  "flashcards": [
    {
      "id": "card-1",
      "front": "Prompt",
      "back": "Answer (HTML allowed)",
      "tags": ["optional"]
    }
  ],
  "formulaSheet": [
    {
      "id": "current-ratio",
      "name": "Current Ratio",
      "formula": "Current Ratio = Current Assets / Current Liabilities",
      "description": "Measures short-term liquidity; higher is generally better.",
      "category": "Financial Ratios",
      "tags": ["Liquidity"]
    }
  ]
}`}</pre>
        </details>
      </div>
 
      {editingSetId && (
        <div ref={editPanelRef} className="panel edit-panel">
          <h3>Edit imported set JSON</h3>
          <p className="muted">
            Modify the JSON below and save to update the selected custom study set.
          </p>
          <textarea
            className="json-editor"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            rows={18}
            aria-label="Edit custom study set JSON"
          />
          <div className="inline-actions">
            <button type="button" className="btn primary" onClick={saveEditedSet}>
              Save changes
            </button>
            <button type="button" className="btn secondary" onClick={closeEditor}>
              Cancel
            </button>
          </div>
          {editStatus && <div className="status-banner good">{editStatus}</div>}
          {editErrors.length > 0 && (
            <div className="status-banner bad">
              <strong>Could not save changes:</strong>
              <ul>
                {editErrors.map((err) => <li key={err}>{err}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
 
      {status && <div className="status-banner good">{status}</div>}
      {errors.length > 0 && (
        <div className="status-banner bad">
          <strong>Could not import file:</strong>
          <ul>
            {errors.map((err) => <li key={err}>{err}</li>)}
          </ul>
        </div>
      )}

      <h2 className="section-title">Saved study sets</h2>
      <div className="set-list">
        {sets.map((set) => {
          const isActive = set.id === activeSetId;
          return (
            <div key={set.id} className={`card set-card ${isActive ? "active-set" : ""}`}>
              <div className="set-card-header">
                <h3>{set.name}</h3>
                {isActive && <span className="badge active-badge">Active</span>}
                {set.isBuiltIn && <span className="badge built-in-badge">Built-in</span>}
              </div>
              {set.description && <p className="muted">{set.description}</p>}
              <p className="set-stats muted">
                {set.questions.length} questions · {set.studyGuide.length} sections · {set.flashcards.length} flashcards · {set.formulaSheet.length} formulas
              </p>
              <div className="inline-actions">
                <button
                  type="button"
                  className="btn primary"
                  disabled={isActive}
                  onClick={() => handleSelect(set.id)}
                >
                  {isActive ? "Selected" : "Use this set"}
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => downloadSet(set)}
                >
                  Download
                </button>
                {!set.isBuiltIn && (
                  <>
                    <button type="button" className="btn secondary" onClick={() => openEditor(set)}>
                      Edit JSON
                    </button>
                    <button type="button" className="btn secondary" onClick={() => onEditInCreator(set.id)}>
                      Edit in Study Set Creator
                    </button>
                    <button type="button" className="btn bad" onClick={() => handleDelete(set.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
