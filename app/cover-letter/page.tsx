'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const structureParts = [
  { step: '1', title: 'Opening Paragraph', desc: 'Hook the reader immediately. State the position you are applying for, how you found it, and one compelling reason you are the right fit. If you have a referral, mention it here.', example: 'As a senior full-stack engineer with 7 years of experience building scalable SaaS platforms, I was excited to see your opening for a Lead Engineer...' },
  { step: '2', title: 'Why This Company', desc: 'Show you have researched the company. Reference their mission, recent news, products, or values. Explain why this company specifically appeals to you and how your goals align.', example: 'Your commitment to democratising financial literacy through technology resonates deeply with my own passion for building tools that make complex systems accessible...' },
  { step: '3', title: 'Your Value Proposition', desc: 'This is the core of your letter. Highlight 2-3 specific achievements with metrics that directly relate to the job requirements. Draw a clear line from your experience to their needs.', example: 'At my current role, I led the migration of a monolithic Rails app to microservices, reducing deployment time by 80% and improving system reliability to 99.99% uptime...' },
  { step: '4', title: 'Closing Statement', desc: 'Reiterate your enthusiasm, include a clear call to action, and thank the reader. Keep it confident but not presumptuous. Mention your availability for an interview.', example: 'I would welcome the opportunity to discuss how my experience in scaling engineering teams could contribute to your growth goals. I am available for a conversation at your convenience.' },
];

const industryTemplates = [
  { industry: 'Software Engineering', icon: '💻', opening: 'With 5+ years building production-grade applications in React and Node.js, and a track record of reducing load times by 60%, I am eager to bring my full-stack expertise to...' },
  { industry: 'Product Management', icon: '📋', opening: 'Having launched 3 B2B products from zero to $5M ARR, I understand the intersection of user needs, business goals, and technical constraints that defines great product management at...' },
  { industry: 'Data Science', icon: '📊', opening: 'As a data scientist who has built ML pipelines processing 10M+ daily predictions with 94% accuracy, I am excited about the opportunity to drive data-informed decisions at...' },
  { industry: 'Marketing', icon: '📣', opening: 'With a proven record of growing organic traffic by 300% and managing $2M+ annual ad budgets with 4.5x ROAS, I am excited to bring my growth marketing expertise to...' },
  { industry: 'Finance', icon: '📈', opening: 'As a CFA charterholder with 8 years of experience in equity research covering the technology sector, managing coverage of 15+ companies with a combined market cap of $500B, I am drawn to...' },
  { industry: 'Healthcare', icon: '🏥', opening: 'With 6 years of clinical experience and a passion for improving patient outcomes through evidence-based practice, I am enthusiastic about joining your team to advance...' },
];

const TOC = [
  { id: 'intro', label: 'Introduction' },
  { id: 'why', label: 'Why cover letters matter' },
  { id: 'structure', label: 'The 4-part structure' },
  { id: 'dos-donts', label: 'Do\'s and don\'ts' },
  { id: 'templates', label: 'Templates by industry' },
  { id: 'ai', label: 'AI-powered cover letters' },
];

const RELATED = [
  { title: 'Resume Writing Tips That Actually Work', slug: 'resume-tips', excerpt: '40 action verbs, 5 before-and-after bullet rewrites, and 8 mistakes that sink your resume.', read: 9 },
  { title: 'How to Beat ATS: The Complete Guide', slug: 'ats-guide', excerpt: '75% of resumes never reach a human. Here is how ATS works and how to fix yours.', read: 12 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: 'The exact 7-section format that beats Indian and global ATS for freshers.', read: 11 },
  { title: 'Resume for Career Change: The 5-Step Pivot Guide', slug: 'resume-for-career-change', excerpt: 'Transferable-skills rewriting, hybrid format, and 6 common pivot examples.', read: 11 },
  { title: 'Resume After a Layoff', slug: 'resume-after-layoff', excerpt: 'A 5-step guide for 2026 with 3 email templates and a 60-day planner.', read: 12 },
];

