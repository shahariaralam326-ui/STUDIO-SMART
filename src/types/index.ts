export type ActivePage =
  | 'dashboard'
  | 'books'
  | 'my-library'
  | 'reader'
  | 'ai-tutor'
  | 'ai-explain'
  | 'planner'
  | 'college-finder'
  | 'scanner'
  | 'marksheet'
  | 'estore'
  | 'quizzes'
  | 'tests'
  | 'notes'
  | 'bookmarks'
  | 'vocabulary'
  | 'progress'
  | 'countdown'
  | 'profile'
  | 'settings'
  | 'about';

export type Language = 'bn' | 'en';
export type Theme = 'emerald-light' | 'emerald-dark';

export interface StudentProfile {
  name: string;
  className: 'Class 5' | 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  medium: 'bangla' | 'english';
  academicYear: string;
  schoolName?: string;
  favoriteSubjects: string[];
  weakSubjects: string[];
  dailyStudyHours: number;
  avatarUrl?: string;
  isDemoUser: boolean;
}

export interface Book {
  id: string;
  titleBn: string;
  titleEn: string;
  subject: string;
  className: 'Class 5' | 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  medium: 'bangla' | 'english';
  academicYear: string;
  coverImage?: string;
  coverColor?: string;
  officialNctbUrl: string;
  pdfUrl?: string;
  edition: string;
  totalPages: number;
  chapters: Array<{ number: number; titleBn: string; titleEn: string; pages: string }>;
  isVerified: boolean;
  isOnlineAvailable?: boolean;
  hasPermittedPdf?: boolean;
  isBookmarked?: boolean;
  isSaved?: boolean;
}

export interface BookReadingProgress {
  bookId: string;
  lastReadDate: string;
  currentChapter: number;
  currentPage: number;
  percent: number;
}

export interface QuizQuestion {
  id: string;
  questionBn: string;
  questionEn: string;
  optionsBn: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationBn: string;
  explanationEn: string;
  subject: string;
  className: string;
  chapter?: string;
}

export interface QuizResult {
  id: string;
  subject: string;
  score: number;
  total: number;
  date: string;
  timeSpentSeconds: number;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  subject: string;
  className: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

export interface BookmarkItem {
  id: string;
  type: 'book' | 'college' | 'vocab' | 'note';
  targetId: string;
  title: string;
  subtitle: string;
  createdAt: string;
}

export interface VocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaningBn: string;
  meaningEn: string;
  exampleEn: string;
  exampleBn: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  isFavorite?: boolean;
}

export interface PlannerTask {
  id: string;
  title: string;
  subject: string;
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeSlot: string;
  durationMinutes: number;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ExamCountdownItem {
  id: string;
  titleBn: string;
  titleEn: string;
  examDate: string; // YYYY-MM-DD
  subject?: string;
  location?: string;
  importance: 'high' | 'medium' | 'normal';
}

export interface StoreProduct {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'textbooks' | 'guidebooks' | 'calculators' | 'geometry' | 'stationery' | 'bags';
  categoryLabelBn: string;
  priceBdt: number;
  originalPriceBdt?: number;
  storeName: string;
  storeUrl: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
  isAffiliate: boolean;
  descriptionBn: string;
}
