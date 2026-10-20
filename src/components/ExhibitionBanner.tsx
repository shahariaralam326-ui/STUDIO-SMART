import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExhibitionBannerProps {
  onLoadPreset: (preset: {
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
    district: string;
    label: string;
  }) => void;
  geminiConfigured: boolean | null;
}

export const ExhibitionBanner: React.FC<ExhibitionBannerProps> = ({
  onLoadPreset,
  geminiConfigured,
}) => {
  const presets = [
    {
      label: 'গোল্ডেন ৫.০০ (বিজ্ঞান - ঢাকা)',
      gpa: '5.00',
      group: 'science' as const,
      board: 'dhaka',
      year: '2026',
      district: 'ঢাকা (Dhaka)',
    },
    {
      label: '৪.৭৫ (বিজ্ঞান - চট্টগ্রাম)',
      gpa: '4.75',
      group: 'science' as const,
      board: 'chittagong',
      year: '2026',
      district: 'চট্টগ্রাম (Chattogram)',
    },
    {
      label: '৪.৫০ (ব্যবসায় শিক্ষা - রাজশাহী)',
      gpa: '4.50',
      group: 'business' as const,
      board: 'rajshahi',
      year: '2026',
      district: 'রাজশাহী (Rajshahi)',
    },
    {
      label: '৩.৮০ (মানবিক - কুমিল্লা)',
      gpa: '3.80',
      group: 'humanities' as const,
      board: 'comilla',
      year: '2026',
      district: 'কুমিল্লা (Cumilla)',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-800/60 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Exhibition Badge */}
        <div className="flex items-center gap-2.5 text-emerald-100 flex-wrap justify-center lg:justify-start">
          <span className="font-semibold text-emerald-300 flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-700/60 px-2.5 py-1 rounded">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            স্কুল বিজ্ঞান প্রদর্শনী ডেমো মোড ২০২৬
          </span>
          <span className="text-emerald-300/80">·</span>
          <span className="text-emerald-200">টিম EduInnovators</span>
          <span className="text-emerald-300/80">·</span>
          {geminiConfigured === true ? (
            <span className="text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Gemini Vision সক্রিয়
            </span>
          ) : (
            <span className="text-amber-300/90 flex items-center gap-1" title="সার্ভারে API কী সংযুক্ত না থাকলেও সমস্ত ফিচার ডেমো ডেটা সহ পূর্ণ কার্যকর">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              অফলাইন / ডেমো রেজাল্ট সক্রিয়
            </span>
          )}
        </div>

        {/* Right: Quick Demo Data Presets */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-emerald-300/80 mr-1 font-medium hidden sm:inline">নমুনা তথ্য:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onLoadPreset(preset)}
              className="px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded border border-emerald-700/40 transition-colors whitespace-nowrap active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
