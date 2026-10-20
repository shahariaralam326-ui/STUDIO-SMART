import React, { useState } from 'react';
import { ActivePage, Language } from '../../types/index.ts';
import { SECTION_METAS } from '../../utils/sectionColors.ts';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  BookMarked,
  Bot,
  Sparkles,
  Calendar,
  Compass,
  Scan,
  Calculator,
  ShoppingBag,
  HelpCircle,
  FileCheck,
  FileText,
  Bookmark,
  Languages,
  TrendingUp,
  Clock,
  User,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  Home,
  X,
} from 'lucide-react';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavSection {
  titleBn: string;
  titleEn: string;
  items: Array<{
    id: ActivePage;
    labelBn: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  language,
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const navSections: NavSection[] = [
    {
      titleBn: 'মূল প্ল্যাটফর্ম',
      titleEn: 'Main',
      items: [
        { id: 'dashboard', labelBn: 'হোম ড্যাশবোর্ড', labelEn: 'Home Dashboard', icon: Home },
      ],
    },
    {
      titleBn: 'পাঠ্যবই ও লাইব্রেরি',
      titleEn: 'Textbooks & Library',
      items: [
        { id: 'books', labelBn: 'এনসিটিবি পাঠ্যবই লাইব্রেরি', labelEn: 'NCTB Books Library', icon: BookOpen, badge: '৫-১০' },
        { id: 'my-library', labelBn: 'আমার লাইব্রেরি (My Library)', labelEn: 'My Library', icon: Library, badge: 'সংরক্ষিত' },
        { id: 'reader', labelBn: 'ডিজিটাল বুক রিডার', labelEn: 'Book Reader', icon: BookMarked },
      ],
    },
    {
      titleBn: 'এআই লার্নিং টুলস',
      titleEn: 'AI Learning Tools',
      items: [
        { id: 'ai-tutor', labelBn: 'জেমিনি এআই টিউটর', labelEn: 'Gemini AI Tutor', icon: Bot, badge: 'লাইভ' },
        { id: 'ai-explain', labelBn: 'এআই সমাধান ও ব্যাখ্যাকারী', labelEn: 'AI Learning Assistant', icon: Sparkles },
      ],
    },
    {
      titleBn: 'এসএসসি ও কলেজ নির্বাচন',
      titleEn: 'SSC & College',
      items: [
        { id: 'college-finder', labelBn: 'এসএসসি কলেজ ফাইন্ডার', labelEn: 'SSC College Finder', icon: Compass, badge: 'যাচাইকৃত' },
        { id: 'scanner', labelBn: 'রেজাল্ট শিট স্ক্যানার', labelEn: 'Result Scanner', icon: Scan },
        { id: 'marksheet', labelBn: 'গ্রেড ও ৪র্থ বিষয় ক্যালকুলেটর', labelEn: 'Grade Calculator', icon: Calculator },
      ],
    },
    {
      titleBn: 'স্টুডেন্ট মার্কেটপ্লেস',
      titleEn: 'Student Shop',
      items: [
        { id: 'estore', labelBn: 'স্টুডেন্ট ই-স্টোর (Rokomari)', labelEn: 'Student E-Store', icon: ShoppingBag, badge: 'শপ' },
      ],
    },
    {
      titleBn: 'অনুশীলন ও পরীক্ষা',
      titleEn: 'Practice',
      items: [
        { id: 'quizzes', labelBn: 'ইন্টারেক্টিভ এমসিকিউ কুইজ', labelEn: 'MCQ Quizzes', icon: HelpCircle },
        { id: 'tests', labelBn: 'প্র্যাকটিস টেস্ট', labelEn: 'Practice Tests', icon: FileCheck },
      ],
    },
    {
      titleBn: 'স্টাডি টুলস ও রুটিন',
      titleEn: 'Study Tools',
      items: [
        { id: 'planner', labelBn: 'দৈনিক ও সাপ্তাহিক প্ল্যানার', labelEn: 'Study Planner', icon: Calendar },
        { id: 'notes', labelBn: 'স্টাডি নোটবুক', labelEn: 'Study Notes', icon: FileText },
        { id: 'bookmarks', labelBn: 'সংরক্ষিত বুকমার্কস', labelEn: 'Bookmarks', icon: Bookmark },
        { id: 'vocabulary', labelBn: 'ইংরেজি শব্দভাণ্ডার (Vocab)', labelEn: 'Vocabulary', icon: Languages },
      ],
    },
    {
      titleBn: 'ট্র্যাকিং ও পর্যবেক্ষণ',
      titleEn: 'Tracking',
      items: [
        { id: 'progress', labelBn: 'পড়াশোনার অগ্রগতি', labelEn: 'Study Progress', icon: TrendingUp },
        { id: 'countdown', labelBn: 'পরীক্ষার কাউন্টডাউন', labelEn: 'Exam Countdown', icon: Clock },
      ],
    },
    {
      titleBn: 'অ্যাকাউন্ট ও প্রদর্শনী',
      titleEn: 'Account & Team',
      items: [
        { id: 'profile', labelBn: 'শিক্ষার্থী প্রোফাইল', labelEn: 'Student Profile', icon: User },
        { id: 'settings', labelBn: 'অ্যাপ সেটিংস', labelEn: 'Settings', icon: Settings },
        { id: 'about', labelBn: 'টিম EduInnovators পরিচিতি', labelEn: 'About & Team', icon: Users, badge: 'প্রদর্শনী' },
      ],
    },
  ];

  const handleItemClick = (id: ActivePage) => {
    setActivePage(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 bg-slate-900/98 dark:bg-slate-950/98 border-r border-slate-800 z-40 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        } ${isOpen ? 'w-72 translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Collapse Toggle Control for Desktop */}
        <div className="hidden lg:flex items-center justify-between px-3 py-2 border-b border-slate-800/80 bg-slate-950/50">
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {language === 'bn' ? 'মেনু নেভিগেশন' : 'Navigation'}
            </span>
          )}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              title={isCollapsed ? 'প্রসারিত করুন (Expand)' : 'সংকুচিত করুন (Collapse)'}
              aria-label="Toggle Sidebar Width"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Scrollable Navigation List */}
        <div className="py-3 px-2 space-y-5 flex-1 overflow-y-auto scrollbar-thin">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400/80 px-3 block">
                  {language === 'bn' ? section.titleBn : section.titleEn}
                </span>
              )}

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const meta = SECTION_METAS[item.id] || SECTION_METAS.dashboard;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group cursor-pointer ${
                        isActive
                          ? `${meta.activeBg} font-bold shadow-md`
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                      title={language === 'bn' ? item.labelBn : item.labelEn}
                    >
                      <div className={`flex items-center gap-3 truncate ${isCollapsed ? 'mx-auto' : ''}`}>
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">
                            {language === 'bn' ? item.labelBn : item.labelEn}
                          </span>
                        )}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Studio Smart</span>
              <span className="text-emerald-400 font-bold">EduInnovators</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              বিজ্ঞান মেলা প্রদর্শনী সংস্করণ ২০২৬
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
