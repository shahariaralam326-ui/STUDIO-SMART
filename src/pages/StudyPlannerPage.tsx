import React, { useState } from 'react';
import { StudentProfile, PlannerTask, Language } from '../types/index.ts';
import { getStoredTasks, saveStoredTasks } from '../utils/storage.ts';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface StudyPlannerPageProps {
  profile: StudentProfile;
  language: Language;
}

export const StudyPlannerPage: React.FC<StudyPlannerPageProps> = ({ profile, language }) => {
  const [tasks, setTasks] = useState<PlannerTask[]>(getStoredTasks());
  const [selectedDay, setSelectedDay] = useState<PlannerTask['day']>('Saturday');

  // Form modal state for adding custom task
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskSubject, setTaskSubject] = useState<string>('পদার্থবিজ্ঞান');
  const [taskTimeSlot, setTaskTimeSlot] = useState<string>('০৭:০০ PM - ০৮:৩০ PM');
  const [taskDuration, setTaskDuration] = useState<number>(90);
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('high');

  const daysList: Array<{ id: PlannerTask['day']; labelBn: string; labelEn: string }> = [
    { id: 'Saturday', labelBn: 'শনিবার', labelEn: 'Saturday' },
    { id: 'Sunday', labelBn: 'রবিবার', labelEn: 'Sunday' },
    { id: 'Monday', labelBn: 'সোমবার', labelEn: 'Monday' },
    { id: 'Tuesday', labelBn: 'মঙ্গলবার', labelEn: 'Tuesday' },
    { id: 'Wednesday', labelBn: 'বুধবার', labelEn: 'Wednesday' },
    { id: 'Thursday', labelBn: 'বৃহস্পতিবার', labelEn: 'Thursday' },
    { id: 'Friday', labelBn: 'শুক্রবার', labelEn: 'Friday' },
  ];

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: PlannerTask = {
      id: 'task-' + Date.now(),
      title: taskTitle.trim(),
      subject: taskSubject,
      day: selectedDay,
      timeSlot: taskTimeSlot,
      durationMinutes: Number(taskDuration),
      isCompleted: false,
      priority: taskPriority,
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveStoredTasks(updated);

    setTaskTitle('');
    setShowAddForm(false);
  };

  const handleGenerateSmartRoutine = () => {
    // Generates an optimized personalized routine prioritizing weak subjects
    const weakList = profile.weakSubjects.length > 0 ? profile.weakSubjects : ['ইংরেজি', 'রসায়ন'];
    const favList = profile.favoriteSubjects.length > 0 ? profile.favoriteSubjects : ['পদার্থবিজ্ঞান', 'গণিত'];

    const smartGenerated: PlannerTask[] = [
      {
        id: 'smart-1',
        title: `দুর্বল বিষয় অগ্রাধিকার: ${weakList[0]} ব্যাকরণ ও সূত্র রিভিশন`,
        subject: weakList[0],
        day: selectedDay,
        timeSlot: '০৬:৩০ PM - ০৭:৪৫ PM',
        durationMinutes: 75,
        isCompleted: false,
        priority: 'high',
      },
      {
        id: 'smart-2',
        title: `অনুশীলন পর্ব: ${favList[0]} বোর্ড প্রশ্ন সমাধান`,
        subject: favList[0],
        day: selectedDay,
        timeSlot: '০৮:০০ PM - ০৯:১৫ PM',
        durationMinutes: 75,
        isCompleted: false,
        priority: 'medium',
      },
      {
        id: 'smart-3',
        title: `দৈনিক মূল্যায়ন: আজকের পড়া অধ্যায়ের ৫টি MCQ কুইজ`,
        subject: 'নৈর্ব্যক্তিক টেস্ট',
        day: selectedDay,
        timeSlot: '০৯:৩০ PM - ১০:০০ PM',
        durationMinutes: 30,
        isCompleted: false,
        priority: 'high',
      },
    ];

    const updated = [...smartGenerated, ...tasks.filter((t) => t.day !== selectedDay)];
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const filteredTasks = tasks.filter((t) => t.day === selectedDay);
  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Planner Header Banner — Orange Accented Theme */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 border border-orange-800/60 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-800/60 text-orange-300 text-xs font-semibold border border-orange-600/50">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>দৈনিক ও সাপ্তাহিক স্টাডি শিডিউলার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'ব্যক্তিগত পড়ার রুটিন ও প্ল্যানার' : 'Smart Personalized Study Planner'}
          </h2>
          <p className="text-xs text-slate-300">
            {profile.name} · {profile.className} · দৈনিক পড়ার লক্ষ্য: {profile.dailyStudyHours} ঘণ্টা
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerateSmartRoutine}
            className="px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'স্মার্ট রুটিন জেনারেটর' : 'Smart Routine'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন টাস্ক</span>
          </button>
        </div>
      </div>

      {/* Days Tabs (Saturday to Friday) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 sm:pb-0">
          {daysList.map((d) => {
            const countForDay = tasks.filter((t) => t.day === d.id).length;
            const isSelected = selectedDay === d.id;

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDay(d.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-center ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{language === 'bn' ? d.labelBn : d.labelEn}</span>
                {countForDay > 0 && (
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-lime-400 text-emerald-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {countForDay}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Task Form Modal / Inline Section */}
      {showAddForm && (
        <form
          onSubmit={handleAddTask}
          className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-5 sm:p-6 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? `${selectedDay}-এর জন্য নতুন পড়ার টাস্ক যোগ করুন` : `Add Task for ${selectedDay}`}
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              বন্ধ করুন ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                টাস্কের বিবরণ বা অধ্যায়ের নাম
              </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="যেমন: গণিত ত্রিকোণমিতি অধ্যায় ৯.১ এর ১-১০ নম্বর অংক..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                বিষয় (Subject)
              </label>
              <select
                value={taskSubject}
                onChange={(e) => setTaskSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'সাধারণ গণিত', 'উচ্চতর গণিত', 'ইংরেজি', 'বাংলা', 'আইসিটি'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                সময়সূচি (Time Slot)
              </label>
              <input
                type="text"
                value={taskTimeSlot}
                onChange={(e) => setTaskTimeSlot(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                সময়কাল (মিনিট)
              </label>
              <input
                type="number"
                value={taskDuration}
                onChange={(e) => setTaskDuration(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                অগ্রাধিকার (Priority)
              </label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="high">উচ্চ অগ্রাধিকার (High)</option>
                <option value="medium">মধ্যম (Medium)</option>
                <option value="low">সাধারণ (Low)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
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

      {/* Tasks List for the Selected Day */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {daysList.find((d) => d.id === selectedDay)?.labelBn}-এর স্টাডি রুটিন
            </h4>
            <span className="text-xs text-slate-500">
              ({completedCount}/{filteredTasks.length} সম্পন্ন)
            </span>
          </div>

          {filteredTasks.length > 0 && (
            <div className="text-xs text-emerald-600 font-semibold font-mono">
              {Math.round((completedCount / filteredTasks.length) * 100)}% কমপ্লিট
            </div>
          )}
        </div>

        <div className="space-y-3">
          {filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                t.isCompleted
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleTask(t.id)}
                  className="mt-0.5 text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform cursor-pointer"
                >
                  {t.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      {t.subject}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      t.priority === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {t.priority === 'high' ? 'জরুরি' : 'নিয়মিত'}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm font-semibold text-slate-900 dark:text-white ${t.isCompleted ? 'line-through text-slate-400' : ''}`}>
                    {t.title}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{t.timeSlot}</span>
                    </span>
                    <span>·</span>
                    <span>{t.durationMinutes} মিনিট</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteTask(t.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="টাস্ক মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-slate-300" />
              <p>এই দিনের জন্য কোনো পড়ার টাস্ক যুক্ত নেই।</p>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="text-emerald-600 font-bold hover:underline"
              >
                + নতুন টাস্ক যোগ করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
