import React, { useState } from 'react';
import { VocabItem, Language } from '../types/index.ts';
import { ACADEMIC_VOCABULARY } from '../data/vocabulary.ts';
import {
  Languages,
  Search,
  Star,
  Sparkles,
  Volume2,
  RotateCcw,
  Check,
  BookOpen,
} from 'lucide-react';

interface VocabularyPageProps {
  language: Language;
}

export const VocabularyPage: React.FC<VocabularyPageProps> = ({ language }) => {
  const [vocabList, setVocabList] = useState<VocabItem[]>(ACADEMIC_VOCABULARY);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toggleFavorite = (id: string) => {
    setVocabList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  const filtered = vocabList.filter((v) => {
    if (favoritesOnly && !v.isFavorite) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        v.word.toLowerCase().includes(q) ||
        v.meaningBn.toLowerCase().includes(q) ||
        v.meaningEn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const card = filtered[currentCardIndex] || filtered[0];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5 text-lime-400" />
            <span>ইংরেজি-বাংলা একাডেমিক শব্দভাণ্ডার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'অ্যাকাডেমিক ভোকাবুলারি ও ফ্ল্যাশ কার্ড' : 'Academic English Vocabulary & Flashcards'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            বিজ্ঞান, গণিত ও সাহিত্যের উচ্চফলপ্রসূ ইংরেজি শব্দের সঠিক উচ্চারণ, অর্থ ও উদাহরণ
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setPracticeMode(!practiceMode);
            setIsFlipped(false);
          }}
          className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors shrink-0 cursor-pointer"
        >
          {practiceMode ? 'শব্দ তালিকা দেখুন' : 'ফ্ল্যাশ কার্ড প্র্যাকটিস মোড'}
        </button>
      </div>

      {practiceMode && card ? (
        /* Flashcard Practice Mode */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>ফ্ল্যাশ কার্ড {currentCardIndex + 1} / {filtered.length}</span>
            <span className="font-semibold text-emerald-600 uppercase">{card.partOfSpeech}</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[220px] rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400/80 p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer shadow-inner hover:scale-[1.01] transition-transform"
          >
            {!isFlipped ? (
              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
                  {card.word}
                </h3>
                <p className="text-xs text-emerald-600 font-mono">{card.phonetic}</p>
                <p className="text-xs text-slate-400 pt-4">কার্ড উল্টে বাংলা অর্থ দেখতে ক্লিক করুন ↻</p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600">বাংলা অর্থ:</span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {card.meaningBn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-2">
                  "{card.exampleEn}"
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  {card.exampleBn}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (currentCardIndex > 0) {
                  setCurrentCardIndex((c) => c - 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentCardIndex === 0}
              className="px-4 py-2 border rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              ← পূর্ববর্তী
            </button>
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold"
            >
              উল্টান (Flip)
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentCardIndex < filtered.length - 1) {
                  setCurrentCardIndex((c) => c + 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentCardIndex === filtered.length - 1}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              পরবর্তী →
            </button>
          </div>
        </div>
      ) : (
        /* Regular Vocabulary Directory */
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ইংরেজি শব্দ বা অর্থ অনুসন্ধান করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                favoritesOnly
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-current' : ''}`} />
              <span>{favoritesOnly ? 'সকল শব্দ' : 'শুধু স্টার মার্ক'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((v) => (
              <div
                key={v.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                        {v.word}
                      </h4>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded font-mono">
                        {v.partOfSpeech}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{v.phonetic}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(v.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      v.isFavorite ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${v.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    বাংলা অর্থ:
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    {v.meaningBn}
                  </p>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    "{v.exampleEn}"
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {v.exampleBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
