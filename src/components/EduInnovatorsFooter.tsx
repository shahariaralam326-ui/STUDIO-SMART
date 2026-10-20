import React from 'react';
import { ActivePage, Language } from '../types/index.ts';
import {
  Sparkles,
  GraduationCap,
  Users,
  BookOpen,
  Bot,
  Compass,
  ShoppingBag,
  Calendar,
  ShieldCheck,
  Award,
  Palette,
  TrendingUp,
  Cpu,
  Code,
} from 'lucide-react';

interface EduInnovatorsFooterProps {
  setActivePage?: (page: ActivePage) => void;
  language?: Language;
}

export const EduInnovatorsFooter: React.FC<EduInnovatorsFooterProps> = ({
  setActivePage,
  language = 'bn',
}) => {
  const teamMembers = [
    { name: 'Mominul Islam Taj', role: 'CEO', icon: Award },
    { name: 'Omio', role: 'UI Designer', icon: Palette },
    { name: 'AS Morsalin', role: 'Marketing Manager', icon: TrendingUp },
    { name: 'Arnob', role: 'AI & ML Specialist', icon: Cpu },
    { name: 'Robayet', role: 'App Developer', icon: Code },
  ];

  const featureLabels = [
    'AI Chat',
    'eBook Library',
    'Quizzes',
    'Note Sharing',
    'Study Progress',
    'College Finder',
    'Exam Countdown',
  ];

  return (
    <footer className="bg-emerald-950 border-t border-emerald-900/80 text-emerald-200/80 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Brand & Team Showcase Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-emerald-950 shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                STUDIO SMART
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-lime-400">
              "Learn Smarter. Progress Faster. Succeed Together."
            </p>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
              Studio Smart is an all-in-one learning app designed for students to make studying easier, faster and more effective.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {featureLabels.map((f, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'নেভিগেশন ও পেজসমূহ' : 'Quick Navigation'}
            </h4>
            <ul className="text-xs space-y-2 text-emerald-300/80">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage?.('dashboard')}
                  className="hover:text-lime-300 transition-colors"
                >
                  হোম ড্যাশবোর্ড (Home)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage?.('books')}
                  className="hover:text-lime-300 transition-colors"
                >
                  এনসিটিবি পাঠ্যবই (Books Library)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage?.('ai-tutor')}
                  className="hover:text-lime-300 transition-colors"
                >
                  জেমিনি এআই টিউটর (AI Tutor)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage?.('college-finder')}
                  className="hover:text-lime-300 transition-colors"
                >
                  এসএসসি কলেজ ফাইন্ডার (College Finder)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage?.('estore')}
                  className="hover:text-lime-300 transition-colors"
                >
                  স্টুডেন্ট ই-স্টোর (E-Store)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources & Portals */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'অফিসিয়াল শিক্ষা পোর্টাল' : 'Official Portals'}
            </h4>
            <ul className="text-xs space-y-2 text-emerald-300/80">
              <li>
                <a
                  href="https://nctb.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-300 hover:underline block"
                >
                  • জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (nctb.gov.bd)
                </a>
              </li>
              <li>
                <a
                  href="http://www.xiclassadmission.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-300 hover:underline block"
                >
                  • একাদশ শ্রেণি ভর্তি সিস্টেম (xiclassadmission.gov.bd)
                </a>
              </li>
              <li>
                <a
                  href="http://www.btebadmission.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-300 hover:underline block"
                >
                  • কারিগরি শিক্ষা বোর্ড ভর্তি (btebadmission.gov.bd)
                </a>
              </li>
              <li>
                <a
                  href="https://www.rokomari.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-300 hover:underline block"
                >
                  • রকমারি ডটকম শিক্ষা সামগ্রী (rokomari.com)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Poster Reference: "Our Team — EduInnovators" Strip */}
        <div className="pt-8 border-t border-emerald-900/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-lime-400 uppercase tracking-widest block">
                Our Team
              </span>
              <h4 className="text-lg font-bold text-white">
                EduInnovators
              </h4>
            </div>
            <span className="text-xs text-emerald-300 bg-emerald-900 px-2.5 py-1 rounded border border-emerald-800">
              স্কুল বিজ্ঞান প্রদর্শনী দল ২০২৬
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
            {teamMembers.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-emerald-900/40 border border-emerald-800/80 rounded-xl p-3 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-lime-400">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{m.role}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white truncate">
                    {m.name}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Disclaimers and Copyright */}
        <div className="pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/70">
          <p>© Studio Smart | Team EduInnovators. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-300/80 text-center sm:text-right">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400 shrink-0" />
            <span>বিজ্ঞান প্রদর্শনী প্রজেক্ট ডেমো · শিক্ষার্থী সহায়তা ও ডিজিটাল শিক্ষা রূপান্তর</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
