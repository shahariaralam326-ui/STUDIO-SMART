import React from 'react';
import { Language } from '../types/index.ts';
import {
  Sparkles,
  Users,
  GraduationCap,
  BookOpen,
  Code,
  Palette,
  TrendingUp,
  Cpu,
  Award,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface AboutTeamPageProps {
  language: Language;
}

export const AboutTeamPage: React.FC<AboutTeamPageProps> = ({ language }) => {
  // Exact 5 members from the supplied StudySmart / EduInnovators poster
  const teamMembers = [
    {
      name: 'Mominul Islam Taj',
      roleBn: 'সিইও ও প্রজেক্ট লিড',
      roleEn: 'CEO & Project Lead',
      icon: Award,
      badge: 'Team Leader',
      descBn: 'প্রজেক্ট রূপরেখা, সার্বিক পরিচালনা ও কৌশলগত দিকনির্দেশনা প্রদানকারী।',
    },
    {
      name: 'Omio',
      roleBn: 'ইউআই/ইউএক্স ডিজাইনার',
      roleEn: 'UI Designer',
      icon: Palette,
      badge: 'UI/UX Design',
      descBn: 'ব্যবহারকারী-বান্ধব ইন্টারফেস, ভিজ্যুয়াল আইডেন্টিটি ও ব্র্যান্ড স্টাইল রূপকার।',
    },
    {
      name: 'AS Morsalin',
      roleBn: 'মার্কেটিং ও আউটরিচ ম্যানেজার',
      roleEn: 'Marketing Manager',
      icon: TrendingUp,
      badge: 'Marketing',
      descBn: 'শিক্ষার্থীদের চাহিদা মূল্যায়ন, গবেষণা ও প্রদর্শনী প্রচারণা সমন্বয়ক।',
    },
    {
      name: 'Arnob',
      roleBn: 'এআই ও মেশিন লার্নিং বিশেষজ্ঞ',
      roleEn: 'AI & ML Specialist',
      icon: Cpu,
      badge: 'AI & ML',
      descBn: 'জেমিনি এআই টিউটর, রেজাল্ট কার্ড কম্পিউটার ভিশন স্ক্যানিং আর্কিটেক্ট।',
    },
    {
      name: 'Robayet',
      roleBn: 'অ্যাপ ও ফুল-স্ট্যাক ডেভেলপার',
      roleEn: 'App Developer',
      icon: Code,
      badge: 'Development',
      descBn: 'রিঅ্যাক্ট ও টাইপস্ক্রিপ্ট ফ্রন্টএন্ড এবং এক্সপ্রেস ব্যাকএন্ড সিস্টেম ইঞ্জিনিয়ার।',
    },
  ];

  const appFeatures = [
    'AI Chat (জেমিনি এআই চ্যাট ও সমাধান)',
    'eBook Library (এনসিটিবি পাঠ্যবই লাইব্রেরি)',
    'Quizzes (অধ্যায়ভিত্তিক এমসিকিউ কুইজ)',
    'Note Sharing (ব্যক্তিগত স্টাডি নোটবুক)',
    'Study Progress (অগ্রগতি ও পারফরম্যান্স অ্যানালিটিক্স)',
    'College Finder (এসএসসি জিপিএ কলেজ ফাইন্ডার)',
    'Exam Countdown (পরীক্ষার লাইভ কাউন্টডাউন)',
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Brand Hero Showcase */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 sm:p-10 text-white shadow-xl text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center text-emerald-950 mx-auto shadow-lg">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            STUDIO SMART
          </h1>
          <p className="text-base sm:text-lg font-bold text-lime-300">
            "Learn Smarter. Progress Faster. Succeed Together."
          </p>
          <p className="text-sm text-emerald-200 font-medium">
            "স্মার্টভাবে শেখো। দ্রুত এগিয়ে চলো। একসঙ্গে সফল হও।"
          </p>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed pt-2">
            Studio Smart is an all-in-one learning app designed for students to make studying easier, faster and more effective.
          </p>
        </div>
      </div>

      {/* Team EduInnovators Section */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            স্কুল বিজ্ঞান মেলা প্রদর্শনী ২০২৬
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Our Team — EduInnovators
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            নিবেদিতপ্রাণ শিক্ষার্থী ও গবেষক দল যারা প্রযুক্তির সহায়তায় সবার জন্য মানসম্মত শিক্ষা নিশ্চিত করতে কাজ করছে
          </p>
        </div>

        {/* 5 Exact Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {teamMembers.map((member, idx) => {
            const Icon = member.icon;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded">
                      {member.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {language === 'bn' ? member.roleBn : member.roleEn}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {member.descBn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-medium">
                  টিম সদস্য #{idx + 1} · EduInnovators
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Implemented Features Checklist */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>প্রজেক্টে বাস্তবায়িত সকল প্রধান মডিউল (Core Features):</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          {appFeatures.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
