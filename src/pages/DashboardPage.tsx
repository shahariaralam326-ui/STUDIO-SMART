import React from 'react';
import { ActivePage, StudentProfile, Language } from '../types/index.ts';
import { NCTB_BOOKS } from '../data/books.ts';
import { STORE_PRODUCTS } from '../data/products.ts';
import { getStoredTasks, getStoredNotes, getStoredExams, getStoredBookmarks, getStoredQuizResults } from '../utils/storage.ts';
import {
  Sparkles,
  BookOpen,
  Bot,
  Compass,
  Calendar,
  HelpCircle,
  ShoppingBag,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bookmark,
  FileText,
  TrendingUp,
  Award,
} from 'lucide-react';

interface DashboardPageProps {
  setActivePage: (page: ActivePage) => void;
  profile: StudentProfile;
  language: Language;
  onSelectBookForReader: (bookId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  setActivePage,
  profile,
  language,
  onSelectBookForReader,
}) => {
  const tasks = getStoredTasks();
  const notes = getStoredNotes();
  const exams = getStoredExams();
  const bookmarks = getStoredBookmarks();
  const quizResults = getStoredQuizResults();

  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Next upcoming exam
  const nextExam = exams[0];
  let daysUntilExam = 0;
  if (nextExam?.examDate) {
    const diff = new Date(nextExam.examDate).getTime() - new Date().getTime();
    daysUntilExam = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  // Quick Action Hub Cards with Coordinated Section Colors
  const quickActions = [
    {
      id: 'books' as ActivePage,
      titleBn: 'স্মার্ট বই লাইব্রেরি',
      titleEn: 'Smart Books Library',
      descBn: '৫ম থেকে ১০ম শ্রেণির সকল এনসিটিবি ডিজিটাল পাঠ্যবই',
      descEn: 'Classes 5-10 official NCTB textbooks & chapter notes',
      icon: BookOpen,
      color: 'bg-blue-600 text-white',
      badge: 'NCTB ৫-১০',
    },
    {
      id: 'my-library' as ActivePage,
      titleBn: 'আমার লাইব্রেরি (My Library)',
      titleEn: 'My Personal Library',
      descBn: 'সংরক্ষিত পাঠ্যবই, বুকমার্ক ও পড়ার অগ্রগতি আর্কাইভ',
      descEn: 'Saved textbooks, bookmarks & resume reading tracker',
      icon: Bookmark,
      color: 'bg-teal-600 text-white',
      badge: 'ব্যক্তিগত',
    },
    {
      id: 'ai-tutor' as ActivePage,
      titleBn: 'জেমিনি এআই টিউটর',
      titleEn: 'Gemini AI Tutor',
      descBn: 'যেকোনো প্রশ্নের তাৎক্ষণিক সমাধান ও সহজ ব্যাখ্যা নিন',
      descEn: 'Ask academic questions and get instant step-by-step guidance',
      icon: Bot,
      color: 'bg-violet-600 text-white',
      badge: 'লাইভ এআই',
    },
    {
      id: 'college-finder' as ActivePage,
      titleBn: 'এসএসসি কলেজ ফাইন্ডার',
      titleEn: 'SSC College Finder',
      descBn: 'জিপিএ অনুযায়ী সেরা কলেজ ও কারিগরি শিক্ষা প্রতিষ্ঠান',
      descEn: 'Find verified colleges matched with your SSC GPA',
      icon: Compass,
      color: 'bg-indigo-600 text-white',
      badge: '৩টি পদ্ধতি',
    },
    {
      id: 'planner' as ActivePage,
      titleBn: 'স্টাডি প্ল্যানার',
      titleEn: 'Study Planner',
      descBn: 'দৈনিক ও সাপ্তাহিক পড়ার রুটিন তৈরি ও ট্র্যাকিং',
      descEn: 'Personalized study schedule & timetable generator',
      icon: Calendar,
      color: 'bg-orange-600 text-white',
      badge: 'রুটিন',
    },
    {
      id: 'quizzes' as ActivePage,
      titleBn: 'ইন্টারেক্টিভ কুইজ',
      titleEn: 'MCQ Quizzes',
      descBn: 'অধ্যায়ভিত্তিক বহুনিবার্চনী প্রশ্ন ও বিস্তারিত সমাধান',
      descEn: 'Subject & chapter quizzes with instant explanations',
      icon: HelpCircle,
      color: 'bg-cyan-600 text-white',
      badge: 'মডেল টেস্ট',
    },
    {
      id: 'estore' as ActivePage,
      titleBn: 'স্টুডেন্ট ই-স্টোর',
      titleEn: 'Student E-Store',
      descBn: 'রকমারি পাঠ্যবই, টেস্ট পেপার ও সায়েন্টিফিক ক্যালকুলেটর',
      descEn: 'Buy textbooks, scientific calculators, stationery at Rokomari',
      icon: ShoppingBag,
      color: 'bg-amber-600 text-white',
      badge: 'Rokomari',
    },
    {
      id: 'notes' as ActivePage,
      titleBn: 'স্টাডি নোটবুক',
      titleEn: 'Study Notes',
      descBn: 'গুরুত্বপূর্ণ সূত্র, সংক্ষিপ্ত নোট ও রিভিশন তালিকা',
      descEn: 'Personal revision notes and exam preparation points',
      icon: FileText,
      color: 'bg-teal-700 text-white',
      badge: 'নোটস',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner: Dark Emerald with Gold/Lime Accents */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/80 text-lime-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>বিজ্ঞান প্রদর্শনী স্পেশাল ২০২৬ · টিম EduInnovators</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'bn' ? `স্বাগতম, ${profile.name}!` : `Welcome, ${profile.name}!`}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            {language === 'bn'
              ? `আপনার নির্ধারিত শ্রেণি: ${profile.className} (${profile.medium === 'bangla' ? 'বাংলা মাধ্যম' : 'English Medium'})। আজ আপনি কোন বিষয়টি শিখতে চান?`
              : `Current class: ${profile.className} (${profile.medium === 'bangla' ? 'Bangla Medium' : 'English Medium'}). What would you like to study today?`}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActivePage('ai-tutor')}
              className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>{language === 'bn' ? 'এআই শিক্ষককে প্রশ্ন করুন' : 'Ask AI Tutor'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePage('college-finder')}
              className="px-4 py-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-600/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'এসএসসি কলেজ ফাইন্ডার' : 'College Finder'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark Motif */}
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none text-emerald-300 hidden md:block">
          <BookOpen className="w-56 h-56" />
        </div>
      </div>

      {/* KPI Overview Strip (Readability Balanced: White/Slate Cards on Clean Canvas) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Exam Countdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span className="font-semibold">{language === 'bn' ? 'আসন্ন পরীক্ষা' : 'Next Exam'}</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {daysUntilExam} <span className="text-xs font-sans text-slate-500">{language === 'bn' ? 'দিন বাকি' : 'days left'}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-1">
            {nextExam?.titleBn || 'এসএসসি পরীক্ষা'}
          </p>
        </div>

        {/* Today's Tasks Completed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span className="font-semibold">{language === 'bn' ? 'আজকের পড়ার টাস্ক' : 'Study Tasks'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {completedTasks}/{tasks.length}
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Quizzes Taken */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span className="font-semibold">{language === 'bn' ? 'কুইজ স্কোর গড়' : 'Quiz Avg'}</span>
            <Award className="w-4 h-4 text-lime-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            ৮৩%
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-1">
            {quizResults.length} {language === 'bn' ? 'টি কুইজ সম্পন্ন' : 'quizzes completed'}
          </p>
        </div>

        {/* Saved Notes & Bookmarks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span className="font-semibold">{language === 'bn' ? 'সংরক্ষিত নোটস' : 'Saved Notes'}</span>
            <FileText className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {notes.length}
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-1">
            {bookmarks.length} {language === 'bn' ? 'টি বুকমার্কসহ' : 'bookmarks saved'}
          </p>
        </div>
      </div>

      {/* 6 Quick Action Grid Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'প্রধান শিক্ষামূলক সুবিধাসমূহ' : 'Core Features & Learning Hub'}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'ক্লিক করে যেকোনো সেকশনে প্রবেশ করুন' : 'Click any section to launch'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setActivePage(act.id)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 p-5 rounded-2xl text-left transition-all hover:shadow-lg group flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {act.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {language === 'bn' ? act.titleBn : act.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {language === 'bn' ? act.descBn : act.descEn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'bn' ? 'প্রবেশ করুন' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Continue Reading & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Reading / Popular Textbooks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'পড়া চালিয়ে যান (পাঠ্যবই)' : 'Continue Reading'}
              </h4>
            </div>
            <button
              onClick={() => setActivePage('books')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              {language === 'bn' ? 'সব বই দেখুন →' : 'View all →'}
            </button>
          </div>

          <div className="space-y-3">
            {NCTB_BOOKS.slice(0, 3).map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
              >
                <div className="space-y-0.5 truncate mr-3">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {book.titleBn}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {book.className} · {book.chapters.length}টি অধ্যায় · {book.edition}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectBookForReader(book.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shrink-0"
                >
                  {language === 'bn' ? 'পড়ুন' : 'Read'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Study Routine from Planner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'আজকের পড়ার রুটিন' : 'Today\'s Study Schedule'}
              </h4>
            </div>
            <button
              onClick={() => setActivePage('planner')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              {language === 'bn' ? 'প্ল্যানারে যান →' : 'Open planner →'}
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
              >
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    task.priority === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {task.subject}
                  </span>
                  <p className={`text-xs font-medium text-slate-800 dark:text-slate-200 ${task.isCompleted ? 'line-through opacity-60' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{task.timeSlot} ({task.durationMinutes} মিনিট)</span>
                  </p>
                </div>

                <span className={`text-[11px] font-semibold px-2 py-1 rounded-md shrink-0 ${
                  task.isCompleted ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300' : 'text-slate-600 bg-slate-200 dark:bg-slate-700'
                }`}>
                  {task.isCompleted ? 'সম্পন্ন' : 'বাকি আছে'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured E-Store Recommendations */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-lime-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'স্টুডেন্ট ই-স্টোর — প্রয়োজনীয় শিক্ষা উপকরণ' : 'Student E-Store — Top Essentials'}</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'bn' ? 'রকমারি ডটকমের মাধ্যমে শিক্ষার্থীদের জন্য যাচাইকৃত পণ্য ও টেস্ট পেপার' : 'Verified books & stationery supplies via Rokomari.com'}
            </p>
          </div>
          <button
            onClick={() => setActivePage('estore')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            {language === 'bn' ? 'ই-স্টোরে কেনাকাটা করুন →' : 'Shop all →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {STORE_PRODUCTS.slice(0, 4).map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="h-32 w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <img
                    src={prod.imageUrl}
                    alt={prod.nameEn}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                  {prod.categoryLabelBn}
                </span>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                  {prod.nameBn}
                </h5>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    ৳{prod.priceBdt}
                  </span>
                  {prod.originalPriceBdt && (
                    <span className="text-[10px] text-slate-400 line-through ml-1.5 font-mono">
                      ৳{prod.originalPriceBdt}
                    </span>
                  )}
                </div>
                <a
                  href={prod.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-[11px] rounded-lg transition-colors"
                >
                  {language === 'bn' ? 'রকমারি' : 'Rokomari'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
