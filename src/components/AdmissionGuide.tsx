import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';

export const AdmissionGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            সরকারি ভর্তি নীতিমালা ২০২৬
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            একাদশ শ্রেণিতে ভর্তি নির্দেশিকা ও ধাপসমূহ
          </h3>
          <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
            শিক্ষা মন্ত্রণালয়ের মাধ্যমিক ও উচ্চ শিক্ষা বিভাগের সর্বশেষ নীতিমালা অনুযায়ী তৈরি।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold text-sm">
              ১
            </div>
            <h4 className="text-sm font-bold text-white">আবেদন ফি প্রদান</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              বিকাশ, নগদ বা রকেটের মাধ্যমে নির্ধারিত সরকারি আবেদন ফি জমা দিয়ে ট্রানজেকশন আইডি সংগ্রহ করতে হয়।
            </p>
          </div>

          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold text-sm">
              ২
            </div>
            <h4 className="text-sm font-bold text-white">৫–১০টি কলেজ নির্বাচন</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              পছন্দক্রম অনুযায়ী সর্বনিম্ন ৫টি এবং সর্বোচ্চ ১০টি কলেজ নির্বাচন করতে হবে। মেধা ও মোট প্রাপ্ত নম্বরের ভিত্তিতে আসন বরাদ্দ হয়।
            </p>
          </div>

          <div className="bg-emerald-900/30 border border-emerald-800/80 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold text-sm">
              ৩
            </div>
            <h4 className="text-sm font-bold text-white">নিশ্চায়ন ও মাইগ্রেশন</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              ফলাফল প্রকাশের পর নির্ধারিত সময়ে সিট নিশ্চায়ন করতে হয়। চাইলে স্বয়ংক্রিয়ভাবে উপরের পছন্দের কলেজে মাইগ্রেশনের সুবিধা চালু রাখা যায়।
            </p>
          </div>
        </div>

        {/* Group Change Rules */}
        <div className="bg-emerald-900/20 border border-emerald-800/60 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>বিভাগ পরিবর্তন (Group Change) নীতিমালা:</span>
          </h4>
          <ul className="text-xs text-emerald-200/90 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>বিজ্ঞান বিভাগ থেকে পরিবর্তন:</strong> বিজ্ঞান বিভাগের শিক্ষার্থীরা চাইলে মানবিক বা ব্যবসায় শিক্ষা শাখায় আবেদন করতে পারেন। সাধারণ কলেজগুলোতে বিজ্ঞান শিক্ষার্থীদের জন্য বিশেষ কোটা থাকে।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>ব্যবসায় শিক্ষা থেকে পরিবর্তন:</strong> ব্যবসায় শিক্ষা বিভাগের শিক্ষার্থীরা মানবিক শাখায় পরিবর্তন করতে পারেন, তবে বিজ্ঞান শাখায় যাওয়ার সুযোগ নেই।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>মানবিক বিভাগ:</strong> মানবিক বিভাগের শিক্ষার্থীরা শুধুমাত্র মানবিকেই আবেদন করতে পারেন।</span>
            </li>
          </ul>
        </div>

        {/* Autonomous Exceptions */}
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-5 space-y-2">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>স্বায়ত্তশাসিত কলেজের ব্যতিক্রম নিয়ম:</span>
          </h4>
          <p className="text-xs text-amber-100/90 leading-relaxed">
            নটর ডেম কলেজ, হলি ক্রস কলেজ এবং সেন্ট জোসেফ হায়ার সেকেন্ডারি স্কুল কেন্দ্রীয় পোর্টালে অংশ নেয় না। এই প্রতিষ্ঠানগুলোতে ভর্তি হতে হলে তাদের নিজস্ব ওয়েবসাইটে আলাদাভাবে নির্ধারিত ফরম পূরণ ও লিখিত/মৌখিক ভর্তি পরীক্ষায় অংশগ্রহণ করতে হয়।
          </p>
        </div>

        {/* Direct Link */}
        <div className="pt-2 flex justify-end">
          <a
            href="http://www.xiclassadmission.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            <span>অফিসিয়াল একাদশ শ্রেণি ভর্তি পোর্টাল দেখুন</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