export default function CoverLetterGuidePage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Cover Letter Guide & Templates | ResumeBuildz';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn how to write compelling cover letters with our complete guide. Structure, dos and donts, and industry templates.');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Learn how to write compelling cover letters with our complete guide. Structure, dos and donts, and industry templates.');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Cover Letter Guide & Templates | ResumeBuildz');
  }, []);

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="Cover letter guide"
      title="How to Write a Cover Letter That Gets Read"
      subtitle="83% of hiring managers read cover letters. Here is a practical structure, real examples, and the mistakes that get applications rejected."
      dateModified="2026-04-15"
      readingTime={8}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <p>Your resume shows what you have done. Your cover letter explains why you are the right person for this specific job. Even when companies say cover letters are optional, a strong one puts you ahead of everyone who skipped it. This guide covers the 4-part structure, the do and don&apos;t list every recruiter wishes more candidates followed, and industry-specific opening lines you can copy.</p>
      </section>

      <section id="why" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Why cover letters matter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { stat: '83%', label: 'of hiring managers read cover letters (ResumeLab, 2023)' },
            { stat: '49%', label: 'say cover letters are their second most valued document (ResumeGo, 2023)' },
            { stat: '2x', label: 'more likely to land interviews with a strong cover letter (CareerBuilder, 2023)' },
          ].map((item) => (
            <div key={item.stat} className="bg-gray-50 rounded-lg border border-gray-200 p-5 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{item.stat}</div>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
        <p>Pair your cover letter with a well-built{' '}
          <button onClick={() => openGateway('/builder')} className="text-indigo-600 hover:underline inline">ATS-optimised resume</button>
          {' '}and you are in a strong position.
        </p>
      </section>

      <section id="structure" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">The 4-part structure</h2>
        <p className="text-gray-600 mb-5">Follow this proven structure for a cover letter that is clear, compelling, and professional.</p>
        <div className="space-y-4">
          {structureParts.map((part) => (
            <div key={part.step} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{part.step}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1.5">{part.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">{part.desc}</p>
                  <div className="bg-gray-50 rounded-md p-3 border-l-4 border-indigo-600">
                    <p className="text-sm text-gray-600 italic">&ldquo;{part.example}&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="dos-donts" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Do&apos;s and don&apos;ts</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
              <h3 className="font-semibold text-green-800">Do</h3>
            </div>
            <ul className="space-y-2">
              {['Address the hiring manager by name when possible', 'Research the company and reference specific details', 'Quantify your achievements with numbers', 'Match your tone to the company culture', 'Keep it to one page (250-400 words)', 'Proofread multiple times for errors', 'Include a clear call to action in closing', 'Explain employment gaps honestly if relevant'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-800"><span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">×</span>
              <h3 className="font-semibold text-red-700">Don&apos;t</h3>
            </div>
            <ul className="space-y-2">
              {['Repeat your resume word for word', 'Use "To Whom It May Concern"', 'Focus only on what you want from the job', 'Write more than one page', 'Use a generic template without customisation', 'Include salary requirements unless asked', 'Apologise for lack of experience', 'Send the same letter to every application'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-800"><span className="text-red-600 mt-0.5 flex-shrink-0">×</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="templates" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Templates by industry</h2>
        <p className="text-gray-600 mb-5">Sample opening lines tailored to different industries. Use these as inspiration for your own cover letter.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryTemplates.map((tmpl) => (
            <div key={tmpl.industry} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="text-2xl mb-2">{tmpl.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{tmpl.industry}</h3>
              <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;{tmpl.opening}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai" className="mt-10 scroll-mt-6 bg-gray-900 text-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-3">AI-powered cover letters</h2>
        <p className="text-white/70 mb-5 leading-relaxed">
          Don&apos;t want to start from scratch? ResumeBuildz AI takes your resume data and the job description, then writes a tailored cover letter in seconds. It pulls your most relevant experience, matches the company tone, and follows the 4-part structure above. You can edit every word before exporting.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Groq AI Powered', 'Job-Specific', 'Instant Generation', 'Editable Output'].map((t) => (
            <span key={t} className="text-xs bg-white/10 text-indigo-300 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Generate your cover letter</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm">
          Our AI writes a tailored cover letter based on your resume and the job description. Need help with your resume first? Check out our <Link href="/resume-tips" className="text-indigo-600 hover:underline">resume writing tips</Link> and <Link href="/templates" className="text-indigo-600 hover:underline">ATS-friendly templates</Link>.
        </p>
        <button onClick={() => openGateway('/builder')} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
          Generate your cover letter
        </button>
      </section>
    </BlogPostLayout>
  );
}
