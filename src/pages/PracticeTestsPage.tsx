import React, { useState, useEffect } from 'react';
import { CURATED_QUIZZES } from '../data/quizzes.ts';
import { Language } from '../types/index.ts';
import { FileCheck, Clock, Award, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

interface PracticeTestsPageProps {
  language: Language;
}

export const PracticeTestsPage: React.FC<PracticeTestsPageProps> = ({ language }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600); // 10 minutes
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isExamActive && secondsRemaining > 0 && !isCompleted) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => {
          if (sec <= 1) {
            setIsCompleted(true);
            setIsExamActive(false);
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamActive, secondsRemaining, isCompleted]);

  const startTest = () => {
    setSecondsRemaining(600);
    setAnswers({});
    setIsCompleted(false);
    setIsExamActive(true);
  };

  const submitTest = () => {
    setIsCompleted(true);
    setIsExamActive(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const score = Object.keys(answers).reduce((acc, qIdx) => {
    const q = CURATED_QUIZZES[Number(qIdx)];
    if (q && answers[Number(qIdx)] === q.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট সিমুলেশন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'টাইমড প্র্যাকটিস টেস্ট (মডেল টেস্ট)' : 'Timed Board Practice Test'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            ১০ মিনিট সময়সীমার মধ্যে ১০টি বহুনির্বাচনী প্রশ্ন সমাধানের বাস্তব পরীক্ষা অনুশীলন
          </p>
        </div>

        {isExamActive && (
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-950/80 border border-rose-500 rounded-xl text-rose-200 text-sm font-mono font-bold shrink-0">
            <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>অবশিষ্ট সময়: {formatTime(secondsRemaining)}</span>
          </div>
        )}
      </div>

      {!isExamActive && !isCompleted ? (
        /* Test Intro Card */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <FileCheck className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              সাধারণ বিজ্ঞান ও গণিত মডেল টেস্ট ২০২৬
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              ১০টি বহুনিবার্চনী প্রশ্ন · সময়: ১০ মিনিট · কোনো নেগেটিভ মার্কিং নেই। পরীক্ষা শুরু করতে নিচের বাটনে ক্লিক করুন।
            </p>
          </div>

          <button
            type="button"
            onClick={startTest}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            মডেল টেস্ট শুরু করুন
          </button>
        </div>
      ) : isCompleted ? (
        /* Result Summary Card */
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-5 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              পরীক্ষা সম্পন্ন হয়েছে
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              আপনার প্রাপ্ত নম্বর: {score} / {CURATED_QUIZZES.length}
            </h3>
            <p className="text-xs text-slate-500">
              সঠিক উত্তর: {score}টি · ভুল বা অনুত্তরিত: {CURATED_QUIZZES.length - score}টি
            </p>
          </div>

          <button
            type="button"
            onClick={startTest}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>আবার মডেল টেস্ট দিন</span>
          </button>
        </div>
      ) : (
        /* Active Test Questions List */
        <div className="space-y-4">
          <div className="space-y-4">
            {CURATED_QUIZZES.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-bold text-emerald-600">প্রশ্ন {idx + 1}</span>
                  <span>{q.subject}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {q.questionBn}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.optionsBn.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [idx]: oIdx }))}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                        answers[idx] === oIdx
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-200 shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={submitTest}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              পরীক্ষা সমাপ্ত ও সাবমিট করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
