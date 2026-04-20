'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const ROUNDS = [
  { name: 'Round 1. Foundation Section', time: '50 min', focus: 'Numerical (26q), Reasoning (30q), Verbal (25q)', pass: 'Sectional cut-offs usually 60 percent per section; overall ~55 percent' },
  { name: 'Round 2. Advanced Section (for NQT Advanced)', time: '40 min', focus: 'Advanced quant + advanced programming logic', pass: 'Only candidates clearing Foundation + targeting product roles' },
  { name: 'Round 3. Coding Test', time: '45 min', focus: '2 problems. Easy: array/string. Medium: DP, graphs, or greedy', pass: 'Full / partial solution with passing test cases; partial credit counts' },
  { name: 'Round 4. Technical Interview', time: '25-40 min', focus: 'DSA walk-through, OS/DBMS/CN basics, 1 project deep-dive, 1 HR-tech blend', pass: 'Fundamentals + communication clarity. Do not memorise; reason aloud' },
  { name: 'Round 5. Managerial / HR', time: '15-25 min', focus: 'Behavioural, relocation, bond acceptance, salary clarity', pass: 'Show coachability, clarity on TCS bond (2 years), no red flags' },
];

const RESUME_SECTIONS = [
  { name: 'Header', note: 'Name · Phone · Email · LinkedIn · GitHub · City. No photo. No DOB (except if explicitly asked).' },
  { name: 'Career Objective', note: '2 lines. Name your target role (Systems Engineer / Digital Cadre / Ninja) + 1 strength. Skip if you can add a stronger Summary instead.' },
  { name: 'Education', note: 'Reverse chronological. Include CGPA + 10th + 12th percentages (TCS filters on 60 percent throughout). Include standing if top 10 percent.' },
  { name: 'Technical Skills', note: 'Grouped: Languages (C, C++, Java, Python), Web (HTML/CSS/JS, React), DB (MySQL, MongoDB), Tools (Git, VS Code, Docker basics), OS (Windows, Linux).' },
  { name: 'Projects', note: '2 to 3 projects. Each with 3 bullets using XYZ formula: Accomplished X as measured by Y by doing Z. Include GitHub link.' },
  { name: 'Internships / Training', note: 'If you have any (even 1 to 2 month Summer Training). Lists role, org, duration, 2 outcomes.' },
  { name: 'Certifications', note: 'NPTEL / Coursera / edX / freeCodeCamp. Name the course, issuing body, year. TCS values NPTEL especially.' },
  { name: 'Achievements & Extracurricular', note: 'Hackathons, college clubs, tech fest organiser, inter-college events. 3 to 5 items max.' },
  { name: 'Languages', note: 'English + regional. Only if space permits.' },
];

const KEYWORDS = ['C', 'C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'DBMS', 'SQL', 'MySQL', 'MongoDB', 'Operating Systems', 'Computer Networks', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'GitHub', 'REST API', 'OOP', 'Linux', 'Agile', 'Problem Solving', 'Debugging'];

const PROJECT_EXAMPLES = [
  { title: 'Library Management System (Java + MySQL)', bullets: ['Built a multi-user library system serving 5 user types (admin, librarian, student, faculty, guest) with JDBC-backed MySQL schema across 8 tables.', 'Implemented role-based login and book-issue flow handling 500+ books; reduced mock late-return conflicts by 82 percent in test scenarios.', 'Stack: Java 17, MySQL 8, JDBC, Swing UI. GitHub: github.com/you/lib-mgmt (2,400 lines).'] },
  { title: 'Portfolio Website with Blog (React + Node)', bullets: ['Shipped a personal portfolio + markdown blog serving 1,200 monthly visits within 3 months of launch; 92 Lighthouse score mobile.', 'Built REST API in Node.js / Express for blog CRUD; used MongoDB Atlas free tier. Deployed frontend on Vercel, backend on Render.', 'Stack: React 18, Node.js 20, Express, MongoDB, Tailwind. Live link + GitHub in footer.'] },
  { title: 'Smart Attendance System (Python + OpenCV)', bullets: ['Developed a face-recognition attendance system for a 60-student class using OpenCV + dlib; achieved 94 percent recognition accuracy under classroom lighting.', 'Logged attendance to a local SQLite DB with daily CSV export; reduced manual roll-call time from 6 minutes to 40 seconds.', 'Submitted as final-year minor project; won Best CSE Project award (1 of 42 teams).'] },
];

const DO_DONT = {
  do: [
    'Use single-column, black-on-white layout. TCS iON parser (used for screening) is strict.',
    'Keep file name: FirstName_LastName_TCSNQT.pdf',
    'Keep to 1 page. Freshers almost never need 2.',
    'Match technical skills spelling exactly as in the JD (C++ not CPP, Node.js not NodeJS).',
    'Include both 10th and 12th percentages (TCS cut-off: 60 percent throughout).',
    'Show at least 2 projects with working GitHub links.',
  ],
  dont: [
    'Add a photo, passport number, marital status, or father\'s name.',
    'Use templates with 2 columns, graphics, or skill bars.',
    'Write "Expert in" next to any skill. Interviewer will grill you.',
    'Include Objective that says "seeking a challenging role". Recruiters skip it.',
    'List every college seminar as a certification.',
    'Use fancy fonts. Stick to Calibri, Arial, or Inter at 10 to 11pt.',
  ],
};

const TIMELINE = [
  { when: 'Aug - Sep 2026', what: 'TCS NQT 2026 registration opens (tcsion portal). Aadhaar linking required. Fill profile carefully, errors delay shortlisting.' },
  { when: 'Oct - Nov 2026', what: 'NQT Foundation + Advanced test. Usually proctored online. Score valid for 12 to 24 months.' },
  { when: 'Nov - Dec 2026', what: 'Interview shortlist. Technical + managerial rounds conducted via MS Teams or TCS proctoring tool.' },
  { when: 'Jan - Feb 2027', what: 'Offer letter with role (Ninja / Digital / Prime), location, and joining date. Bond acceptance via eSign.' },
  { when: 'Apr - Aug 2027', what: 'Onboarding + ILP training at TCS ILP centre (Trivandrum / Pune / Chennai / Nagpur). 10-12 weeks paid training.' },
];

const TOC = [
  { id: 'intro', label: 'TCS NQT 2026 at a glance' },
  { id: 'process', label: '5-round process walkthrough' },
  { id: 'resume', label: 'Resume sections (9 blocks)' },
  { id: 'keywords', label: '25 ATS keywords TCS iON scans for' },
  { id: 'projects', label: '3 strong project examples' },
  { id: 'dodont', label: 'Do / Don\'t checklist' },
  { id: 'timeline', label: 'Application timeline' },
  { id: 'interview', label: 'Interview prep (technical + HR)' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "Infosys InfyTQ Certification: Full Guide", slug: "infosys-infytq-guide", excerpt: "5-phase process, Foundation + Advanced syllabus, HackWithInfy.", read: 15 },
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: '7-section template built for Indian + global ATS.', read: 11 },
  { title: 'Campus Placement Resume 2026', slug: 'campus-placement-resume', excerpt: '10-point checklist + 5-round walkthrough for campus drives.', read: 10 },
  { title: '8 Naukri Resume Tips That 3x Views', slug: 'naukri-resume-tips', excerpt: 'Rank higher in Naukri recruiter search filters.', read: 9 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'The exact questions across behavioural, technical, tricky.', read: 16 },
];

