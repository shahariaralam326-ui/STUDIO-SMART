import React, { useState } from 'react';
import { Language, Theme, ActivePage } from '../types/index.ts';
import { resetAllDemoData } from '../utils/storage.ts';
import { Settings, Globe, Moon, Sun, RotateCcw, ShieldCheck, Check } from 'lucide-react';

interface SettingsPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  setActivePage: (page: ActivePage) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  setActivePage,
}) => {
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const handleResetData = () => {
    resetAllDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <Settings className="w-3.5 h-3.5 text-lime-400" />
            <span>অ্যাপ্লিকেশন কনফিগারেশন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'সেটিংস ও পছন্দসমূহ' : 'Settings & Preferences'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            ভাষা, থিম এবং ডেমো ডেটা ব্যবস্থাপনা
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Language Selection */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>অ্যাপের প্রধান ভাষা (Primary Language)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                বাংলা অথবা ইংরেজি ইন্টারফেস নির্বাচন করুন
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Theme Appearance Selection */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>ভিউ মোড ও থিম (Theme Appearance)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                এমারেল্ড লাইট ও ডার্ক মোডের মধ্যে পরিবর্তন করুন
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTheme('emerald-light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  theme === 'emerald-light'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                লাইট মোড
              </button>
              <button
                type="button"
                onClick={() => setTheme('emerald-dark')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  theme === 'emerald-dark'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                ডার্ক মোড
              </button>
            </div>
          </div>
        </div>

        {/* Exhibition Demo Data Reset */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>প্রদর্শনী ডেমো ডেটা রিসেট (Reset Demo Data)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                স্থানীয়ভাবে সংরক্ষিত রুটিন, কুইজ স্কোর ও নোটস ডিফল্ট প্রদর্শনী মোডে ফিরিয়ে নিন
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-200 border border-rose-200 dark:border-rose-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
            >
              {resetSuccess ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  রিসেট সম্পন্ন!
                </span>
              ) : (
                'ডেমো রিসেট করুন'
              )}
            </button>
          </div>
        </div>

        {/* Privacy and Science Fair Disclosure */}
        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>গোপনীয়তা ও ডেটা নিরাপত্তা সুরক্ষা:</span>
          </div>
          <p className="leading-relaxed">
            স্টুডেন্ট স্মার্ট অ্যাপ্লিকেশনটিতে ব্যবহারকারীর কোনো সংবেদনশীল ব্যক্তিগত ডেটা সার্ভারে সংরক্ষণ করা হয় না। সমস্ত স্টাডি প্ল্যান ও নোট ব্রাউজারের লোকাল স্টোরেজে সুরক্ষিত থাকে। বিজ্ঞান প্রদর্শনীতে নিরাপদে ব্যবহারের জন্য ডিজাইন করা হয়েছে।
          </p>
        </div>
      </div>
    </div>
  );
};
