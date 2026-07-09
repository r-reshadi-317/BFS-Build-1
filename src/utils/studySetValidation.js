import { buildFlashcardsFromQuestions } from "./flashcards.js";

export const DEFAULT_SET_ID = "default-fbla-bfs";

export class StudySetValidationError extends Error {
  constructor(errors) {
    super(errors.join("\n"));
    this.errors = errors;
  }
}

function normalizeQuestion(raw, index, errors) {
  if (!raw || typeof raw !== "object") {
    errors.push(`Question ${index + 1}: must be an object`);
    return null;
  }

  const id = raw.id != null ? raw.id : index + 1;
  const choices = Array.isArray(raw.choices) ? raw.choices.map(String) : [];

  if (!raw.question) errors.push(`Question ${index + 1}: missing "question"`);
  if (choices.length < 2) errors.push(`Question ${index + 1}: needs at least 2 choices`);
  if (raw.answer == null || raw.answer < 0 || raw.answer >= choices.length) {
    errors.push(`Question ${index + 1}: invalid "answer" index`);
  }

  return {
    id,
    category: raw.category || "General",
    subcategory: raw.subcategory || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    difficulty: raw.difficulty || "Medium",
    estimatedNationalFrequency: raw.estimatedNationalFrequency || "",
    concepts: Array.isArray(raw.concepts) ? raw.concepts : [],
    questionType: raw.questionType || "conceptual",
    scenario: raw.scenario || "",
    question: String(raw.question || ""),
    choices,
    answer: Number(raw.answer),
    explanation: raw.explanation || "",
    whyEachWrong: raw.whyEachWrong || {},
    commonTrap: raw.commonTrap || "",
    studyGuideReference: raw.studyGuideReference || "",
    relatedQuestions: Array.isArray(raw.relatedQuestions) ? raw.relatedQuestions : [],
    formulaUsed: raw.formulaUsed || null,
    timeEstimate: raw.timeEstimate || 60,
    sourceConfidence: raw.sourceConfidence || "",
  };
}

function normalizeStudySection(raw, index, errors) {
  if (!raw || typeof raw !== "object") {
    errors.push(`Study section ${index + 1}: must be an object`);
    return null;
  }

  const id = raw.id ? String(raw.id) : `section-${index + 1}`;
  if (!raw.title) errors.push(`Study section ${index + 1}: missing "title"`);
  if (!raw.html) errors.push(`Study section ${index + 1}: missing "html"`);

  return {
    id,
    title: String(raw.title || "Untitled"),
    category: raw.category || "General",
    status: raw.status || "complete",
    html: String(raw.html || ""),
  };
}

function normalizeFormulaEntry(raw, index, errors) {
  if (!raw || typeof raw !== "object") {
    errors.push(`Formula ${index + 1}: must be an object`);
    return null;
  }

  const formula = raw.formula != null ? String(raw.formula).trim() : "";
  if (!formula) errors.push(`Formula ${index + 1}: missing "formula"`);

  const id = raw.id ? String(raw.id) : "";

  return {
    id,
    name: raw.name ? String(raw.name) : "",
    formula,
    description: raw.description ? String(raw.description) : "",
    category: raw.category || "General",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  };
}

export function buildFormulaSheetFromQuestions(questions) {
  const seen = new Set();
  const sheet = [];

  for (const question of questions) {
    const formula = question.formulaUsed?.trim();
    if (!formula || seen.has(formula)) continue;
    seen.add(formula);
    sheet.push({
      id: "",
      name: "",
      formula,
      description: "",
      category: question.category || "General",
      tags: [],
    });
  }

  return sheet;
}

function normalizeFlashcard(raw, index, errors) {
  if (!raw || typeof raw !== "object") {
    errors.push(`Flashcard ${index + 1}: must be an object`);
    return null;
  }

  const id = raw.id ? String(raw.id) : `card-${index + 1}`;
  if (!raw.front) errors.push(`Flashcard ${index + 1}: missing "front"`);
  if (!raw.back) errors.push(`Flashcard ${index + 1}: missing "back"`);

  return {
    id,
    front: String(raw.front),
    back: String(raw.back),
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    sourceQuestionId: raw.sourceQuestionId ?? null,
  };
}

export function validateAndNormalizeStudySet(raw, fallbackName) {
  const errors = [];

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new StudySetValidationError(["JSON root must be an object with questions and studyGuide arrays."]);
  }

  const name = typeof raw.name === "string" && raw.name.trim()
    ? raw.name.trim()
    : (fallbackName || "Imported Study Set");

  if (!Array.isArray(raw.questions)) {
    errors.push('"questions" must be an array');
  }
  if (!Array.isArray(raw.studyGuide)) {
    errors.push('"studyGuide" must be an array');
  }

  if (errors.length) throw new StudySetValidationError(errors);

  const questions = raw.questions
    .map((q, i) => normalizeQuestion(q, i, errors))
    .filter(Boolean);

  const studyGuide = raw.studyGuide
    .map((s, i) => normalizeStudySection(s, i, errors))
    .filter(Boolean);

  let flashcards;
  if (Array.isArray(raw.flashcards) && raw.flashcards.length > 0) {
    flashcards = raw.flashcards
      .map((c, i) => normalizeFlashcard(c, i, errors))
      .filter(Boolean);
  } else {
    flashcards = buildFlashcardsFromQuestions(questions);
  }

  let formulaSheet;
  if (Array.isArray(raw.formulaSheet) && raw.formulaSheet.length > 0) {
    formulaSheet = raw.formulaSheet
      .map((entry, i) => normalizeFormulaEntry(entry, i, errors))
      .filter(Boolean);
  } else {
    formulaSheet = buildFormulaSheetFromQuestions(questions);
  }

  if (errors.length) throw new StudySetValidationError(errors);

  if (!questions.length && !flashcards.length && !studyGuide.length) {
    throw new StudySetValidationError(["Study set must include at least one question, flashcard, or study section."]);
  }

  return {
    name,
    description: typeof raw.description === "string" ? raw.description : "",
    questions,
    studyGuide,
    flashcards,
    formulaSheet,
  };
}

export function createStudySetId() {
  return `set-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
