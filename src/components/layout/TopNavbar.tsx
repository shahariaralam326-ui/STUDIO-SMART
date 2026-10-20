import React from 'react';
import { ActivePage, Language, Theme, StudentProfile } from '../../types/index.ts';
import { SECTION_METAS } from '../../utils/sectionColors.ts';
import {
  Search,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Home,
  ChevronRight,
  Library,
  Compass,
  Bot,
} from 'lucide-react';

interface TopNavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  profile: StudentProfile;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activePage,
  setActivePage,
  profile,
  language,
  setLanguage,
  theme,
  setTheme,
  onToggleSidebar,
  isSidebarOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const currentMeta = SECTION_METAS[activePage] || SECTION_METAS.dashboard;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white px-4 sm:px-6 h-16 flex items-center justify-between gap-3 shadow-md">
      {/* Left: Mobile Toggle + Brand Logo (Graduation Cap + Book Motif) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button
          type="button"
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          {/* Logo icon with graduation cap and open book */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-950/50 relative shrink-0">
            <GraduationCap className="w-5 h-5 text-slate-950" />
            <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
              <BookOpen className="w-2.5 h-2.5 text-emerald-700" />
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-extrabold tracking-tight text-white block leading-none">
              STUDIO SMART
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wide">
              {language === 'bn' ? 'লার্নিং প্ল্যাটফর্ম' : 'Learning Platform'}
            </span>
          </div>
        </button>
      </div>

      {/* Middle: Breadcrumbs / Active Section Indicator */}
      <div className="flex items-center gap-2 text-xs truncate max-w-xs md:max-w-md">
        <button
          type="button"
          onClick={() => setActivePage('dashboard')}
          className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          title="হোমে ফিরুন"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{language === 'bn' ? 'হোম' : 'Home'}</span>
        </button>

        {activePage !== 'dashboard' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border truncate flex items-center gap-1.5 ${currentMeta.badgeBg} ${currentMeta.badgeText} border-slate-700/60`}
            >
              <span className="w-2 h-2 rounded-full bg-current shrink-0" />
              <span className="truncate">
                {language === 'bn' ? currentMeta.nameBn : currentMeta.nameEn}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right Controls: Quick Navigation Shortcuts, Language, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Quick Shortcut Buttons for Library & College */}
        <div className="hidden xl:flex items-center gap-1.5 border-r border-slate-800 pr-2">
          <button
            type="button"
            onClick={() => setActivePage('books')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              activePage === 'books' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>পাঠ্যবই</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('my-library')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              activePage === 'my-library' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Library className="w-3.5 h-3.5 text-teal-400" />
            <span>আমার লাইব্রেরি</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('college-finder')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              activePage === 'college-finder' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>কলেজ ফাইন্ডার</span>
          </button>
        </div>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          title="ভাষা পরিবর্তন (Toggle Language)"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
        </button>

        {/* Theme Toggle (Dark / Light) */}
        <button
          type="button"
          onClick={() => setTheme(theme === 'emerald-dark' ? 'emerald-light' : 'emerald-dark')}
          className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 transition-colors cursor-pointer"
          title="থিম পরিবর্তন (Toggle Theme)"
          aria-label="Toggle Theme"
        >
          {theme === 'emerald-dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-300" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
          )}
        </button>

        {/* Student Profile Pill */}
        <button
          type="button"
          onClick={() => setActivePage('profile')}
          className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
            activePage === 'profile'
              ? 'bg-slate-700 text-white border-emerald-400'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
          title="শিক্ষার্থী প্রোফাইল"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
            {profile.name ? profile.name.charAt(0) : 'T'}
          </div>
          <span className="text-xs font-semibold text-white hidden sm:inline max-w-[90px] truncate">
            {profile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
