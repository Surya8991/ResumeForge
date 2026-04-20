'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const EXAMPLES = [
  {
    stage: 'Fresher / Entry-level',
    weak: 'I am a recent CSE graduate from VIT. I am hardworking, a team player, and eager to learn new technologies. I have done projects in Java and Python and I am looking for an opportunity to grow.',
    strong: 'I am a CSE graduate from VIT Vellore, class of 2025, with a 8.6 CGPA. For my final-year project I built a face-recognition attendance system in Python that hit 94 percent accuracy across a 60-student class, and it ended up winning the Best Project award in our department. My summer internship at a Bangalore fintech had me shipping a REST API that now handles 12k daily requests. I am here today because the Backend Engineer role pairs exactly with what I already enjoy building, and the team you described runs the stack I know best.',
  },
  {
    stage: 'Early career (1 to 3 years)',
    weak: 'I have 2 years of experience as a software engineer at TCS. I work on Java backend services and have good communication skills. I am looking for a change for better opportunities.',
    strong: 'I am a backend engineer 2.5 years into my first role at TCS, working on a Java Spring Boot service inside a large retail-banking client. My biggest ship this year was a reconciliation job that used to run 45 minutes every night and now runs in under 6 after I moved it to parallel batches. I am at the point where I want to move from client services to product-scale problems, which is why your Staff Backend role caught my attention, especially the line about payments reconciliation.',
  },
  {
    stage: 'Mid-career (4 to 7 years)',
    weak: 'I have 6 years of experience in marketing. I have worked in both B2B and B2C sectors. I have handled campaigns, SEO, and performance marketing. I am looking for a leadership role.',
    strong: 'I am a growth marketer 6 years in, currently running paid acquisition at FinEdge where I scaled monthly spend from 4 lakhs to 42 lakhs at a steady 4.8x ROAS and contributed 2.4 crore in pipeline. Before this I ran lifecycle at a D2C brand through their Series A. The reason I am interviewing is that I am hitting the ceiling of what solo contribution can drive; I want to build and mentor a team, which is exactly the charter of this Head of Growth role.',
  },
  {
    stage: 'Senior IC (8 to 12 years)',
    weak: 'I am a Staff Engineer with over 10 years of experience. I have worked at large companies and startups. I have strong technical skills and mentoring abilities.',
    strong: 'I am a Staff Backend Engineer at Razorpay, 10 years in, and I own payments reconciliation across our 18 million merchants. The ship I am proudest of this year was moving our monolithic settlement service into 14 services on EKS, which cut deploy time from 45 minutes to 4. Beyond the code I have been mentoring 5 Senior Engineers through promotion cycles. I am exploring staff-plus roles in climate tech because I want my next 10 years of compounding to land on a problem that matters.',
  },
  {
    stage: 'Manager',
    weak: 'I have 8 years of experience including 4 as an Engineering Manager. I have managed teams of 10 to 15 engineers. I believe in coaching and driving outcomes.',
    strong: 'I am an Engineering Manager at Flipkart Grocery, 4 years into people-management after 4 years as an IC. Today I run a 32-person org across 5 squads. The metric I am proudest of is Q4 OKR completion; we landed 91 percent on-time after I restructured our planning cadence from a 61 percent baseline. I hired 17 engineers and promoted 8 in that time. I am here because your Director role takes this same problem one layer up, and the org chart you walked me through feels like the right stretch.',
  },
  {
    stage: 'Career changer',
    weak: 'I was working in investment banking for 5 years. Now I am transitioning to machine learning. I have been learning online and doing some projects.',
    strong: 'I spent the first 5 years of my career at Morgan Stanley on the M&A desk, and 14 months ago I pivoted full-time into machine learning. Since then I have shipped 3 production ML models on AWS SageMaker, one for fraud detection and two for KYC risk scoring, while consulting for two fintech startups. I am targeting MLE roles where my finance-domain knowledge is a plus, not baggage, and your risk-modelling team is the exact intersection I have been aiming for.',
  },
  {
    stage: 'Returning after career break',
    weak: 'I took a 2-year break for family reasons. Before that I was a product manager at Swiggy. I am now ready to return to work.',
    strong: 'I am a senior product manager returning after a 22-month caregiving break. Before the break I ran the reorder flow at Swiggy Instamart and took it from 14 to 32 percent reorder rate. During the break I used my bandwidth to complete Reforge Growth, ship 2 side projects, one of them at 3k DAU, and mentor 4 early-stage founders through YC-style diligence. I picked this role because it pairs the scale I had at Swiggy with the early-stage ambiguity I got good at during my side projects.',
  },
  {
    stage: 'Laid-off / between roles',
    weak: 'I was recently laid off from my previous company. I am looking for a new opportunity to utilise my experience and skills.',
    strong: 'I was a Senior Product Designer at Twitter for 4 years, part of the Nov 2023 layoff cohort. My last big ship there was the Spaces post-launch work, where I grew DAU 3.2x over 18 months. Since the layoff, I have been using the time intentionally, shipped a SaaS side project that now has 1,200 signups, and taken 2 consulting engagements. I am ready to go back to a large-scale product challenge, which is exactly what the Principal Designer role is.',
  },
  {
    stage: 'Senior executive',
    weak: 'I am a senior executive with 15 years of experience. I have led teams and driven strategic initiatives at multiple companies.',
    strong: 'I spent the last 4 years as COO at Neobank-X scaling the company from 180 to 1,100 people across India, UAE, Singapore, and Indonesia. Revenue grew from 40 crore to 920 crore ARR while we held burn to an 18-month runway. Before that I ran central ops at a publicly listed logistics group. I am exploring CEO and COO roles at Series C+ fintechs because I am at the scale where I want the board and fundraising exposure that comes with the CEO seat.',
  },
  {
    stage: 'Student / first internship',
    weak: 'I am a second-year engineering student. I have good grades and I am passionate about technology. I am looking for an internship to learn and grow.',
    strong: 'I am a second-year CSE student at BITS Pilani, currently 8.4 CGPA. I have shipped two full-stack side projects this past summer, one of them is a plagiarism detector for code (Python + Flask) that has been adopted by three CS professors for assignment grading. I am looking for a software engineering internship specifically because I want to see how production code gets reviewed, tested, and deployed, the part I have not yet touched in my personal projects.',
  },
];

