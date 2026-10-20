import React, { useState } from 'react';
import { SubjectGrade, getDefaultSubjects, calculateEstimatedGPA, GRADE_POINTS, GRADE_DESCRIPTIONS } from '../utils/gpaCalculator.ts';
import { Plus, Trash2, Calculator, Check, ArrowRight, HelpCircle, Award, AlertCircle } from 'lucide-react';

interface SubjectMarksheetFormProps {
  initialGroup: 'science' | 'humanities' | 'business';
  onUseCalculatedGpa: (gpa: string, group: 'science' | 'humanities' | 'business') => void;
}

export const SubjectMarksheetForm: React.FC<SubjectMarksheetFormProps> = ({
  initialGroup,
  onUseCalculatedGpa,
}) => {
  const [group, setGroup] = useState<'science' | 'humanities' | 'business'>(initialGroup);
  const [subjects, setSubjects] = useState<SubjectGrade[]>(() => getDefaultSubjects(initialGroup));
  const [newSubjectName, setNewSubjectName] = useState<string>('');

  const handleGroupChange = (newG: 'science' | 'humanities' | 'business') => {
    setGroup(newG);
    setSubjects(getDefaultSubjects(newG));
  };

  const updateSubjectGrade = (id: string, grade: SubjectGrade['grade']) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, grade } : s))
    );
  };

  const toggleFourthSubject = (id: string) => {
    setSubjects((prev) =>
      prev.map((s) => ({
        ...s,
        isFourthSubject: s.id === id ? !s.isFourthSubject : false,
      }))
    );
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newId = 'custom_' + Date.now();
    const newSub: SubjectGrade = {
      id: newId,
      nameBn: newSubjectName.trim(),
      nameEn: newSubjectName.trim(),
      grade: 'A',
      isFourthSubject: false,
      isOptionalRemovable: true,
    };
    setSubjects((prev) => [...prev, newSub]);
    setNewSubjectName('');
  };

  // Run official Bangladesh SSC grading calculation
  const calculation = calculateEstimatedGPA(subjects);

  return (
    <div className="space-y-6">
      {/* Group Selector for Marksheet */}
      <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-800/80 pb-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-emerald-100">
              বিষয়ভিত্তিক গ্রেড অনুযায়ী আনুমানিক জিপিএ হিসাব
            </h3>
            <p className="text-xs text-emerald-300/80 mt-1">
              বাংলাদেশ শিক্ষা বোর্ডের নিয়মানুযায়ী ৪র্থ বিষয়ের অতিরিক্ত পয়েন্ট যোগ করে আনুমানিক জিপিএ হিসাব করা হবে।
            </p>
          </div>

          {/* Group Tabs */}
          <div className="flex items-center gap-1 bg-emerald-900/60 p-1 rounded-lg border border-emerald-700/60 shrink-0">
            {[
              { id: 'science', label: 'বিজ্ঞান' },
              { id: 'humanities', label: 'মানবিক' },
              { id: 'business', label: 'ব্যবসায় শিক্ষা' },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleGroupChange(g.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  group === g.id
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Marksheet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-emerald-800/80 text-emerald-300 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">বিষয় (Subject)</th>
                <th className="py-2.5 px-3">প্রাপ্ত গ্রেড (Grade)</th>
                <th className="py-2.5 px-3 text-center">গ্রেড পয়েন্ট</th>
                <th className="py-2.5 px-3 text-center">৪র্থ বিষয়?</th>
                <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/50">
              {subjects.map((s) => (
                <tr
                  key={s.id}
                  className={`hover:bg-emerald-900/30 transition-colors ${
                    s.isFourthSubject ? 'bg-emerald-900/25' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-medium text-emerald-100">
                    <span>{s.nameBn}</span>
                    {s.isFourthSubject && (
                      <span className="ml-2 text-[10px] text-amber-300 font-semibold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/80">
                        ৪র্থ বিষয়
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={s.grade}
                      onChange={(e) => updateSubjectGrade(s.id, e.target.value as any)}
                      className="bg-emerald-900/80 border border-emerald-700/80 rounded px-2 py-1 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
                    >
                      <option value="A+">A+ (৫.০০)</option>
                      <option value="A">A (৪.০০)</option>
                      <option value="A-">A- (৩.৫০)</option>
                      <option value="B">B (৩.০০)</option>
                      <option value="C">C (২.০০)</option>
                      <option value="D">D (১.০০)</option>
                      <option value="F">F (০.০০)</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-300 tabular-nums">
                    {(GRADE_POINTS[s.grade] || 0).toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => toggleFourthSubject(s.id)}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        s.isFourthSubject
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800 border border-emerald-700/50'
                      }`}
                    >
                      {s.isFourthSubject ? '৪র্থ নির্বাচিত' : 'চিহ্নিত করুন'}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {subjects.length > 5 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(s.id)}
                        className="p-1 text-rose-400 hover:text-rose-200 hover:bg-rose-950/60 rounded transition-colors"
                        title="বিষয়টি সরান"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Custom Subject Bar */}
        <form onSubmit={handleAddCustomSubject} className="mt-4 pt-4 border-t border-emerald-900/60 flex items-center gap-2">
          <input
            type="text"
            placeholder="অতিরিক্ত বিষয় যোগ করুন (যেমন: চারু ও কারুকলা বা সঙ্গীত)..."
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="flex-1 bg-emerald-900/40 border border-emerald-700/60 rounded-lg px-3 py-1.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>বিষয় যুক্ত করুন</span>
          </button>
        </form>
      </div>

      {/* Real-time Calculation Result Box */}
      <div className="bg-emerald-950/90 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-300 tracking-wider uppercase bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/80 inline-block">
              আনুমানিক ফলাফল (Estimated Result)
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {calculation.isGoldenA ? 'গোল্ডেন জিপিএ ৫.০০ (সকল বিষয়ে A+)' : `হিসাবকৃত জিপিএ: ${calculation.formattedGpa}`}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-300/90 max-w-xl leading-relaxed">
              {calculation.explanationBn}
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-300 font-mono tabular-nums tracking-tight">
              {calculation.formattedGpa}
            </div>
            <button
              type="button"
              onClick={() => onUseCalculatedGpa(calculation.formattedGpa, group)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>এই জিপিএ দিয়ে কলেজ খুঁজুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calculation Rule Transparency Note */}
        <div className="mt-6 pt-4 border-t border-emerald-900/60 text-[11px] text-emerald-400/80 space-y-1">
          <div className="flex items-center gap-1 font-semibold text-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>বাংলাদেশ শিক্ষা বোর্ড গ্রেডিং নিয়মাবলী:</span>
          </div>
          <p>
            • আবশ্যিক বিষয়গুলোতে মোট প্রাপ্ত পয়েন্টের সাথে ৪র্থ বিষয়ের ২.০০ এর অতিরিক্ত পয়েন্ট (সর্বোচ্চ ৩.০০) যোগ করা হয়েছে।
          </p>
          <p>
            • আবশ্যিক কোনো বিষয়ে 'F' থাকলে সামগ্রিক ফলাফল অকৃতকার্য (GPA 0.00) নির্ধারিত হয়।
          </p>
        </div>
      </div>
    </div>
  );
};