export default function TCSNQTGuidePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="TCS NQT 2026 resume & process guide"
      title="TCS NQT 2026: Resume & Process Playbook for Freshers"
      subtitle="The complete guide to TCS National Qualifier Test 2026. 5-round process, resume format that clears TCS iON parsing, 25 keywords to include, 3 project templates, and the application timeline."
      dateModified="2026-04-26"
      readingTime={14}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">TCS NQT 2026 at a glance</p>
          <p className="text-gray-700">
            TCS NQT (National Qualifier Test) is the single largest entry-level hiring funnel in India: 4+ lakh candidates apply, roughly 40,000 clear the test, and around 25,000 get an offer annually. The test is used by TCS itself and by 500+ other corporates to filter fresher candidates. A strong score opens TCS Ninja (entry role, Rs 3.5 LPA), Digital (mid role, Rs 7 LPA), and Prime (elite, Rs 9-11 LPA) tracks, plus callbacks from other companies accepting NQT scores.
          </p>
        </div>
        <p>
          Your NQT score decides your band. Your resume decides whether you even reach the interview. TCS uses its own iON parsing system that is stricter than most commercial ATS: multi-column layouts, graphics, skill bars, and photo-embedded PDFs routinely get rejected before a recruiter sees them. This guide walks through the exact 5-round process, the resume structure that parses cleanly, and the 25 technical keywords TCS iON looks for.
        </p>
      </section>

      <section id="process" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5-round process walkthrough</h2>
        <p className="mb-5">Understanding each round prevents over-preparing one and bombing another. The test + interview flow is:</p>
        <div className="space-y-4">
          {ROUNDS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-semibold text-gray-900">{r.name}</p>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded px-2 py-1">{r.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1"><strong>Focus:</strong> {r.focus}</p>
              <p className="text-sm text-gray-700"><strong>Clear bar:</strong> {r.pass}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="resume" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Resume structure: 9 sections that TCS iON parses cleanly</h2>
        <p className="mb-5">Reverse chronological, single column, 1 page, PDF. Exact section order below is what TCS iON expects. Deviating confuses the parser and drops your match score.</p>
        <div className="space-y-3">
          {RESUME_SECTIONS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1"><span className="inline-block min-w-[28px] font-bold text-indigo-600">{i + 1}.</span> {s.name}</p>
              <p className="text-sm text-gray-700 pl-8">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="keywords" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">25 ATS keywords TCS iON scans for</h2>
        <p className="mb-4">These appear across TCS NQT job descriptions for Ninja and Digital tracks. Include at least 15 in your Skills or Experience sections. worded exactly as written.</p>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((k, i) => (
            <span key={i} className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold rounded px-3 py-1">{k}</span>
          ))}
        </div>
      </section>

      <section id="projects" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">3 strong project examples</h2>
        <p className="mb-5">Projects carry more weight than CGPA above 7.0. Each project bullet should follow Accomplish X as measured by Y by doing Z. Below are complete project writeups with bullets you can adapt.</p>
        <div className="space-y-6">
          {PROJECT_EXAMPLES.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-3">{p.title}</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="dodont" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Do / Don&apos;t checklist for TCS iON</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-5">
            <p className="font-semibold text-emerald-800 mb-2">Do</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {DO_DONT.do.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          <div className="border border-rose-200 bg-rose-50/40 rounded-lg p-5">
            <p className="font-semibold text-rose-800 mb-2">Don&apos;t</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {DO_DONT.dont.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="timeline" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">TCS NQT 2026 application timeline</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 font-semibold text-gray-900 w-40">When</th><th className="text-left p-3 font-semibold text-gray-900">What happens</th></tr>
            </thead>
            <tbody>
              {TIMELINE.map((t, i) => (
                <tr key={i} className="border-t border-gray-200"><td className="p-3 font-medium text-gray-900">{t.when}</td><td className="p-3 text-gray-700">{t.what}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-700">Dates are approximate and vary slightly year-to-year. Check tcsion.com for the exact registration window.</p>
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview prep</h2>
        <p className="mb-4">
          <strong>Technical (25-40 min):</strong> Be ready to walk through 1 project end-to-end. Expect fundamentals on OOP, DBMS (joins, normalization, ACID), OS (process vs thread, paging), CN (OSI, TCP vs UDP), and 1 DSA problem. TCS interviewers value clean reasoning over optimal code. Explain your approach aloud even when stuck.
        </p>
        <p className="mb-4">
          <strong>Managerial / HR (15-25 min):</strong> Standard behavioural plus TCS-specific. Expect questions on relocation (TCS can post you anywhere across 10 Indian cities), bond acceptance (2 years, Rs 50,000 penalty if you leave early), night shift willingness (client-dependent), and stretch goals (&quot;what did you do when you were stuck on X&quot;). Be direct and positive; do not over-promise.
        </p>
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>Red flags to avoid:</strong> Saying you only want a specific city. Saying you would not sign the bond. Bashing your college or past projects. Claiming &quot;expert&quot; in a language you cannot solve a 20-line problem in.
          </p>
        </div>
      </section>
      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <p className="mb-3 text-sm text-gray-700">Further reading on this topic from independent sources. All external links open in a new tab.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><a href="https://www.naukri.com/career-guidance" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Naukri Career Guidance hub</a></li>
            <li><a href="https://www.ncs.gov.in" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">National Career Service (Govt of India) portal</a></li>
            <li><a href="https://www.shine.com/career-advice" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Shine career advice archives</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the cut-off for TCS NQT 2026?', a: 'Historically around 55 to 60 percent overall with ~60 percent sectional. Exact numbers vary per batch; targets 55-plus to be safe. Advanced NQT cut-off is higher (roughly 65 percent).' },
            { q: 'Is TCS NQT score valid for other companies?', a: 'Yes. 500+ corporates accept NQT scores, including Cognizant, Mindtree, Wipro (cross-accepts), HCL, Capgemini, LTIMindtree. Scores are valid for 12 to 24 months.' },
            { q: 'Does TCS accept resumes longer than 1 page for freshers?', a: 'Strongly prefers 1 page. 2 pages from a fresher reads as padding. Keep to 1 page by tightening projects to 3 bullets each and removing optional sections.' },
            { q: 'What CGPA do I need for TCS NQT?', a: 'Official cut-off is 60 percent throughout (10th, 12th, UG). Below that, resume is auto-filtered. Above 7.5 CGPA puts you in the strong pile; above 8.5 makes you Digital / Prime eligible.' },
            { q: 'Are backlogs a dealbreaker?', a: 'Current active backlogs = disqualification. Past cleared backlogs are fine if you declare them honestly. TCS verification checks this; hiding is worse than having.' },
            { q: 'Can I apply if I did not take the online NQT?', a: 'No. You must have a valid NQT score. Register at tcsion.com in the open window (usually Aug-Oct).' },
            { q: 'How important are NPTEL certifications for TCS?', a: 'Moderately. TCS values NPTEL specifically because of the IIT-partner reputation. 2 to 3 relevant NPTEL certificates (Elite or above) is a strong signal on your resume.' },
            { q: 'What is the bond period at TCS?', a: '2 years for Ninja / Digital roles with a Rs 50,000 penalty for early exit. The bond is enforceable but not usually pursued for genuine reasons (higher studies, medical).' },
            { q: 'Do I need to know DSA for TCS NQT coding round?', a: 'Basics: arrays, strings, sorting, searching, recursion, one graph or DP problem. The round is not LeetCode-hard; think structured CS2 / CS3 level. Practise on TCS CodeVita archives and the NQT mock platform.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a TCS NQT-ready resume free</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          ResumeBuildz renders single-column, PDF-optimised resumes that clear TCS iON on the first parse. Free, no paywall on download.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
