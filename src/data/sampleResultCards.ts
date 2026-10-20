// Sample marksheet cards for instant science exhibition demonstrations

// Helper function to create an SVG data URL for an authentic-looking Bangladesh SSC marksheet
export function createSampleMarksheetSvg(params: {
  board: string;
  year: string;
  name: string;
  roll: string;
  reg: string;
  group: string;
  gpa: string;
  subjects: Array<{ name: string; grade: string; gp: string }>;
}): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="820" viewBox="0 0 640 820" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <rect width="640" height="820" fill="#fcfdfd" />
    <rect x="18" y="18" width="604" height="784" fill="none" stroke="#047857" stroke-width="3" />
    <rect x="24" y="24" width="592" height="772" fill="none" stroke="#065f46" stroke-width="1" stroke-dasharray="4,4" />
    
    <!-- Watermark / Crest -->
    <circle cx="320" cy="180" r="42" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
    <text x="320" y="175" text-anchor="middle" font-size="11" font-weight="bold" fill="#047857">BOARD OF INTERMEDIATE &amp; SECONDARY EDUCATION</text>
    <text x="320" y="192" text-anchor="middle" font-size="13" font-weight="bold" fill="#065f46">${params.board.toUpperCase()} BANGLADESH</text>
    
    <text x="320" y="90" text-anchor="middle" font-size="18" font-weight="bold" fill="#064e3b">BOARD OF INTERMEDIATE AND SECONDARY EDUCATION, ${params.board.toUpperCase()}</text>
    <text x="320" y="112" text-anchor="middle" font-size="14" font-weight="600" fill="#047857">SECONDARY SCHOOL CERTIFICATE EXAMINATION - ${params.year}</text>
    <text x="320" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#b45309">ACADEMIC TRANSCRIPT / RESULT SHEET (EXHIBITION DEMO)</text>

    <!-- Student Info Table -->
    <rect x="40" y="228" width="560" height="92" fill="#f0fdf4" stroke="#a7f3d0" rx="4" />
    <text x="55" y="250" font-size="12" font-weight="bold" fill="#065f46">Name of Student :</text>
    <text x="175" y="250" font-size="12" font-weight="bold" fill="#111827">${params.name}</text>
    
    <text x="55" y="272" font-size="12" fill="#374151">Roll No : <tspan font-weight="bold" fill="#111827">${params.roll}</tspan></text>
    <text x="260" y="272" font-size="12" fill="#374151">Reg No : <tspan font-weight="bold" fill="#111827">${params.reg}</tspan></text>
    <text x="440" y="272" font-size="12" fill="#374151">Year : <tspan font-weight="bold" fill="#111827">${params.year}</tspan></text>

    <text x="55" y="296" font-size="12" fill="#374151">Group : <tspan font-weight="bold" fill="#047857">${params.group}</tspan></text>
    <text x="260" y="296" font-size="12" fill="#374151">Type : <tspan font-weight="bold" fill="#111827">Regular</tspan></text>
    <text x="440" y="296" font-size="12" fill="#374151">Result : <tspan font-weight="bold" fill="#047857">PASSED</tspan></text>

    <!-- Subjects Header -->
    <rect x="40" y="336" width="560" height="26" fill="#065f46" rx="2" />
    <text x="55" y="353" font-size="11" font-weight="bold" fill="#ffffff">Sl</text>
    <text x="85" y="353" font-size="11" font-weight="bold" fill="#ffffff">Name of Subjects</text>
    <text x="440" y="353" font-size="11" font-weight="bold" fill="#ffffff">Letter Grade</text>
    <text x="530" y="353" font-size="11" font-weight="bold" fill="#ffffff">Grade Point</text>

    <!-- Subject Rows -->
    ${params.subjects
      .map(
        (s, idx) => `
      <rect x="40" y="${366 + idx * 24}" width="560" height="22" fill="${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}" />
      <text x="55" y="${381 + idx * 24}" font-size="11" fill="#4b5563">${idx + 1}</text>
      <text x="85" y="${381 + idx * 24}" font-size="11" font-weight="500" fill="#1f2937">${s.name}</text>
      <text x="460" y="${381 + idx * 24}" font-size="11" font-weight="bold" fill="#065f46">${s.grade}</text>
      <text x="548" y="${381 + idx * 24}" font-size="11" font-weight="bold" fill="#111827">${s.gp}</text>
      <line x1="40" y1="${388 + idx * 24}" x2="600" y2="${388 + idx * 24}" stroke="#e2e8f0" stroke-width="1" />
    `
      )
      .join('')}

    <!-- GPA Summary Box -->
    <rect x="40" y="650" width="560" height="65" fill="#ecfdf5" stroke="#059669" stroke-width="2" rx="4" />
    <text x="60" y="680" font-size="14" font-weight="bold" fill="#064e3b">Grade Point Average (GPA) :</text>
    <text x="320" y="688" font-size="28" font-weight="bold" fill="#047857">${params.gpa}</text>
    <text x="430" y="675" font-size="11" font-weight="600" fill="#059669">SCALE: 5.00</text>
    <text x="430" y="692" font-size="11" font-weight="bold" fill="#047857">STATUS: PASSED</text>

    <!-- Footer Disclaimers -->
    <text x="55" y="738" font-size="9" fill="#64748b">Date of Publication: 2026-05-18 | Controller of Examinations, BISE</text>
    <text x="55" y="754" font-size="9" fill="#94a3b8">Note: This is an academic simulation format for exhibition demonstration purposes.</text>
    <text x="55" y="770" font-size="9" font-weight="bold" fill="#065f46">STUDIO SMART — SCIENCE EXHIBITION DEMO 2026</text>
  </svg>`;

  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Non-result card sample (e.g. landscape scenic SVG) to test rejection
export function createNonResultCardSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" style="background:#0f172a;">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="60%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#fed7aa" />
      </linearGradient>
      <linearGradient id="mountains" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#sky)" />
    <circle cx="480" cy="90" r="35" fill="#fef08a" opacity="0.9" />
    <polygon points="50,400 200,210 320,400" fill="url(#mountains)" />
    <polygon points="220,400 380,180 520,400" fill="#1e293b" />
    <polygon points="400,400 480,260 580,400" fill="#0f172a" />
    <rect y="360" width="600" height="40" fill="#15803d" />
    <text x="300" y="50" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">
      Scenic Nature Photograph (Not an Academic Result Card)
    </text>
    <text x="300" y="385" font-family="sans-serif" font-size="12" fill="#dcfce7" text-anchor="middle">
      Exhibition Test Image: Demonstrates AI detection of non-result photos
    </text>
  </svg>`;

  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Preset verified sample result cards
