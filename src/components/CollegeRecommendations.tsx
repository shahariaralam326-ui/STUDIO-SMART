import React, { useState, useEffect } from 'react';
import { College, DISTRICTS } from '../data/colleges.ts';
import { ExternalLink, CheckCircle2, AlertTriangle, Building, MapPin, Sparkles, Filter, RefreshCw, BookOpen } from 'lucide-react';

interface CollegeRecommendationsProps {
  gpa: number;
  group: 'science' | 'humanities' | 'business';
  board: string;
  year: string;
  district: string;
  collegeType: string;
  onModifySearch: () => void;
}

export const CollegeRecommendations: React.FC<CollegeRecommendationsProps> = ({
  gpa,
  group,
  board,
  year,
  district: initialDistrict,
  collegeType: initialCollegeType,
  onModifySearch,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedType, setSelectedType] = useState(initialCollegeType);
  const [colleges, setColleges] = useState<any[]>([]);
  const [aiCounseling, setAiCounseling] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/recommend-colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gpa,
          group,
          board,
          year,
          district: selectedDistrict,
          collegeType: selectedType,
        }),
      });

      if (!res.ok) {
        throw new Error('সার্ভারে সংযোগে সমস্যা হয়েছে।');
      }

      const data = await res.json();
      if (data.success) {
        setColleges(data.colleges || []);
        setAiCounseling(data.aiCounselingSummary || null);
      } else {
        setErrorMessage(data.messageBn || 'সুপারিশ লোড করা যায়নি।');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('সার্ভার থেকে কলেজ তথ্য আনা সম্ভব হয়নি। ইন্টারনেট সংযোগ অথবা সার্ভার স্ট্যাটাস পরীক্ষা করুন।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [gpa, group, board, year, selectedDistrict, selectedType]);

  const groupLabel =
    group === 'science'
      ? 'বিজ্ঞান বিভাগ (Science)'
      : group === 'humanities'
      ? 'মানবিক বিভাগ (Humanities)'
      : 'ব্যবসায় শিক্ষা বিভাগ (Business Studies)';

  return (
    <div className="space-y-6">
      {/* Top Credentials Summary Bar */}
      <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              আপনার শিক্ষাগত প্রোফাইল
            </span>
            <div className="flex items-center gap-3 flex-wrap text-white">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300 tabular-nums">
                GPA {gpa.toFixed(2)}
              </span>
              <span className="text-emerald-500 text-lg">·</span>
              <span className="text-base sm:text-lg font-semibold text-emerald-100">{groupLabel}</span>
              <span className="text-emerald-500 text-lg">·</span>
              <span className="text-sm text-emerald-300">সন: {year}</span>
              <span className="text-emerald-500 text-lg">·</span>
              <span className="text-sm text-emerald-300">বোর্ড: {board.toUpperCase()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onModifySearch}
            className="px-4 py-2 text-xs font-semibold bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            জিপিএ বা তথ্য পরিবর্তন করুন
          </button>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="mt-4 pt-4 border-t border-emerald-900/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              ফিল্টার:
            </span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-emerald-900/80 border border-emerald-700/80 rounded-md px-2.5 py-1 text-white focus:outline-none"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-emerald-900/80 border border-emerald-700/80 rounded-md px-2.5 py-1 text-white focus:outline-none"
            >
              <option value="any">সকল প্রকার প্রতিষ্ঠান</option>
              <option value="government">শুধুমাত্র সরকারি</option>
              <option value="private">বেসরকারি / স্বায়ত্তশাসিত</option>
            </select>
          </div>

          <span className="text-emerald-300/80">
            মোট যোগ্য প্রতিষ্ঠান: <strong className="text-white font-mono">{colleges.length}</strong> টি
          </span>
        </div>
      </div>

      {/* Gemini AI Counseling Panel (when available) */}
      {aiCounseling && (
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-emerald-950 border border-emerald-500/60 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>স্মার্ট এআই শিক্ষা পরামর্শ (AI Educational Guidance):</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {aiCounseling}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="p-12 text-center space-y-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60">
          <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mx-auto" />
          <p className="text-sm text-emerald-200">উপযুক্ত কলেজ ও যাচাইকৃত ভর্তি যোগ্যতা যাচাই করা হচ্ছে...</p>
        </div>
      )}

      {/* Error State */}
      {errorMessage && (
        <div className="p-5 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* College List */}
      {!loading && colleges.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-emerald-300 px-1">
            <span className="font-semibold">যাচাইকৃত কলেজ ও উচ্চ মাধ্যমিক প্রতিষ্ঠানের তালিকা</span>
            <span>অফিসিয়াল একাদশ শ্রেণি ভর্তি নীতিমালা অনুসারে সাজানো</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {colleges.map((college: any) => {
              const reqGpa = college.minGPA?.[group] ?? 3.0;

              return (
                <div
                  key={college.id}
                  className="bg-emerald-950/70 border border-emerald-800/80 hover:border-emerald-600/80 rounded-2xl p-5 sm:p-6 transition-all shadow-md hover:shadow-xl space-y-4"
                >
                  {/* College Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {college.nameBn}
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-700/80">
                          {college.type === 'government'
                            ? 'সরকারি কলেজ'
                            : college.type === 'autonomous'
                            ? 'স্বায়ত্তশাসিত প্রতিষ্ঠান'
                            : college.type === 'polytechnic'
                            ? 'কারিগরি ডিপ্লোমা'
                            : 'আধা-সরকারি / স্বনামধন্য'}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-400/90 font-medium">
                        {college.nameEn} · {college.gender === 'girls' ? 'ছাত্রী' : college.gender === 'boys' ? 'ছাত্র' : 'সহশিক্ষা (ছাত্র-ছাত্রী)'}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300/80 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>জেলা: {college.district} · বিভাগ: {college.division}</span>
                      </div>
                    </div>

                    {/* Minimum GPA Badge */}
                    <div className="sm:text-right shrink-0 bg-emerald-900/40 border border-emerald-700/60 px-3.5 py-2 rounded-xl">
                      <span className="block text-[10px] text-emerald-300/90 uppercase font-semibold">
                        ন্যূনতম প্রয়োজনীয় GPA
                      </span>
                      <span className="text-xl font-bold text-white font-mono tabular-nums">
                        {reqGpa.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Match Explanation (Mandatory user brief requirement) */}
                  <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-3.5 space-y-1">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      যোগ্যতা ও সুপারিশের কারণ:
                    </span>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      {college.matchExplanationBn}
                    </p>
                  </div>

                  {/* Highlights and Facilities */}
                  {college.highlightsBn && (
                    <p className="text-xs text-emerald-200/80 leading-relaxed">
                      <strong className="text-emerald-100">পরিচিতি ও সুবিধা:</strong> {college.highlightsBn}
                    </p>
                  )}

                  {/* Missing Details / Important Warnings (Mandatory Requirement) */}
                  {college.missingDetailsWarning && (
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-200/90">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">যাচাইযোগ্য বিষয়: </strong>
                        <span>{college.missingDetailsWarning}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Links & Official Verification */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-emerald-900/60 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold">{college.verifiedStatus || 'যাচাইকৃত তথ্য'}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {college.admissionType === 'autonomous' ? (
                        <a
                          href={college.admissionNoticeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          <span>নিজস্ব ভর্তি পরীক্ষা সার্কুলার</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : college.admissionType === 'bteb' ? (
                        <a
                          href="http://www.btebadmission.gov.bd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          <span>কারিগরি ভর্তি পোর্টাল</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <a
                          href="http://www.xiclassadmission.gov.bd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          <span>কেন্দ্রীয় ভর্তি পোর্টাল (xiclassadmission.gov.bd)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={college.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 rounded-lg transition-colors"
                      >
                        <span>কলেজ ওয়েবসাইট</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Matches Found */}
      {!loading && colleges.length === 0 && (
        <div className="bg-emerald-950/60 border border-emerald-900 rounded-2xl p-8 text-center space-y-4">
          <Building className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-lg font-bold text-white">
            নির্বাচিত ফিল্টারে সরাসরি মেলেনি
          </h4>
          <p className="text-xs sm:text-sm text-emerald-300/80 max-w-lg mx-auto leading-relaxed">
            আপনার জিপিএ {gpa.toFixed(2)} এবং নির্বাচিত জেলা/বিভাগের মানদণ্ডে নির্দিষ্ট প্রতিষ্ঠান পাওয়া যায়নি। আপনি 'সমগ্র বাংলাদেশ' জেলা নির্বাচন করতে পারেন অথবা ৪ বছর মেয়াদী কারিগরি ডিপ্লোমা ও সাধারণ কলেজগুলোর দ্বিতীয় মেধা তালিকায় আবেদন করতে পারেন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDistrict('সমগ্র বাংলাদেশ (All)');
              setSelectedType('any');
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all"
          >
            সমগ্র বাংলাদেশের সকল কলেজ প্রদর্শন করুন
          </button>
        </div>
      )}
    </div>
  );
};
