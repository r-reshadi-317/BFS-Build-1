import { useEffect, useMemo, useState } from "react";
import { StudySetValidationError, validateAndNormalizeStudySet } from "../utils/studySetValidation.js";
import { PageHeader } from "../components/PageHeader.jsx";

function createUniqueId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptyQuestion(index = 0) {
  return {
    id: createUniqueId(`question-${index}`),
    category: "General",
    subcategory: "",
    tags: [],
    difficulty: "Medium",
    questionType: "conceptual",
    question: "",
    choices: ["", "", "", ""],
    answer: 0,
    explanation: "",
    studyGuideReference: "",
    formulaUsed: "",
    timeEstimate: 60,
    sourceConfidence: "",
  };
}

function createEmptySection(index = 0) {
  return {
    id: createUniqueId(`section-${index}`),
    title: "",
    category: "General",
    html: "",
    status: "complete",
  };
}

function ensureFourChoices(choices) {
  const normalized = Array.isArray(choices) ? [...choices] : [];
  while (normalized.length < 4) normalized.push("");
  return normalized.slice(0, 4);
}

function buildDraft(set) {
  if (!set) {
    return {
      name: "",
      description: "",
      questions: [createEmptyQuestion(0)],
      studyGuide: [createEmptySection(0)],
      flashcards: [],
      formulaSheet: [],
    };
  }

  return {
    name: set.name || "",
    description: set.description || "",
    questions: Array.isArray(set.questions) && set.questions.length > 0
      ? set.questions.map((question, index) => ({
        ...question,
        choices: ensureFourChoices(question.choices),
        id: question.id ?? createUniqueId(`question-${index}`),
      }))
      : [createEmptyQuestion(0)],
    studyGuide: Array.isArray(set.studyGuide) && set.studyGuide.length > 0
      ? set.studyGuide.map((section, index) => ({
        ...section,
        id: section.id ?? createUniqueId(`section-${index}`),
      }))
      : [createEmptySection(0)],
    flashcards: Array.isArray(set.flashcards) ? set.flashcards : [],
    formulaSheet: Array.isArray(set.formulaSheet) ? set.formulaSheet : [],
  };
}

