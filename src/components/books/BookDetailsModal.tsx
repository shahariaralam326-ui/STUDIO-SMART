import React from 'react';
import { Book, Language } from '../../types/index.ts';
import {
  X,
  BookOpen,
  Bookmark,
  FolderPlus,
  FolderCheck,
  Download,
  ExternalLink,
  Layers,
  CheckCircle2,
  BookMarked,
  Sparkles,
} from 'lucide-react';

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isSaved: boolean;
  isBookmarked: boolean;
  onToggleSave: (book: Book) => void;
  onToggleBookmark: (book: Book) => void;
  onOpenReader: (bookId: string) => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  book,
  isOpen,
  onClose,
  language,
  isSaved,
  isBookmarked,
  onToggleSave,
  onToggleBookmark,
  onOpenReader,
}) => {
  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`p-6 bg-gradient-to-r ${
            book.coverColor || 'from-blue-600 to-indigo-800'
          } text-white flex items-start justify-between relative`}
        >
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/30 text-xs font-bold uppercase tracking-wider">
                {book.className}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/20 text-xs font-semibold">
                {book.medium === 'bangla' ? 'বাংলা মাধ্যম' : 'English Version'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>যাচাইকৃত NCTB</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {book.titleBn}
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              {book.titleEn} · {book.edition}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: Chapters & Info */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">মোট অধ্যায়</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{book.chapters.length} টি</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">মোট পৃষ্ঠা</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{book.totalPages}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">শিক্ষাবর্ষ</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{book.academicYear}</span>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>অধ্যায়সূচি ও পাঠ্যসূচি (Syllabus & Chapters)</span>
              </h4>
              <span className="text-xs text-slate-400">সর্বমোট {book.chapters.length}টি অধ্যায়</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
              {book.chapters.map((ch) => (
                <div
                  key={ch.number}
                  className="p-3.5 flex items-center justify-between hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {ch.number}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {ch.titleBn}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {ch.titleEn}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                    {ch.pages}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Source Info */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদন</span>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
              এই পাঠ্যবইটি বাংলাদেশ শিক্ষা মন্ত্রণালয় ও NCTB কর্তৃক অনুমোদিত। অফিশিয়াল বই ডাউনলোডের জন্য জাতীয় পাঠ্যপুস্তক বোর্ডের মূল পোর্টাল পরিদর্শন করতে পারেন।
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(book)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক করুন'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(book)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border-teal-300'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {isSaved ? <FolderCheck className="w-3.5 h-3.5" /> : <FolderPlus className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'লাইব্রেরি থেকে সরান' : 'আমার লাইব্রেরিতে সংরক্ষণ'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {book.pdfUrl && (
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>অফিসিয়াল PDF</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReader(book.id);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>অনলাইনে পড়ুন (Open Reader)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
