import { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader.jsx";
import { unique } from "../utils/helpers.js";

export function FlashcardsView({ activeSetName, flashcards, progress, saveProgress }) {
  const tags = unique(flashcards.flatMap((c) => c.tags)).sort();
  const [tag, setTag] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = tag === "all"
    ? flashcards
    : flashcards.filter((c) => c.tags.includes(tag));

  const card = deck[index];

  function resetCardState() {
    setIndex(0);
    setFlipped(false);
  }

  function handleTagChange(e) {
    setTag(e.target.value);
    resetCardState();
  }

  function move(step) {
    const len = deck.length;
    if (!len) return;
    setIndex((i) => (i + step + len) % len);
    setFlipped(false);
  }

  useEffect(() => {
    function onKey(e) {
      const activeTag = document.activeElement?.tagName;
      const isEditing = activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT" || document.activeElement?.isContentEditable;
      if (isEditing) return;

      if (e.code === "ArrowLeft") {
        e.preventDefault();
        move(-1);
        return;
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        move(1);
        return;
      }
      if (e.code === "Space" || e.code === "Spacebar") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deck.length]);

  function markFlashcard(type) {
    if (!card) return;
    const key = type === "known" ? "flashKnown" : "flashReview";
    const otherKey = type === "known" ? "flashReview" : "flashKnown";

    saveProgress((prev) => {
      const list = prev[key].includes(card.id) ? prev[key] : [...prev[key], card.id];
      const other = prev[otherKey].filter((id) => id !== card.id);
      return { ...prev, [key]: list, [otherKey]: other };
    });

    move(1);
  }

  return (
    <section className="view active">
      <PageHeader activeSetName={activeSetName} title="Flashcards" />

      <label className="filter-label">
        Filter by tag
        <select value={tag} onChange={handleTagChange}>
          <option value="all">All</option>
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <div className="flashcard-stage">
        {!card ? (
          <div className="panel">No flashcards match this tag.</div>
        ) : (
          <button
            type="button"
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped((f) => !f)}
            aria-label="Flip flashcard"
            title="Click or press Space to flip. Arrow keys navigate."
          >
            <div className="flashcard-inner">
              <div className="flashcard-face flashcard-front">
                <small>{index + 1} / {deck.length}</small>
                <p>{card.front}</p>
              </div>
              <div className="flashcard-face flashcard-back">
                <small>{index + 1} / {deck.length}</small>
                <div dangerouslySetInnerHTML={{ __html: card.back }} />
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="flash-controls">
        <button type="button" className="btn" onClick={() => move(-1)} disabled={!deck.length}>
          ◀ Prev
        </button>
        <button type="button" className="btn primary" onClick={() => setFlipped((f) => !f)} disabled={!deck.length}>
          Flip
        </button>
        <button type="button" className="btn good" onClick={() => markFlashcard("known")} disabled={!deck.length}>
          Know it
        </button>
        <button type="button" className="btn bad" onClick={() => markFlashcard("review")} disabled={!deck.length}>
          Review
        </button>
        <button type="button" className="btn" onClick={() => move(1)} disabled={!deck.length}>
          Next ▶
        </button>
      </div>

      <p className="flash-hint muted">
        Known: {progress.flashKnown.length} · To review: {progress.flashReview.length}
      </p>
    </section>
  );
}
