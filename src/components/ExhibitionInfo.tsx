import React from 'react';
import { Sparkles, Target, ShieldCheck, Cpu, Users, Award, CheckCircle2 } from 'lucide-react';

export const ExhibitionInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Project Overview Card */}
      <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              বিজ্ঞান প্রদর্শনী ডেমো ২০২৬
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              প্রজেক্ট পরিচিতি: STUDIO SMART
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
              টিম EduInnovators কর্তৃক উদ্ভাবিত এসএসসি শিক্ষার্থীদের জন্য কৃত্রিম বুদ্ধিমত্তা চালিত স্মার্ট কলেজ পরামর্শক।
            </p>
          </div>
          <div className="px-3 py-1.5 bg-emerald-900 border border-emerald-700/80 rounded-lg text-emerald-200 text-xs font-semibold shrink-0">
            বিজ্ঞান মেলা প্রদর্শনী প্রকল্প
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">সমস্যার সমাধান</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              প্রতিবছর এসএসসি পাসের পর প্রায় ১৬ লক্ষ শিক্ষার্থী কলেজ নির্বাচন নিয়ে অনিশ্চয়তায় ভোগে। স্টুডিও স্মার্ট শিক্ষার্থীদের ফলাফল ও পছন্দের সাথে মানানসই সেরা কলেজগুলো তাৎক্ষণিকভাবে সুপারিশ করে।
            </p>
          </div>

          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">মাল্টি-মোডাল ইনপুট</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              শিক্ষার্থী সরাসরি জিপিএ লিখতে পারেন, বিষয়ভিত্তিক গ্রেড দিয়ে ৪র্থ বিষয়ের সঠিক ফর্মুলায় আনুমানিক জিপিএ হিসাব করতে পারেন অথবা ঐচ্ছিকভাবে রেজাল্ট শিট আপলোড করে এআই দিয়ে তথ্য স্ক্যান করতে পারেন।
            </p>
          </div>

          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">নৈতিক ও দায়িত্বশীল এআই</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              জাল নথি শনাক্তকরণ, কোনো ভুয়া বা অসত্য নিশ্চয়তা না দেওয়া এবং ইউজারের ব্যক্তিগত তথ্য সংরক্ষণ না করে প্রদর্শনীতে নিরাপদে ব্যবহারের জন্য ডিজাইন করা হয়েছে।
            </p>
          </div>
        </div>

        {/* Judge & Visitor Interactive Checklist */}
        <div className="bg-emerald-900/20 border border-emerald-800/60 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>প্রদর্শনীতে পরখ করার প্রধান ফিচারসমূহ:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-emerald-200/90">
            <div className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>পদ্ধতি ১:</strong> ম্যানুয়াল জিপিএ লিখে তাৎক্ষণিক কলেজ সুপারিশ দেখুন।</span>
            </div>
            <div className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>পদ্ধতি ২:</strong> সবুজ লেজার স্ক্যান ও রেজাল্ট ছাড়া অন্যান্য ছবি রিজেকশন পরীক্ষা করুন।</span>
            </div>
            <div className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>পদ্ধতি ৩:</strong> বিষয়ভিত্তিক গ্রেড পরিবর্তন করে লাইভ জিপিএ হিসাব ও ৪র্থ বিষয় বোনাস দেখুন।</span>
            </div>
            <div className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>ফিল্টারিং:</strong> ঢাকা, চট্টগ্রাম, রাজশাহী, কুমিল্লা সহ ৬৪ জেলার কলেজ ফিল্টার করুন।</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
