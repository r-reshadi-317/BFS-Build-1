import { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader.jsx";
import { unique } from "../utils/helpers.js";

export function FlashcardsView({ activeSetName, flashcards, progress, saveProgress }) {
  const tags = unique(flashcards.flatMap((c) => c.tags)).sort();
  const [tag, setTag] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // filter by tag and by known/review/unmarked status
  const deckByTag = tag === "all"
    ? flashcards
    : flashcards.filter((c) => c.tags.includes(tag));

  const deck = deckByTag.filter((c) => {
    if (statusFilter === "all") return true;
    const isKnown = Array.isArray(progress?.flashKnown) && progress.flashKnown.includes(c.id);
    const isReview = Array.isArray(progress?.flashReview) && progress.flashReview.includes(c.id);
    if (statusFilter === "known") return isKnown;
    if (statusFilter === "review") return isReview;
    if (statusFilter === "unmarked") return !isKnown && !isReview;
    return true;
  });

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

  // Ensure index is always within bounds when deck length changes (e.g., when marking cards)
  useEffect(() => {
    if (deck.length === 0) {
      // keep index at 0 and reset flip state so UI shows the 'no cards' panel consistently
      if (index !== 0) setIndex(0);
      if (flipped) setFlipped(false);
      return;
    }

    if (index >= deck.length) {
      // clamp to last available card and reset flip so the user sees the front
      setIndex(Math.max(0, deck.length - 1));
      if (flipped) setFlipped(false);
    }
  }, [deck.length, index, flipped]);

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

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <label className="filter-label" style={{ marginBottom: 0 }}>
          Filter by tag
          <select value={tag} onChange={handleTagChange}>
            <option value="all">All</option>
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="filter-label" style={{ marginBottom: 0 }}>
          Filter by status
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setIndex(0); setFlipped(false); }}>
            <option value="all">All</option>
            <option value="known">Known</option>
            <option value="review">Review</option>
            <option value="unmarked">Unmarked</option>
          </select>
        </label>
      </div>

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
                {(() => {
                  const isKnown = Array.isArray(progress?.flashKnown) && progress.flashKnown.includes(card.id);
                  const isReview = Array.isArray(progress?.flashReview) && progress.flashReview.includes(card.id);
                  if (isKnown) return <span className="flash-status-badge known">Known</span>;
                  if (isReview) return <span className="flash-status-badge review">Review</span>;
                  return null;
                })()}
                <p>{card.front}</p>
              </div>
              <div className="flashcard-face flashcard-back">
                <small>{index + 1} / {deck.length}</small>
                {(() => {
                  const isKnown = Array.isArray(progress?.flashKnown) && progress.flashKnown.includes(card.id);
                  const isReview = Array.isArray(progress?.flashReview) && progress.flashReview.includes(card.id);
                  if (isKnown) return <span className="flash-status-badge known">Known</span>;
                  if (isReview) return <span className="flash-status-badge review">Review</span>;
                  return null;
                })()}
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
