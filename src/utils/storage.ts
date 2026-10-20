import { StudentProfile, PlannerTask, NoteItem, BookmarkItem, ExamCountdownItem, QuizResult } from '../types/index.ts';

const STORAGE_KEYS = {
  PROFILE: 'studiosmart_profile_v1',
  TASKS: 'studiosmart_tasks_v1',
  NOTES: 'studiosmart_notes_v1',
  BOOKMARKS: 'studiosmart_bookmarks_v1',
  EXAMS: 'studiosmart_exams_v1',
  QUIZ_RESULTS: 'studiosmart_quiz_results_v1',
  FAV_VOCAB: 'studiosmart_fav_vocab_v1',
  LANGUAGE: 'studiosmart_lang_v1',
  THEME: 'studiosmart_theme_v1',
  RECENT_BOOKS: 'studiosmart_recent_books_v1',
  SAVED_BOOKS: 'studiosmart_saved_books_v1',
  READING_PROGRESS: 'studiosmart_reading_progress_v1',
};

export const DEFAULT_PROFILE: StudentProfile = {
  name: 'তানভীর হাসান',
  className: 'Class 10',
  medium: 'bangla',
  academicYear: '2026',
  schoolName: 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ',
  favoriteSubjects: ['পদার্থবিজ্ঞান', 'উচ্চতর গণিত', 'তথ্য ও যোগাযোগ প্রযুক্তি'],
  weakSubjects: ['ইংরেজি', 'রসায়ন'],
  dailyStudyHours: 4,
  isDemoUser: true,
};

export const DEFAULT_TASKS: PlannerTask[] = [
  {
    id: 'task-1',
    title: 'গণিত: বীজগণিতীয় রাশি অধ্যায় অনুশীলন ৩.১ ও ৩.২',
    subject: 'সাধারণ গণিত',
    day: 'Saturday',
    timeSlot: '০৭:০০ PM - ০৮:৩০ PM',
    durationMinutes: 90,
    isCompleted: true,
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'পদার্থবিজ্ঞান: বল ও নিউটনের গতিসূত্র গাণিতিক সমাধান',
    subject: 'পদার্থবিজ্ঞান',
    day: 'Saturday',
    timeSlot: '০৮:৪৫ PM - ১০:০০ PM',
    durationMinutes: 75,
    isCompleted: false,
    priority: 'high',
  },
  {
    id: 'task-3',
    title: 'ইংরেজি ২য় পত্র: Right Form of Verbs রিভিশন',
    subject: 'ইংরেজি',
    day: 'Sunday',
    timeSlot: '০৭:০০ PM - ০৮:০০ PM',
    durationMinutes: 60,
    isCompleted: false,
    priority: 'medium',
  },
  {
    id: 'task-4',
    title: 'রসায়ন: পর্যায় সারণির বৈশিষ্ট্য ও ব্যতিক্রমসমূহ',
    subject: 'রসায়ন',
    day: 'Sunday',
    timeSlot: '০৮:১৫ PM - ০৯:৩০ PM',
    durationMinutes: 75,
    isCompleted: false,
    priority: 'high',
  },
  {
    id: 'task-5',
    title: 'উচ্চতর গণিত: ত্রিকোণমিতি সূত্রাবলী ও সূত্র প্রমাণ',
    subject: 'উচ্চতর গণিত',
    day: 'Monday',
    timeSlot: '০৭:০০ PM - ০৮:৩০ PM',
    durationMinutes: 90,
    isCompleted: false,
    priority: 'medium',
  },
];

