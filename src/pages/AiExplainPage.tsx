import React, { useState } from 'react';
import { StudentProfile, Language } from '../types/index.ts';
import { getStoredNotes, saveStoredNotes } from '../utils/storage.ts';
import {
  Sparkles,
  BookOpen,
  ListOrdered,
  FileText,
  Calculator,
  HelpCircle,
  Copy,
  Check,
  BookmarkPlus,
  RefreshCw,
  Send,
} from 'lucide-react';

interface AiExplainPageProps {
  profile: StudentProfile;
  language: Language;
}

export const AiExplainPage: React.FC<AiExplainPageProps> = ({ profile, language }) => {
  const [topic, setTopic] = useState<string>('নিউটনের গতির দ্বিতীয় সূত্র');
  const [mode, setMode] = useState<'simple' | 'step-by-step' | 'summary' | 'math' | 'mcq' | 'notes'>('simple');
  const [subject, setSubject] = useState<string>('পদার্থবিজ্ঞান');
  const [className, setClassName] = useState<string>(profile.className);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedNote, setSavedNote] = useState<boolean>(false);

  const tools = [
    { id: 'simple' as const, labelBn: 'সহজ ভাষায় ব্যাখ্যা', labelEn: 'Explain Simply', icon: BookOpen, desc: 'বাস্তব জীবনের উদাহরণের সাহায্যে সহজবোধ্য আলোচনা' },
    { id: 'step-by-step' as const, labelBn: 'ধাপে ধাপে বিশ্লেষণ', labelEn: 'Step-by-Step', icon: ListOrdered, desc: 'ধারাবাহিক লজিক্যাল পয়েন্ট আকারে সম্পূর্ণ ধারণা' },
    { id: 'summary' as const, labelBn: 'অধ্যায়ের সারসংক্ষেপ', labelEn: 'Chapter Summary', icon: FileText, desc: 'পরীক্ষার আগের দ্রুত রিভিশন সারমর্ম' },
    { id: 'math' as const, labelBn: 'গাণিতিক সূত্র ও সমাধান', labelEn: 'Math Solver', icon: Calculator, desc: 'সূত্রের প্রতিপাদন, একক ও সমস্যা সমাধানের ধাপ' },
    { id: 'mcq' as const, labelBn: 'বোর্ড স্ট্যান্ডার্ড ৩টি MCQ', labelEn: 'Generate MCQs', icon: HelpCircle, desc: 'সঠিক উত্তর ও বিস্তারিত ব্যাখ্যাসহ প্রশ্ন জেনারেশন' },
    { id: 'notes' as const, labelBn: 'পরীক্ষার রিভিশন নোটস', labelEn: 'Revision Notes', icon: BookmarkPlus, desc: 'গুরুত্বপূর্ণ সংজ্ঞা ও সাধারণ ভুলত্রুটি সতর্কতা' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setCopied(false);
    setSavedNote(false);

    try {
      const res = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          mode,
          className,
          subject,
          language,
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      setResult(data.result || 'ব্যাখ্যা প্রস্তুত করা সম্ভব হয়নি।');
    } catch (err: any) {
      console.error(err);
      setResult('সার্ভারে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToNotes = () => {
    if (!result) return;
    const notes = getStoredNotes();
    const newNote = {
      id: 'note-' + Date.now(),
      title: `${topic} (${tools.find((t) => t.id === mode)?.labelBn})`,
      content: result,
      subject,
      className,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      color: 'emerald',
    };
    saveStoredNotes([newNote, ...notes]);
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          <span>এআই লার্নিং টুলস ও স্মার্ট অ্যানালাইজার</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {language === 'bn' ? 'এআই বিষয় ব্যাখ্যাকারী ও সমাধানকারী' : 'AI Explanation & Learning Assistant'}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
          {language === 'bn'
            ? 'যেকোনো কঠিন সূত্র, অধ্যায় বা গাণিতিক সমস্যার নাম লিখুন এবং প্রয়োজন অনুযায়ী ব্যাখ্যা, রিভিশন নোটস অথবা কুইজ তৈরি করুন।'
            : 'Select an explanation style, enter your topic, and generate instant step-by-step notes or questions.'}
        </p>
      </div>

      {/* Mode Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSelected = mode === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setMode(t.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white border-lime-400 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-emerald-600'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block leading-tight">
                  {language === 'bn' ? t.labelBn : t.labelEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Input Options Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              শ্রেণি (Class)
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
            >
              {['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              বিষয় (Subject)
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
            >
              {['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'সাধারণ গণিত', 'উচ্চতর গণিত', 'ইংরেজি', 'বাংলা', 'সাধারণ বিজ্ঞান'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              ব্যাখ্যার ধরন (Style)
            </label>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 truncate">
              {tools.find((t) => t.id === mode)?.labelBn}
            </div>
          </div>
        </div>

        {/* Topic Input Box */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
            টপিক বা অধ্যায়ের নাম লিখুন:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="যেমন: ডাল্টনের পরমাণুবাদ, সমতরণ, বা ত্রিকোণমিতিক অভেদ..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>এআই সমাধান পান</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Result Output Box */}
      {result && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                {topic}
              </span>
              <span className="text-xs text-slate-500">
                {tools.find((t) => t.id === mode)?.labelBn}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveToNotes}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-medium transition-colors border border-emerald-200 dark:border-emerald-800"
              >
                {savedNote ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                <span>{savedNote ? 'নোটবুক-এ সংরক্ষিত' : 'নোটে সংরক্ষণ'}</span>
              </button>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};
