import React, { useState } from 'react';
import { StoreProduct, Language } from '../types/index.ts';
import { STORE_PRODUCTS } from '../data/products.ts';
import {
  ShoppingBag,
  Search,
  ExternalLink,
  Star,
  CheckCircle2,
  Filter,
  Sparkles,
  Info,
  ShieldCheck,
} from 'lucide-react';

interface EStorePageProps {
  language: Language;
}

export const EStorePage: React.FC<EStorePageProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelBn: 'সকল সামগ্রী', labelEn: 'All Products' },
    { id: 'calculators', labelBn: 'ক্যালকুলেটর', labelEn: 'Calculators' },
    { id: 'geometry', labelBn: 'জ্যামিতি বক্স ও স্কেল', labelEn: 'Geometry & Scales' },
    { id: 'guidebooks', labelBn: 'গাইডবই ও টেস্ট পেপার', labelEn: 'Guidebooks' },
    { id: 'stationery', labelBn: 'খাতা ও কলম', labelEn: 'Stationery' },
    { id: 'bags', labelBn: 'স্কুল ব্যাগ', labelEn: 'Bags' },
  ];

  const filteredProducts = STORE_PRODUCTS.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        prod.nameBn.toLowerCase().includes(q) ||
        prod.nameEn.toLowerCase().includes(q) ||
        prod.categoryLabelBn.toLowerCase().includes(q) ||
        prod.descriptionBn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* E-Store Hero Banner — Amber Accented Theme */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/60 text-amber-300 text-xs font-semibold border border-amber-600/50">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>শিক্ষার্থীদের জন্য নির্ভরযোগ্য শিক্ষা সামগ্রী ও বই বাজার</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'bn' ? 'স্টুডেন্ট ই-স্টোর (Student E-Store)' : 'Student E-Store & Marketplace'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {language === 'bn'
              ? 'বোর্ড অনুমোদিত সায়েন্টিফিক ক্যালকুলেটর, জ্যামিতি বক্স, টেস্ট পেপার, খাতা ও শিক্ষা সামগ্রী সরাসরি রকমারি ডটকম ও যাচাইকৃত স্টোর থেকে সংগ্রহ করুন।'
              : 'Find board-approved scientific calculators, geometry boxes, test papers, and student stationery directly via Rokomari.'}
          </p>
        </div>

        <a
          href="https://www.rokomari.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>রকমারি ভিজিট করুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'পণ্য বা ব্র্যান্ডের নাম খুঁজুন (যেমন: Casio, ম্যাপেড)...' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'bn' ? `মোট ${filteredProducts.length}টি পণ্য প্রদর্শিত` : `${filteredProducts.length} products available`}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-slate-100 dark:border-slate-800 pt-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Affiliate & Safety Disclosure (Mandatory requirement) */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>স্বচ্ছতা বিজ্ঞপ্তি:</strong> স্টুডেন্ট ই-স্টোরের মাধ্যমে নির্দেশিত পণ্যগুলো রকমারি ডটকম (Rokomari.com) ও অফিশিয়াল স্টোরসমূহে যাচাইকৃত। বিজ্ঞান মেলা প্রদর্শনীতে শিক্ষার্থীদের সুবিধার জন্য পণ্যের আনুমানিক বাজারদর দেখানো হয়েছে। ক্রয়ের জন্য স্টোর বাটন ক্লিক করুন।
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Product Image */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <img
                  src={prod.imageUrl}
                  alt={prod.nameEn}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                  {prod.categoryLabelBn}
                </span>

                {prod.inStock && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    স্টকে আছে
                  </span>
                )}
              </div>

              <div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {prod.storeName}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mt-0.5">
                  {prod.nameBn}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {prod.nameEn}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {prod.descriptionBn}
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  ৳{prod.priceBdt}
                </span>
                {prod.originalPriceBdt && (
                  <span className="text-xs text-slate-400 line-through ml-2 font-mono">
                    ৳{prod.originalPriceBdt}
                  </span>
                )}
              </div>

              <a
                href={prod.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
              >
                <span>রকমারিতে দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
