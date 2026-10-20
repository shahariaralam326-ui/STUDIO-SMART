export interface SubjectGrade {
  id: string;
  nameBn: string;
  nameEn: string;
  grade: 'A+' | 'A' | 'A-' | 'B' | 'C' | 'D' | 'F';
  isFourthSubject: boolean;
  isOptionalRemovable?: boolean;
}

export const GRADE_POINTS: Record<string, number> = {
  'A+': 5.0,
  'A': 4.0,
  'A-': 3.5,
  'B': 3.0,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0,
};

export const GRADE_DESCRIPTIONS: Record<string, { marks: string; bn: string }> = {
  'A+': { marks: '৮০–১০০%', bn: 'অসাধারণ (Outstanding)' },
  'A': { marks: '৭০–৭৯%', bn: 'চমৎকার (Excellent)' },
  'A-': { marks: '৬০–৬৯%', bn: 'খুব ভালো (Very Good)' },
  'B': { marks: '৫০–৫৯%', bn: 'ভালো (Good)' },
  'C': { marks: '৪০–৪৯%', bn: 'সন্তোষজনক (Satisfactory)' },
  'D': { marks: '৩৩–৩৯%', bn: 'উত্তীর্ণ (Passing)' },
  'F': { marks: '০–৩২%', bn: 'অনুত্তীর্ণ (Failed)' },
};