const MISTAKES = [
  { m: 'Reciting your resume top to bottom', fix: 'The interviewer has already read the resume. Pick 3 highlights, not 13 line-items.' },
  { m: 'Starting with childhood or college admission', fix: 'Cut to your current role and current work. They did not ask for your life story.' },
  { m: 'Adjectives instead of evidence', fix: 'Do not say "I am a passionate developer". Say what you shipped last month and let the passion show through the specificity.' },
  { m: 'Skipping the future', fix: 'The Future (why this role) sentence is what closes the answer. Without it, you sound like you are still explaining yourself.' },
  { m: 'Going over 2 minutes', fix: 'At 2 minutes 30 seconds the interviewer has stopped listening. 60 to 90 seconds is the sweet spot.' },
  { m: 'Memorising word-for-word', fix: 'Memorise 3 beats and hit them. Fresh phrasing on the day sounds human; a rehearsed script sounds robotic.' },
];

const TOC = [
  { id: 'intro', label: 'Why this question opens every interview' },
  { id: 'formula', label: 'The 3-part present-past-future formula' },
  { id: 'timing', label: 'How long should your answer be?' },
  { id: 'examples', label: '10 examples by career stage' },
  { id: 'mistakes', label: '6 mistakes that tank the answer' },
  { id: 'variations', label: 'How the question is really phrased' },
  { id: 'rehearse', label: 'How to rehearse without sounding robotic' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "STAR Method: 8 Full Examples", slug: "star-method-examples", excerpt: "90-second STAR formula with worked examples across 8 industries.", read: 15 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing, every category covered.', read: 16 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '15 by career stage, 10 by industry, with weak/strong pairs.', read: 14 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: '4-part structure + 6 industry templates.', read: 8 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: 'The 10-minute JD-first tailoring process.', read: 10 },
  { title: 'Campus Placement Resume 2026', slug: 'campus-placement-resume', excerpt: '10-point checklist for Indian campus drives.', read: 10 },
];

export default function TellMeAboutYourselfPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="Tell me about yourself"
      title={'How to Answer "Tell Me About Yourself" (10 Examples)'}
      subtitle="The 3-part present-past-future formula, 10 worked examples across fresher, mid-career, senior IC, manager, career-changer, and returning-after-break, and the 6 mistakes that wreck this answer."
      dateModified="2026-04-28"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this question matters</p>
          <p className="text-gray-700">
            Tell me about yourself is the first question in nearly every interview. Interviewers use it to set tempo, check your communication range, and see whether you can self-edit. Get it right and the next 45 minutes feel friendly. Get it wrong with a 3-minute autobiography and you spend the rest of the round winning back attention you already lost.
          </p>
        </div>
        <p>
          The answer is a signal, not a monologue. A strong one tells the interviewer in about 90 seconds: where you are now, what you have done that matters, and why you are in this room specifically. Everything else you could say is better saved for a follow-up question, because the interviewer will ask if they are curious.
        </p>
      </section>

      <section id="formula" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 3-part present-past-future formula</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-4 text-sm">
            <div><strong className="text-indigo-600">1. Present (20 to 30 seconds).</strong> Your current role, what you are working on right now, one line that signals scope (team size, revenue, users, or a named product).</div>
            <div><strong className="text-indigo-600">2. Past (30 to 40 seconds).</strong> One or two past roles or wins that are the most relevant to this job. Pick the ones that bridge to the role you are interviewing for.</div>
            <div><strong className="text-indigo-600">3. Future (10 to 20 seconds).</strong> Why this role, at this company, right now. This is the closer. It is what turns your answer from a biography into a sales pitch.</div>
          </div>
        </div>
        <p className="mt-4">
          Order matters. Starting with Past drags the energy down. Starting with Present and pivoting back to Past keeps momentum. Starting with Future feels forced. The interviewer should finish listening and think: this person knows where they are, what they have done, and why they are here.
        </p>
      </section>

      <section id="timing" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How long should your answer be?</h2>
        <p>
          Target 60 to 90 seconds. Under 45 seconds reads as low-effort. Over 120 seconds reads as poorly edited. At 150 seconds most interviewers have stopped tracking and are waiting for you to finish. Practise with a phone voice-recorder. Time yourself. Cut anything that is not directly earning your next follow-up question.
        </p>
        <p className="mt-3">
          One exception: if the interviewer says &quot;take your time, I want the full picture&quot;, you have permission to go 2 to 3 minutes. Default to 90 seconds unless invited to expand.
        </p>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">10 examples by career stage</h2>
        <p className="mb-5">Each shows a weak version first (what most candidates default to), then a strong rewrite using the 3-part formula. Read the strong version aloud. Time it. Note where the momentum lives.</p>
        <div className="space-y-5">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">{ex.stage}</p>
              <div className="space-y-3">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r text-sm text-gray-800">
                  <p className="text-xs font-semibold text-red-700 mb-1">Weak</p>
                  <p>{ex.weak}</p>
                </div>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r text-sm text-gray-800">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Strong</p>
                  <p>{ex.strong}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 mistakes that tank the answer</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="variations" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the question actually gets asked</h2>
        <p className="mb-4">The phrasing varies but the question underneath is always the same: give me a 90-second self-pitch. All of these map to the same answer:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Tell me about yourself.</li>
          <li>Walk me through your background.</li>
          <li>Can you introduce yourself?</li>
          <li>Run me through your resume.</li>
          <li>Give me a quick overview of your career so far.</li>
          <li>What is your story?</li>
          <li>Who are you, outside the resume?</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">The last one (&quot;outside the resume&quot;) does invite a slightly more personal beat, but still hold to the 90-second limit and still end on Future.</p>
      </section>

      <section id="rehearse" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to rehearse without sounding robotic</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Write it out once, fully.</strong> Three sentences each for Present, Past, Future. That is the skeleton.</li>
          <li><strong>Now delete 30 percent.</strong> The written version is always too long. Cut until every sentence earns its place.</li>
          <li><strong>Rehearse aloud 5 to 10 times, not 50.</strong> Over-rehearsed answers sound rehearsed. Stop when the beats come naturally, not the exact words.</li>
          <li><strong>Record yourself once.</strong> Play it back. Cut filler (so, basically, I guess). Check your time.</li>
          <li><strong>Adjust per interviewer.</strong> Know who you are talking to: recruiter wants the story arc, hiring manager wants the relevance, cross-functional panel wants the range. Same skeleton, different emphasis.</li>
        </ol>
      </section>
      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <p className="mb-3 text-sm text-gray-700">Further reading on this topic from independent sources. All external links open in a new tab.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><a href="https://www.amazon.jobs/en/principles" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Amazon Leadership Principles (interview signal reference)</a></li>
            <li><a href="https://hbr.org/topic/subject/job-interviews" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on job interviews</a></li>
            <li><a href="https://www.themuse.com/advice/interviewing" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse interviewing playbooks</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I include personal information?', a: 'Only if it is load-bearing for the role or the interviewer explicitly asks. Hobbies go at the end if at all, in one sentence, and only ones that reinforce a skill the role needs.' },
            { q: 'What if I have only one relevant role?', a: 'That is fine. Use Past for 1 concrete achievement from that role, not a list. Freshers can substitute Past with the strongest project or internship.' },
            { q: 'Do I need to mention the company name I am interviewing with?', a: 'Once, in the Future section. Naming the company + a specific reason (team, product, recent launch) signals you did your homework.' },
            { q: 'Can I use the same answer for every company?', a: 'Present and Past stay stable across interviews in the same job search. Future must change per company. It is the only part that tailors the rest.' },
            { q: 'What if I go blank?', a: 'Default to Present first. Name your current role and what you are working on this week. Buy yourself 10 seconds, then pivot to Past.' },
            { q: 'Is it OK to write notes on a notepad?', a: 'Yes, 5 to 7 keywords. Not a full script. Glancing at keywords keeps you on track without reading robotically.' },
            { q: 'Should the answer change between phone screen and onsite?', a: 'Slightly. Phone screen is tighter, 60 seconds. Onsite can expand to 90 to 120 because the conversation will anchor on whatever beat the hiring manager latches onto.' },
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
        <h2 className="text-2xl font-bold mb-3">Need a resume that matches your pitch?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Your Tell-Me-About-Yourself answer is easier to deliver when your resume already tells the same story. Build a free, ATS-ready resume in under 10 minutes.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
