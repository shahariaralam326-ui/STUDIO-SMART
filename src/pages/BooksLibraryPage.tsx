import React, { useState } from 'react';
import { Book, ActivePage, Language } from '../types/index.ts';
import { NCTB_BOOKS } from '../data/books.ts';
import {
  getStoredBookmarks,
  saveStoredBookmarks,
  getStoredSavedBookIds,
  saveStoredSavedBookIds,
  recordBookOpened,
} from '../utils/storage.ts';
import { BookCard } from '../components/books/BookCard.tsx';
import { BookDetailsModal } from '../components/books/BookDetailsModal.tsx';
import {
  BookOpen,
  Search,
  ExternalLink,
  Filter,
  Layers,
  Sparkles,
  FolderCheck,
  Bookmark,
  CheckCircle2,
  Library,
  ArrowRight,
} from 'lucide-react';

interface BooksLibraryPageProps {
  language: Language;
  onOpenReader: (bookId: string) => void;
  setActivePage: (page: ActivePage) => void;
}

export const BooksLibraryPage: React.FC<BooksLibraryPageProps> = ({
  language,
  onOpenReader,
  setActivePage,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedMedium, setSelectedMedium] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'saved' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Storage states
  const [bookmarks, setBookmarks] = useState(getStoredBookmarks());
  const [savedBookIds, setSavedBookIds] = useState<string[]>(getStoredSavedBookIds());
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isBookmarked = (bookId: string) => bookmarks.some((b) => b.targetId === bookId);
  const isSaved = (bookId: string) => savedBookIds.includes(bookId);

  const toggleBookmark = (book: Book) => {
    if (isBookmarked(book.id)) {
      const updated = bookmarks.filter((b) => b.targetId !== book.id);
      setBookmarks(updated);
      saveStoredBookmarks(updated);
      showToast(`বুকমার্ক থেকে সরানো হয়েছে: ${book.titleBn}`);
    } else {
      const updated = [
        ...bookmarks,
        {
          id: 'bm-' + Date.now(),
          type: 'book' as const,
          targetId: book.id,
          title: book.titleBn,
          subtitle: `${book.className} · ${book.subject}`,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ];
      setBookmarks(updated);
      saveStoredBookmarks(updated);
      showToast(`বুকমার্কে যোগ করা হয়েছে: ${book.titleBn}`);
    }
  };

  const toggleSave = (book: Book) => {
    if (isSaved(book.id)) {
      const updated = savedBookIds.filter((id) => id !== book.id);
      setSavedBookIds(updated);
      saveStoredSavedBookIds(updated);
      showToast(`আমার লাইব্রেরি থেকে সরানো হয়েছে: ${book.titleBn}`);
    } else {
      const updated = [...savedBookIds, book.id];
      setSavedBookIds(updated);
      saveStoredSavedBookIds(updated);
      showToast(`আমার লাইব্রেরিতে সংরক্ষণ করা হয়েছে: ${book.titleBn}`);
    }
  };

  const handleOpenReaderWithRecord = (bookId: string) => {
    recordBookOpened(bookId);
    onOpenReader(bookId);
  };

  // Filter books
  const filteredBooks = NCTB_BOOKS.filter((b) => {
    // Class filter
    if (selectedClass !== 'All' && b.className !== selectedClass) return false;
    // Subject filter
    if (selectedSubject !== 'All' && b.subject !== selectedSubject) return false;
    // Medium filter
    if (selectedMedium !== 'All' && b.medium !== selectedMedium) return false;
    // Year filter
    if (selectedYear !== 'All' && b.academicYear !== selectedYear) return false;

    // Tab filter (All / Saved / Bookmarked)
    if (activeTabFilter === 'saved' && !isSaved(b.id)) return false;
    if (activeTabFilter === 'bookmarked' && !isBookmarked(b.id)) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        b.titleBn.toLowerCase().includes(q) ||
        b.titleEn.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.className.toLowerCase().includes(q) ||
        b.chapters.some((c) => c.titleBn.toLowerCase().includes(q) || c.titleEn.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const subjectsList = ['All', ...Array.from(new Set(NCTB_BOOKS.map((b) => b.subject)))];
  const classesList = ['All', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs flex items-center gap-2 animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Library Banner — Blue Accented Section Design */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-300 text-xs font-semibold border border-blue-600/50">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'bn' ? 'স্মার্ট এনসিটিবি পাঠ্যবই লাইব্রেরি' : 'Smart NCTB Books Library'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            ৫ম থেকে ১০ম শ্রেণির সকল বাংলা মাধ্যম ও ইংরেজি ভার্সনের মূল পাঠ্যবই। সরাসরি অনলাইনে পড়ুন, নিজের লাইব্রেরিতে সংরক্ষণ করুন অথবা অফিশিয়াল পিডিএফ ডাউনলোড করুন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 relative z-10 shrink-0">
          <button
            type="button"
            onClick={() => setActivePage('my-library')}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Library className="w-4 h-4" />
            <span>আমার সংরক্ষিত বই ({savedBookIds.length})</span>
          </button>

          <a
            href="https://nctb.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-600/80 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>অফিশিয়াল NCTB পোর্টাল</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Filter Row: Search & Class Buttons */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'বইয়ের নাম, বিষয়, শ্রেণি বা অধ্যায় খুঁজুন...' : 'Search book name, subject, class, or chapter...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Class Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {classesList.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedClass(c)}
                className={`text-xs px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedClass === c
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c === 'All' ? (language === 'bn' ? 'সকল শ্রেণি' : 'All Classes') : c}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Line: Subject, Medium, Year, and Special Collections */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Selector */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-slate-500 font-semibold">{language === 'bn' ? 'বিষয়:' : 'Subject:'}</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none text-xs"
              >
                {subjectsList.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? (language === 'bn' ? 'সকল বিষয়' : 'All Subjects') : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold">{language === 'bn' ? 'ভার্সন:' : 'Version:'}</span>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none text-xs"
              >
                <option value="All">{language === 'bn' ? 'সকল ভার্সন' : 'All Versions'}</option>
                <option value="bangla">বাংলা মাধ্যম</option>
                <option value="english">English Version</option>
              </select>
            </div>

            {/* Academic Year */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold">{language === 'bn' ? 'শিক্ষাবর্ষ:' : 'Year:'}</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none text-xs font-mono"
              >
                <option value="All">{language === 'bn' ? 'সকল শিক্ষাবর্ষ' : 'All Years'}</option>
                <option value="2026">২০২৬ (Current)</option>
              </select>
            </div>
          </div>

          {/* Quick Collection Segmented Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTabFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              সকল বই ({NCTB_BOOKS.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTabFilter('saved')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTabFilter === 'saved'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <FolderCheck className="w-3 h-3" />
              <span>সংরক্ষিত ({savedBookIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTabFilter('bookmarked')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTabFilter === 'bookmarked'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>বুকমার্ককৃত ({bookmarks.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            language={language}
            isSaved={isSaved(book.id)}
            isBookmarked={isBookmarked(book.id)}
            onToggleSave={toggleSave}
            onToggleBookmark={toggleBookmark}
            onOpenReader={handleOpenReaderWithRecord}
            onViewDetails={(b) => setSelectedBookForDetails(b)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            কোনো পাঠ্যবই খুঁজে পাওয়া যায়নি
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            আপনার নির্বাচন করা শ্রেণি, বিষয় বা সার্চ কিওয়ার্ডের সাথে মেলে এমন কোনো বই পাওয়া যায়নি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedClass('All');
              setSelectedSubject('All');
              setSelectedMedium('All');
              setActiveTabFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            ফিল্টার রিসেট করুন (Reset Filters)
          </button>
        </div>
      )}

      {/* Details Modal */}
      <BookDetailsModal
        book={selectedBookForDetails}
        isOpen={!!selectedBookForDetails}
        onClose={() => setSelectedBookForDetails(null)}
        language={language}
        isSaved={selectedBookForDetails ? isSaved(selectedBookForDetails.id) : false}
        isBookmarked={selectedBookForDetails ? isBookmarked(selectedBookForDetails.id) : false}
        onToggleSave={toggleSave}
        onToggleBookmark={toggleBookmark}
        onOpenReader={handleOpenReaderWithRecord}
      />
    </div>
  );
};
