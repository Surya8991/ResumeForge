'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const HARD_SKILLS = [
  { role: 'Software Engineering', list: ['Python', 'Java', 'TypeScript', 'Go', 'React / Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'GraphQL', 'REST API design', 'CI/CD', 'System design'] },
  { role: 'Data Science / ML', list: ['Python', 'SQL', 'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost', 'MLflow', 'Airflow', 'dbt', 'Snowflake', 'BigQuery', 'Tableau', 'A/B testing'] },
  { role: 'Product Management', list: ['Roadmapping', 'User research', 'SQL', 'Amplitude', 'Mixpanel', 'Figma', 'JIRA', 'A/B testing', 'OKRs', 'Market sizing', 'Pricing', 'Go-to-market', 'PRD writing', 'Stakeholder management'] },
  { role: 'Marketing / Growth', list: ['Google Ads', 'Meta Ads', 'SEO (technical + content)', 'HubSpot', 'Salesforce', 'Braze', 'Segment', 'GA4', 'Looker', 'Copywriting', 'Email automation', 'Attribution modelling', 'CRO', 'Partnership marketing'] },
  { role: 'Design / UX', list: ['Figma', 'Sketch', 'Adobe XD', 'User research', 'Wireframing', 'Prototyping', 'Design systems', 'Accessibility (WCAG)', 'Motion (Principle / Rive)', 'Framer', 'Information architecture', 'Usability testing'] },
  { role: 'Finance / Accounting', list: ['Financial modelling', 'Excel advanced', 'SAP', 'Oracle', 'Tally', 'QuickBooks', 'IFRS / GAAP', 'Variance analysis', 'FP&A', 'Forecasting', 'Tax (GST / TDS)', 'Power BI'] },
  { role: 'Sales / BD', list: ['Salesforce', 'HubSpot CRM', 'Outreach', 'LinkedIn Sales Navigator', 'Cold outbound', 'Consultative selling', 'Contract negotiation', 'Territory planning', 'Enterprise / SMB pipeline', 'Account mapping'] },
  { role: 'Operations / Supply Chain', list: ['SAP', 'Oracle NetSuite', 'S&OP', 'Demand planning', 'Inventory management', 'Six Sigma', 'Lean', 'Power BI', 'SQL', 'Logistics (TMS / WMS)', 'Procurement'] },
];

const SOFT_SKILLS = [
  { cluster: 'Communication', list: ['Written communication', 'Presenting', 'Stakeholder updates', 'Cross-functional collaboration', 'Documentation', 'Active listening'] },
  { cluster: 'Leadership', list: ['People management', 'Hiring and coaching', 'Performance reviews', 'Giving feedback', 'Conflict resolution', 'Mentoring'] },
  { cluster: 'Thinking', list: ['Problem solving', 'Prioritisation', 'Decision making under ambiguity', 'First-principles thinking', 'Systems thinking', 'Critical thinking'] },
  { cluster: 'Execution', list: ['Project management', 'Time management', 'Ownership', 'Attention to detail', 'Bias for action', 'Operating under pressure'] },
];

const LANGUAGES = [
  { name: 'English', level: 'Native / Fluent / Professional / Conversational' },
  { name: 'Hindi', level: 'Native / Fluent' },
  { name: 'Spanish', level: 'B2 (CEFR) / Professional' },
  { name: 'Mandarin', level: 'HSK 5 / Conversational' },
  { name: 'French', level: 'A2 / Basic' },
];

const CERTS = [
  'AWS Certified Solutions Architect - Associate',
  'Google Data Analytics Certificate',
  'PMP (Project Management Professional)',
  'Certified Scrum Master (CSM)',
  'CFA Level II',
  'Six Sigma Green Belt',
  'Salesforce Administrator',
  'Microsoft Certified: Azure Fundamentals',
  'IBM Data Science Professional Certificate',
  'Meta Blueprint Certified',
];

const TOOLS = [
  { cat: 'Productivity', list: ['Notion', 'Linear', 'JIRA', 'Confluence', 'Slack', 'Google Workspace', 'Microsoft 365'] },
  { cat: 'Collaboration', list: ['Figma', 'Miro', 'Zoom', 'Loom', 'Slab'] },
  { cat: 'Development', list: ['Git', 'GitHub', 'VS Code', 'Postman', 'Datadog', 'Sentry'] },
  { cat: 'Analytics', list: ['Amplitude', 'Mixpanel', 'GA4', 'Looker', 'Tableau', 'Power BI', 'Metabase'] },
];

const TOC = [
  { id: 'intro', label: 'Why skills order matters for ATS' },
  { id: 'hard', label: 'Hard skills by role (8 roles)' },
  { id: 'soft', label: 'Soft skills (with ATS warning)' },
  { id: 'languages', label: 'Languages (CEFR scale)' },
  { id: 'certs', label: 'Certifications (10 that carry weight)' },
  { id: 'tools', label: 'Tools & software' },
  { id: 'format', label: 'How to format your skills section' },
  { id: 'placement', label: 'Where on the resume to place it' },
  { id: 'mistakes', label: 'Skills section mistakes' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
    { title: "Resume Margins & Spacing: The Ideal Setup", slug: "resume-margins-spacing", excerpt: "8-point spec for margins, line height, and section spacing that parses cleanly.", read: 10 },
  { title: '200+ Resume Action Verbs', slug: 'resume-action-verbs', excerpt: 'Grouped by role with the weak-to-strong swap table.', read: 9 },
  { title: 'How to Quantify Achievements', slug: 'quantify-resume-achievements', excerpt: '50+ metric-driven bullets and the XYZ formula.', read: 12 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: 'The 7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'How to Tailor Your Resume in 10 Minutes', slug: 'tailor-resume', excerpt: '3x callbacks with JD-matched skills tailoring.', read: 10 },
];

export default function ResumeSkillsListPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Resume skills list"
      title="How to List Skills on a Resume (by Skill Type) in 2026"
      subtitle="Hard skills, soft skills, languages, certifications, tools, each lands differently with recruiters and ATS. The exact grouping, order, and formatting that gets parsed cleanly and read first."
      dateModified="2026-04-23"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Most ATS systems rank resumes by how many JD skill keywords appear in yours. Put the right skills in the right place and you clear the filter. Put soft skills in a bulleted list at the top and you score zero on the parser and look lazy to a human. This guide separates the five skill categories and tells you exactly how to present each.
          </p>
        </div>
        <p>
          A recruiter spends roughly 7 seconds on the first pass. The Skills section is one of the three things they scan (job titles, recent company, skills). Miss a key skill keyword and you lose the callback even if the Experience section would have carried you. Skills section is ATS insurance: it is where you pay the keyword tax cleanly without stuffing your bullets.
        </p>
      </section>

      <section id="hard" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Hard skills by role</h2>
        <p className="mb-5">Hard skills are measurable, learnable capabilities tied to a tool, language, or method. These are what the ATS matches against the JD. List 10 to 15 max; pick the ones most relevant to the target role.</p>
        <div className="space-y-4">
          {HARD_SKILLS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">{r.role}</p>
              <p className="text-sm text-gray-800 leading-relaxed">{r.list.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="soft" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Soft skills (handle with care)</h2>
        <p className="mb-4">
          Soft skills belong in the resume, but <strong>not in a bulleted skills list</strong>. Every candidate claims &quot;strong communication&quot;. Prove it in the Experience bullets: &quot;Presented Q3 roadmap to 40+ stakeholders across Eng, Product, Sales&quot; beats a Skills entry that says Communication.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {SOFT_SKILLS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">{s.cluster}</p>
              <p className="text-sm text-gray-700">{s.list.join(', ')}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>ATS impact:</strong> Most modern ATS platforms explicitly discount soft-skill keywords because they appear in every resume. Greenhouse and Lever weight hard skills ~4x higher. Use soft skills as proof through stories, not as filler in a skills block.
          </p>
        </div>
      </section>

      <section id="languages" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages (use a real scale)</h2>
        <p className="mb-4">Include only if the role touches multilingual contexts (customer-facing, international expansion, translation, localization). Always pair each language with a proficiency level using a recognised scale.</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="text-left p-3 font-semibold text-gray-900">Language</th><th className="text-left p-3 font-semibold text-gray-900">Level examples</th></tr>
            </thead>
            <tbody>
              {LANGUAGES.map((l, i) => (
                <tr key={i} className="border-t border-gray-200"><td className="p-3">{l.name}</td><td className="p-3 text-gray-700">{l.level}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-700"><strong>Scale options:</strong> CEFR (A1-C2) is the global standard. &quot;Native / Fluent / Professional / Conversational / Basic&quot; is the US convention. Pick one scale and use it consistently.</p>
      </section>

      <section id="certs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10 certifications that carry weight in 2026</h2>
        <p className="mb-4">List only active, name-recognised certifications relevant to the target role. Include the issuing body and the year obtained. Expired certs should drop off.</p>
        <ul className="grid gap-2 md:grid-cols-2 list-disc pl-5 text-sm text-gray-800">
          {CERTS.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </section>

      <section id="tools" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools & software</h2>
        <p className="mb-4">These are often confused with hard skills. Keep them in a dedicated Tools line if the list is long; otherwise merge into hard skills.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {TOOLS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">{t.cat}</p>
              <p className="text-sm text-gray-800">{t.list.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to format your skills section</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-5">
            <p className="font-semibold text-emerald-800 mb-2">Do</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Group by category (Languages, Frameworks, Tools, Cloud)</li>
              <li>Use comma-separated text, not bullets (parser-friendly)</li>
              <li>Match the exact JD spelling (&quot;Node.js&quot; not &quot;NodeJS&quot;)</li>
              <li>Cap at 12 to 15 hard skills</li>
              <li>List most relevant first within each group</li>
            </ul>
          </div>
          <div className="border border-rose-200 bg-rose-50/40 rounded-lg p-5">
            <p className="font-semibold text-rose-800 mb-2">Don&apos;t</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Use skill-level bars / star ratings (ATS ignores, recruiters distrust)</li>
              <li>List 40 skills to look broad</li>
              <li>Include skills you cannot defend in an interview</li>
              <li>Claim &quot;Expert&quot; as the default level</li>
              <li>Invent abbreviations the JD did not use</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="placement" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where on the resume does Skills go?</h2>
        <p>
          For freshers and career changers: <strong>near the top</strong>, right after the Summary, so recruiters see the match immediately. For experienced candidates (4+ years): <strong>below Experience</strong>, because your job titles and employers are stronger signals and Skills is confirmation, not the lead.
        </p>
        <p className="mt-3">
          One exception: applying to highly technical roles (ML, Cloud, Security) at any level, keep Skills near the top. Hiring managers scan the stack before they scan titles.
        </p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Common Skills section mistakes</h2>
        <ul className="space-y-3">
          {[
            { m: 'Listing every tool you have ever touched', fix: 'If you cannot answer a technical question about it, cut it. ATS does not reward breadth over defensibility.' },
            { m: 'Using star ratings or skill bars', fix: 'Looks designerly but parses as nothing. Use words (Expert, Proficient, Familiar) only if each is justified by years or output.' },
            { m: 'Buzzword soup ("Synergy, Paradigm")', fix: 'Strip corporate-speak. Every skill should be a tool, language, method, or certificate.' },
            { m: 'Duplicating soft skills across Skills + Summary + Experience', fix: 'Pick one location per skill. Soft skills belong in Experience bullets; hard skills in the Skills section.' },
            { m: 'Skipping the Skills section entirely for senior roles', fix: 'Keep it even as a Director. ATS still keyword-matches. A minimal 8-skill line below Experience is enough.' },
          ].map((item, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.m}</p>
              <p className="text-sm text-gray-700">{item.fix}</p>
            </li>
          ))}
        </ul>
      </section>
      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <p className="mb-3 text-sm text-gray-700">Further reading on this topic from independent sources. All external links open in a new tab.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide: resumes & cover letters</a></li>
            <li><a href="https://www.themuse.com/advice/resumes" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse resume advice library</a></li>
            <li><a href="https://hbr.org/topic/subject/resumes" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR resume and hiring research</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many skills should I list?', a: '10 to 15 hard skills, grouped into 3 to 5 categories. Fewer reads thin, more reads padded.' },
            { q: 'Should I list skill proficiency levels?', a: 'Only if you use a defensible scale (years of experience or CEFR for languages). Avoid star ratings or self-assessed percentages.' },
            { q: 'Should I repeat skills mentioned in Experience bullets?', a: 'Yes, for the most important hard skills. ATS weights keywords by frequency (with diminishing returns). Mentioning "Python" in Skills + 2 bullets is fine; mentioning it 12 times is stuffing.' },
            { q: 'Are soft skills worth listing?', a: 'Rarely in a dedicated list. Always prove them in Experience bullets instead. Exceptions: roles where "people management" is itself the skill (Engineering Manager, HR).' },
            { q: 'Should I list Microsoft Office / Google Docs?', a: 'No, unless the JD asks for advanced Excel (financial modelling, pivot tables). Basic office software is assumed.' },
            { q: 'Do I need both a Skills section and a Tools section?', a: 'Not usually. Merge unless your tool list is 15+ items, in which case split for scannability.' },
            { q: 'Does the order of skills within a category matter?', a: 'Yes. List the most relevant to the JD first; recruiters often stop reading at the 5th skill in a row.' },
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
        <h2 className="text-2xl font-bold mb-3">Build a skills section that parses cleanly</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          ResumeBuildz auto-groups your skills by category and uses JD-matching to flag missing keywords. Free.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
