import React, { useState } from 'react';
import { ActivePage, Book, Language } from '../types/index.ts';
import { NCTB_BOOKS } from '../data/books.ts';
import {
  getStoredSavedBookIds,
  saveStoredSavedBookIds,
  getStoredBookmarks,
  saveStoredBookmarks,
  getStoredRecentBookIds,
  getStoredReadingProgress,
  saveStoredReadingProgress,
  recordBookOpened,
} from '../utils/storage.ts';
import { BookCard } from '../components/books/BookCard.tsx';
import { BookDetailsModal } from '../components/books/BookDetailsModal.tsx';
import {
  Library,
  BookOpen,
  Bookmark,
  Clock,
  TrendingUp,
  Download,
  Trash2,
  FolderMinus,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Info,
  ArrowRight,
  BookMarked,
  ExternalLink,
} from 'lucide-react';

interface MyLibraryPageProps {
  language: Language;
  onOpenReader: (bookId: string) => void;
  setActivePage: (page: ActivePage) => void;
}

export const MyLibraryPage: React.FC<MyLibraryPageProps> = ({
  language,
  onOpenReader,
  setActivePage,
}) => {
  const [activeSection, setActiveSection] = useState<
    'saved' | 'continue' | 'bookmarks' | 'recent' | 'downloads' | 'progress'
  >('saved');

  const [savedBookIds, setSavedBookIds] = useState<string[]>(getStoredSavedBookIds());
  const [bookmarks, setBookmarks] = useState(getStoredBookmarks());
  const [recentBookIds, setRecentBookIds] = useState<string[]>(getStoredRecentBookIds());
  const [readingProgress, setReadingProgress] = useState(getStoredReadingProgress());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);

  // Map IDs to full Book objects
  const savedBooks = NCTB_BOOKS.filter((b) => savedBookIds.includes(b.id));
  const recentBooks = recentBookIds
    .map((id) => NCTB_BOOKS.find((b) => b.id === id))
    .filter(Boolean) as Book[];

  const bookmarkedBookIds = bookmarks.filter((bm) => bm.type === 'book').map((bm) => bm.targetId);
  const bookmarkedBooks = NCTB_BOOKS.filter((b) => bookmarkedBookIds.includes(b.id));

  const continueReadingBooks = Object.keys(readingProgress)
    .map((id) => {
      const book = NCTB_BOOKS.find((b) => b.id === id);
      const prog = readingProgress[id];
      return book && prog ? { book, prog } : null;
    })
    .filter(Boolean) as Array<{ book: Book; prog: { currentChapter: number; currentPage: number; percent: number; lastReadDate: string } }>;

  // Filter books for current view
  const filterList = (list: Book[]) => {
    return list.filter((b) => {
      if (selectedClass !== 'All' && b.className !== selectedClass) return false;
      if (selectedSubject !== 'All' && b.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          b.titleBn.toLowerCase().includes(q) ||
          b.titleEn.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q) ||
          b.className.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  };

  const handleToggleSave = (book: Book) => {
    const isSaved = savedBookIds.includes(book.id);
    const updated = isSaved
      ? savedBookIds.filter((id) => id !== book.id)
      : [...savedBookIds, book.id];
    setSavedBookIds(updated);
    saveStoredSavedBookIds(updated);
  };

  const handleToggleBookmark = (book: Book) => {
    const isBm = bookmarks.some((bm) => bm.targetId === book.id);
    if (isBm) {
      const updated = bookmarks.filter((bm) => bm.targetId !== book.id);
      setBookmarks(updated);
      saveStoredBookmarks(updated);
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
    }
  };

  const handleOpenBook = (bookId: string) => {
    recordBookOpened(bookId);
    setRecentBookIds(getStoredRecentBookIds());
    onOpenReader(bookId);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header — Teal Accented Theme (My Library: teal) */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 text-teal-300 text-xs font-semibold border border-teal-600/50">
            <Library className="w-3.5 h-3.5 text-teal-400" />
            <span>ব্যক্তিগত অধ্যয়ন আর্কাইভ ও স্টোরেজ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আমার লাইব্রেরি (My Library)' : 'My Personal Library'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            আপনার পছন্দের সংরক্ষিত পাঠ্যবই, বুকমার্ক, সর্বশেষ পঠিত বই এবং অধ্যায়ভিত্তিক অগ্রগতি এক জায়গায় সহজে পরিচালনা করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActivePage('books')}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-98 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer relative z-10 shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>নতুন বই যোগ করুন (NCTB ক্যাটালগ)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Storage Limitation & Data Transparency Banner */}
      <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 rounded-2xl flex items-start gap-3 text-xs text-teal-900 dark:text-teal-200">
        <HardDrive className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            ব্রাউজার স্টোরেজ স্বচ্ছতা ও অফলাইন নীতিমালা:
          </p>
          <p className="text-slate-600 dark:text-teal-300/80 leading-relaxed">
            আপনার সংরক্ষিত বইয়ের তালিকা, বুকমার্ক এবং পড়ার অগ্রগতির তথ্য ব্রাউজারের লোকাল স্টোরেজে (localStorage) নিরাপদে সংরক্ষিত থাকে। ব্রাউজারের স্টোরেজ সীমাবদ্ধতার কারণে বিশাল আকারের পিডিএফ ফাইল সরাসরি লোকাল স্টোরেজে রাখা হয় না; বরং অফিশিয়াল এনসিটিবি লিংক ও ডিজিটাল রিডারের মাধ্যমে পড়া যায়।
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs for My Library Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'saved', labelBn: `সংরক্ষিত বই (${savedBooks.length})`, labelEn: `Saved Books (${savedBooks.length})`, icon: Library },
          { id: 'continue', labelBn: `পড়া চালিয়ে যান (${continueReadingBooks.length})`, labelEn: `Continue Reading (${continueReadingBooks.length})`, icon: TrendingUp },
          { id: 'bookmarks', labelBn: `বুকমার্কসমূহ (${bookmarkedBooks.length})`, labelEn: `Bookmarks (${bookmarkedBooks.length})`, icon: Bookmark },
          { id: 'recent', labelBn: `সম্প্রতি পঠিত (${recentBooks.length})`, labelEn: `Recently Opened (${recentBooks.length})`, icon: Clock },
          { id: 'progress', labelBn: 'পড়ার অগ্রগতি', labelEn: 'Reading Progress', icon: CheckCircle2 },
          { id: 'downloads', labelBn: 'ডাউনলোড ও পিডিএফ', labelEn: 'Downloads', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters for Saved Items */}
      {(activeSection === 'saved' || activeSection === 'bookmarks' || activeSection === 'recent') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="লাইব্রেরির বই খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none flex-1 sm:flex-none"
            >
              <option value="All">সকল শ্রেণি</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 5">Class 5</option>
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none flex-1 sm:flex-none"
            >
              <option value="All">সকল বিষয়</option>
              <option value="পদার্থবিজ্ঞান">পদার্থবিজ্ঞান</option>
              <option value="রসায়ন">রসায়ন</option>
              <option value="সাধারণ গণিত">সাধারণ গণিত</option>
              <option value="বিজ্ঞান">বিজ্ঞান</option>
              <option value="বাংলা">বাংলা</option>
              <option value="ইংরেজি">ইংরেজি</option>
            </select>
          </div>
        </div>
      )}

      {/* SECTION 1: ALL SAVED BOOKS */}
      {activeSection === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-teal-800 dark:text-teal-300">
              সংরক্ষিত পাঠ্যবইসমূহ ({filterList(savedBooks).length}টি প্রদর্শিত)
            </span>
            <span>ক্যাটালগ থেকে যে-কোনো সময় নতুন বই যুক্ত করতে পারেন</span>
          </div>

          {filterList(savedBooks).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterList(savedBooks).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  language={language}
                  isSaved={true}
                  isBookmarked={bookmarks.some((bm) => bm.targetId === book.id)}
                  onToggleSave={handleToggleSave}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenReader={handleOpenBook}
                  onViewDetails={(b) => setSelectedBookForDetails(b)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Library className="w-12 h-12 text-teal-400 mx-auto opacity-60" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                এখনো কোনো বই সংরক্ষণ করা হয়নি
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                এনসিটিবি লাইব্রেরি থেকে যেকোনো বইয়ের কার্ডে থাকা <strong>"+ My Library"</strong> বাটনে ক্লিক করে এখানে যুক্ত করুন।
              </p>
              <button
                type="button"
                onClick={() => setActivePage('books')}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-all"
              >
                বই ক্যাটালগ দেখুন (Browse Books)
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: CONTINUE READING */}
      {activeSection === 'continue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-teal-800 dark:text-teal-300">
              যেখান থেকে পড়া থামিয়েছেন
            </span>
          </div>

          {continueReadingBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueReadingBooks.map(({ book, prog }) => (
                <div
                  key={book.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-500 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                        {book.className} · {book.subject}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {book.titleBn}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        অধ্যায় {prog.currentChapter}: {book.chapters[prog.currentChapter - 1]?.titleBn || 'মূল বিষয়বস্তু'}
                      </p>
                    </div>

                    <span className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400 shrink-0">
                      {prog.percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>পৃষ্ঠা: {prog.currentPage} / {book.totalPages}</span>
                      <span>সর্বশেষ পাঠ: {prog.lastReadDate}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBook(book.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <BookMarked className="w-4 h-4" />
                    <span>পড়া চালিয়ে যান (Resume Reading)</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <TrendingUp className="w-12 h-12 text-teal-400 mx-auto opacity-60" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                এখনো কোনো পড়ার অগ্রগতি নেই
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                যেকোনো বই ওপেন করে পড়া শুরু করলে আপনার অগ্রগতি স্বয়ংক্রিয়ভাবে এখানে সংরক্ষিত হবে।
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: BOOKMARKS */}
      {activeSection === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-teal-800 dark:text-teal-300">
              বুকমার্ক করা পাঠ্যবইসমূহ ({filterList(bookmarkedBooks).length})
            </span>
          </div>

          {filterList(bookmarkedBooks).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterList(bookmarkedBooks).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  language={language}
                  isSaved={savedBookIds.includes(book.id)}
                  isBookmarked={true}
                  onToggleSave={handleToggleSave}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenReader={handleOpenBook}
                  onViewDetails={(b) => setSelectedBookForDetails(b)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Bookmark className="w-12 h-12 text-amber-400 mx-auto opacity-60" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                কোনো বুকমার্ক পাওয়া যায়নি
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                বইয়ের কার্ডে বুকমার্ক আইকনে ক্লিক করে প্রিয় বই দ্রুত অ্যাক্সেসের জন্য চিহ্নিত করে রাখুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: RECENTLY OPENED */}
      {activeSection === 'recent' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-teal-800 dark:text-teal-300">
              সর্বশেষ খোলা বইসমূহ ({filterList(recentBooks).length})
            </span>
          </div>

          {filterList(recentBooks).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterList(recentBooks).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  language={language}
                  isSaved={savedBookIds.includes(book.id)}
                  isBookmarked={bookmarks.some((bm) => bm.targetId === book.id)}
                  onToggleSave={handleToggleSave}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenReader={handleOpenBook}
                  onViewDetails={(b) => setSelectedBookForDetails(b)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Clock className="w-12 h-12 text-teal-400 mx-auto opacity-60" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                সম্প্রতি কোনো বই খোলা হয়নি
              </h4>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: READING PROGRESS OVERVIEW */}
      {activeSection === 'progress' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                সামগ্রিক পাঠ্যবই পড়ার অগ্রগতি ড্যাশবোর্ড
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                আপনার বিভিন্ন বিষয়ের পড়া ও অধ্যায় সমাপ্তির নিয়মিত ট্র্যাকিং
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800">
              {continueReadingBooks.length}টি বই প্রক্রিয়াধীন
            </span>
          </div>

          <div className="space-y-4">
            {continueReadingBooks.map(({ book, prog }) => (
              <div key={book.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{book.titleBn}</span>
                    <span className="text-[10px] text-slate-400">({book.className})</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400">{prog.percent}% সমাপ্ত</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${prog.percent}%` }} />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>অধ্যায় {prog.currentChapter}: {book.chapters[prog.currentChapter - 1]?.titleBn}</span>
                  <button
                    type="button"
                    onClick={() => handleOpenBook(book.id)}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
                  >
                    ডিজিটাল রিডারে খুলুন →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: DOWNLOADS & OFFICIAL PDFS */}
      {activeSection === 'downloads' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-teal-600" />
              <span>অনুমোদিত অফিশিয়াল পিডিএফ ও ডাউনলোড গাইড</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              এনসিটিবি অনুমোদিত বইসমূহের অফিশিয়াল পিডিএফ লিংক এবং অফলাইন ব্যবহারের সঠিক নিয়মাবলী।
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {NCTB_BOOKS.slice(0, 8).map((book) => (
              <div key={book.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{book.titleBn}</h5>
                  <p className="text-[11px] text-slate-400">{book.className} · {book.edition}</p>
                </div>

                {book.hasPermittedPdf && book.pdfUrl ? (
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>অফিশিয়াল PDF ডাউনলোড</span>
                  </a>
                ) : (
                  <a
                    href={book.officialNctbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <span>NCTB পোর্টাল লিংক</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Modal */}
      <BookDetailsModal
        book={selectedBookForDetails}
        isOpen={!!selectedBookForDetails}
        onClose={() => setSelectedBookForDetails(null)}
        language={language}
        isSaved={selectedBookForDetails ? savedBookIds.includes(selectedBookForDetails.id) : false}
        isBookmarked={selectedBookForDetails ? bookmarks.some((bm) => bm.targetId === selectedBookForDetails.id) : false}
        onToggleSave={handleToggleSave}
        onToggleBookmark={handleToggleBookmark}
        onOpenReader={handleOpenBook}
      />
    </div>
  );
};
