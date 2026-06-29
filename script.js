(function () {
  "use strict";

  const questions = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];
  const studyGuide = Array.isArray(window.STUDY_GUIDE) ? window.STUDY_GUIDE : [];
  const flashcards = Array.isArray(window.FLASHCARDS) ? window.FLASHCARDS : [];
  const storageKey = "fbla-bfs-progress-v1";

  const state = {
    currentView: "home",
    quiz: [],
    quizAnswers: {},
    quizScored: false,
    flashIndex: 0,
    flashFlipped: false,
    flashDeck: flashcards,
    progress: loadProgress()
  };

  const $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  const $$ = function (selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    bindNavigation();
    bindTheme();
    bindPractice();
    bindFlashcards();
    bindFormulas();
    bindSearch();
    bindReset();
    renderCategoryFilters();
    renderHomeStats();
    renderStudyNav();
    renderFormulas();
    renderDashboard();
    renderReview();
    renderBookmarks();
    renderStats();
    renderFlashTagOptions();
    renderFlashcard();
    showView("home");
  }

  function loadProgress() {
    const defaults = {
      answered: {},
      incorrect: [],
      bookmarks: [],
      flashKnown: [],
      flashReview: [],
      formulaKnowledge: {},
      testsTaken: 0,
      totalCorrect: 0,
      totalAnswered: 0
    };

    try {
      return Object.assign(defaults, JSON.parse(localStorage.getItem(storageKey)) || {});
    } catch (error) {
      return defaults;
    }
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(state.progress));
    renderHomeStats();
    renderDashboard();
    renderReview();
    renderBookmarks();
    renderStats();
  }

  function bindNavigation() {
    $$("#mainNav .nav-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        showView(button.dataset.view);
      });
    });

    $$(".clickable[data-goto]").forEach(function (card) {
      card.addEventListener("click", function () {
        showView(card.dataset.goto);
      });
    });
  }

  function showView(viewId) {
    if (!$("#" + viewId)) return;
    state.currentView = viewId;
    $$(".view").forEach(function (view) {
      view.classList.toggle("active", view.id === viewId);
    });
    $$("#mainNav .nav-btn").forEach(function (button) {
      button.classList.toggle("active", button.dataset.view === viewId);
    });

    if (viewId === "dashboard") renderDashboard();
    if (viewId === "review") renderReview();
    if (viewId === "bookmarks") renderBookmarks();
    if (viewId === "stats") renderStats();
  }

  function bindTheme() {
    const savedTheme = localStorage.getItem("fbla-bfs-theme") || "light";
    document.documentElement.dataset.theme = savedTheme;
    updateThemeButton();

    $("#themeToggle").addEventListener("click", function () {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("fbla-bfs-theme", nextTheme);
      updateThemeButton();
    });
  }

  function updateThemeButton() {
    $("#themeToggle").textContent = document.documentElement.dataset.theme === "dark" ? "Light" : "Dark";
  }

  function renderHomeStats() {
    const accuracy = state.progress.totalAnswered
      ? Math.round((state.progress.totalCorrect / state.progress.totalAnswered) * 100)
      : 0;

    $("#homeStats").innerHTML = [
      statCard("Questions", questions.length),
      statCard("Study Sections", studyGuide.length),
      statCard("Accuracy", accuracy + "%"),
      statCard("Bookmarks", state.progress.bookmarks.length)
    ].join("");
  }

  function statCard(label, value) {
    return '<div class="card"><h3>' + escapeHtml(value) + '</h3><p>' + escapeHtml(label) + "</p></div>";
  }

  function renderCategoryFilters() {
    const categories = unique(questions.map(function (question) { return question.category; }));
    $("#filterCategory").innerHTML = '<option value="all">All</option>' + categories.map(function (category) {
      return '<option value="' + escapeAttr(category) + '">' + escapeHtml(category) + "</option>";
    }).join("");
  }

  function bindPractice() {
    $("#startTest").addEventListener("click", startTest);
  }

  function startTest() {
    const category = $("#filterCategory").value;
    const difficulty = $("#filterDifficulty").value;
    const countValue = $("#filterCount").value;

    let pool = questions.filter(function (question) {
      return (category === "all" || question.category === category)
        && (difficulty === "all" || question.difficulty === difficulty);
    });

    pool = shuffle(pool);
    state.quiz = countValue === "all" ? pool : pool.slice(0, Number(countValue));
    state.quizAnswers = {};
    state.quizScored = false;
    $("#practiceSetup").classList.add("hidden");
    $("#quizArea").classList.remove("hidden");
    renderQuiz();
  }

  function renderQuiz() {
    const quizArea = $("#quizArea");
    if (!state.quiz.length) {
      quizArea.innerHTML = '<div class="panel">No questions matched those filters.</div><button class="btn" data-action="new-test">Back to setup</button>';
      bindQuizActions(quizArea);
      return;
    }

    const answered = Object.keys(state.quizAnswers).length;
    const correct = state.quiz.filter(function (question) {
      return state.quizAnswers[question.id] === question.answer;
    }).length;
    const banner = state.quizScored
      ? '<div class="result-banner">' + correct + ' / ' + state.quiz.length + ' correct (' + answered + ' answered)</div>'
      : "";

    quizArea.innerHTML = banner + state.quiz.map(renderQuestion).join("")
      + '<div class="panel"><button class="btn primary" data-action="score-test">Score Test</button> '
      + '<button class="btn" data-action="new-test">New Test</button></div>';
    bindQuizActions(quizArea);
  }

  function renderQuestion(question, index) {
    const chosen = state.quizAnswers[question.id];
    const answered = typeof chosen !== "undefined";
    const scored = state.quizScored;
    const isBookmarked = state.progress.bookmarks.includes(question.id);

    return '<div class="question-block" data-question-id="' + question.id + '">'
      + '<button class="bookmark-btn" title="Bookmark question" data-action="bookmark" data-question-id="' + question.id + '">' + (isBookmarked ? "*" : "+") + '</button>'
      + '<div class="meta-row"><span class="badge">#' + (index + 1) + '</span><span class="badge">' + escapeHtml(question.category) + '</span><span class="badge diff-' + escapeAttr(question.difficulty) + '">' + escapeHtml(question.difficulty) + '</span></div>'
      + (question.scenario ? '<div class="scenario">' + escapeHtml(question.scenario) + '</div>' : "")
      + '<h3>' + escapeHtml(question.question) + '</h3>'
      + question.choices.map(function (choice, choiceIndex) {
        let className = "choice";
        if (!scored && answered && choiceIndex === chosen) className += " selected";
        if (scored && choiceIndex === question.answer) className += " correct";
        if (scored && answered && choiceIndex === chosen && choiceIndex !== question.answer) className += " wrong";
        return '<button class="' + className + '" data-action="answer" data-question-id="' + question.id + '" data-choice="' + choiceIndex + '"' + (scored ? " disabled" : "") + ">" + escapeHtml(choice) + "</button>";
      }).join("")
      + (scored ? renderExplanation(question, chosen) : "")
      + renderTags(question.tags)
      + '</div>';
  }

  function bindQuizActions(root) {
    root.addEventListener("click", function (event) {
      const action = event.target.dataset.action;
      if (!action) return;

      if (action === "answer") {
        answerQuestion(Number(event.target.dataset.questionId), Number(event.target.dataset.choice));
      }
      if (action === "bookmark") {
        toggleBookmark(Number(event.target.dataset.questionId));
        renderQuiz();
      }
      if (action === "score-test") {
        scoreTest();
      }
      if (action === "new-test") {
        $("#practiceSetup").classList.remove("hidden");
        $("#quizArea").classList.add("hidden");
        $("#quizArea").innerHTML = "";
        state.quizScored = false;
      }
    }, { once: true });
  }

  function answerQuestion(questionId, choiceIndex) {
    if (state.quizScored) return;
    state.quizAnswers[questionId] = choiceIndex;
    renderQuiz();
  }

  function scoreTest() {
    if (state.quizScored) return;
    state.quizScored = true;
    state.progress.testsTaken += 1;
    state.quiz.forEach(function (question) {
      if (!(question.id in state.quizAnswers)) return;
      const isCorrect = state.quizAnswers[question.id] === question.answer;
      state.progress.answered[question.id] = isCorrect;
      state.progress.totalAnswered += 1;

      if (isCorrect) {
        state.progress.totalCorrect += 1;
        state.progress.incorrect = state.progress.incorrect.filter(function (id) { return id !== question.id; });
      } else if (!state.progress.incorrect.includes(question.id)) {
        state.progress.incorrect.push(question.id);
      }
    });
    saveProgress();
    renderQuiz();
  }

  function renderExplanation(question, chosen) {
    const wrong = question.whyEachWrong && question.whyEachWrong[String(chosen)]
      ? '<p><b>Why yours is off:</b> ' + escapeHtml(question.whyEachWrong[String(chosen)]) + '</p>'
      : "";

    return '<div class="explanation"><h4>' + (chosen === question.answer ? "Correct" : "Answer") + '</h4>'
      + '<p>' + escapeHtml(question.explanation) + '</p>'
      + wrong
      + (question.commonTrap ? '<p><b>Trap:</b> ' + escapeHtml(question.commonTrap) + '</p>' : "")
      + (question.studyGuideReference ? '<button class="btn" data-action="study-link" data-study-id="' + escapeAttr(question.studyGuideReference) + '">Open study section</button>' : "")
      + '</div>';
  }

  document.addEventListener("click", function (event) {
    if (event.target.dataset.action === "study-link") {
      showView("study");
      renderStudyContent(event.target.dataset.studyId);
    }
  });

  function toggleBookmark(questionId) {
    if (state.progress.bookmarks.includes(questionId)) {
      state.progress.bookmarks = state.progress.bookmarks.filter(function (id) { return id !== questionId; });
    } else {
      state.progress.bookmarks.push(questionId);
    }
    saveProgress();
  }

  function renderStudyNav() {
    const grouped = typeof window.getStudyGuideByCategory === "function"
      ? window.getStudyGuideByCategory()
      : groupBy(studyGuide, "category");

    $("#studyNav").innerHTML = Object.keys(grouped).map(function (category) {
      return '<h4>' + escapeHtml(category) + '</h4>'
        + grouped[category].map(function (section) {
          return '<button data-study-id="' + escapeAttr(section.id) + '">' + escapeHtml(section.title) + '</button>';
        }).join("");
    }).join("");

    $("#studyNav").addEventListener("click", function (event) {
      if (event.target.dataset.studyId) renderStudyContent(event.target.dataset.studyId);
    });

    if (studyGuide[0]) renderStudyContent(studyGuide[0].id);
  }

  function renderStudyContent(sectionId) {
    const section = studyGuide.find(function (item) { return item.id === sectionId; });
    if (!section) return;
    $("#studyContent").innerHTML = section.html;
    $$("#studyNav button").forEach(function (button) {
      button.classList.toggle("active", button.dataset.studyId === sectionId);
    });
  }

  function bindFlashcards() {
    $("#flashPrev").addEventListener("click", function () { moveFlashcard(-1); });
    $("#flashNext").addEventListener("click", function () { moveFlashcard(1); });
    $("#flashFlip").addEventListener("click", flipFlashcard);
    $("#flashKnow").addEventListener("click", function () { markFlashcard("known"); });
    $("#flashDont").addEventListener("click", function () { markFlashcard("review"); });
    $("#flashTag").addEventListener("change", function () {
      const tag = $("#flashTag").value;
      state.flashDeck = tag === "all" ? flashcards : flashcards.filter(function (card) { return card.tags.includes(tag); });
      state.flashIndex = 0;
      state.flashFlipped = false;
      renderFlashcard();
    });
    $("#flashcardStage").addEventListener("click", flipFlashcard);
  }

  function renderFlashTagOptions() {
    const tags = unique(flashcards.flatMap(function (card) { return card.tags; })).sort();
    $("#flashTag").innerHTML = '<option value="all">All</option>' + tags.map(function (tag) {
      return '<option value="' + escapeAttr(tag) + '">' + escapeHtml(tag) + "</option>";
    }).join("");
  }

  function renderFlashcard() {
    const card = state.flashDeck[state.flashIndex];
    if (!card) {
      $("#flashcardStage").innerHTML = '<div class="panel">No flashcards match this tag.</div>';
      return;
    }

    $("#flashcardStage").innerHTML = '<div class="flashcard"><div><small>'
      + (state.flashIndex + 1) + ' / ' + state.flashDeck.length
      + '</small><br><br>' + (state.flashFlipped ? card.back : escapeHtml(card.front)) + '</div></div>';
  }

  function flipFlashcard() {
    state.flashFlipped = !state.flashFlipped;
    renderFlashcard();
  }

  function moveFlashcard(step) {
    if (!state.flashDeck.length) return;
    state.flashIndex = (state.flashIndex + step + state.flashDeck.length) % state.flashDeck.length;
    state.flashFlipped = false;
    renderFlashcard();
  }

  function markFlashcard(type) {
    const card = state.flashDeck[state.flashIndex];
    if (!card) return;
    const key = type === "known" ? "flashKnown" : "flashReview";
    const otherKey = type === "known" ? "flashReview" : "flashKnown";
    if (!state.progress[key].includes(card.id)) state.progress[key].push(card.id);
    state.progress[otherKey] = state.progress[otherKey].filter(function (id) { return id !== card.id; });
    saveProgress();
    moveFlashcard(1);
  }

  function renderFormulas() {
    const formulas = unique(questions.map(function (question) { return question.formulaUsed; }).filter(Boolean));
    $("#formulaList").innerHTML = formulas.map(function (formula, index) {
      const rating = Number(state.progress.formulaKnowledge[formula] || 0);
      return '<div class="card formula-card"><h3>Formula</h3><p class="formula">' + escapeHtml(formula) + '</p>'
        + '<label class="formula-rating" for="formulaRating' + index + '">'
        + '<span>Knowledge rating</span>'
        + '<strong data-formula-value="' + escapeAttr(formula) + '">' + rating + ' / 10</strong>'
        + '</label>'
        + '<input id="formulaRating' + index + '" class="formula-slider" type="range" min="0" max="10" step="1" value="' + rating + '" data-formula-key="' + escapeAttr(formula) + '" />'
        + '</div>';
    }).join("") || '<div class="panel">No formulas found.</div>';
  }

  function bindFormulas() {
    $("#formulaList").addEventListener("input", function (event) {
      if (!event.target.classList.contains("formula-slider")) return;
      const formula = event.target.dataset.formulaKey;
      const rating = Number(event.target.value);
      state.progress.formulaKnowledge[formula] = rating;
      const output = $("[data-formula-value]", event.target.closest(".formula-card"));
      if (output) output.textContent = rating + " / 10";
      saveProgress();
    });
  }

  function bindSearch() {
    $("#searchInput").addEventListener("input", function (event) {
      const term = event.target.value.trim().toLowerCase();
      if (!term) {
        $("#searchResults").innerHTML = "";
        return;
      }

      const results = questions.filter(function (question) {
        return [question.question, question.scenario, question.explanation, question.category, question.subcategory]
          .concat(question.tags || [], question.concepts || [])
          .join(" ")
          .toLowerCase()
          .includes(term);
      }).slice(0, 25);

      $("#searchResults").innerHTML = results.map(renderSearchResult).join("") || '<div class="panel">No matches.</div>';
    });
  }

  function renderSearchResult(question) {
    return '<div class="question-block"><div class="meta-row"><span class="badge">#' + question.id + '</span><span class="badge">' + escapeHtml(question.category) + '</span></div>'
      + '<h3>' + escapeHtml(question.question) + '</h3>'
      + '<p>' + escapeHtml(question.explanation) + '</p>'
      + '<button class="btn" data-action="study-link" data-study-id="' + escapeAttr(question.studyGuideReference || "") + '">Open study section</button> '
      + '<button class="btn" data-action="quick-bookmark" data-question-id="' + question.id + '">Bookmark</button></div>';
  }

  document.addEventListener("click", function (event) {
    if (event.target.dataset.action === "quick-bookmark") {
      toggleBookmark(Number(event.target.dataset.questionId));
      event.target.textContent = "Bookmarked";
    }
  });

  function renderDashboard() {
    const categories = unique(questions.map(function (question) { return question.category; }));
    $("#dashboardContent").innerHTML = categories.map(function (category) {
      const categoryQuestions = questions.filter(function (question) { return question.category === category; });
      const answered = categoryQuestions.filter(function (question) { return question.id in state.progress.answered; }).length;
      const percent = categoryQuestions.length ? Math.round((answered / categoryQuestions.length) * 100) : 0;
      return '<div class="card"><h3>' + escapeHtml(category) + '</h3><div class="bar"><span style="width:' + percent + '%"></span></div><p>' + answered + ' / ' + categoryQuestions.length + ' questions touched</p></div>';
    }).join("");
  }

  function renderReview() {
    renderQuestionList("#reviewList", state.progress.incorrect, "No missed questions yet.");
  }

  function renderBookmarks() {
    renderQuestionList("#bookmarkList", state.progress.bookmarks, "No bookmarks yet.");
  }

  function renderQuestionList(selector, ids, emptyMessage) {
    const items = ids.map(function (id) {
      return questions.find(function (question) { return question.id === id; });
    }).filter(Boolean);

    $(selector).innerHTML = items.map(function (question) {
      return '<div class="question-block"><div class="meta-row"><span class="badge">#' + question.id + '</span><span class="badge">' + escapeHtml(question.category) + '</span></div>'
        + '<h3>' + escapeHtml(question.question) + '</h3><p>' + escapeHtml(question.explanation) + '</p>'
        + renderTags(question.tags)
        + '</div>';
    }).join("") || '<div class="panel">' + emptyMessage + '</div>';
  }

  function renderStats() {
    const answered = state.progress.totalAnswered;
    const accuracy = answered ? Math.round((state.progress.totalCorrect / answered) * 100) : 0;
    const formulaRatings = Object.values(state.progress.formulaKnowledge).map(Number);
    const formulaAverage = formulaRatings.length
      ? (formulaRatings.reduce(function (sum, rating) { return sum + rating; }, 0) / formulaRatings.length).toFixed(1)
      : "0.0";
    $("#statsContent").innerHTML = '<div class="card-grid">'
      + statCard("Tests Taken", state.progress.testsTaken)
      + statCard("Answers Submitted", answered)
      + statCard("Correct Answers", state.progress.totalCorrect)
      + statCard("Lifetime Accuracy", accuracy + "%")
      + statCard("Known Flashcards", state.progress.flashKnown.length)
      + statCard("Flashcards To Review", state.progress.flashReview.length)
      + statCard("Avg Formula Rating", formulaAverage + " / 10")
      + '</div>';
  }

  function bindReset() {
    $("#resetProgress").addEventListener("click", function () {
      if (!confirm("Reset all saved progress?")) return;
      localStorage.removeItem(storageKey);
      state.progress = loadProgress();
      saveProgress();
      renderFlashcard();
      renderFormulas();
    });
  }

  function renderTags(tags) {
    return '<div class="tag-list">' + (tags || []).map(function (tag) {
      return '<span class="tag">' + escapeHtml(tag) + '</span>';
    }).join("") + '</div>';
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
  }

  function groupBy(items, key) {
    return items.reduce(function (result, item) {
      const value = item[key];
      if (!result[value]) result[value] = [];
      result[value].push(item);
      return result;
    }, {});
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const value = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = value;
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }
}());
