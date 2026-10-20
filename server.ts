import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { COLLEGES_DATA } from './src/data/colleges.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);

// Initialize Gemini on server-side only
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();

  // Allow up to 20MB for base64 image uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    const ai = getGeminiClient();
    res.json({
      status: 'ok',
      geminiConfigured: !!ai,
      timestamp: new Date().toISOString(),
      app: 'Studio Smart — Science Exhibition Demo',
    });
  });

  // Result Image Recognition Endpoint
  app.post('/api/analyze-result', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg' } = req.body;

      if (!imageBase64) {
        res.status(400).json({
          success: false,
          error: 'MISSING_IMAGE',
          messageBn: 'কোনো ছবি প্রদান করা হয়নি। অনুগ্রহ করে একটি ছবি নির্বাচন করুন।',
        });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.json({
          success: false,
          error: 'NO_API_KEY',
          messageEn: 'Gemini API key is not configured on the server.',
          messageBn: 'Gemini API কী সার্ভারে কনফিগার করা নেই। কোনো সমস্যা নেই, আপনি সরাসরি নিজে GPA লিখে এগিয়ে যেতে পারেন অথবা প্রদর্শনী নমুনা তথ্য ব্যবহার করতে পারেন।',
        });
        return;
      }

      // Strip potential data URL prefix safely
      const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+.-]+;base64,/, '');
      const detectedMime = mimeType && mimeType.includes('png') ? 'image/png' : 'image/jpeg';

      const imagePart = {
        inlineData: {
          mimeType: detectedMime,
          data: cleanBase64,
        },
      };

      const promptText = `
You are an academic document analysis assistant specialized in Bangladesh Education Board Secondary School Certificate (SSC / Dakhil / Vocational) result sheets, marksheets, and academic transcripts.

TASK 1: Plausibility check.
Determine whether the uploaded image plausibly contains an academic result card, marksheet, transcript, or online result screen from Bangladesh (e.g., Education Board Bangladesh, Web Based Result Publication System, SSC marksheet, or school academic transcript).
If it is a generic photo (person, landscape, pet, car, receipt, meme, blank paper, unrelated document) and NOT an academic result card:
Return JSON:
{
  "isResultCard": false,
  "confidence": "high",
  "reason": "Image does not depict an academic result sheet or marksheet.",
  "messageEn": "It's not a result card.",
  "messageBn": "এটি রেজাল্ট কার্ড বলে মনে হচ্ছে না। অনুগ্রহ করে রেজাল্ট শিটের পরিষ্কার ছবি দিন অথবা GPA নিজে লিখুন。"
}

TASK 2: If it appears to contain a result card or marksheet:
Carefully inspect and extract ONLY readable information:
- GPA (Grade Point Average, e.g. 5.00, 4.89, 4.50. Between 1.00 and 5.00)
- Examination Year (e.g. 2026, 2025, 2024, 2023, 2022)
- Board (e.g. Dhaka, Chittagong, Rajshahi, Comilla, Barisal, Sylhet, Dinajpur, Jessore, Mymensingh, Madrasah, Technical)
- Group (e.g. Science, Humanities, Business Studies / বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা)
- Roll / Reg number if visible
- Subject grades (list of visible subjects and grades like A+, A, A-, B, C, D, F)

Never claim that the image is officially authenticated or genuine.
If any value is blurry or uncertain, indicate confidence and suggest manual confirmation.

Return STRICT JSON format:
{
  "isResultCard": true,
  "confidence": "high" | "medium" | "low",
  "extractedData": {
    "gpa": number | null,
    "examYear": string | null,
    "board": string | null,
    "group": "science" | "humanities" | "business" | null,
    "groupBn": string | null,
    "studentName": string | null,
    "rollNo": string | null,
    "regNo": string | null,
    "subjects": [
      { "subjectName": string, "grade": string }
    ]
  },
  "unclearFields": string[],
  "messageEn": "Result sheet analyzed. Please verify extracted data below.",
  "messageBn": "রেজাল্ট শিটের তথ্য পড়া হয়েছে। অনুগ্রহ করে নিচের তথ্যগুলো যাচাই করে নিশ্চিত করুন।"
}
`;

      const geminiImagePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [imagePart, { text: promptText }],
        },
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('GEMINI_IMAGE_TIMEOUT')), 12000)
      );

      const response: any = await Promise.race([geminiImagePromise, timeoutPromise]);

      const responseText = response.text || '{}';
      let parsed;
      try {
        parsed = JSON.parse(responseText.trim());
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON:', responseText);
        parsed = {
          isResultCard: false,
          messageEn: "It's not a result card.",
          messageBn: 'ছবিটি স্পষ্টভাবে পড়া সম্ভব হয়নি। অনুগ্রহ করে পরিষ্কার ছবি দিন অথবা GPA নিজে লিখুন।',
        };
      }

      if (!parsed.isResultCard) {
        res.json({
          success: true,
          isResultCard: false,
          messageEn: parsed.messageEn || "It's not a result card.",
          messageBn: parsed.messageBn || 'এটি রেজাল্ট কার্ড বলে মনে হচ্ছে না। অনুগ্রহ করে রেজাল্ট শিটের পরিষ্কার ছবি দিন অথবা GPA নিজে লিখুন।',
        });
        return;
      }

      res.json({
        success: true,
        isResultCard: true,
        data: parsed.extractedData,
        confidence: parsed.confidence || 'medium',
        unclearFields: parsed.unclearFields || [],
        messageEn: parsed.messageEn,
        messageBn: parsed.messageBn,
      });
    } catch (err: any) {
      console.warn('Error analyzing image:', err?.message || err);
      res.json({
        success: true,
        isResultCard: false,
        messageEn: "It's not a result card.",
        messageBn: 'এটি রেজাল্ট কার্ড বলে মনে হচ্ছে না। অনুগ্রহ করে রেজাল্ট শিটের পরিষ্কার ছবি দিন অথবা GPA নিজে লিখুন।',
      });
    }
  });

  // College Recommendation & Bengali Counseling Endpoint
  app.post('/api/recommend-colleges', async (req, res) => {
    try {
      const {
        gpa,
        group = 'science',
        board = 'dhaka',
        year = '2026',
        district = 'সমগ্র বাংলাদেশ (All)',
        collegeType = 'any',
      } = req.body;

      const numericGpa = parseFloat(gpa);
      if (isNaN(numericGpa) || numericGpa < 1.0 || numericGpa > 5.0) {
        res.status(400).json({
          success: false,
          error: 'INVALID_GPA',
          messageBn: 'সঠিক জিপিএ (১.০০ থেকে ৫.০০) প্রদান করুন।',
        });
        return;
      }

      // Filter verified colleges locally
      const filtered = COLLEGES_DATA.filter((college) => {
        // Group check
        if (!college.availableGroups.includes(group as any)) {
          return false;
        }

        // Min GPA check for this group
        const requiredGpa = college.minGPA[group as keyof typeof college.minGPA];
        if (requiredGpa !== undefined && numericGpa < requiredGpa) {
          return false;
        }

        // District filter
        if (district && !district.includes('সমগ্র বাংলাদেশ')) {
          const matchDistrict = district.split(' ')[0];
          if (!college.district.includes(matchDistrict)) {
            return false;
          }
        }

        // College type filter
        if (collegeType && collegeType !== 'any') {
          if (collegeType === 'government' && college.type !== 'government') return false;
          if (collegeType === 'private' && college.type !== 'private' && college.type !== 'semi-govt') return false;
        }

        return true;
      });

      // Sort by competitiveness (higher minGPA first)
      filtered.sort((a, b) => {
        const gpaA = a.minGPA[group as keyof typeof a.minGPA] || 0;
        const gpaB = b.minGPA[group as keyof typeof b.minGPA] || 0;
        return gpaB - gpaA;
      });

      // Prepare verified dynamic explanation according to prompt specification:
      // "এই প্রতিষ্ঠানটি আপনার পছন্দের জেলা, বিভাগ এবং যাচাই করা ভর্তি-যোগ্যতার সঙ্গে মেলে।"
      const formattedRecommendations = filtered.map((c) => {
        const reqGpa = c.minGPA[group as keyof typeof c.minGPA] || 3.0;
        const groupLabel = group === 'science' ? 'বিজ্ঞান বিভাগ' : group === 'humanities' ? 'মানবিক বিভাগ' : 'ব্যবসায় শিক্ষা বিভাগ';

        let dynamicExplanation = `এই প্রতিষ্ঠানটি আপনার পছন্দের জেলা (${c.district}), বিভাগ (${groupLabel}) এবং যাচাই করা ভর্তি-যোগ্যতার (ন্যূনতম জিপিএ ${reqGpa.toFixed(2)}) সঙ্গে মেলে। আপনার প্রাপ্ত জিপিএ ${numericGpa.toFixed(2)} অনুযায়ী আপনি এই প্রতিষ্ঠানে আবেদনের জন্য সম্পূর্ণ যোগ্য।`;

        return {
          ...c,
          matchExplanationBn: dynamicExplanation,
          verifiedStatus: 'যাচাইকৃত প্রতিষ্ঠান ও তথ্য',
        };
      });

      // If Gemini is available, generate authentic AI counseling commentary in Bengali
      const ai = getGeminiClient();
      let aiCounselingSummary: string | null = null;

      if (ai && formattedRecommendations.length > 0) {
        try {
          const collegeNames = formattedRecommendations.slice(0, 5).map((c) => c.nameBn).join(', ');
          const prompt = `
You are an expert Bangladesh Education Counselor at a science exhibition.
Student's Academic Profile:
- SSC GPA: ${numericGpa.toFixed(2)}
- Group: ${group === 'science' ? 'বিজ্ঞান' : group === 'humanities' ? 'মানবিক' : 'ব্যবসায় শিক্ষা'}
- Board: ${board}
- Exam Year: ${year}
- Preferred District: ${district}
- Matching Top Institutions: ${collegeNames}

Generate a concise, inspiring, 2-3 sentence counseling summary in polite and clear Bengali.
Guidelines:
1. Explain how the student's GPA fits these institutions.
2. Remind them to apply through the official XI Class Admission portal (xiclassadmission.gov.bd).
3. Do NOT invent fake cutoffs, fake seat numbers, or make false guarantees of admission.
`;
          // Timeout after 6 seconds so user UI is always instantaneous
          const geminiPromise = ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              temperature: 0.3,
            },
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 6000)
          );

          const aiResponse: any = await Promise.race([geminiPromise, timeoutPromise]);
          aiCounselingSummary = aiResponse?.text?.trim() || null;
        } catch (aiErr) {
          console.warn('Gemini counseling generation skipped or timed out, fallback to verified database:', aiErr);
        }
      }

      res.json({
        success: true,
        totalMatches: formattedRecommendations.length,
        colleges: formattedRecommendations,
        aiCounselingSummary,
        source: 'Verified Bangladesh XI Class Admission Criteria Database',
      });
    } catch (err: any) {
      console.error('Error recommending colleges:', err);
      res.status(500).json({
        success: false,
        error: 'SERVER_ERROR',
        messageBn: 'কলেজ সুপারিশ প্রক্রিয়াকরণে ত্রুটি হয়েছে।',
      });
    }
  });

  // AI Tutor Chat Endpoint
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const {
        message,
        history = [],
        className = 'Class 10',
        subject = 'General',
        language = 'bn',
      } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ success: false, error: 'MISSING_MESSAGE' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback demo response if no API key
        res.json({
          success: true,
          isOfflineFallback: true,
          reply: language === 'bn'
            ? `[ডেমো মোড] আপনি প্রশ্ন করেছেন: "${message}"। লাইভ এআই সক্রিয় করার জন্য সার্ভারে GEMINI_API_KEY কনফিগার থাকতে হবে। প্রদর্শনী ডেমোতে আপনি পাঠ্যবই লাইব্রেরি, কুইজ এবং স্টাডি প্ল্যানারের সকল ফিচার সরাসরি ব্যবহার করতে পারেন।`
            : `[Demo Mode] You asked: "${message}". Live AI requires a configured GEMINI_API_KEY. For this science exhibition demo, you can freely explore all NCTB books, quizzes, and study tools.`,
        });
        return;
      }

      const systemPrompt = `You are "Studio Smart AI Tutor", a warm, pedagogically rigorous, encouraging academic mentor for school students in Bangladesh following the NCTB curriculum.
Target Student Level: ${className}
Target Subject: ${subject}
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}
Style Rules:
1. Explain step-by-step with clear logical progression.
2. If mathematical or scientific equations are involved, write them clearly with explanation of symbols.
3. Be friendly and motivating ("চমৎকার প্রশ্ন!", "এসো ধাপে ধাপে সমাধান করি").
4. Keep explanations grounded in NCTB curriculum standards.
5. Never invent false facts or fake book chapters.`;

      const contents: any[] = [];
      // Include recent history (last 4 turns)
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-4)) {
          if (item.role === 'user' || item.role === 'model') {
            contents.push({
              role: item.role,
              parts: [{ text: item.content || '' }],
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const tutorPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.4,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TUTOR_TIMEOUT')), 10000)
      );

      const aiResponse: any = await Promise.race([tutorPromise, timeoutPromise]);
      const reply = aiResponse?.text?.trim() || 'দুঃখিত, উত্তর তৈরি করা যায়নি। আবার চেষ্টা করুন।';

      res.json({
        success: true,
        reply,
      });
    } catch (err: any) {
      console.error('AI Tutor error:', err);
      res.json({
        success: true,
        isOfflineFallback: true,
        reply: 'এআই সার্ভারে সাময়িক বিলম্ব হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় প্রশ্ন করুন।',
      });
    }
  });

  // AI Learning Tools & Explainer Endpoint
  app.post('/api/ai-explain', async (req, res) => {
    try {
      const {
        topic,
        mode = 'simple',
        className = 'Class 10',
        subject = 'General',
        language = 'bn',
      } = req.body;

      if (!topic) {
        res.status(400).json({ success: false, error: 'MISSING_TOPIC' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.json({
          success: true,
          isOfflineFallback: true,
          result: language === 'bn'
            ? `### ${topic} — বিষয় পরিচিতি (নমুনা ডেমো)\n\n• **মূল ধারণা:** এটি ${className}-এর ${subject} বিষয়ের একটি গুরুত্বপূর্ণ অধ্যায়।\n• **গুরুত্বপূর্ণ সূত্র/সংজ্ঞা:** বিস্তারিত জানার জন্য উপরের পাঠ্যবই বা কুইজ সেকশন দেখুন।\n\n*(লাইভ এআই জেনারেশনের জন্য সার্ভারে জেমিনি কী সংযুক্ত করা রয়েছে)*`
            : `### ${topic} — Overview (Sample Demo)\n\n• Key concept for ${className} ${subject}.\n• Check textbooks or quizzes for full interactive learning.`,
        });
        return;
      }

      let modeInstruction = '';
      if (mode === 'simple') {
        modeInstruction = 'Explain this topic in very simple everyday language with a relatable real-life analogy for school students.';
      } else if (mode === 'step-by-step') {
        modeInstruction = 'Provide a rigorous, numbered step-by-step breakdown of how this concept works.';
      } else if (mode === 'summary') {
        modeInstruction = 'Provide a high-yield exam revision summary with 5 key points and 2 critical definitions.';
      } else if (mode === 'math') {
        modeInstruction = 'Show the full mathematical derivation/solution, identifying every variable and unit.';
      } else if (mode === 'mcq') {
        modeInstruction = 'Generate 3 high-quality board-standard multiple-choice questions with 4 options each, indicating the correct answer and a brief explanation.';
      } else if (mode === 'notes') {
        modeInstruction = 'Create concise, beautifully structured revision notes with bullet points and common exam pitfalls to avoid.';
      }

      const prompt = `Topic: "${topic}"
Subject: ${subject} (${className})
Instruction: ${modeInstruction}
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}
Ensure clean Markdown formatting with clear headers, bold text, and bullet points.`;

      const explainPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.3,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('EXPLAIN_TIMEOUT')), 10000)
      );

      const aiResponse: any = await Promise.race([explainPromise, timeoutPromise]);
      const result = aiResponse?.text?.trim() || 'ব্যাখ্যা তৈরি করা যায়নি।';

      res.json({
        success: true,
        result,
      });
    } catch (err: any) {
      console.error('AI Explain error:', err);
      res.json({
        success: true,
        isOfflineFallback: true,
        result: 'এআই সংযোগে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
      });
    }
  });

  // Serve frontend: Vite middleware in dev, static build in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Studio Smart server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
