import React, { useState, useEffect } from 'react';
import { NCTB_BOOKS } from '../data/books.ts';
import { ActivePage, Language } from '../types/index.ts';
import { saveStoredReadingProgress, recordBookOpened } from '../utils/storage.ts';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  List,
  ExternalLink,
  Sparkles,
  Bot,
} from 'lucide-react';

interface BookReaderPageProps {
  bookId: string | null;
  onBackToLibrary: () => void;
  setActivePage: (page: ActivePage) => void;
  language: Language;
}

export const BookReaderPage: React.FC<BookReaderPageProps> = ({
  bookId,
  onBackToLibrary,
  setActivePage,
  language,
}) => {
  const currentBook = NCTB_BOOKS.find((b) => b.id === bookId) || NCTB_BOOKS[0];
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showChapterMenu, setShowChapterMenu] = useState<boolean>(false);

  const chapter = currentBook.chapters[currentChapterIndex] || currentBook.chapters[0];

  useEffect(() => {
    if (currentBook) {
      recordBookOpened(currentBook.id);
      const totalCh = currentBook.chapters.length || 1;
      const percent = Math.round(((currentChapterIndex + 1) / totalCh) * 100);
      const pageApprox = Math.round((currentBook.totalPages / totalCh) * (currentChapterIndex + 1));
      saveStoredReadingProgress(currentBook.id, currentChapterIndex + 1, pageApprox, percent);
    }
  }, [currentBook, currentChapterIndex]);

  const handleNextChapter = () => {
    if (currentChapterIndex < currentBook.chapters.length - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Controls Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToLibrary}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লাইব্রেরিতে ফিরুন' : 'Back to Library'}</span>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              {currentBook.titleBn}
            </h3>
            <p className="text-[11px] text-slate-500">
              {currentBook.className} · {currentBook.subject}
            </p>
          </div>
        </div>

        {/* Reader Tools: Zoom, Chapters, AI Tutor Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowChapterMenu(!showChapterMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-lg transition-colors"
          >
            <List className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'অধ্যায় তালিকা' : 'Chapters'}</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900"
              title="জুম আউট"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 font-semibold text-slate-700 dark:text-slate-300">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900"
              title="জুম ইন"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActivePage('ai-tutor')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-500 hover:bg-lime-400 text-emerald-950 text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'অধ্যায়ের প্রশ্ন করুন' : 'Ask AI'}</span>
          </button>
        </div>
      </div>

      {/* Main Reader View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Chapter Selection Drawer / Sidebar */}
        <div
          className={`lg:block ${
            showChapterMenu ? 'block' : 'hidden'
          } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              {language === 'bn' ? 'অধ্যায় সূচিপত্র' : 'Table of Contents'}
            </span>
            <span className="text-[11px] text-slate-400">
              {currentBook.chapters.length}টি অধ্যায়
            </span>
          </div>

          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {currentBook.chapters.map((ch, idx) => (
              <button
                key={ch.number}
                type="button"
                onClick={() => {
                  setCurrentChapterIndex(idx);
                  setShowChapterMenu(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                  currentChapterIndex === idx
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="truncate">
                  <span className="block font-semibold">অধ্যায় {ch.number}: {ch.titleBn}</span>
                  <span className={`text-[10px] block truncate ${currentChapterIndex === idx ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {ch.titleEn}
                  </span>
                </div>
                <span className={`text-[10px] font-mono shrink-0 ${currentChapterIndex === idx ? 'text-lime-200' : 'text-slate-400'}`}>
                  পৃ. {ch.pages}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href={currentBook.officialNctbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>অফিসিয়াল এনসিটিবি পোর্টাল</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Reading Canvas */}
        <div className="lg:col-span-3 space-y-4">
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
            style={{ fontSize: `${zoomLevel}%` }}
          >
            {/* Chapter Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                অধ্যায় {chapter.number} · {currentBook.subject}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {chapter.titleBn}
              </h2>
              <p className="text-sm text-slate-500">
                {chapter.titleEn} · পৃষ্ঠা পরিসর: {chapter.pages}
              </p>
            </div>

            {/* Structured Digital Textbook Content */}
            <div className="space-y-5 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 space-y-2">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>অধ্যায়ের শিখনফল ও মূল বিষয়বস্তু:</span>
                </h4>
                <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-emerald-900/90 dark:text-emerald-200/90">
                  <li>এই অধ্যায় পাঠ শেষে শিক্ষার্থী বিষয়বস্তুর মৌলিক সংজ্ঞা ও নীতি ব্যাখ্যা করতে পারবে।</li>
                  <li>ব্যবহারিক জীবনে ও পরীক্ষায় সাধারণ গাণিতিক এবং তাত্ত্বিক সমস্যার সমাধানে প্রয়োগ করতে পারবে।</li>
                  <li>বোর্ড পরীক্ষায় এই অধ্যায় থেকে সৃজনশীল ও বহুনির্বাচনী প্রশ্নের নিয়মিত কাঠামো বুঝতে সক্ষম হবে।</li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ১. মূল ধারণা ও সংজ্ঞা (Core Concepts)
                </h4>
                <p>
                  জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) নির্ধারিত পাঠ্যসূচি অনুযায়ী এই অধ্যায়টি শিক্ষার্থীদের ধারাবাহিক জ্ঞান অর্জনের অন্যতম প্রধান ভিত্তি। বিষয়টির প্রতিটি সূত্র ও ব্যাখ্যার পেছনে রয়েছে বাস্তবসম্মত বৈজ্ঞানিক পর্যবেক্ষণ।
                </p>
                <p>
                  শিক্ষার্থীদের জন্য পরামর্শ: পাঠ্যবইয়ের প্রতিটি উদাহরণ মনোযোগ দিয়ে পড়ুন এবং অনুশীলনীর প্রশ্নগুলো নিজের খাতায় লিখে সমাধান করুন।
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ২. গুরুত্বপূর্ণ প্রশ্ন ও সূত্রাবলি
                </h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    • বোর্ড পরীক্ষার প্রস্তুতিতে মনে রাখার বিষয়:
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    বিগত বছরগুলোর এসএসসি ও বার্ষিক পরীক্ষায় এই অধ্যায় থেকে সৃজনশীল প্রশ্নের (ক) ও (খ) নম্বরের জ্ঞান ও অনুধাবনমূলক প্রশ্ন এসেছে।
                  </p>
                </div>
              </div>

              {/* Direct PDF Link Notice */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                <p className="font-bold">
                  সম্পূর্ণ মূল পাঠ্যবই মুদ্রণ ও পিডিএফ নির্দেশিকা:
                </p>
                <p>
                  এনসিটিবি কর্তৃক অনুমোদিত সম্পূর্ণ পাঠ্যবইয়ের অফিশিয়াল পিডিএফ সরাসরি এনসিটিবি সার্ভার থেকে ডাউনলোড করতে পারেন।
                </p>
                <a
                  href={currentBook.officialNctbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors"
                >
                  <span>অফিশিয়াল NCTB পেজ ওপেন করুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Chapter Paging Buttons */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevChapter}
                disabled={currentChapterIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentChapterIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী অধ্যায়</span>
              </button>

              <span className="text-xs text-slate-500 font-mono">
                অধ্যায় {chapter.number} / {currentBook.chapters.length}
              </span>

              <button
                type="button"
                onClick={handleNextChapter}
                disabled={currentChapterIndex === currentBook.chapters.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentChapterIndex === currentBook.chapters.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <span>পরবর্তী অধ্যায়</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
