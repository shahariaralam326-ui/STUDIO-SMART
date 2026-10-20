import React, { useState } from 'react';
import { EDUCATION_BOARDS, GROUPS, DISTRICTS } from '../data/colleges.ts';
import { validateManualGPA } from '../utils/gpaCalculator.ts';
import { AlertCircle, CheckCircle2, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface ManualGPAFormProps {
  gpa: string;
  setGpa: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  board: string;
  setBoard: (val: string) => void;
  group: 'science' | 'humanities' | 'business';
  setGroup: (val: 'science' | 'humanities' | 'business') => void;
  district: string;
  setDistrict: (val: string) => void;
  collegeType: string;
  setCollegeType: (val: string) => void;
  onSubmit: () => void;
}

export const ManualGPAForm: React.FC<ManualGPAFormProps> = ({
  gpa,
  setGpa,
  year,
  setYear,
  board,
  setBoard,
  group,
  setGroup,
  district,
  setDistrict,
  collegeType,
  setCollegeType,
  onSubmit,
}) => {
  const [touched, setTouched] = useState(false);

  const validation = validateManualGPA(gpa);
  const showError = touched && !validation.isValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (validation.isValid) {
      onSubmit();
    }
  };

  const setPresetGpa = (val: string) => {
    setGpa(val);
    setTouched(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* GPA Primary Input Section */}
      <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <label htmlFor="ssc-gpa-input" className="block text-lg sm:text-xl font-bold text-emerald-100 tracking-tight">
            আপনার SSC GPA লিখুন
          </label>
          <p className="text-xs sm:text-sm text-emerald-300/80">
            এসএসসি পরীক্ষার জিপিএ (১.০০ থেকে ৫.০০) প্রদান করুন। ছবি আপলোড করা বাধ্যতামূলক নয়।
          </p>

          <div className="relative max-w-xs mx-auto">
            <input
              id="ssc-gpa-input"
              type="number"
              step="0.01"
              min="1.00"
              max="5.00"
              placeholder="৫.০০"
              value={gpa}
              onChange={(e) => {
                setGpa(e.target.value);
                setTouched(true);
              }}
              className={`w-full text-center text-3xl sm:text-4xl font-extrabold tracking-wider px-4 py-3 bg-emerald-900/60 border-2 rounded-xl text-white placeholder-emerald-600 focus:outline-none focus:ring-4 transition-all tabular-nums ${
                showError
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : validation.isValid && gpa
                  ? 'border-emerald-400 focus:ring-emerald-400/20'
                  : 'border-emerald-700 focus:border-emerald-400 focus:ring-emerald-500/20'
              }`}
            />
            {validation.isValid && gpa && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </span>
            )}
          </div>

          {/* Quick GPA Buttons */}
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
            <span className="text-xs text-emerald-300/70 mr-1">দ্রুত পছন্দ:</span>
            {['5.00', '4.85', '4.50', '4.00', '3.75'].map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => setPresetGpa(val)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  gpa === val
                    ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                    : 'bg-emerald-900/40 text-emerald-200 border-emerald-700/60 hover:bg-emerald-800'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Validation Feedback */}
          {showError && (
            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs sm:text-sm bg-rose-950/60 border border-rose-800/80 py-2 px-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validation.errorBn}</span>
            </div>
          )}

          {validation.isValid && gpa && (
            <div className="text-emerald-300 text-xs sm:text-sm">
              {Number(gpa) === 5.0 ? 'দারুণ ফলাফল! আপনি শীর্ষ কলেজগুলোর জন্য যোগ্য।' : 'বৈধ জিপিএ গৃহীত হয়েছে।'}
            </div>
          )}
        </div>
      </div>

      {/* Board, Group, Year, & Preference Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Exam Year */}
        <div className="bg-emerald-950/40 border border-emerald-900/80 rounded-xl p-4">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            পরীক্ষার সন (Exam Year)
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-400"
          >
            <option value="2026">২০২৬ (চলতি সন)</option>
            <option value="2025">২০২৫</option>
            <option value="2024">২০২৪</option>
            <option value="2023">২০২৩</option>
            <option value="2022">২০২২</option>
          </select>
        </div>

        {/* Education Board */}
        <div className="bg-emerald-950/40 border border-emerald-900/80 rounded-xl p-4">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            শিক্ষা বোর্ড (Education Board)
          </label>
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-400"
          >
            {EDUCATION_BOARDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nameBn} ({b.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* Group */}
        <div className="bg-emerald-950/40 border border-emerald-900/80 rounded-xl p-4">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            বিভাগ / গ্রুপ (Group)
          </label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value as any)}
            className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-400"
          >
            {GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nameBn}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred District */}
        <div className="bg-emerald-950/40 border border-emerald-900/80 rounded-xl p-4">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            পছন্দের জেলা (Preferred District)
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-400"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* College Type Preference */}
        <div className="bg-emerald-950/40 border border-emerald-900/80 rounded-xl p-4 sm:col-span-2">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            প্রতিষ্ঠানের ধরন (Institution Preference)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'any', label: 'যেকোনো প্রতিষ্ঠান' },
              { id: 'government', label: 'কেবল সরকারি' },
              { id: 'private', label: 'বেসরকারি / স্বায়ত্তশাসিত' },
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setCollegeType(t.id)}
                className={`text-xs py-2 px-2 rounded-lg border text-center transition-colors ${
                  collegeType === t.id
                    ? 'bg-emerald-700 text-white border-emerald-400 font-semibold'
                    : 'bg-emerald-900/30 text-emerald-200 border-emerald-800/80 hover:bg-emerald-800/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-900/50 transition-all cursor-pointer"
        >
          <span>উপযুক্ত কলেজের সুপারিশ দেখুন</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
