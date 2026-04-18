'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const actionVerbs = {
  Leadership: ['Led', 'Directed', 'Managed', 'Oversaw', 'Coordinated', 'Mentored', 'Supervised', 'Spearheaded', 'Championed', 'Orchestrated'],
  Technical: ['Developed', 'Engineered', 'Implemented', 'Architected', 'Automated', 'Debugged', 'Configured', 'Deployed', 'Integrated', 'Optimised'],
  Communication: ['Presented', 'Authored', 'Collaborated', 'Facilitated', 'Negotiated', 'Persuaded', 'Articulated', 'Briefed', 'Advocated', 'Consulted'],
  Achievement: ['Achieved', 'Exceeded', 'Delivered', 'Improved', 'Increased', 'Reduced', 'Generated', 'Transformed', 'Accelerated', 'Maximised'],
};

const resumeSections = [
  { title: 'Contact Information', content: 'Include your full name, phone number, professional email, LinkedIn URL, and city/state. Avoid full street addresses for privacy. Make sure your email sounds professional.' },
  { title: 'Professional Summary', content: 'Write 2-3 sentences highlighting your experience level, key skills, and career goals. Tailor it to each job. Use keywords from the job description. Avoid generic statements like "hard worker" or "team player."' },
  { title: 'Work Experience', content: 'List positions in reverse chronological order. Include company name, job title, dates, and location. Use 3-5 bullet points per role starting with action verbs. Quantify results wherever possible.' },
  { title: 'Education', content: 'Include degree, institution, graduation date, and GPA if above 3.5. Add relevant coursework, honors, or academic projects. Recent graduates can place this section before experience.' },
  { title: 'Skills', content: 'List technical skills, tools, languages, and frameworks relevant to the role. Organise by category. Match skill names to those in the job description. Avoid rating scales.' },
  { title: 'Projects & Certifications', content: 'Include relevant projects with brief descriptions and outcomes. List professional certifications with issuing organisations and dates. These add credibility and demonstrate initiative.' },
];

const commonMistakes = [
  { title: 'Using an Objective Statement', desc: 'Replace with a professional summary. Objectives focus on what you want; summaries focus on what you offer.' },
  { title: 'Including Irrelevant Experience', desc: 'Every item should relate to the target role. Cut old or unrelated positions to keep your resume focused.' },
  { title: 'Listing Duties Instead of Achievements', desc: '"Responsible for" tells nothing about impact. Show what you accomplished, not just what you were supposed to do.' },
  { title: 'Making It Too Long', desc: 'Keep to 1 page for early career, 2 pages for experienced professionals. Recruiters spend 6 to 7 seconds on initial scan.' },
  { title: 'Using Passive Language', desc: '"Was tasked with" and "helped with" are weak. Start every bullet with a strong action verb in past tense.' },
  { title: 'Inconsistent Formatting', desc: 'Mixed fonts, inconsistent date formats, and uneven spacing look unprofessional. Use a template for consistency.' },
  { title: 'No Metrics or Numbers', desc: 'Vague claims are forgettable. "Increased sales by 40%" is far more compelling than "Improved sales performance."' },
  { title: 'Typos and Grammar Errors', desc: '58% of recruiters reject resumes with typos. Proofread multiple times and have someone else review it.' },
];

const industryTips = [
  { industry: 'Tech', icon: '💻', tips: ['List programming languages and frameworks prominently', 'Include GitHub or portfolio links', 'Highlight system design and scalability experience', 'Mention Agile/Scrum methodologies'] },
  { industry: 'Finance', icon: '📈', tips: ['Emphasise quantitative and analytical skills', 'Include relevant certifications (CFA, CPA)', 'Highlight regulatory compliance knowledge', 'Show P&L impact with dollar amounts'] },
  { industry: 'Marketing', icon: '📣', tips: ['Showcase campaign results with ROI metrics', 'Include digital marketing tools and platforms', 'Link to portfolio or campaign case studies', 'Highlight content creation and analytics skills'] },
  { industry: 'Healthcare', icon: '🏥', tips: ['List all licenses and certifications first', 'Include clinical hours and specialisations', 'Mention EHR/EMR systems experience', 'Highlight patient outcomes and compliance record'] },
];

const TOC = [
  { id: 'intro', label: 'Introduction' },
  { id: 'summary', label: 'Writing your professional summary' },
  { id: 'verbs', label: '40 action verbs' },
  { id: 'before-after', label: 'Weak vs strong bullets' },
  { id: 'sections', label: 'Resume sections guide' },
  { id: 'mistakes', label: '8 mistakes to avoid' },
  { id: 'industry', label: 'Industry-specific tips' },
];

const RELATED = [
  { title: 'How to Beat ATS: The Complete Guide', slug: 'ats-guide', excerpt: '75% of resumes never reach a human. Here is how ATS works and how to fix yours.', read: 12 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: 'The 4-part structure plus 6 industry templates hiring managers actually read.', read: 8 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: 'The exact 7-section format that beats Indian and global ATS for freshers.', read: 11 },
  { title: 'Resume for Career Change', slug: 'resume-for-career-change', excerpt: 'Transferable-skills rewriting and 6 common pivot examples.', read: 11 },
  { title: '8 Naukri Resume Tips That 3x Recruiter Views', slug: 'naukri-resume-tips', excerpt: 'How Arjun went from 2 to 40 recruiter views a week on Naukri.', read: 9 },
];

