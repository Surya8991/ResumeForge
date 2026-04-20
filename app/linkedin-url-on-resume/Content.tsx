'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const CHECKLIST = [
  'Custom URL (linkedin.com/in/firstname-lastname, not the long default with numbers)',
  'Profile photo that matches the professional tone of your resume (not a cropped party photo)',
  'Headline under your name that says more than your job title (role + specialty + domain)',
  'About section with at least 4 short paragraphs; first 3 lines carry the pitch before the See more fold',
  'Current role and last 2 roles populated with the same dates and titles as your resume',
  'At least 5 skills endorsed by ex-colleagues or managers',
  'Minimum 200 connections (below this reads as abandoned profile to recruiters)',
  'Privacy setting: public profile enabled, so recruiters can see it without being connected',
];

const REASONS_YES = [
  { title: 'It is the recruiter\'s verification layer', body: 'After scanning your resume, most recruiters paste your LinkedIn URL into a tab to cross-check dates, titles, and sometimes your photo. If the link is missing, they google your name; if you have a common name, they give up, and your resume goes to the pending pile.' },
  { title: 'It carries context the resume cannot', body: 'Endorsements, recommendations, and mutual connections are social proof a static document cannot show. A strong LinkedIn lifts an average resume. A missing one drops a strong one.' },
  { title: 'Half of hiring runs through InMail', body: 'Recruiters using LinkedIn Recruiter surface candidates via the platform, not via inbound resumes. Your LinkedIn URL on the resume closes the loop so that inbound applications can still be tracked as existing LinkedIn candidates.' },
  { title: 'It future-proofs the application', body: 'Your resume is a snapshot. Your LinkedIn keeps updating with new certs, promotions, and articles. Two months into a slow interview process, an up-to-date LinkedIn can quietly strengthen your case.' },
];

const REASONS_NO = [
  { title: 'Your LinkedIn contradicts your resume', body: 'If your resume says Senior Engineer but your LinkedIn still says Engineer, do not link until you reconcile. A mismatched LinkedIn actively hurts you. Fix it first, then link.' },
  { title: 'Your profile is near-empty', body: 'A bare LinkedIn with no photo, 40 connections, and no About reads as inactive. Either build it up to the minimum checklist in this post or leave the URL off until you do.' },
  { title: 'Your LinkedIn is too personal', body: 'If your feed is full of political takes, hot takes on ex-employers, or 2015 fitness selfies, clean it up or delete it before adding the URL. Recruiters check.' },
  { title: 'You are job-searching confidentially', body: 'Not a blanket exception, but real. If you have strict confidentiality, keep Open to Work off, lock down activity visibility, and skip the URL until later in the funnel.' },
];

const FORMATTING = [
  { label: 'Good', value: 'linkedin.com/in/surya-l', note: 'Custom vanity URL, short, readable. Set this via LinkedIn profile settings.' },
  { label: 'Acceptable', value: 'linkedin.com/in/surya-l-92a4b', note: 'Default URL with your name visible. Not pretty, but functional.' },
  { label: 'Avoid', value: 'https://www.linkedin.com/in/Surya-L-b7a94e28?utm_source=share', note: 'Full https prefix wastes space; tracking params look like spam to recruiters.' },
  { label: 'Worst', value: 'Available on LinkedIn', note: 'Makes recruiter work to find you. This is the version that gets skipped.' },
];