export const DEFAULT_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'পদার্থবিজ্ঞান: গতির সমীকরণ ও প্রমাণের সারসংক্ষেপ',
    content: '১. v = u + at\n২. s = ((u + v) / 2) * t\n৩. s = ut + (1/2)at²\n৪. v² = u² + 2as\n\nবিশেষ দ্রষ্টব্য: অভিকর্ষজ ত্বরণের ক্ষেত্রে a এর স্থলে g প্রতিস্থাপন করতে হবে। খাড়া উপরের দিকে নিক্ষিপ্ত বস্তুর ক্ষেত্রে g ঋণাত্মক (-g) হবে।',
    subject: 'পদার্থবিজ্ঞান',
    className: 'Class 10',
    createdAt: '2026-10-18',
    updatedAt: '2026-10-19',
    color: 'emerald',
  },
  {
    id: 'note-2',
    title: 'রসায়ন: পর্যায় সারণির মূল ব্যতিক্রমসমূহ',
    content: '• হাইড্রোজেনের অবস্থান: ক্ষার ধাতু (গ্রুপ ১) ও হ্যালোজেন (গ্রুপ ১৭) উভয়ের সাথেই সাদৃশ্যপূর্ণ।\n• হিলিয়ামের অবস্থান: ইলেকট্রন বিন্যাস 1s² হলেও নিষ্ক্রিয় গ্যাস হওয়ায় গ্রুপ ১৮-তে স্থান পেয়েছে।\n• ল্যান্থানাইড ও অ্যাক্টিনাইড সারির স্থান মূল সারণির নিচে আলাদাভাবে দেখানো হয়েছে।',
    subject: 'রসায়ন',
    className: 'Class 10',
    createdAt: '2026-10-17',
    updatedAt: '2026-10-18',
    color: 'amber',
  },
  {
    id: 'note-3',
    title: 'ইংরেজি Grammar: Narration পরিবর্তনের ৫টি স্বর্ণসূত্র',
    content: 'Rule 1: Reporting verb past tense হলে Reported speech এর tense পরিবর্তন হয়।\nRule 2: Universal truth হলে tense পরিবর্তন হয় না।\nRule 3: Pronoun পরিবর্তন - 1st person Subject অনুযায়ী, 2nd person Object অনুযায়ী।\nRule 4: Interrogative sentence এ if / whether ব্যবহৃত হয়।',
    subject: 'ইংরেজি',
    className: 'Class 10',
    createdAt: '2026-10-15',
    updatedAt: '2026-10-16',
    color: 'blue',
  },
];

export const DEFAULT_EXAMS: ExamCountdownItem[] = [
  {
    id: 'exam-1',
    titleBn: 'এসএসসি পরীক্ষা ২০২৬ (SSC Exam 2026)',
    titleEn: 'SSC Examination 2026',
    examDate: '2026-02-15',
    subject: 'সকল শিক্ষা বোর্ড',
    importance: 'high',
  },
  {
    id: 'exam-2',
    titleBn: 'প্রাক-নির্বাচনী পরীক্ষা (Pre-Test Exam)',
    titleEn: 'Pre-Test School Examination',
    examDate: '2025-11-20',
    subject: 'স্কুল অভ্যন্তরীণ পরীক্ষা',
    importance: 'high',
  },
  {
    id: 'exam-3',
    titleBn: 'বিজ্ঞান অলিম্পিয়াড ২০২৬ (Science Olympiad)',
    titleEn: 'National Science Olympiad 2026',
    examDate: '2026-01-10',
    subject: 'বিজ্ঞান ও গণিত ক্লাব',
    importance: 'medium',
  },
];

export const DEFAULT_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'bm-1',
    type: 'book',
    targetId: 'nctb-c10-physics',
    title: 'পদার্থবিজ্ঞান — দশম শ্রেণি (NCTB)',
    subtitle: 'অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি',
    createdAt: '2026-10-18',
  },
  {
    id: 'bm-2',
    type: 'college',
    targetId: 'ndc',
    title: 'নটর ডেম কলেজ, ঢাকা',
    subtitle: 'ন্যূনতম জিপিএ ৫.০০ (বিজ্ঞান বিভাগ)',
    createdAt: '2026-10-19',
  },
];

// Helper functions for safe LocalStorage access
export const getStoredProfile = (): StudentProfile => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return val ? JSON.parse(val) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveStoredProfile = (profile: StudentProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredTasks = (): PlannerTask[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.TASKS);
    return val ? JSON.parse(val) : DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
};

export const saveStoredTasks = (tasks: PlannerTask[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredNotes = (): NoteItem[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.NOTES);
    return val ? JSON.parse(val) : DEFAULT_NOTES;
  } catch {
    return DEFAULT_NOTES;
  }
};

export const saveStoredNotes = (notes: NoteItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredExams = (): ExamCountdownItem[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.EXAMS);
    return val ? JSON.parse(val) : DEFAULT_EXAMS;
  } catch {
    return DEFAULT_EXAMS;
  }
};

export const saveStoredExams = (exams: ExamCountdownItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredBookmarks = (): BookmarkItem[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return val ? JSON.parse(val) : DEFAULT_BOOKMARKS;
  } catch {
    return DEFAULT_BOOKMARKS;
  }
};

