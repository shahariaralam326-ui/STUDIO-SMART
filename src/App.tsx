import React, { useState, useEffect } from 'react';
import { ActivePage, Language, Theme, StudentProfile } from './types/index.ts';
import { getStoredProfile, resetAllDemoData } from './utils/storage.ts';

// Layout Components
import { TopNavbar } from './components/layout/TopNavbar.tsx';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { BottomNav } from './components/layout/BottomNav.tsx';
import { EduInnovatorsFooter } from './components/EduInnovatorsFooter.tsx';
import { ExhibitionBanner } from './components/ExhibitionBanner.tsx';

// Pages
import { DashboardPage } from './pages/DashboardPage.tsx';
import { BooksLibraryPage } from './pages/BooksLibraryPage.tsx';
import { MyLibraryPage } from './pages/MyLibraryPage.tsx';
import { BookReaderPage } from './pages/BookReaderPage.tsx';
import { AiTutorPage } from './pages/AiTutorPage.tsx';
import { AiExplainPage } from './pages/AiExplainPage.tsx';
import { StudyPlannerPage } from './pages/StudyPlannerPage.tsx';
import { CollegeFinderPage } from './pages/CollegeFinderPage.tsx';
import { EStorePage } from './pages/EStorePage.tsx';
import { QuizzesPage } from './pages/QuizzesPage.tsx';
import { PracticeTestsPage } from './pages/PracticeTestsPage.tsx';
import { NotesPage } from './pages/NotesPage.tsx';
import { BookmarksPage } from './pages/BookmarksPage.tsx';
import { VocabularyPage } from './pages/VocabularyPage.tsx';
import { StudyProgressPage } from './pages/StudyProgressPage.tsx';
import { ExamCountdownPage } from './pages/ExamCountdownPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { AboutTeamPage } from './pages/AboutTeamPage.tsx';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [language, setLanguage] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('emerald-dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [selectedBookForReader, setSelectedBookForReader] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [geminiConfigured, setGeminiConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setGeminiConfigured(!!data.geminiConfigured);
      })
      .catch((err) => {
        console.warn('Health check error:', err);
        setGeminiConfigured(false);
      });
  }, []);

  const [presetData, setPresetData] = useState<{
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
    district: string;
    label: string;
  } | null>(null);

  const handleOpenReader = (bookId: string) => {
    setSelectedBookForReader(bookId);
    setActivePage('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadExhibitionPreset = (preset: {
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
    district: string;
    label: string;
  }) => {
    setPresetData(preset);
    setActivePage('college-finder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'emerald-dark'
          ? 'bg-[#0a0f1d] text-slate-100 dark'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Science Exhibition Fast Ticker & Presets */}
      <ExhibitionBanner
        onLoadPreset={handleLoadExhibitionPreset}
        geminiConfigured={geminiConfigured}
      />

      {/* Top Navbar */}
      <TopNavbar
        activePage={activePage}
        setActivePage={setActivePage}
        profile={profile}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Responsive App Shell: Collapsible Sidebar on Desktop + Mobile Drawer */}
      <div className="flex-1 flex">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          language={language}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Routed Content Area with Dynamic Padding */}
        <div
          className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
            isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
          }`}
        >
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
            {activePage === 'dashboard' && (
              <DashboardPage
                setActivePage={setActivePage}
                profile={profile}
                language={language}
                onSelectBookForReader={handleOpenReader}
              />
            )}

            {activePage === 'books' && (
              <BooksLibraryPage
                language={language}
                onOpenReader={handleOpenReader}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'my-library' && (
              <MyLibraryPage
                language={language}
                onOpenReader={handleOpenReader}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'reader' && (
              <BookReaderPage
                bookId={selectedBookForReader}
                onBackToLibrary={() => setActivePage('books')}
                setActivePage={setActivePage}
                language={language}
              />
            )}

            {activePage === 'ai-tutor' && (
              <AiTutorPage profile={profile} language={language} />
            )}

            {activePage === 'ai-explain' && (
              <AiExplainPage profile={profile} language={language} />
            )}

            {activePage === 'planner' && (
              <StudyPlannerPage profile={profile} language={language} />
            )}

            {(activePage === 'college-finder' || activePage === 'scanner' || activePage === 'marksheet') && (
              <CollegeFinderPage
                language={language}
                profile={profile}
                geminiConfigured={geminiConfigured}
                presetData={presetData}
              />
            )}

            {activePage === 'estore' && <EStorePage language={language} />}

            {activePage === 'quizzes' && (
              <QuizzesPage language={language} profile={profile} />
            )}

            {activePage === 'tests' && <PracticeTestsPage language={language} />}

            {activePage === 'notes' && <NotesPage language={language} />}

            {activePage === 'bookmarks' && (
              <BookmarksPage
                setActivePage={setActivePage}
                onOpenBookReader={handleOpenReader}
                language={language}
              />
            )}

            {activePage === 'vocabulary' && <VocabularyPage language={language} />}

            {activePage === 'progress' && (
              <StudyProgressPage profile={profile} language={language} />
            )}

            {activePage === 'countdown' && <ExamCountdownPage language={language} />}

            {activePage === 'profile' && (
              <ProfilePage
                profile={profile}
                setProfile={setProfile}
                language={language}
              />
            )}

            {activePage === 'settings' && (
              <SettingsPage
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'about' && <AboutTeamPage language={language} />}
          </main>

          {/* EduInnovators Footer */}
          <EduInnovatorsFooter setActivePage={setActivePage} language={language} />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />
    </div>
  );
}
