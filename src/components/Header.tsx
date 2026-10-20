import React from 'react';
import { Award, Compass, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'wizard' | 'colleges' | 'guide' | 'about';
  setActiveTab: (tab: 'wizard' | 'colleges' | 'guide' | 'about') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onReset }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-emerald-950/90 border-b border-emerald-900/60 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <button
            onClick={() => setActiveTab('wizard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:bg-emerald-500 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0">
              STUDIO SMART
            </span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links with subtle hover underlines */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-emerald-200/80">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'wizard' ? 'border-emerald-400 text-white font-semibold' : 'border-transparent'
              }`}
            >
              জিপিএ ও ভর্তি উইজার্ড
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'colleges' ? 'border-emerald-400 text-white font-semibold' : 'border-transparent'
              }`}
            >
              কলেজ তালিকা ও কাট-অফ
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'guide' ? 'border-emerald-400 text-white font-semibold' : 'border-transparent'
              }`}
            >
              ভর্তি নির্দেশিকা ২০২৬
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'about' ? 'border-emerald-400 text-white font-semibold' : 'border-transparent'
              }`}
            >
              প্রদর্শনী ও EduInnovators
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-100 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/50 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
              title="নতুন করে শুরু করুন"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>রিসেট</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
