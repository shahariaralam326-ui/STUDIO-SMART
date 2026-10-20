import React, { useState, useEffect } from 'react';
import { Language, StudentProfile } from '../types/index.ts';
import { ManualGPAForm } from '../components/ManualGPAForm.tsx';
import { ImageUploadScanner } from '../components/ImageUploadScanner.tsx';
import { SubjectMarksheetForm } from '../components/SubjectMarksheetForm.tsx';
import { CollegeRecommendations } from '../components/CollegeRecommendations.tsx';
import { Compass, Edit3, Camera, Calculator, Sparkles, RotateCcw, Layers } from 'lucide-react';

interface CollegeFinderPageProps {
  language: Language;
  profile: StudentProfile;
  geminiConfigured: boolean | null;
  presetData?: {
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
    district: string;
    label: string;
  } | null;
}

export const CollegeFinderPage: React.FC<CollegeFinderPageProps> = ({
  language,
  profile,
  geminiConfigured,
  presetData,
}) => {
  const [method, setMethod] = useState<'integrated' | 'manual' | 'scanner' | 'marksheet'>('integrated');
  const [gpa, setGpa] = useState<string>('5.00');
  const [year, setYear] = useState<string>('2026');
  const [board, setBoard] = useState<string>('dhaka');
  const [group, setGroup] = useState<'science' | 'humanities' | 'business'>('science');
  const [district, setDistrict] = useState<string>('ঢাকা (Dhaka)');
  const [collegeType, setCollegeType] = useState<string>('any');
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [autoFilledNotice, setAutoFilledNotice] = useState<string | null>(null);

  // Sync preset data if chosen from Exhibition top ticker
  useEffect(() => {
    if (presetData) {
      setGpa(presetData.gpa);
      setGroup(presetData.group);
      setBoard(presetData.board);
      setYear(presetData.year);
      setDistrict(presetData.district);
      setAutoFilledNotice(`প্রদর্শনী নমুনা লোড হয়েছে: ${presetData.label}`);
      setShowRecommendations(true);
    }
  }, [presetData]);

  const handleConfirmScannedData = (data: {
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
  }) => {
    setGpa(data.gpa);
    setGroup(data.group);
    setBoard(data.board);
    setYear(data.year);
    setAutoFilledNotice('রেজাল্ট শিট থেকে তথ্য স্ক্যান করে ফর্মে স্বয়ংক্রিয়ভাবে বসানো হয়েছে। নিচের তথ্য যাচাই করুন।');
    setShowRecommendations(true);
  };

  const handleUseCalculatedGpa = (calculatedGpa: string, calcGroup: 'science' | 'humanities' | 'business') => {
    setGpa(calculatedGpa);
    setGroup(calcGroup);
    setAutoFilledNotice('বিষয়ভিত্তিক গ্রেড থেকে হিসাবকৃত জিপিএ সফলভাবে যুক্ত হয়েছে।');
    setShowRecommendations(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-lime-400" />
            <span>এসএসসি ফলাফল বিশ্লেষণ ও একাদশ শ্রেণি ভর্তি উইজার্ড</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'এসএসসি জিপিএ ও কলেজ সুপারিশ উইজার্ড' : 'SSC GPA & College Recommendation Wizard'}
          </h2>
          <p className="text-xs text-emerald-200/80 leading-relaxed max-w-2xl">
            ৩টি বিকল্প ইনপুট পদ্ধতি: সরাসরি GPA লিখুন, রেজাল্ট শিটের ছবি/স্ক্রিনশট আপলোড করে স্ক্যান করুন (ঐচ্ছিক), অথবা বিষয়ভিত্তিক গ্রেড দিয়ে আনুমানিক জিপিএ হিসাব করুন।
          </p>
        </div>

        {showRecommendations && (
          <button
            type="button"
            onClick={() => setShowRecommendations(false)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold rounded-lg border border-emerald-600 transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ইনপুট ফর্মে ফিরুন</span>
          </button>
        )}
      </div>

      {autoFilledNotice && (
        <div className="p-3 bg-emerald-900/60 border border-emerald-700/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-400 shrink-0" />
            <span>{autoFilledNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAutoFilledNotice(null)}
            className="text-emerald-400 hover:text-emerald-100 text-[11px] underline"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* Input Methods Segmented Selector */}
      {!showRecommendations && (
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-emerald-950/80 border border-emerald-800/80 rounded-xl shadow-md gap-1 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setMethod('integrated')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                method === 'integrated'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              <Layers className="w-4 h-4 text-lime-400" />
              <span>সমন্বিত উইজার্ড (GPA ও ঐচ্ছিক আপলোড)</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('manual')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                method === 'manual'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>পদ্ধতি ১: শুধুমাত্র GPA লিখুন</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('scanner')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                method === 'scanner'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>পদ্ধতি ২: রেজাল্ট শিট স্ক্যান</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('marksheet')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                method === 'marksheet'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>পদ্ধতি ৩: বিষয়ভিত্তিক গ্রেড ফর্ম</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Methods Display */}
      {!showRecommendations ? (
        <div>
          {/* Integrated Mode: Side-by-side on wide screens, stacked on small screens */}
          {method === 'integrated' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Primary Manual GPA & Criteria Form (Mandatory Method 1) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-emerald-900/30 border border-emerald-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-lime-400" />
                    পদ্ধতি ১: সরাসরি GPA ও ভর্তি তথ্য প্রদান করুন
                  </span>
                  <span className="text-emerald-400/80">ছবি আপলোড বাধ্যতামূলক নয়</span>
                </div>
                <ManualGPAForm
                  gpa={gpa}
                  setGpa={setGpa}
                  year={year}
                  setYear={setYear}
                  board={board}
                  setBoard={setBoard}
                  group={group}
                  setGroup={setGroup}
                  district={district}
                  setDistrict={setDistrict}
                  collegeType={collegeType}
                  setCollegeType={setCollegeType}
                  onSubmit={() => setShowRecommendations(true)}
                />
              </div>

              {/* Right Column: Optional Result-sheet Upload Panel (Mandatory Method 2) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-emerald-900/30 border border-emerald-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    পদ্ধতি ২: রেজাল্ট শিট আপলোড ও স্ক্যানার (ঐচ্ছিক)
                  </span>
                  <span className="text-emerald-400/80">Gemini AI ভিশন</span>
                </div>
                <ImageUploadScanner
                  onConfirmData={handleConfirmScannedData}
                  onSwitchToManual={() => setMethod('manual')}
                  geminiConfigured={geminiConfigured}
                />
              </div>
            </div>
          )}

          {/* Standalone Method 1: Manual GPA */}
          {method === 'manual' && (
            <div className="max-w-3xl mx-auto">
              <ManualGPAForm
                gpa={gpa}
                setGpa={setGpa}
                year={year}
                setYear={setYear}
                board={board}
                setBoard={setBoard}
                group={group}
                setGroup={setGroup}
                district={district}
                setDistrict={setDistrict}
                collegeType={collegeType}
                setCollegeType={setCollegeType}
                onSubmit={() => setShowRecommendations(true)}
              />
            </div>
          )}

          {/* Standalone Method 2: Result Sheet Scanner */}
          {method === 'scanner' && (
            <div className="max-w-3xl mx-auto">
              <ImageUploadScanner
                onConfirmData={handleConfirmScannedData}
                onSwitchToManual={() => setMethod('manual')}
                geminiConfigured={geminiConfigured}
              />
            </div>
          )}

          {/* Standalone Method 3: Subject Marksheet Form */}
          {method === 'marksheet' && (
            <div className="max-w-4xl mx-auto">
              <SubjectMarksheetForm
                initialGroup={group}
                onUseCalculatedGpa={handleUseCalculatedGpa}
              />
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <CollegeRecommendations
          gpa={parseFloat(gpa) || 5.0}
          group={group}
          board={board}
          year={year}
          district={district}
          collegeType={collegeType}
          onModifySearch={() => setShowRecommendations(false)}
        />
      )}
    </div>
  );
};
