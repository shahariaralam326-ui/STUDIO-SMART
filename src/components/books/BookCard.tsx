import React, { useState } from 'react';
import { Book, Language } from '../../types/index.ts';
import {
  BookOpen,
  Bookmark,
  ExternalLink,
  Download,
  FolderPlus,
  FolderCheck,
  Info,
  CheckCircle2,
  Sparkles,
  BookMarked,
  Layers,
} from 'lucide-react';

interface BookCardProps {
  book: Book;
  language: Language;
  isSaved: boolean;
  isBookmarked: boolean;
  onToggleSave: (book: Book) => void;
  onToggleBookmark: (book: Book) => void;
  onOpenReader: (bookId: string) => void;
  onViewDetails: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  language,
  isSaved,
  isBookmarked,
  onToggleSave,
  onToggleBookmark,
  onOpenReader,
  onViewDetails,
}) => {
  const gradientClass = book.coverColor || 'from-emerald-600 to-teal-800';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Cover Thumbnail & Badges */}
        <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-inner">
          <div
            className={`w-full h-44 bg-gradient-to-br ${gradientClass} p-4 flex flex-col justify-between text-white relative transition-transform duration-300 group-hover:scale-[1.02]`}
          >
            {/* Bangladesh NCTB Spine Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/20" />

            {/* Top Row: Class & Bookmark / Save Buttons */}
            <div className="flex items-center justify-between pl-2">
              <span className="px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-xs text-[10px] font-bold tracking-wider uppercase border border-white/20">
                {book.className}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onToggleBookmark(book)}
                  className={`p-1.5 rounded-md backdrop-blur-xs transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-black/30 text-white/80 hover:text-white hover:bg-black/50'
                  }`}
                  title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSave(book)}
                  className={`p-1.5 rounded-md backdrop-blur-xs transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-teal-400 text-slate-950 font-bold'
                      : 'bg-black/30 text-white/80 hover:text-white hover:bg-black/50'
                  }`}
                  title={isSaved ? 'আমার লাইব্রেরি থেকে সরান' : 'আমার লাইব্রেরিতে সংরক্ষণ'}
                  aria-label="Save to My Library"
                >
                  {isSaved ? (
                    <FolderCheck className="w-3.5 h-3.5" />
                  ) : (
                    <FolderPlus className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Center Book Title on Cover */}
            <div className="pl-3 pr-2 py-2 text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-white/15 flex items-center justify-center mb-1.5 backdrop-blur-xs border border-white/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h5 className="font-extrabold text-sm sm:text-base leading-tight drop-shadow-md line-clamp-2">
                {book.titleBn}
              </h5>
              <p className="text-[10px] text-white/80 mt-0.5 font-medium truncate">
                {book.titleEn}
              </p>
            </div>

            {/* Bottom Row: Medium & NCTB Official Crest Motif */}
            <div className="flex items-center justify-between text-[10px] text-white/90 pl-2 border-t border-white/20 pt-1.5">
              <span className="font-semibold bg-white/20 px-2 py-0.5 rounded">
                {book.medium === 'bangla' ? 'বাংলা মাধ্যম' : 'English Version'}
              </span>
              <span className="text-[10px] opacity-90">
                NCTB {book.academicYear}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-[11px]">
            <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
              {book.subject}
            </span>

            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>যাচাইকৃত NCTB</span>
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {book.titleBn}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {book.edition}
          </p>

          {/* Chapters and Pages info */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-500" />
              <span>{book.chapters.length}টি অধ্যায়</span>
            </span>
            <span className="text-slate-400 font-mono">
              {book.totalPages} পৃষ্ঠা
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenReader(book.id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'অনলাইনে পড়ুন' : 'Read Book'}</span>
          </button>

          {book.hasPermittedPdf && book.pdfUrl ? (
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors shrink-0"
              title="অফিসিয়াল পিডিএফ ডাউনলোড করুন"
              aria-label="Download Official PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a
              href={book.officialNctbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors shrink-0"
              title="NCTB পোর্টাল লিংক"
              aria-label="Official NCTB Portal Link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={() => onViewDetails(book)}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors shrink-0 cursor-pointer"
            title="অধ্যায় ও বিস্তারিত দেখুন"
            aria-label="More Details"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Save Pill Toggle */}
        <button
          type="button"
          onClick={() => onToggleSave(book)}
          className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isSaved
              ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
          }`}
        >
          {isSaved ? (
            <>
              <FolderCheck className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              <span>আমার লাইব্রেরিতে সংরক্ষিত (মুছতে ক্লিক করুন)</span>
            </>
          ) : (
            <>
              <FolderPlus className="w-3 h-3 text-slate-400" />
              <span>আমার লাইব্রেরিতে যুক্ত করুন (+ My Library)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
