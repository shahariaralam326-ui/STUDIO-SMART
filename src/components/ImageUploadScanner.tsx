import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, AlertTriangle, CheckCircle2, Scan, ArrowRight, XCircle, Sparkles } from 'lucide-react';
import { SAMPLE_RESULT_CARDS, TEST_NON_RESULT_IMAGE } from '../data/sampleResultCards.ts';

interface ExtractedData {
  gpa?: number | null;
  examYear?: string | null;
  board?: string | null;
  group?: 'science' | 'humanities' | 'business' | null;
  groupBn?: string | null;
  studentName?: string | null;
  rollNo?: string | null;
  regNo?: string | null;
  subjects?: Array<{ subjectName: string; grade: string }>;
}

interface ImageUploadScannerProps {
  onConfirmData: (data: {
    gpa: string;
    group: 'science' | 'humanities' | 'business';
    board: string;
    year: string;
  }) => void;
  onSwitchToManual: () => void;
  geminiConfigured: boolean | null;
}

export const ImageUploadScanner: React.FC<ImageUploadScannerProps> = ({
  onConfirmData,
  onSwitchToManual,
  geminiConfigured,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStatusText, setScanStatusText] = useState<string>('');
  const [isNotResultCard, setIsNotResultCard] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Extracted data state for user confirmation and editing
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [editGpa, setEditGpa] = useState<string>('');
  const [editGroup, setEditGroup] = useState<'science' | 'humanities' | 'business'>('science');
  const [editBoard, setEditBoard] = useState<string>('dhaka');
  const [editYear, setEditYear] = useState<string>('2026');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('অনুগ্রহ করে শুধুমাত্র একটি ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setImageName(file.name);
      setExtracted(null);
      setIsNotResultCard(false);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleResetImage = () => {
    setImagePreview(null);
    setImageName('');
    setExtracted(null);
    setIsNotResultCard(false);
    setErrorMessage(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startScan = async (imgData = imagePreview) => {
    if (!imgData) return;

    setIsScanning(true);
    setIsNotResultCard(false);
    setErrorMessage(null);
    setExtracted(null);

    setScanStatusText('রেজাল্ট শিটের ধরন ও বিন্যাস পরীক্ষা করা হচ্ছে...');

    try {
      // Step status progression
      const statusTimer = setTimeout(() => {
        setScanStatusText('জিপিএ ও বিষয়ভিত্তিক গ্রেড বিশ্লেষণ করা হচ্ছে...');
      }, 1000);

      const res = await fetch('/api/analyze-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imgData,
          mimeType: imgData.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
        }),
      });

      clearTimeout(statusTimer);

      if (!res.ok) {
        throw new Error('সার্ভারে সংযোগে সমস্যা হয়েছে।');
      }

      const result = await res.json();

      // Check if API key was missing
      if (result.error === 'NO_API_KEY') {
        // Fallback for offline exhibition demonstration
        // If image was one of our samples, detect and populate data gracefully
        const matchedSample = SAMPLE_RESULT_CARDS.find((s) => s.dataUrl === imgData);
        if (matchedSample) {
          setTimeout(() => {
            setIsScanning(false);
            setExtracted({
              gpa: matchedSample.gpa,
              examYear: matchedSample.examYear,
              board: matchedSample.board,
              group: matchedSample.group as any,
              studentName: 'প্রদর্শনী ডেমো পরীক্ষার্থী',
              subjects: [
                { subjectName: 'Bangla', grade: 'A+' },
                { subjectName: 'English', grade: 'A+' },
                { subjectName: 'Mathematics', grade: 'A+' },
                { subjectName: 'Higher Math', grade: 'A+' },
              ],
            });
            setEditGpa(matchedSample.gpa.toFixed(2));
            setEditGroup(matchedSample.group as any);
            setEditBoard(matchedSample.board);
            setEditYear(matchedSample.examYear);
          }, 1400);
          return;
        }

        if (imgData === TEST_NON_RESULT_IMAGE.dataUrl) {
          setTimeout(() => {
            setIsScanning(false);
            setIsNotResultCard(true);
          }, 1200);
          return;
        }

        setIsScanning(false);
        setErrorMessage(
          'Gemini API কী কনফিগার করা নেই। প্রদর্শনীতে পরীক্ষা করার জন্য নিচের "নমুনা রেজাল্ট শিট" ব্যবহার করুন অথবা সরাসরি GPA নিজে লিখুন।'
        );
        return;
      }

      // Check if plausible result card
      if (!result.isResultCard) {
        setIsScanning(false);
        setIsNotResultCard(true);
        return;
      }

      // Valid result card found!
      setIsScanning(false);
      const data: ExtractedData = result.data || {};
      setExtracted(data);

      const parsedGpa = data.gpa ? Number(data.gpa).toFixed(2) : '5.00';
      setEditGpa(parsedGpa);
      if (data.group && ['science', 'humanities', 'business'].includes(data.group)) {
        setEditGroup(data.group);
      }
      if (data.board) {
        setEditBoard(data.board.toLowerCase());
      }
      if (data.examYear) {
        setEditYear(data.examYear);
      }
    } catch (err: any) {
      console.error(err);
      setIsScanning(false);
      setErrorMessage('ছবি বিশ্লেষণে ত্রুটি হয়েছে। আপনি সরাসরি GPA লিখে এগিয়ে যেতে পারেন।');
    }
  };

  const loadSample = (sample: typeof SAMPLE_RESULT_CARDS[0]) => {
    setImagePreview(sample.dataUrl);
    setImageName(sample.titleEn);
    setIsNotResultCard(false);
    setErrorMessage(null);
    setExtracted(null);
    startScan(sample.dataUrl);
  };

  const loadNonResultTest = () => {
    setImagePreview(TEST_NON_RESULT_IMAGE.dataUrl);
    setImageName('Landscape_Nature_Photo.jpg');
    setIsNotResultCard(false);
    setErrorMessage(null);
    setExtracted(null);
    startScan(TEST_NON_RESULT_IMAGE.dataUrl);
  };

  return (
    <div className="space-y-6">
      {/* Upload Panel Header */}
      <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-emerald-100">
            রেজাল্ট শিটের ছবি বা স্ক্রিনশট আপলোড করুন (ঐচ্ছিক)
          </h3>
          <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed">
            ছবি দিলে AI আপনার রেজাল্টের তথ্য পড়ার চেষ্টা করবে। ভালো আলোতে তোলা পরিষ্কার ছবি দিলে সুবিধা হবে।
          </p>
        </div>

        {/* Dropzone & Preview Area */}
        {!imagePreview ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-700/80 hover:border-emerald-400 bg-emerald-900/20 hover:bg-emerald-900/30 rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors max-w-xl mx-auto"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
              <Upload className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-emerald-100 mb-1">
              রেজাল্ট শিট আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন
            </p>
            <p className="text-xs text-emerald-400/80">
              JPG, PNG, WebP ফরম্যাট সমর্থিত (সর্বোচ্চ ১০ মেগাবাইট)
            </p>
          </div>
        ) : (
          /* Image Preview and Scan Stage */
          <div className="max-w-xl mx-auto space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-emerald-700/80 bg-black/40 shadow-2xl max-h-[380px] flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Uploaded result sheet"
                className="max-h-[380px] w-auto object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Animated Emerald Green Laser Scan Effect */}
              {isScanning && (
                <>
                  <div className="animate-scan-line" />
                  <div className="absolute inset-0 scan-overlay-glow pointer-events-none" />
                </>
              )}
            </div>

            {/* Scanning Status Badge */}
            {isScanning && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-600 rounded-lg text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-semibold text-sm">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{scanStatusText}</span>
                </div>
                <p className="text-emerald-400/70 text-[11px]">
                  সবুজ অ্যানিমেশনটি একটি ভিজ্যুয়াল প্রসেসিং এফেক্ট, এটি রেজাল্টের অফিসিয়াল প্রমাণ নয়।
                </p>
              </div>
            )}

            {/* Action Buttons for Preview */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetImage}
                  disabled={isScanning}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-200 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ছবি মুছুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>অন্য ছবি দিন</span>
                </button>
              </div>

              {!isScanning && !extracted && !isNotResultCard && (
                <button
                  type="button"
                  onClick={() => startScan()}
                  className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer"
                >
                  <Scan className="w-4 h-4" />
                  <span>AI স্ক্যান শুরু করুন</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Exhibition Quick Sample Buttons */}
        <div className="mt-8 pt-6 border-t border-emerald-900/60">
          <p className="text-xs font-semibold text-emerald-300 mb-2.5 text-center sm:text-left">
            বিজ্ঞান প্রদর্শনীতে তাৎক্ষণিক পরীক্ষার জন্য ডেমো ছবি (নমুনা তথ্য):
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {SAMPLE_RESULT_CARDS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSample(sample)}
                disabled={isScanning}
                className="px-3 py-1.5 text-xs bg-emerald-900/50 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>{sample.titleBn}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={loadNonResultTest}
              disabled={isScanning}
              className="px-3 py-1.5 text-xs bg-amber-950/50 hover:bg-amber-900/80 border border-amber-700/60 text-amber-200 rounded-lg transition-colors flex items-center gap-1.5"
              title="পরীক্ষা করুন এআই কীভাবে রেজাল্ট কার্ড নয় এমন ছবি শনাক্ত করে"
            >
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>{TEST_NON_RESULT_IMAGE.titleBn}</span>
            </button>
          </div>
        </div>

        {/* Not a Result Card Rejection Display (Mandatory requirement) */}
        {isNotResultCard && (
          <div className="mt-6 p-4 sm:p-5 bg-rose-950/70 border-2 border-rose-600/80 rounded-xl space-y-2 text-center max-w-xl mx-auto shadow-lg">
            <div className="flex items-center justify-center gap-2 text-rose-300 font-bold text-base sm:text-lg">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>It's not a result card.</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200 font-medium leading-relaxed">
              এটি রেজাল্ট কার্ড বলে মনে হচ্ছে না। অনুগ্রহ করে রেজাল্ট শিটের পরিষ্কার ছবি দিন অথবা GPA নিজে লিখুন।
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onSwitchToManual}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow transition-colors"
              >
                <span>নিজে GPA লিখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-amber-950/60 border border-amber-700/80 rounded-xl text-amber-200 text-xs sm:text-sm max-w-xl mx-auto flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <button
                type="button"
                onClick={onSwitchToManual}
                className="text-emerald-300 hover:underline font-bold"
              >
                সরাসরি নিজে GPA লিখে এগিয়ে যান →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation & Editing Screen for Extracted Values */}
      {extracted && (
        <div className="bg-emerald-950/80 border-2 border-emerald-500/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>রেজাল্ট শিটের তথ্য যাচাই ও সম্পাদনা</span>
              </div>
              <p className="text-xs text-emerald-300/80 mt-1">
                ছবি থেকে পড়া তথ্য নিচে তুলে ধরা হলো। কোনো তথ্য অস্পষ্ট বা সংশোধনের প্রয়োজন হলে অনুগ্রহ করে ঠিক করে নিন।
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 bg-emerald-900 px-2.5 py-1 rounded border border-emerald-700/80 shrink-0">
              ব্যবহারকারী যাচাইকরণ
            </span>
          </div>

          {/* Form Fields for User Confirmation & Editing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                শনাক্তকৃত GPA (সম্পাদনাযোগ্য)
              </label>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="5.00"
                value={editGpa}
                onChange={(e) => setEditGpa(e.target.value)}
                className="w-full text-lg font-bold px-3 py-2 bg-emerald-900/60 border border-emerald-600 rounded-lg text-white tabular-nums focus:outline-none focus:border-emerald-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                বিভাগ / গ্রুপ
              </label>
              <select
                value={editGroup}
                onChange={(e) => setEditGroup(e.target.value as any)}
                className="w-full text-sm font-semibold px-3 py-2.5 bg-emerald-900/60 border border-emerald-600 rounded-lg text-white focus:outline-none"
              >
                <option value="science">বিজ্ঞান (Science)</option>
                <option value="humanities">মানবিক (Humanities)</option>
                <option value="business">ব্যবসায় শিক্ষা (Business)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                শিক্ষা বোর্ড
              </label>
              <input
                type="text"
                value={editBoard}
                onChange={(e) => setEditBoard(e.target.value)}
                className="w-full text-sm font-semibold px-3 py-2.5 bg-emerald-900/60 border border-emerald-600 rounded-lg text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                পরীক্ষার সন
              </label>
              <input
                type="text"
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
                className="w-full text-sm font-semibold px-3 py-2.5 bg-emerald-900/60 border border-emerald-600 rounded-lg text-white focus:outline-none tabular-nums"
              />
            </div>
          </div>

          {/* Extracted Subject Breakdown if available */}
          {extracted.subjects && extracted.subjects.length > 0 && (
            <div className="bg-emerald-900/40 rounded-xl p-4 border border-emerald-800/80">
              <span className="text-xs font-bold text-emerald-200 block mb-2">
                পঠিত বিষয়ভিত্তিক গ্রেড:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
                {extracted.subjects.map((sub, idx) => (
                  <div key={idx} className="bg-emerald-950/70 p-2 rounded border border-emerald-800/60 flex items-center justify-between">
                    <span className="truncate mr-1 text-emerald-200">{sub.subjectName}</span>
                    <span className="font-bold text-emerald-400">{sub.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clear Disclaimer (Mandatory Requirement) */}
          <div className="text-[11px] text-emerald-400/80 leading-relaxed bg-emerald-950/60 p-3 rounded-lg border border-emerald-800/60">
            <strong>সতর্কবার্তা ও নিয়মাবলী:</strong> এটি কোনো অফিশিয়ালি প্রত্যয়িত সনদ নয়। এআই স্ক্যান কেবল সহায়তার জন্য ব্যবহৃত হয়েছে। একাদশ শ্রেণিতে ভর্তি প্রক্রিয়ায় শিক্ষা বোর্ডের মূল ডেটাবেসের তথ্যই একমাত্র গ্রহণযোগ্য বিবেচিত হবে।
          </div>

          {/* Confirm and Proceed Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onSwitchToManual}
              className="px-4 py-2 text-xs font-medium text-emerald-300 hover:text-white transition-colors"
            >
              ম্যানুয়াল ফর্মে ফিরুন
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmData({
                  gpa: editGpa || '5.00',
                  group: editGroup,
                  board: editBoard,
                  year: editYear,
                });
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>তথ্য নিশ্চিত করে কলেজ তালিকা দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
