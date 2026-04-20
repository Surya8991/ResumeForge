'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const TIPS = [
  { title: 'Upload, do not paste', body: 'Workday offers both resume upload and a web form. Upload the PDF first, then verify the auto-parsed fields. Pasting resume text into the form leaves all the parsing work to you by hand and loses formatting.' },
  { title: 'Match JD skills verbatim in your Skills section', body: 'Workday uses strict keyword matching (substring, case-insensitive). If the JD says Node.js, do not write NodeJS or Node JS. The parser counts each variant as different.' },
  { title: 'Use standard section headings', body: 'Workday expects Experience, Education, Skills, Certifications (in this order). Creative headings (Career Journey, Highlights) fall through to parsing errors. Use the boring ones.' },
  { title: 'Keep dates in MM/YYYY format', body: 'Workday parses Mar 2022 cleanly. Spring 2022, Q1-2022, or March 2022-Present (with the word Present) sometimes fail. Stick to 03/2022 - 12/2024 or Mar 2022 - Dec 2024.' },
  { title: 'Avoid headers, footers, text boxes', body: 'Content in page headers, footers, tables, or text boxes does not parse reliably. Keep the name and contact info in the document body, first line.' },
  { title: 'Single-column layout', body: 'Multi-column resumes scramble when Workday parses top-to-bottom, left-to-right. Every Staff Engineer resume that fails Workday is usually a 2-column layout issue.' },
  { title: 'Profile Sync trap', body: 'Once you upload to one Workday-powered company, your profile syncs across all Workday clients. If you tweak your resume per-company, use the Edit Profile option on each tenant, otherwise the first upload wins.' },
  { title: 'Certifications block helps', body: 'Workday has a dedicated Certifications parser. List certs clearly (AWS Certified Solutions Architect, Associate, 2024). Recruiters filter by certification name regularly.' },
];

const COMPANIES = [
  'Amazon', 'Walmart', 'Target', 'Accenture', 'Deloitte',
  'Salesforce', 'Netflix', 'Airbnb', 'Cisco', 'IBM',
  'HP', 'Visa', 'Mastercard', 'Chevron', 'Bank of America',
];

const TOC = [
  { id: 'intro', label: 'Why Workday is different' },
  { id: 'how-it-parses', label: 'How Workday parses your resume' },
  { id: 'tips', label: '8 tactical tips' },
  { id: 'companies', label: 'Companies that use Workday' },
  { id: 'profile-sync', label: 'Profile Sync: the hidden gotcha' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "Greenhouse ATS: How to Stand Out in Startup Hiring", slug: "greenhouse-ats-tips", excerpt: "Greenhouse parsing rules, scorecard flow, and auto-reject logic.", read: 11 },
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'How to Beat ATS: Complete Guide', slug: 'ats-guide', excerpt: 'ATS fundamentals and why 75 percent of resumes never reach humans.', read: 12 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: '10-minute JD-first tailoring for 3x callbacks.', read: 10 },
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, certifications, tools.', read: 11 },
  { title: 'Best Resume Fonts 2026', slug: 'best-resume-fonts', excerpt: '10 fonts tested across 4 ATS platforms.', read: 12 },
];

