import React, { useState } from 'react';
import { StudentProfile, Language } from '../types/index.ts';
import { saveStoredProfile, resetAllDemoData, DEFAULT_PROFILE } from '../utils/storage.ts';
import { User, Save, RotateCcw, Check, Sparkles, GraduationCap, School } from 'lucide-react';

interface ProfilePageProps {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  language: Language;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  setProfile,
  language,
}) => {
  const [name, setName] = useState<string>(profile.name);
  const [className, setClassName] = useState<StudentProfile['className']>(profile.className);
  const [medium, setMedium] = useState<StudentProfile['medium']>(profile.medium);
  const [schoolName, setSchoolName] = useState<string>(profile.schoolName || 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ');
  const [studyHours, setStudyHours] = useState<number>(profile.dailyStudyHours || 4);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...profile,
      name: name.trim() || 'শিক্ষার্থী',
      className,
      medium,
      schoolName: schoolName.trim(),
      dailyStudyHours: Number(studyHours),
    };
    setProfile(updated);
    saveStoredProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDemo = () => {
    resetAllDemoData();
    setProfile(DEFAULT_PROFILE);
    setName(DEFAULT_PROFILE.name);
    setClassName(DEFAULT_PROFILE.className);
    setMedium(DEFAULT_PROFILE.medium);
    setSchoolName(DEFAULT_PROFILE.schoolName || '');
    setStudyHours(DEFAULT_PROFILE.dailyStudyHours);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-lime-400" />
            <span>শিক্ষার্থী প্রোফাইল ও পারসোনালাইজেশন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আমার স্টুডেন্ট প্রোফাইল' : 'Student Academic Profile'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            শ্রেণি, মাধ্যম ও অধ্যয়নের লক্ষ্যমাত্রা নির্ধারণ করে অ্যাপের কনটেন্ট কাস্টমাইজ করুন
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-emerald-950 font-extrabold text-xl shadow-md shrink-0">
          {name.charAt(0) || 'T'}
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              শিক্ষার্থীর পুরো নাম (Student Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                বর্তমান শ্রেণি (Class)
              </label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                {['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6', 'Class 5'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                শিক্ষার মাধ্যম (Medium)
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="bangla">বাংলা মাধ্যম (Bangla Medium)</option>
                <option value="english">ইংরেজি ভার্সন (English Version)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              বিদ্যালয় / শিক্ষা প্রতিষ্ঠানের নাম
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              দৈনিক পড়ার লক্ষ্যমাত্রা (ঘণ্টা): <span className="text-emerald-600 font-mono font-bold">{studyHours} ঘণ্টা</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডেমো ডেটা রিসেট করুন</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-lime-300" />
                <span>সংরক্ষিত হয়েছে!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>প্রোফাইল সংরক্ষণ</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
