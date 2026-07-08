import { PageHeader } from "../components/PageHeader.jsx";

function formulaRatingKey(entry) {
  return entry.id || entry.formula;
}

export function FormulasView({ activeSetName, formulaSheet, progress, saveProgress }) {
  function updateRating(entry, rating) {
    const key = formulaRatingKey(entry);
    saveProgress((prev) => ({
      ...prev,
      formulaKnowledge: { ...prev.formulaKnowledge, [key]: rating },
    }));
  }

  if (!formulaSheet.length) {
    return (
      <section className="view active">
        <PageHeader activeSetName={activeSetName} title="Formula Sheet" />
        <div className="panel">No formulas found in this study set.</div>
      </section>
    );
  }

  return (
    <section className="view active">
      <PageHeader
        activeSetName={activeSetName}
        title="Formula Sheet"
        lead="Rate your confidence for each formula (0–10)."
      />

      <div className="card-grid">
        {formulaSheet.map((entry) => {
          const key = formulaRatingKey(entry);
          const rating = Number(progress.formulaKnowledge[key] || 0);
          return (
            <div key={key} className="card formula-card">
              <h3>{entry.name || "Formula"}</h3>
              {entry.category && entry.category !== "General" && (
                <p className="formula-category muted">{entry.category}</p>
              )}
              <p className="formula">{entry.formula}</p>
              {entry.description && <p className="formula-description">{entry.description}</p>}
              {entry.tags?.length > 0 && (
                <div className="tag-list">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <label className="formula-rating">
                <span>Knowledge rating</span>
                <strong>{rating} / 10</strong>
              </label>
              <input
                className="formula-slider"
                type="range"
                min="0"
                max="10"
                step="1"
                value={rating}
                onChange={(e) => updateRating(entry, Number(e.target.value))}
                aria-label={`Knowledge rating for ${entry.name || entry.formula}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
