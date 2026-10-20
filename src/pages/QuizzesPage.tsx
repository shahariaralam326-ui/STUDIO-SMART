import React, { useState } from 'react';
import { QuizQuestion, Language, StudentProfile } from '../types/index.ts';
import { CURATED_QUIZZES } from '../data/quizzes.ts';
import { saveStoredQuizResult } from '../utils/storage.ts';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface QuizzesPageProps {
  language: Language;
  profile: StudentProfile;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({ language, profile }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('সকল বিষয়');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const subjects = ['সকল বিষয়', 'পদার্থবিজ্ঞান', 'রসায়ন', 'গণিত', 'জীববিজ্ঞান', 'তথ্য ও যোগাযোগ প্রযুক্তি', 'বিজ্ঞান'];

  const filteredQuizzes = CURATED_QUIZZES.filter((q) => {
    if (selectedSubject !== 'সকল বিষয়' && q.subject !== selectedSubject) return false;
    return true;
  });

  const question = filteredQuizzes[currentQuestionIndex] || filteredQuizzes[0];
  const userSelectedOption = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: index }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuizzes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let score = 0;
    filteredQuizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    saveStoredQuizResult({
      id: 'qr-' + Date.now(),
      subject: selectedSubject === 'সকল বিষয়' ? 'সাধারণ কুইজ' : selectedSubject,
      score,
      total: filteredQuizzes.length,
      date: new Date().toISOString().split('T')[0],
      timeSpentSeconds: 180,
    });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // Calculate score if submitted
  const calculateScore = () => {
    let score = 0;
    filteredQuizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Quizzes Banner — Cyan Accented Theme */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-800/60 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-800/60 text-cyan-300 text-xs font-semibold border border-cyan-600/50">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>ইন্টারেক্টিভ এমসিকিউ ও ব্যাখ্যা মডিউল</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'অধ্যায়ভিত্তিক বহুনিবার্চনী কুইজ' : 'Subject & Chapter MCQ Quizzes'}
          </h2>
          <p className="text-xs text-slate-300">
            বোর্ড মানসম্পন্ন প্রশ্ন, তাৎক্ষণিক উত্তর যাচাই এবং নির্ভুল ব্যাখ্যা
          </p>
        </div>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            handleResetQuiz();
          }}
          className="bg-emerald-900/80 border border-emerald-700/80 text-xs text-white rounded-xl px-3 py-2 focus:outline-none"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {filteredQuizzes.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Question Index Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              প্রশ্ন {currentQuestionIndex + 1} / {filteredQuizzes.length}
            </span>
            <span>বিষয়: {question.subject} {question.chapter ? `(${question.chapter})` : ''}</span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {question.questionBn}
            </h3>
            <p className="text-xs text-slate-400 italic">
              {question.questionEn}
            </p>
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {question.optionsBn.map((opt, oIdx) => {
              const isSelected = userSelectedOption === oIdx;
              const isCorrect = oIdx === question.correctIndex;

              let style = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-400';
              if (isSelected) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold';
              }

              if (isSubmitted) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-white font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700 dark:text-slate-200">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Accordion (Visible after submission) */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>সঠিক উত্তরের ব্যাখ্যা:</span>
              </h4>
              <p className="text-emerald-950 dark:text-emerald-100 leading-relaxed">
                {question.explanationBn}
              </p>
            </div>
          )}

          {/* Navigation & Submission Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                ← পূর্ববর্তী
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentQuestionIndex === filteredQuizzes.length - 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                পরবর্তী →
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  কুইজ সাবমিট করুন
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    প্রাপ্ত স্কোর: {calculateScore()}/{filteredQuizzes.length}
                  </div>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পুনরায় শুরু করুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-500 text-xs">এই বিষয়ের জন্য কুইজ লোড করা হচ্ছে...</p>
        </div>
      )}
    </div>
  );
};