export function StudySetCreatorView({ initialSet, createSet, updateSet, onCancelEdit }) {
  const [draft, setDraft] = useState(() => buildDraft(initialSet));
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setDraft(buildDraft(initialSet));
    setStatus(null);
    setErrors([]);
  }, [initialSet?.id]);

  const studyGuideOptions = useMemo(
    () => [{ id: "", title: "No section" }, ...draft.studyGuide.map((section) => ({ id: section.id, title: section.title || "Untitled section" }))],
    [draft.studyGuide],
  );

  const isEditing = Boolean(initialSet?.id);

  const updateDraftField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuestionField = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.map((question, idx) => (
        idx === index ? { ...question, [field]: value } : question
      )),
    }));
  };

  const updateQuestionChoice = (questionIndex, choiceIndex, value) => {
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.map((question, idx) => {
        if (idx !== questionIndex) return question;
        const choices = [...question.choices];
        choices[choiceIndex] = value;
        return { ...question, choices };
      }),
    }));
  };

  const updateStudySectionField = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      studyGuide: prev.studyGuide.map((section, idx) => (
        idx === index ? { ...section, [field]: value } : section
      )),
    }));
  };

  const addQuestion = () => {
    setDraft((prev) => ({
      ...prev,
      questions: [...prev.questions, createEmptyQuestion(prev.questions.length)],
    }));
  };

  const removeQuestion = (index) => {
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== index),
    }));
  };

  const addSection = () => {
    setDraft((prev) => ({
      ...prev,
      studyGuide: [...prev.studyGuide, createEmptySection(prev.studyGuide.length)],
    }));
  };

  const removeSection = (index) => {
    setDraft((prev) => ({
      ...prev,
      studyGuide: prev.studyGuide.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = async () => {
    setStatus(null);
    setErrors([]);

    try {
      const normalized = validateAndNormalizeStudySet(
        {
          name: draft.name,
          description: draft.description,
          questions: draft.questions,
          studyGuide: draft.studyGuide,
          flashcards: draft.flashcards,
          formulaSheet: draft.formulaSheet,
        },
        draft.name || "New Study Set",
      );

      if (isEditing) {
        updateSet(initialSet.id, normalized);
        setStatus(`Saved changes to "${normalized.name}".`);
      } else {
        createSet(normalized, { activate: true });
        setStatus(`Created "${normalized.name}" and added it to your saved sets.`);
        setDraft(buildDraft(null));
      }
    } catch (err) {
      if (err instanceof StudySetValidationError) {
        setErrors(err.errors);
      } else if (err instanceof SyntaxError) {
        setErrors(["Invalid set data. Check fields and try again."]);
      } else {
        setErrors([err.message || "Save failed."]);
      }
    }
  };

  return (
    <section className="view active">
      <PageHeader
        activeSetName={initialSet?.name || ""}
        title="Study Set Creator"
        lead="Build or edit study sets with guided fields instead of raw JSON. Add questions and study sections visually."
      />

      {isEditing && (
        <div className="status-banner good">
          Editing an existing imported set. Save to keep changes or switch back to the Study Sets tab.
        </div>
      )}

      <div className="panel">
        <h3>Set details</h3>
        <div className="form-grid">
          <label>
            Set name
            <input
              type="text"
              value={draft.name}
              onChange={(event) => updateDraftField("name", event.target.value)}
              placeholder="My Custom Study Set"
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={draft.description}
              onChange={(event) => updateDraftField("description", event.target.value)}
              placeholder="Short description for this set"
            />
          </label>
        </div>
      </div>

      <div className="panel">
        <div className="page-header-row">
          <h3>Questions</h3>
          <button type="button" className="btn primary" onClick={addQuestion}>
            Add question
          </button>
        </div>
        {draft.questions.map((question, index) => (
          <div key={question.id} className="card">
            <div className="set-card-header">
              <h4>Question {index + 1}</h4>
              <button type="button" className="btn bad" onClick={() => removeQuestion(index)}>
                Remove
              </button>
            </div>
            <div className="form-grid">
              <label>
                Question text
                <input
                  type="text"
                  value={question.question}
                  onChange={(event) => updateQuestionField(index, "question", event.target.value)}
                />
              </label>
              <label>
                Category
                <input
                  type="text"
                  value={question.category}
                  onChange={(event) => updateQuestionField(index, "category", event.target.value)}
                />
              </label>
              <label>
                Study section reference
                <select
                  value={question.studyGuideReference || ""}
                  onChange={(event) => updateQuestionField(index, "studyGuideReference", event.target.value)}
                >
                  {studyGuideOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Correct answer index
                <input
                  type="number"
                  min={0}
                  max={3}
                  value={question.answer}
                  onChange={(event) => updateQuestionField(index, "answer", Number(event.target.value))}
                />
              </label>
              <label>
                Explanation
                <input
                  type="text"
                  value={question.explanation}
                  onChange={(event) => updateQuestionField(index, "explanation", event.target.value)}
                />
              </label>
            </div>
            <div className="form-grid">
              {question.choices.map((choice, choiceIndex) => (
                <label key={choiceIndex}>
                  Choice {choiceIndex + 1}
                  <input
                    type="text"
                    value={choice}
                    onChange={(event) => updateQuestionChoice(index, choiceIndex, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="page-header-row">
          <h3>Study guide</h3>
          <button type="button" className="btn primary" onClick={addSection}>
            Add section
          </button>
        </div>
        {draft.studyGuide.map((section, index) => (
          <div key={section.id} className="card">
            <div className="set-card-header">
              <h4>Section {index + 1}</h4>
              <button type="button" className="btn bad" onClick={() => removeSection(index)}>
                Remove
              </button>
            </div>
            <div className="form-grid">
              <label>
                Title
                <input
                  type="text"
                  value={section.title}
                  onChange={(event) => updateStudySectionField(index, "title", event.target.value)}
                />
              </label>
              <label>
                Category
                <input
                  type="text"
                  value={section.category}
                  onChange={(event) => updateStudySectionField(index, "category", event.target.value)}
                />
              </label>
            </div>
            <label>
              Content (HTML allowed)
              <textarea
                rows={5}
                value={section.html}
                onChange={(event) => updateStudySectionField(index, "html", event.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="inline-actions">
        <button type="button" className="btn primary" onClick={handleSave}>
          {isEditing ? "Save study set" : "Create study set"}
        </button>
        {isEditing && onCancelEdit && (
          <button type="button" className="btn secondary" onClick={onCancelEdit}>
            Back to study sets
          </button>
        )}
      </div>

      {status && <div className="status-banner good">{status}</div>}
      {errors.length > 0 && (
        <div className="status-banner bad">
          <strong>Could not save study set:</strong>
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