export const saveStoredBookmarks = (bookmarks: BookmarkItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredQuizResults = (): QuizResult[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return val ? JSON.parse(val) : [
      { id: 'qr-1', subject: 'পদার্থবিজ্ঞান', score: 9, total: 10, date: '2026-10-18', timeSpentSeconds: 240 },
      { id: 'qr-2', subject: 'সাধারণ গণিত', score: 8, total: 10, date: '2026-10-17', timeSpentSeconds: 310 },
      { id: 'qr-3', subject: 'রসায়ন', score: 7, total: 10, date: '2026-10-16', timeSpentSeconds: 280 },
    ];
  } catch {
    return [];
  }
};

export const saveStoredQuizResult = (result: QuizResult) => {
  try {
    const current = getStoredQuizResults();
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify([result, ...current].slice(0, 50)));
  } catch (e) {
    console.warn(e);
  }
};

export const DEFAULT_SAVED_BOOK_IDS = [
  'nctb-c10-physics',
  'nctb-c10-math',
  'nctb-c8-science',
  'nctb-c6-math',
];

export const DEFAULT_READING_PROGRESS: Record<string, { bookId: string; lastReadDate: string; currentChapter: number; currentPage: number; percent: number }> = {
  'nctb-c10-physics': {
    bookId: 'nctb-c10-physics',
    lastReadDate: '2026-10-19',
    currentChapter: 3,
    currentPage: 64,
    percent: 45,
  },
  'nctb-c10-math': {
    bookId: 'nctb-c10-math',
    lastReadDate: '2026-10-18',
    currentChapter: 2,
    currentPage: 38,
    percent: 30,
  },
  'nctb-c8-science': {
    bookId: 'nctb-c8-science',
    lastReadDate: '2026-10-17',
    currentChapter: 4,
    currentPage: 50,
    percent: 60,
  },
};

export const getStoredSavedBookIds = (): string[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.SAVED_BOOKS);
    return val ? JSON.parse(val) : DEFAULT_SAVED_BOOK_IDS;
  } catch {
    return DEFAULT_SAVED_BOOK_IDS;
  }
};

export const saveStoredSavedBookIds = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_BOOKS, JSON.stringify(ids));
  } catch (e) {
    console.warn(e);
  }
};

export const toggleSaveBookId = (bookId: string): boolean => {
  const current = getStoredSavedBookIds();
  const exists = current.includes(bookId);
  const updated = exists ? current.filter((id) => id !== bookId) : [...current, bookId];
  saveStoredSavedBookIds(updated);
  return !exists;
};

export const getStoredReadingProgress = () => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
    return val ? JSON.parse(val) : DEFAULT_READING_PROGRESS;
  } catch {
    return DEFAULT_READING_PROGRESS;
  }
};

export const saveStoredReadingProgress = (
  bookId: string,
  currentChapter: number,
  currentPage: number,
  percent: number
) => {
  try {
    const current = getStoredReadingProgress();
    current[bookId] = {
      bookId,
      lastReadDate: new Date().toISOString().split('T')[0],
      currentChapter,
      currentPage,
      percent: Math.min(100, Math.max(0, percent)),
    };
    localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(current));
  } catch (e) {
    console.warn(e);
  }
};

export const getStoredRecentBookIds = (): string[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.RECENT_BOOKS);
    return val ? JSON.parse(val) : ['nctb-c10-physics', 'nctb-c10-math', 'nctb-c8-science'];
  } catch {
    return ['nctb-c10-physics', 'nctb-c10-math'];
  }
};

export const recordBookOpened = (bookId: string) => {
  try {
    const current = getStoredRecentBookIds();
    const updated = [bookId, ...current.filter((id) => id !== bookId)].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_BOOKS, JSON.stringify(updated));
  } catch (e) {
    console.warn(e);
  }
};

export const resetAllDemoData = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_TASKS));
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(DEFAULT_NOTES));
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(DEFAULT_EXAMS));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(DEFAULT_BOOKMARKS));
    localStorage.setItem(STORAGE_KEYS.SAVED_BOOKS, JSON.stringify(DEFAULT_SAVED_BOOK_IDS));
    localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(DEFAULT_READING_PROGRESS));
    localStorage.setItem(STORAGE_KEYS.RECENT_BOOKS, JSON.stringify(['nctb-c10-physics', 'nctb-c10-math', 'nctb-c8-science']));
  } catch (e) {
    console.warn(e);
  }
};