export function getDefaultSubjects(group: 'science' | 'humanities' | 'business'): SubjectGrade[] {
  if (group === 'science') {
    return [
      { id: 'bangla', nameBn: 'বাংলা (১ম ও ২য় পত্র)', nameEn: 'Bangla', grade: 'A+', isFourthSubject: false },
      { id: 'english', nameBn: 'ইংরেজি (১ম ও ২য় পত্র)', nameEn: 'English', grade: 'A+', isFourthSubject: false },
      { id: 'math', nameBn: 'গণিত (সাধারণ গণিত)', nameEn: 'Mathematics', grade: 'A+', isFourthSubject: false },
      { id: 'ict', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', nameEn: 'ICT', grade: 'A+', isFourthSubject: false },
      { id: 'religion', nameBn: 'ধর্ম ও নৈতিক শিক্ষা', nameEn: 'Religious Studies', grade: 'A+', isFourthSubject: false },
      { id: 'bgs', nameBn: 'বাংলাদেশ ও বিশ্বপরিচয়', nameEn: 'BGS', grade: 'A+', isFourthSubject: false },
      { id: 'physics', nameBn: 'পদার্থবিজ্ঞান', nameEn: 'Physics', grade: 'A+', isFourthSubject: false },
      { id: 'chemistry', nameBn: 'রসায়ন', nameEn: 'Chemistry', grade: 'A+', isFourthSubject: false },
      { id: 'biology', nameBn: 'জীববিজ্ঞান', nameEn: 'Biology', grade: 'A+', isFourthSubject: false },
      { id: 'hmath', nameBn: 'উচ্চতর গণিত (৪র্থ বিষয়)', nameEn: 'Higher Math (4th Subject)', grade: 'A+', isFourthSubject: true },
    ];
  }

  if (group === 'humanities') {
    return [
      { id: 'bangla', nameBn: 'বাংলা (১ম ও ২য় পত্র)', nameEn: 'Bangla', grade: 'A', isFourthSubject: false },
      { id: 'english', nameBn: 'ইংরেজি (১ম ও ২য় পত্র)', nameEn: 'English', grade: 'A', isFourthSubject: false },
      { id: 'math', nameBn: 'গণিত (সাধারণ গণিত)', nameEn: 'Mathematics', grade: 'A', isFourthSubject: false },
      { id: 'ict', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', nameEn: 'ICT', grade: 'A', isFourthSubject: false },
      { id: 'religion', nameBn: 'ধর্ম ও নৈতিক শিক্ষা', nameEn: 'Religious Studies', grade: 'A', isFourthSubject: false },
      { id: 'science_gen', nameBn: 'সাধারণ বিজ্ঞান', nameEn: 'General Science', grade: 'A', isFourthSubject: false },
      { id: 'history', nameBn: 'ইতিহাস ও বিশ্বসভ্যতা', nameEn: 'History', grade: 'A', isFourthSubject: false },
      { id: 'geography', nameBn: 'ভূগোল ও পরিবেশ', nameEn: 'Geography', grade: 'A', isFourthSubject: false },
      { id: 'civics', nameBn: 'পৌরনীতি ও নাগরিকতা', nameEn: 'Civics', grade: 'A', isFourthSubject: false },
      { id: 'economics', nameBn: 'অর্থনীতি (৪র্থ বিষয়)', nameEn: 'Economics (4th Subject)', grade: 'A+', isFourthSubject: true },
    ];
  }

  // Business
  return [
    { id: 'bangla', nameBn: 'বাংলা (১ম ও ২য় পত্র)', nameEn: 'Bangla', grade: 'A', isFourthSubject: false },
    { id: 'english', nameBn: 'ইংরেজি (১ম ও ২য় পত্র)', nameEn: 'English', grade: 'A', isFourthSubject: false },
    { id: 'math', nameBn: 'গণিত (সাধারণ গণিত)', nameEn: 'Mathematics', grade: 'A', isFourthSubject: false },
    { id: 'ict', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', nameEn: 'ICT', grade: 'A', isFourthSubject: false },
    { id: 'religion', nameBn: 'ধর্ম ও নৈতিক শিক্ষা', nameEn: 'Religious Studies', grade: 'A', isFourthSubject: false },
    { id: 'science_gen', nameBn: 'সাধারণ বিজ্ঞান', nameEn: 'General Science', grade: 'A', isFourthSubject: false },
    { id: 'accounting', nameBn: 'হিসাববিজ্ঞান', nameEn: 'Accounting', grade: 'A', isFourthSubject: false },
    { id: 'business_ent', nameBn: 'ব্যবসায় উদ্যোগ', nameEn: 'Business Entrepreneurship', grade: 'A', isFourthSubject: false },
    { id: 'finance', nameBn: 'ফিন্যান্স ও ব্যাংকিং', nameEn: 'Finance & Banking', grade: 'A', isFourthSubject: false },
    { id: 'agriculture', nameBn: 'কৃষি শিক্ষা (৪র্থ বিষয়)', nameEn: 'Agriculture (4th Subject)', grade: 'A+', isFourthSubject: true },
  ];
}

export interface CalculationResult {
  gpa: number;
  formattedGpa: string;
  isPassed: boolean;
  failedSubjects: string[];
  isGoldenA: boolean;
  totalMainSubjects: number;
  mainSubjectsPointsSum: number;
  fourthSubjectName: string | null;
  fourthSubjectPoints: number;
  fourthSubjectBonus: number;
  explanationBn: string;
}

export function calculateEstimatedGPA(subjects: SubjectGrade[]): CalculationResult {
  const mainSubjects = subjects.filter((s) => !s.isFourthSubject);
  const fourthSubject = subjects.find((s) => s.isFourthSubject) || null;

  const failedSubjects: string[] = [];

  // Check failed compulsory subjects
  for (const s of mainSubjects) {
    if (s.grade === 'F') {
      failedSubjects.push(s.nameBn);
    }
  }

  if (mainSubjects.length === 0) {
    return {
      gpa: 0,
      formattedGpa: '০.০০',
      isPassed: false,
      failedSubjects: ['কোনো আবশ্যিক বিষয় যুক্ত নেই'],
      isGoldenA: false,
      totalMainSubjects: 0,
      mainSubjectsPointsSum: 0,
      fourthSubjectName: null,
      fourthSubjectPoints: 0,
      fourthSubjectBonus: 0,
      explanationBn: 'হিসাব সম্পন্ন করার জন্য আবশ্যিক বিষয় যোগ করুন।',
    };
  }

  // Calculate sum of main subjects
  let mainSum = 0;
  let allSubjectsAplus = true;

  for (const s of mainSubjects) {
    const pt = GRADE_POINTS[s.grade] ?? 0;
    mainSum += pt;
    if (s.grade !== 'A+') {
      allSubjectsAplus = false;
    }
  }

  // 4th subject logic in SSC:
  // Points above 2.0 (e.g. A+ is 5 - 2 = 3 points added, A is 4 - 2 = 2 points added)
  let fourthSubjectBonus = 0;
  let fourthSubjectPoints = 0;
  if (fourthSubject) {
    fourthSubjectPoints = GRADE_POINTS[fourthSubject.grade] ?? 0;
    if (fourthSubject.grade !== 'A+') {
      allSubjectsAplus = false;
    }
    fourthSubjectBonus = Math.max(0, fourthSubjectPoints - 2.0);
  }

  // If failed in any main subject, GPA is 0.00
  if (failedSubjects.length > 0) {
    return {
      gpa: 0,
      formattedGpa: '০.০০ (F)',
      isPassed: false,
      failedSubjects,
      isGoldenA: false,
      totalMainSubjects: mainSubjects.length,
      mainSubjectsPointsSum: mainSum,
      fourthSubjectName: fourthSubject?.nameBn ?? null,
      fourthSubjectPoints,
      fourthSubjectBonus,
      explanationBn: `আবশ্যিক বিষয় (${failedSubjects.join(', ')})-এ 'F' গ্রেড থাকায় সরকারি নীতিমালা অনুযায়ী সার্বিক ফলাফল অকৃতকার্য (GPA 0.00)।`,
    };
  }

  const rawGpa = (mainSum + fourthSubjectBonus) / mainSubjects.length;
  const finalGpa = Math.min(5.0, rawGpa);
  const rounded = Number(finalGpa.toFixed(2));
  const isGoldenA = allSubjectsAplus && rounded === 5.0;

  return {
    gpa: rounded,
    formattedGpa: rounded.toFixed(2),
    isPassed: true,
    failedSubjects: [],
    isGoldenA,
    totalMainSubjects: mainSubjects.length,
    mainSubjectsPointsSum: mainSum,
    fourthSubjectName: fourthSubject?.nameBn ?? null,
    fourthSubjectPoints,
    fourthSubjectBonus,
    explanationBn: `আবশ্যিক ${mainSubjects.length}টি বিষয়ের মোট গ্রেড পয়েন্ট ${mainSum} এবং ৪র্থ বিষয়ের অতিরিক্ত পয়েন্ট ${fourthSubjectBonus} যোগ করে ${mainSubjects.length} দিয়ে ভাগ করা হয়েছে। প্রাপ্ত আনুমানিক জিপিএ: ${rounded.toFixed(2)}${isGoldenA ? ' (অভিনন্দন! গোল্ডেন জিপিএ ৫.০০)' : ''}।`,
  };
}

export function validateManualGPA(input: string | number): {
  isValid: boolean;
  errorBn?: string;
  numericValue?: number;
} {
  const str = String(input).trim();
  if (!str) {
    return { isValid: false, errorBn: 'অনুগ্রহ করে আপনার SSC GPA লিখুন।' };
  }

  const num = parseFloat(str);
  if (isNaN(num)) {
    return { isValid: false, errorBn: 'সঠিক সংখ্যা প্রদান করুন (যেমন: ৫.০০ বা ৪.২৫)।' };
  }

  if (num < 1.0) {
    return { isValid: false, errorBn: 'GPA মান অবশ্যই ১.০০ বা তার বেশি হতে হবে।' };
  }

  if (num > 5.0) {
    return { isValid: false, errorBn: 'SSC পরীক্ষায় সর্বোচ্চ GPA ৫.০০ এর বেশি হতে পারে না।' };
  }

  return { isValid: true, numericValue: Number(num.toFixed(2)) };
}
