import React, { useState } from 'react';
import { BookmarkItem, ActivePage, Language } from '../types/index.ts';
import { getStoredBookmarks, saveStoredBookmarks } from '../utils/storage.ts';
import { Bookmark, BookOpen, Compass, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksPageProps {
  setActivePage: (page: ActivePage) => void;
  onOpenBookReader: (bookId: string) => void;
  language: Language;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  setActivePage,
  onOpenBookReader,
  language,
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getStoredBookmarks());

  const handleRemove = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    saveStoredBookmarks(updated);
  };

  const handleOpenItem = (bm: BookmarkItem) => {
    if (bm.type === 'book') {
      onOpenBookReader(bm.targetId);
    } else if (bm.type === 'college') {
      setActivePage('college-finder');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 text-lime-400" />
            <span>সংরক্ষিত বুকমার্কস ও পছন্দের তালিকা</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'সংরক্ষিত পাঠ্যবই ও কলেজ তালিকা' : 'Saved Bookmarks & Favorites'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            আপনার পরবর্তীতে পড়ার জন্য পিন করা পাঠ্যবই এবং কলেজ প্রোফাইল
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            সংরক্ষিত সামগ্রী ({bookmarks.length}টি)
          </h4>
        </div>

        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  {bm.type === 'book' ? <BookOpen className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                </div>
                <div className="truncate">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {bm.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 truncate">
                    {bm.subtitle} · সংরক্ষিত: {bm.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenItem(bm)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>খুলুন</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(bm.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="বুকমার্ক মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {bookmarks.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
              <p>আপনার কোনো বুকমার্ক সংরক্ষিত নেই। পাঠ্যবই বা কলেজ থেকে বুকমার্ক আইকনে ক্লিক করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
