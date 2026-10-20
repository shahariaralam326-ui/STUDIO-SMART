import React, { useState } from 'react';
import { NoteItem, Language } from '../types/index.ts';
import { getStoredNotes, saveStoredNotes } from '../utils/storage.ts';
import { FileText, Plus, Trash2, Edit3, Search, Check, Sparkles } from 'lucide-react';

interface NotesPageProps {
  language: Language;
}

export const NotesPage: React.FC<NotesPageProps> = ({ language }) => {
  const [notes, setNotes] = useState<NoteItem[]>(getStoredNotes());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Note form state
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [subject, setSubject] = useState<string>('পদার্থবিজ্ঞান');

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      const updated = notes.map((n) =>
        n.id === editingId
          ? {
              ...n,
              title: title.trim(),
              content: content.trim(),
              subject,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : n
      );
      setNotes(updated);
      saveStoredNotes(updated);
    } else {
      const newNote: NoteItem = {
        id: 'note-' + Date.now(),
        title: title.trim(),
        content: content.trim(),
        subject,
        className: 'Class 10',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        color: 'emerald',
      };
      const updated = [newNote, ...notes];
      setNotes(updated);
      saveStoredNotes(updated);
    }

    // Reset form
    setTitle('');
    setContent('');
    setEditingId(null);
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveStoredNotes(updated);
  };

  const handleStartEdit = (note: NoteItem) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject);
    setIsEditing(true);
  };

  const filteredNotes = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-800/80 text-lime-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-lime-400" />
            <span>ব্যক্তিগত পড়ার নোটবুক</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'স্টাডি নোটস ও সারসংক্ষেপ' : 'Personal Study Notes'}
          </h2>
          <p className="text-xs text-emerald-200/80">
            ক্লাসের গুরুত্বপূর্ণ পয়েন্ট, সূত্রের নোট ও রিভিশন সারমর্ম নিরাপদে সংরক্ষণ করুন
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setContent('');
            setIsEditing(!isEditing);
          }}
          className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isEditing ? 'ফর্ম বন্ধ করুন' : 'নতুন নোট লিখুন'}</span>
        </button>
      </div>

      {/* Note Editor Form */}
      {isEditing && (
        <form
          onSubmit={handleSaveNote}
          className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'নোট সম্পাদনা করুন' : 'নতুন স্টাডি নোট তৈরি করুন'}
            </h4>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              বাতিল ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                শিরোনাম (Title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: গতিবিদ্যার সমীকরণসমূহ..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                বিষয় (Subject)
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'সাধারণ গণিত', 'উচ্চতর গণিত', 'ইংরেজি', 'বাংলা', 'সাধারণ বিষয়'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              নোটের বিস্তারিত বিষয়বস্তু
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="এখানে নোট লিখুন..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নোটের শিরোনাম বা বিষয় অনুসন্ধান করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-500 shrink-0">
          মোট {filteredNotes.length}টি নোট
        </span>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {note.subject}
                </span>
                <span className="text-[10px] text-slate-400">
                  আপডেট: {note.updatedAt}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {note.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap line-clamp-4">
                {note.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleStartEdit(note)}
                className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="নোট সম্পাদনা"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteNote(note.id)}
                className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="নোট মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
