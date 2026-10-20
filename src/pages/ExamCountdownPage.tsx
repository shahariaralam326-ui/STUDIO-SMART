import React, { useState, useEffect } from 'react';
import { ExamCountdownItem, Language } from '../types/index.ts';
import { getStoredExams, saveStoredExams } from '../utils/storage.ts';
import { Clock, Plus, Trash2, Calendar, AlertTriangle, Sparkles, Check } from 'lucide-react';

interface ExamCountdownPageProps {
  language: Language;
}

export const ExamCountdownPage: React.FC<ExamCountdownPageProps> = ({ language }) => {
  const [exams, setExams] = useState<ExamCountdownItem[]>(getStoredExams());
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [titleBn, setTitleBn] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('2026-03-01');
  const [subject, setSubject] = useState<string>('বিজ্ঞান বিভাগ');
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateRemaining = (targetDate: string) => {
    const diff = new Date(targetDate).getTime() - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, isPassed: false };
  };

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim() || !examDate) return;

    const newExam: ExamCountdownItem = {
      id: 'exam-' + Date.now(),
      titleBn: titleBn.trim(),
      titleEn: titleBn.trim(),
      examDate,
      subject,
      importance: 'high',
    };

    const updated = [...exams, newExam];
    setExams(updated);
    saveStoredExams(updated);

    setTitleBn('');
    setShowAddForm(false);
  };

  const handleDeleteExam = (id: string) => {
    const updated = exams.filter((e) => e.id !== id);
    setExams(updated);
    saveStoredExams(updated);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-lime-400" />
            <span>লাইভ কাউন্টডাউন টাইমার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আসন্ন বোর্ড ও স্কুল পরীক্ষার কাউন্টডাউন' : 'Exam Countdown Ticker'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            এসএসসি ২০২৬ ও অন্যান্য গুরুত্বপূর্ণ পরীক্ষার লক্ষ্যমাত্রা নির্ধারণ ও সময় পর্যবেক্ষণ
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>নতুন পরীক্ষার তারিখ যোগ</span>
        </button>
      </div>

      {/* Add Custom Exam Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddExam}
          className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 shadow-md space-y-4"
        >
          <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">
            নতুন পরীক্ষার তথ্য যুক্ত করুন
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                পরীক্ষার নাম
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: নির্বাচনী পরীক্ষা বা গণিত মডেল টেস্ট..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                পরীক্ষার তারিখ (YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      )}

      {/* Countdown Cards List */}
      <div className="space-y-4">
        {exams.map((exam) => {
          const { days, hours, minutes, seconds, isPassed } = calculateRemaining(exam.examDate);

          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-emerald-500 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {exam.titleBn}
                    </h3>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded">
                      জরুরি
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    তারিখ: {exam.examDate} · বিষয়: {exam.subject || 'সকল বিষয়'}
                  </p>
                </div>

                {exams.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteExam(exam.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Countdown Numbers Grid */}
              {!isPassed ? (
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-3">
                    <span className="text-2xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono tabular-nums block">
                      {days}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">দিন</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3">
                    <span className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 font-mono tabular-nums block">
                      {hours}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">ঘণ্টা</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3">
                    <span className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 font-mono tabular-nums block">
                      {minutes}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">মিনিট</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3">
                    <span className="text-2xl sm:text-4xl font-extrabold text-lime-600 dark:text-lime-400 font-mono tabular-nums block">
                      {seconds}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">সেকেন্ড</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center text-xs text-slate-500 font-semibold">
                  পরীক্ষার নির্ধারিত সময় অতিক্রান্ত হয়েছে।
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
