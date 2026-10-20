import React from 'react';
import { ActivePage, Language } from '../../types/index.ts';
import { Home, BookOpen, Library, Bot, Compass, Menu } from 'lucide-react';

interface BottomNavProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  language: Language;
  onOpenSidebar: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activePage,
  setActivePage,
  language,
  onOpenSidebar,
}) => {
  const items = [
    { id: 'dashboard' as ActivePage, labelBn: 'হোম', labelEn: 'Home', icon: Home, activeColor: 'text-emerald-400' },
    { id: 'books' as ActivePage, labelBn: 'পাঠ্যবই', labelEn: 'Books', icon: BookOpen, activeColor: 'text-blue-400' },
    { id: 'my-library' as ActivePage, labelBn: 'লাইব্রেরি', labelEn: 'My Library', icon: Library, activeColor: 'text-teal-400' },
    { id: 'ai-tutor' as ActivePage, labelBn: 'এআই টিউটর', labelEn: 'AI Tutor', icon: Bot, isSpecial: true, activeColor: 'text-violet-400' },
    { id: 'college-finder' as ActivePage, labelBn: 'কলেজ', labelEn: 'College', icon: Compass, activeColor: 'text-indigo-400' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 dark:bg-slate-950/98 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around lg:hidden shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
              isActive ? `${item.activeColor} font-bold` : 'text-slate-400 hover:text-white'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-transform ${
                item.isSpecial
                  ? isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50 scale-110'
                    : 'bg-slate-800 text-violet-300'
                  : isActive
                  ? 'scale-110'
                  : ''
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="mt-0.5 truncate">{language === 'bn' ? item.labelBn : item.labelEn}</span>
          </button>
        );
      })}

      {/* Menu Drawer Toggle */}
      <button
        type="button"
        onClick={onOpenSidebar}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Open Sidebar Menu"
      >
        <div className="p-1">
          <Menu className="w-4 h-4" />
        </div>
        <span className="mt-0.5">{language === 'bn' ? 'মেনু' : 'Menu'}</span>
      </button>
    </nav>
  );
};
