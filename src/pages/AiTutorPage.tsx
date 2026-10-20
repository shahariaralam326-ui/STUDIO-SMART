import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, Language } from '../types/index.ts';
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  BookOpen,
  Calculator,
  Atom,
  HelpCircle,
  RefreshCw,
  User,
  AlertCircle,
} from 'lucide-react';

interface AiTutorPageProps {
  profile: StudentProfile;
  language: Language;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const AiTutorPage: React.FC<AiTutorPageProps> = ({ profile, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      content: language === 'bn'
        ? `আসসালামু আলাইকুম ${profile.name}! আমি তোমার "Studio Smart AI Tutor"।\nতোমার ${profile.className}-এর গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান বা যেকোনো বিষয় নিয়ে প্রশ্ন করতে পারো। এসো ধাপে ধাপে শিখি!`
        : `Hello ${profile.name}! I am your "Studio Smart AI Tutor".\nAsk any question from your ${profile.className} curriculum in Math, Physics, Chemistry, Biology, or Grammar. Let's learn step-by-step!`,
      timestamp: 'এখন',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('সকল বিষয়');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.slice(-4),
          className: profile.className,
          subject: selectedSubject,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('সার্ভারে সংযোগে সমস্যা হয়েছে');
      }

      const data = await res.json();
      const modelMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        role: 'model',
        content: data.reply || 'উত্তর পাওয়া যায়নি। অনুগ্রহ করে আবার প্রশ্ন করুন।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorNotice('এআই শিক্ষকের সাথে সংযোগে সাময়িক সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-reset',
        role: 'model',
        content: language === 'bn' ? 'চ্যাট ইতিহাস পরিষ্কার করা হয়েছে। নতুন প্রশ্ন করুন।' : 'Chat cleared. Ask a new question.',
        timestamp: 'এখন',
      },
    ]);
  };

  const suggestedPrompts = [
    { label: 'নিউটনের গতির দ্বিতীয় সূত্র ব্যাখ্যা করো', subject: 'পদার্থবিজ্ঞান' },
    { label: 'সোডিয়াম ক্লোরাইডের বন্ধন গঠন বুঝিয়ে দাও', subject: 'রসায়ন' },
    { label: 'পিথাগোরাসের উপপাদ্য কীভাবে প্রমাণ করতে হয়?', subject: 'গণিত' },
    { label: 'Right form of verbs এর প্রধান নিয়মগুলো কী?', subject: 'ইংরেজি' },
  ];

  const subjects = ['সকল বিষয়', 'গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ইংরেজি', 'বাংলা', 'আইসিটি'];

  return (
    <div className="space-y-4 pb-12 max-w-5xl mx-auto">
      {/* AI Tutor Header Banner — Violet Accented Theme */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-800/60 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-800/60 text-violet-300 text-xs font-semibold border border-violet-600/50">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>গুগল জেমিনি এআই চালিত ব্যক্তিগত একাডেমিক মেন্টর</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'bn' ? 'Studio Smart এআই টিউটর' : 'Studio Smart AI Academic Mentor'}
          </h2>
          <p className="text-xs text-slate-300">
            {profile.className} ({profile.medium === 'bangla' ? 'বাংলা মাধ্যম' : 'English Medium'}) পাঠ্যসূচির সাথে সংগতিপূর্ণ
          </p>
        </div>

        {/* Subject Filter Pills & Clear Chat */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-800 border border-violet-700/60 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            title="চ্যাট হিস্ট্রি মুছুন"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompts Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-semibold shrink-0">পরামর্শ:</span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p.label)}
            className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                  isUser
                    ? 'bg-lime-500 text-emerald-950'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {msg.content}
                <span
                  className={`block text-[10px] mt-1.5 text-right ${
                    isUser ? 'text-emerald-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-none text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              <span>এআই শিক্ষক আপনার উত্তর প্রস্তুত করছেন...</span>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {errorNotice && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorNotice}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-sm flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={
            language === 'bn'
              ? 'এখানে আপনার পাঠ্যবই বা পড়াশোনার প্রশ্ন লিখুন (যেমন: সালোকসংশ্লেষণ কী?)...'
              : 'Ask an academic question from your syllabus...'
          }
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            inputMessage.trim() && !isLoading
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>পাঠান</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