export default function ResumeTipsPage() {
  const { openGateway } = useLoginGateway();
  const [openSection, setOpenSection] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Resume Writing Tips & Action Verbs | ResumeBuildz';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Expert resume writing tips including action verbs, achievement examples, and industry-specific advice. Improve your resume today.');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Expert resume writing tips including action verbs, achievement examples, and industry-specific advice. Improve your resume today.');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Resume Writing Tips & Action Verbs | ResumeBuildz');
  }, []);

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Resume writing tips"
      title="Resume Writing Tips That Actually Work"
      subtitle="Recruiters spend about 6 seconds scanning your resume (Ladders, 2024). Here is how to make every word count and land more interviews."
      dateModified="2026-04-15"
      readingTime={9}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <p>Tip: implement just 3 to 4 of these for immediate impact. You do not need them all at once. Below are the practical moves that consistently lift resume response rates, from summary writing to industry-specific tailoring.</p>
      </section>

      <section id="summary" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Writing your professional summary</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
              <h3 className="font-semibold text-green-800">Do&apos;s</h3>
            </div>
            <ul className="space-y-2">
              {['Lead with your years of experience and job title', 'Include 2-3 top relevant skills', 'Mention a key achievement with a number', 'Tailor it to the specific job posting', 'Keep it to 2-3 concise sentences'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-800"><span className="text-green-600 mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">×</span>
              <h3 className="font-semibold text-red-700">Don&apos;ts</h3>
            </div>
            <ul className="space-y-2">
              {['Use vague buzzwords like "go-getter" or "synergy"', 'Write a paragraph longer than 4 lines', 'Copy paste the same summary for every job', 'Use first person ("I am a...")', 'Include salary expectations or personal info'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-800"><span className="text-red-600 mt-0.5">×</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="verbs" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">40 action verbs that grab attention</h2>
        <p className="text-gray-600 mb-5">Weak verbs kill resumes. Replace "responsible for" and "helped with" by starting every bullet point with one of these.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(actionVerbs).map(([category, verbs]) => (
            <div key={category} className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-indigo-600 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {verbs.map((verb) => (
                  <span key={verb} className="bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded">{verb}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="before-after" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Before and after: weak vs strong bullet points</h2>
        <p className="text-gray-600 mb-5">Numbers make your resume memorable. A recruiter will not remember "improved sales" but will remember "$2.4M revenue growth."</p>
        <div className="space-y-3">
          {[
            { weak: 'Managed a team', strong: 'Led a team of 12 engineers, increasing sprint velocity by 35%' },
            { weak: 'Improved sales', strong: 'Grew quarterly revenue by $2.4M through targeted outbound campaigns' },
            { weak: 'Handled customer support', strong: 'Resolved 150+ tickets per week with a 98% customer satisfaction rating' },
            { weak: 'Reduced costs', strong: 'Cut operational expenses by 22% ($180K annually) through process automation' },
            { weak: 'Built a website', strong: 'Developed a React application serving 50K+ daily active users with 99.9% uptime' },
          ].map((ex) => (
            <div key={ex.weak} className="bg-white rounded-lg border border-gray-200 p-4 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">×</span>
                <div><span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">Weak</span><p className="text-sm text-gray-600 mt-0.5">{ex.weak}</p></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <div><span className="text-[10px] font-semibold text-green-700 uppercase tracking-wide">Strong</span><p className="text-sm text-gray-800 mt-0.5 font-medium">{ex.strong}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="sections" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Resume sections guide</h2>
        <p className="text-gray-600 mb-5">What to include in each section of your resume for maximum impact.</p>
        <div className="space-y-2">
          {resumeSections.map((section, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button onClick={() => setOpenSection(openSection === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <span className={`text-indigo-600 text-xl leading-none transition-transform ${openSection === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openSection === i && (<div className="px-4 pb-4"><p className="text-sm text-gray-700 leading-relaxed">{section.content}</p></div>)}
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 mistakes to avoid</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {commonMistakes.map((m, i) => (
            <div key={m.title} className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <div><h3 className="font-semibold text-gray-900 mb-1">{m.title}</h3><p className="text-sm text-gray-700">{m.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="industry" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Industry-specific tips</h2>
        <p className="text-gray-600 mb-5">Every industry has different expectations. Tailor your resume to match.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {industryTips.map((ind) => (
            <div key={ind.industry} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="text-2xl mb-2">{ind.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-3">{ind.industry}</h3>
              <ul className="space-y-1.5">
                {ind.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-indigo-600 mt-0.5">•</span>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 text-center bg-gray-900 text-white rounded-2xl py-10 px-6">
        <h2 className="text-2xl font-bold text-white mb-3">Start building your resume</h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm">Put these tips into action. Pick one of our <Link href="/templates" className="text-indigo-400 hover:underline">20 ATS-tested templates</Link>, use the AI to rewrite weak bullets, and run the <Link href="/ats-guide" className="text-indigo-400 hover:underline">ATS checker</Link> before you apply.</p>
        <button onClick={() => openGateway('/builder')} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">Start building your resume</button>
      </section>
    </BlogPostLayout>
  );
}