const TOC = [
  { id: 'intro', label: 'Do recruiters actually click it?' },
  { id: 'yes', label: '4 reasons to always include it' },
  { id: 'no', label: '4 cases where you should not' },
  { id: 'checklist', label: 'Is your LinkedIn ready? 8-point check' },
  { id: 'format', label: 'How to format the URL' },
  { id: 'placement', label: 'Where on the resume to place it' },
  { id: 'github', label: 'What about GitHub, Portfolio, Twitter?' },
  { id: 'privacy', label: 'Privacy and confidentiality' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
    { title: "Resume Margins & Spacing: The Ideal Setup", slug: "resume-margins-spacing", excerpt: "8-point spec for margins, line height, and section spacing that parses cleanly.", read: 10 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: 'The 7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: '8 Naukri Resume Tips That 3x Views', slug: 'naukri-resume-tips', excerpt: 'Indian counterpart to LinkedIn for recruiter-facing profiles.', read: 9 },
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, certifications, tools, grouped right.', read: 11 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid, by situation.', read: 10 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: '10-minute tailoring for 3x callback rate.', read: 10 },
];

export default function LinkedInUrlOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="LinkedIn URL on resume"
      title="Should You Put a LinkedIn URL on Your Resume?"
      subtitle="Yes, almost always, but only if your profile is ready. The 4 reasons to include it, the 4 cases where you should not, the 8-point profile readiness check, and the correct formatting in 2026."
      dateModified="2026-04-30"
      readingTime={10}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Short answer</p>
          <p className="text-gray-700">
            Yes, include your LinkedIn URL on your resume, provided your profile passes the 8-point readiness check below. A strong profile actively helps the application. A weak, stale, or contradictory profile actively hurts it. The question is not whether to include a LinkedIn URL; it is whether your LinkedIn is ready to be seen.
          </p>
        </div>
        <p>
          Recruiters will check LinkedIn whether you link it or not. If your name is on the resume, the profile is one Google away. The point of adding the URL is to make their life easier, which pushes your resume slightly up the queue, and to control which profile they land on (your primary one, not a near-duplicate from 2014).
        </p>
      </section>

      <section id="yes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 reasons to always include it</h2>
        <div className="space-y-4">
          {REASONS_YES.map((r, i) => (
            <div key={i} className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.title}</p>
              <p className="text-sm text-gray-700">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="no" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 cases where you should not (yet)</h2>
        <div className="space-y-4">
          {REASONS_NO.map((r, i) => (
            <div key={i} className="border border-rose-200 bg-rose-50/40 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.title}</p>
              <p className="text-sm text-gray-700">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="checklist" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Is your LinkedIn ready? The 8-point check</h2>
        <p className="mb-4">Link it only if your profile clears all 8. Fixing the gaps takes roughly 90 minutes total; it is the highest-leverage afternoon you can spend on a job search.</p>
        <ul className="space-y-2">
          {CHECKLIST.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700"><span className="mt-0.5 text-emerald-600 font-bold">{i + 1}.</span><span>{c}</span></li>
          ))}
        </ul>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to format the URL</h2>
        <p className="mb-4">Short, vanity, no tracking junk. Put it as plain text (the resume does not need the full https:// prefix).</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 w-28">Tier</th>
                <th className="text-left p-3 font-semibold text-gray-900 w-80">URL</th>
                <th className="text-left p-3 font-semibold text-gray-900">Why</th>
              </tr>
            </thead>
            <tbody>
              {FORMATTING.map((f, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-semibold">{f.label}</td>
                  <td className="p-3 text-gray-800 font-mono text-xs">{f.value}</td>
                  <td className="p-3 text-gray-700">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="placement" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where on the resume to place it</h2>
        <p>In the header, next to your name, phone, email, and city. Same row, separated by a bullet or a pipe. Do not create a separate Profiles section; it wastes a line.</p>
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs text-gray-800">
          Surya L · Bangalore · surya@example.com · +91 9x xxxx xxxx · linkedin.com/in/surya-l · github.com/surya-l
        </div>
        <p className="mt-4 text-sm text-gray-700">If you only have one line for the header, prioritise phone and email first, LinkedIn second, GitHub or portfolio third. Do not cram 5 links into the header; pick the 2 that carry the most signal for the target role.</p>
      </section>

      <section id="github" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What about GitHub, Portfolio, Twitter?</h2>
        <ul className="space-y-3">
          <li className="border border-gray-200 rounded-lg p-4"><strong className="text-gray-900">GitHub:</strong> <span className="text-sm text-gray-700">Include if you have at least 3 non-tutorial repos with real commits. Empty GitHubs hurt more than missing ones for engineering roles.</span></li>
          <li className="border border-gray-200 rounded-lg p-4"><strong className="text-gray-900">Portfolio:</strong> <span className="text-sm text-gray-700">Include for design, front-end, product, writing, and content roles. Not needed for most backend / ops / PM roles.</span></li>
          <li className="border border-gray-200 rounded-lg p-4"><strong className="text-gray-900">Twitter / X:</strong> <span className="text-sm text-gray-700">Only if it is professional and active. A 12-tweet-a-year account is not a signal. A builder account with 2k followers talking shop is a strong one.</span></li>
          <li className="border border-gray-200 rounded-lg p-4"><strong className="text-gray-900">Medium / Substack:</strong> <span className="text-sm text-gray-700">Include if you have at least 5 substantive posts relevant to the target role. Thought leadership is a trust-accelerator.</span></li>
        </ul>
      </section>

      <section id="privacy" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and confidentiality</h2>
        <p>
          If you are job-searching quietly while still employed, enable LinkedIn&apos;s Open to Work flag only for recruiters (not public), and turn off activity broadcasts before updating your profile. Your current employer cannot see the Open to Work signal when set to recruiters-only, but they can see if you suddenly add 8 new skills in one evening.
        </p>
        <p className="mt-3">
          For sensitive industries (defence, government, medical), confirm whether linking personal social presence on a job application violates your current employment contract. This is a small set of cases but worth checking.
        </p>
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
            { q: 'Is it OK to put LinkedIn as a hyperlink in a PDF?', a: 'Yes, preferred. Hyperlink the text so the recruiter can click from the PDF viewer. Keep the display text as the short URL, not raw https.' },
            { q: 'What if I do not have a LinkedIn at all?', a: 'Create one, even a minimal one. Having no LinkedIn is read by recruiters as a red flag, especially for roles above entry-level. 90 minutes of setup is worth it.' },
            { q: 'Should my LinkedIn headline match my resume title exactly?', a: 'Match the role and domain; the headline can be slightly more descriptive. Example: resume says Backend Engineer; LinkedIn says Backend Engineer at Razorpay, Payments & Reconciliation.' },
            { q: 'Does the ATS care about the LinkedIn URL?', a: 'Some ATS parse it and pre-populate LinkedIn data into the candidate profile. Most do not. Either way, a recruiter will click it manually in the next step.' },
            { q: 'Is the Open to Work green ring visible to recruiters?', a: 'The full ring (the one anyone can see) is visible to all. The recruiter-only setting is only visible to paid LinkedIn Recruiter accounts. Use the recruiter-only option if you are searching confidentially.' },
            { q: 'Should I add a QR code to my LinkedIn URL?', a: 'No. QR codes on paper resumes look gimmicky; on digital resumes they are redundant. A clickable URL is enough.' },
            { q: 'Can I skip LinkedIn for design or creative roles?', a: 'You can skip the URL, but add your portfolio or Behance / Dribbble instead. Having zero online presence for a creative role reads as concerning.' },
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
        <h2 className="text-2xl font-bold mb-3">Build a resume that matches your LinkedIn</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          ResumeBuildz auto-aligns your resume header with your LinkedIn URL and flags mismatched titles or dates. Free, no download paywall.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
