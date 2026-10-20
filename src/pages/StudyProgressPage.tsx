import React from 'react';
import { StudentProfile, Language } from '../types/index.ts';
import { getStoredTasks, getStoredQuizResults, getStoredNotes } from '../utils/storage.ts';
import { TrendingUp, Award, CheckCircle2, Clock, Flame, BookOpen, Target, Sparkles } from 'lucide-react';

interface StudyProgressPageProps {
  profile: StudentProfile;
  language: Language;
}

export const StudyProgressPage: React.FC<StudyProgressPageProps> = ({ profile, language }) => {
  const tasks = getStoredTasks();
  const quizResults = getStoredQuizResults();
  const notes = getStoredNotes();

  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Calculate subject-wise completion
  const subjectsBreakdown = [
    { name: 'পদার্থবিজ্ঞান', hours: 14, completion: 85, color: 'bg-emerald-500' },
    { name: 'সাধারণ গণিত', hours: 18, completion: 92, color: 'bg-lime-500' },
    { name: 'রসায়ন', hours: 11, completion: 74, color: 'bg-teal-500' },
    { name: 'জীববিজ্ঞান', hours: 9, completion: 80, color: 'bg-sky-500' },
    { name: 'ইংরেজি', hours: 8, completion: 65, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-lime-400" />
            <span>শিক্ষার্থীর দৈনিক ও সাপ্তাহিক বিশ্লেষণ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'পড়াশোনার অগ্রগতি ও পারফরম্যান্স' : 'Study Progress & Learning Analytics'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            {profile.name} · {profile.className} · রিভিশন ও কুইজ রিপোর্ট
          </p>
        </div>

        {/* Study Streak Badge */}
        <div className="flex items-center gap-3 bg-emerald-900/80 border border-emerald-700/80 px-4 py-2 rounded-xl shrink-0">
          <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">স্টাডি স্ট্রিক</span>
            <span className="text-lg font-extrabold text-white font-mono">৭ দিন একটানা</span>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>সাপ্তাহিক পড়ার সময়</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            ২৩.৫ <span className="text-xs font-sans text-slate-400">ঘণ্টা</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">
            দৈনিক লক্ষ্যমাত্রার চেয়ে +২.৫ ঘণ্টা বেশি
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>টাস্ক সমাপ্তির হার</span>
            <CheckCircle2 className="w-4 h-4 text-lime-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {taskCompletionRate}%
          </div>
          <p className="text-[11px] text-slate-500">
            মোট {tasks.length}টির মধ্যে {completedTasks}টি সম্পন্ন
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>কুইজ গড় নির্ভুলতা</span>
            <Award className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            ৮৩.৪%
          </div>
          <p className="text-[11px] text-slate-500">
            গত ৭ দিনে ৩টি কুইজ সম্পন্ন
          </p>
        </div>
      </div>

      {/* Subject-wise Progress Bars */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          বিষয়ভিত্তিক সিলেবাস সমাপ্তির অগ্রগতি
        </h4>

        <div className="space-y-3.5">
          {subjectsBreakdown.map((sub, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.name}</span>
                <span className="text-slate-500 font-mono font-bold">{sub.completion}% ({sub.hours} ঘণ্টা অধ্যয়ন)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className={`${sub.color} h-2 rounded-full`} style={{ width: `${sub.completion}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Scores History */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          সাম্প্রতিক কুইজ ফলাফল ইতিহাস
        </h4>

        <div className="space-y-2">
          {quizResults.map((qr) => (
            <div
              key={qr.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white">{qr.subject}</span>
                <p className="text-[11px] text-slate-400">তারিখ: {qr.date}</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {qr.score} / {qr.total}
                </span>
                <p className="text-[10px] text-slate-400">
                  {Math.round((qr.score / qr.total) * 100)}% সফল
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