export default function WorkdayResumeTipsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="ATS & Keywords"
      breadcrumbCurrent="Workday resume tips"
      title="Workday Resume Tips That Actually Pass (2026)"
      subtitle="Workday is the single most common ATS among Fortune 500 employers. Here is how it parses your resume, the 8 tactical tips that raise your match score, and the Profile Sync gotcha that catches most candidates."
      dateModified="2026-05-17"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why Workday matters</p>
          <p className="text-gray-700">
            Workday powers the applicant tracking system at roughly 50 percent of Fortune 500 companies, including Amazon, Walmart, Accenture, Salesforce, Netflix, Airbnb, Cisco, Bank of America, and hundreds more. If you are applying at a large employer, there is a 1 in 2 chance Workday is the first gate your resume goes through. Tuning for it specifically is worth it.
          </p>
        </div>
        <p>
          Workday parses resumes more strictly than some modern ATS platforms (Greenhouse, Lever) but more leniently than legacy systems (Taleo, iCIMS). Its parsing quirks are well documented and the fixes are simple: single-column layout, exact keyword spelling, boring section headings, and clean date formats. Candidates who follow these rules see a measurably higher match score in the recruiter view.
        </p>
      </section>

      <section id="how-it-parses" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Workday parses your resume</h2>
        <p className="mb-3">When you upload a PDF or DOCX, Workday runs three steps:</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Extract raw text.</strong> Reads the document top-to-bottom, left-to-right. Multi-column layouts scramble here.</li>
          <li><strong>Identify sections.</strong> Looks for headings like Experience, Education, Skills. Creative headings fall through to default categories with lower confidence.</li>
          <li><strong>Populate profile fields.</strong> Maps parsed content to structured fields (job title, employer, dates, skill list). These fields feed recruiter search.</li>
        </ol>
        <p className="mt-3">Recruiters then search the candidate database by field, e.g. Skills contains Python AND Years of experience greater than 5 AND Location is India. Your resume reaches a human only if these searches return you.</p>
      </section>

      <section id="tips" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 tactical tips to raise your Workday match score</h2>
        <div className="space-y-3">
          {TIPS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1"><span className="text-indigo-600 mr-2">{i + 1}.</span>{t.title}</p>
              <p className="text-sm text-gray-700">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="companies" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies that use Workday (partial list)</h2>
        <div className="flex flex-wrap gap-2">
          {COMPANIES.map((c, i) => (
            <span key={i} className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold rounded px-3 py-1">{c}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700">Many more. Any career site URL starting with myworkdayjobs.com or workday.com is a Workday-powered application flow. If you see that URL, these tips apply.</p>
      </section>

      <section id="profile-sync" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Sync: the hidden gotcha</h2>
        <p>
          Workday accounts sync across tenants. When you apply to Company A on Workday, your profile (resume, skills, work history) gets cached. When you then apply to Company B a week later and upload a slightly tailored resume, Company B may still see the Company A version because of tenant-level caching behaviours on the underlying Workday account.
        </p>
        <p className="mt-3">
          The fix: create a fresh Workday account (new email) per application if you are heavily tailoring. Or, use the Edit Profile flow within the Company B tenant to override. Do not assume your latest upload is what every subsequent employer sees.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.workday.com/en-us/resources.html" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Workday candidate resources</a> for platform documentation.</li>
          <li><a href="https://www.jobscan.co/blog/workday-resume-tips" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Jobscan on Workday ATS</a> with additional parse-test results.</li>
          <li><a href="https://www.greenhouse.io/blog" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Greenhouse hiring research</a> for complementary ATS benchmarks.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I upload a PDF or DOCX to Workday?', a: 'Both parse equally well. PDF preserves formatting better for the recruiter side view. Default to PDF unless the posting explicitly says DOCX.' },
            { q: 'Do I need to fill out the web form after uploading?', a: 'Yes, for fields the parser missed or got wrong. Spend 2 minutes verifying job titles, dates, employers, and skills. Mis-parsed fields hurt your match score.' },
            { q: 'Why does Workday show my old resume even after I uploaded a new one?', a: 'Profile Sync caches across tenants. Use the Edit Profile flow on the new tenant, or create a fresh account for the new application.' },
            { q: 'Does Workday care about my cover letter?', a: 'Workday parses cover letters as a secondary document. Some recruiters read them, some do not. Always include one if the field is present; never send the same cover letter you sent elsewhere without tailoring.' },
            { q: 'How many skills should I add to my Workday profile?', a: '10 to 20 skills mapped directly to the target JD. Workday allows many more, but the first 10 are what recruiters see on the candidate card.' },
            { q: 'Can I delete my Workday profile?', a: 'Per-tenant, yes. You can request deletion from a specific company Workday tenant via their privacy page. Global deletion (across all Workday tenants) requires emailing their privacy team.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a Workday-ready resume free</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Single column, clean date format, standard section headings: ResumeBuildz nails the Workday-safe defaults so you do not have to micromanage.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
