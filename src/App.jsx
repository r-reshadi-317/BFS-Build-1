import { useCallback, useState } from "react";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { useStudySets } from "./hooks/useStudySets.js";
import { useProgress } from "./hooks/useProgress.js";
import { useTheme } from "./hooks/useTheme.js";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ActiveSetBar } from "./components/ActiveSetBar.jsx";
import { HomeView } from "./views/HomeView.jsx";
import { StudyView } from "./views/StudyView.jsx";
import { PracticeView } from "./views/PracticeView.jsx";
import { FlashcardsView } from "./views/FlashcardsView.jsx";
import { FormulasView } from "./views/FormulasView.jsx";
import { DashboardView } from "./views/DashboardView.jsx";
import { SearchView } from "./views/SearchView.jsx";
import { ReviewView } from "./views/ReviewView.jsx";
import { BookmarksView } from "./views/BookmarksView.jsx";
import { StatsView } from "./views/StatsView.jsx";
import { StudySetsView } from "./views/StudySetsView.jsx";
import { ProfileView } from "./views/ProfileView.jsx";

export default function App() {
  const { sets, activeSet, activeSetId, selectSet, importFromJson, deleteSet } = useStudySets();
  const { progress, saveProgress, resetProgress, deleteProgressForSet } = useProgress(activeSetId);
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState("home");
  const [pendingStudyId, setPendingStudyId] = useState(null);

  const activeSetName = activeSet.name;

  const accuracy = progress.totalAnswered
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  const navigate = useCallback((viewId) => {
    setCurrentView(viewId);
  }, []);

  const openStudySection = useCallback((sectionId) => {
    if (!sectionId) return;
    setPendingStudyId(sectionId);
    setCurrentView("study");
  }, []);

  const clearPendingStudy = useCallback(() => {
    setPendingStudyId(null);
  }, []);

  return (
    <AuthProvider>
      <>
        <Header
          currentView={currentView}
          onNavigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <ActiveSetBar
          activeSet={activeSet}
          onManageSets={() => navigate("study-sets")}
        />

        <main id="app">
        {currentView === "home" && (
          <HomeView
            activeSetName={activeSetName}
            questionsCount={activeSet.questions.length}
            studyCount={activeSet.studyGuide.length}
            accuracy={accuracy}
            bookmarkCount={progress.bookmarks.length}
            onNavigate={navigate}
          />
        )}

        {currentView === "study-sets" && (
          <StudySetsView
            activeSetName={activeSetName}
            sets={sets}
            activeSetId={activeSetId}
            selectSet={selectSet}
            importFromJson={importFromJson}
            deleteSet={deleteSet}
            deleteProgressForSet={deleteProgressForSet}
          />
        )}

        {currentView === "study" && (
          <StudyView
            key={activeSetId}
            activeSetName={activeSetName}
            studyGuide={activeSet.studyGuide}
            initialSectionId={pendingStudyId}
            onSectionConsumed={clearPendingStudy}
          />
        )}

        {currentView === "practice" && (
          <PracticeView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
            saveProgress={saveProgress}
            onStudyLink={openStudySection}
          />
        )}

        {currentView === "flashcards" && (
          <FlashcardsView
            key={activeSetId}
            activeSetName={activeSetName}
            flashcards={activeSet.flashcards}
            progress={progress}
            saveProgress={saveProgress}
          />
        )}

        {currentView === "formulas" && (
          <FormulasView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
            saveProgress={saveProgress}
          />
        )}

        {currentView === "dashboard" && (
          <DashboardView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
          />
        )}

        {currentView === "search" && (
          <SearchView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
            saveProgress={saveProgress}
            onStudyLink={openStudySection}
          />
        )}

        {currentView === "review" && (
          <ReviewView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
          />
        )}

        {currentView === "bookmarks" && (
          <BookmarksView
            key={activeSetId}
            activeSetName={activeSetName}
            questions={activeSet.questions}
            progress={progress}
          />
        )}

        {currentView === "profile" && (
          <ProfileView
            onNavigate={navigate}
          />
        )}

        {currentView === "stats" && (
          <StatsView
            key={activeSetId}
            activeSetName={activeSetName}
            progress={progress}
            resetProgress={resetProgress}
          />
        )}
      </main>

      <Footer />
    </>
    </AuthProvider>
  );
}