export const SAMPLE_RESULT_CARDS = [
  {
    id: 'sample_golden_science',
    titleBn: 'নমুনা ১: গোল্ডেন জিপিএ ৫.০০ — বিজ্ঞান (ঢাকা)',
    titleEn: 'Sample 1: Golden GPA 5.00 - Science (Dhaka)',
    descriptionBn: 'বিজ্ঞান বিভাগে সকল বিষয়ে A+ সহ গোল্ডেন ৫.০০ রেজাল্ট শিট',
    gpa: 5.0,
    examYear: '2026',
    board: 'dhaka',
    boardBn: 'ঢাকা বোর্ড',
    group: 'science',
    groupBn: 'বিজ্ঞান (Science)',
    district: 'ঢাকা (Dhaka)',
    dataUrl: createSampleMarksheetSvg({
      board: 'Dhaka',
      year: '2026',
      name: 'MD. TANVIR HASAN',
      roll: '104829',
      reg: '1910482901',
      group: 'SCIENCE',
      gpa: '5.00',
      subjects: [
        { name: 'Bangla (101, 102)', grade: 'A+', gp: '5.00' },
        { name: 'English (107, 108)', grade: 'A+', gp: '5.00' },
        { name: 'Mathematics (109)', grade: 'A+', gp: '5.00' },
        { name: 'ICT (154)', grade: 'A+', gp: '5.00' },
        { name: 'Islam & Moral Education (111)', grade: 'A+', gp: '5.00' },
        { name: 'Physics (136)', grade: 'A+', gp: '5.00' },
        { name: 'Chemistry (137)', grade: 'A+', gp: '5.00' },
        { name: 'Biology (138)', grade: 'A+', gp: '5.00' },
        { name: 'Bangladesh & Global Studies (150)', grade: 'A+', gp: '5.00' },
        { name: 'Higher Mathematics (4th Subject - 126)', grade: 'A+', gp: '5.00' },
      ],
    }),
  },
  {
    id: 'sample_ctg_science',
    titleBn: 'নমুনা ২: জিপিএ ৪.৭৫ — বিজ্ঞান (চট্টগ্রাম)',
    titleEn: 'Sample 2: GPA 4.75 - Science (Chattogram)',
    descriptionBn: 'বিজ্ঞান বিভাগ, চট্টগ্রাম বোর্ড, জিপিএ ৪.৭৫ রেজাল্ট শিট',
    gpa: 4.75,
    examYear: '2026',
    board: 'chittagong',
    boardBn: 'চট্টগ্রাম বোর্ড',
    group: 'science',
    groupBn: 'বিজ্ঞান (Science)',
    district: 'চট্টগ্রাম (Chattogram)',
    dataUrl: createSampleMarksheetSvg({
      board: 'Chattogram',
      year: '2026',
      name: 'SADIA AFRIN',
      roll: '219482',
      reg: '1921948202',
      group: 'SCIENCE',
      gpa: '4.75',
      subjects: [
        { name: 'Bangla (101, 102)', grade: 'A', gp: '4.00' },
        { name: 'English (107, 108)', grade: 'A', gp: '4.00' },
        { name: 'Mathematics (109)', grade: 'A+', gp: '5.00' },
        { name: 'ICT (154)', grade: 'A+', gp: '5.00' },
        { name: 'Islam & Moral Education (111)', grade: 'A+', gp: '5.00' },
        { name: 'Physics (136)', grade: 'A+', gp: '5.00' },
        { name: 'Chemistry (137)', grade: 'A', gp: '4.00' },
        { name: 'Biology (138)', grade: 'A+', gp: '5.00' },
        { name: 'Bangladesh & Global Studies (150)', grade: 'A', gp: '4.00' },
        { name: 'Higher Mathematics (4th Subject - 126)', grade: 'A+', gp: '5.00' },
      ],
    }),
  },
  {
    id: 'sample_business_rajshahi',
    titleBn: 'নমুনা ৩: জিপিএ ৪.৫০ — ব্যবসায় শিক্ষা (রাজশাহী)',
    titleEn: 'Sample 3: GPA 4.50 - Business (Rajshahi)',
    descriptionBn: 'ব্যবসায় শিক্ষা বিভাগ, রাজশাহী বোর্ড, জিপিএ ৪.৫০ রেজাল্ট শিট',
    gpa: 4.5,
    examYear: '2026',
    board: 'rajshahi',
    boardBn: 'রাজশাহী বোর্ড',
    group: 'business',
    groupBn: 'ব্যবসায় শিক্ষা (Business)',
    district: 'রাজশাহী (Rajshahi)',
    dataUrl: createSampleMarksheetSvg({
      board: 'Rajshahi',
      year: '2026',
      name: 'RAKIBUL ISLAM',
      roll: '348102',
      reg: '1934810203',
      group: 'BUSINESS STUDIES',
      gpa: '4.50',
      subjects: [
        { name: 'Bangla (101, 102)', grade: 'A', gp: '4.00' },
        { name: 'English (107, 108)', grade: 'A-', gp: '3.50' },
        { name: 'Mathematics (109)', grade: 'A', gp: '4.00' },
        { name: 'ICT (154)', grade: 'A+', gp: '5.00' },
        { name: 'General Science (127)', grade: 'A', gp: '4.00' },
        { name: 'Accounting (146)', grade: 'A+', gp: '5.00' },
        { name: 'Business Entrepreneurship (143)', grade: 'A', gp: '4.00' },
        { name: 'Finance & Banking (152)', grade: 'A+', gp: '5.00' },
        { name: 'Islam & Moral Education (111)', grade: 'A', gp: '4.00' },
        { name: 'Agriculture (4th Subject - 134)', grade: 'A+', gp: '5.00' },
      ],
    }),
  },
];

// Test non-result card for exhibition verification
export const TEST_NON_RESULT_IMAGE = {
  titleBn: 'পরীক্ষামূলক: প্রাকৃতিক ছবি (অপ্রাসঙ্গিক ছবি)',
  titleEn: 'Test: Landscape Photo (Non-Result Card)',
  descriptionBn: 'এআই কীভাবে অপ্রাসঙ্গিক ছবি শনাক্ত করে তা যাচাই করার জন্য',
  dataUrl: createNonResultCardSvg(),
};
