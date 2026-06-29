/* Derived flashcard deck for offline use.
   Cards are generated from the question bank so future question additions
   automatically expand the flashcard experience. */
const FLASHCARDS = (typeof QUESTIONS !== "undefined" ? QUESTIONS : []).flatMap(function (question) {
  const cards = [{
    id: "q-" + question.id,
    front: question.question,
    back: question.choices[question.answer] + "<br><br><small>" + question.explanation + "</small>",
    tags: question.tags || [],
    sourceQuestionId: question.id
  }];

  if (question.commonTrap) {
    cards.push({
      id: "trap-" + question.id,
      front: "Common trap: " + question.question,
      back: question.commonTrap,
      tags: (question.tags || []).concat(["Common Traps"]),
      sourceQuestionId: question.id
    });
  }

  if (question.formulaUsed) {
    cards.push({
      id: "formula-" + question.id,
      front: "Formula used for: " + question.question,
      back: question.formulaUsed,
      tags: (question.tags || []).concat(["Formulas"]),
      sourceQuestionId: question.id
    });
  }

  return cards;
});

if (typeof window !== "undefined") window.FLASHCARDS = FLASHCARDS;
