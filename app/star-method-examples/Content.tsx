'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const EXAMPLES = [
  { q: 'Tell me about a time you led a team through a tough project.', industry: 'Tech',
    s: 'At Razorpay, my team of 4 backend engineers was asked to migrate our settlement service off a monolith to 14 microservices, with a hard deadline driven by our external audit (Q2 2024).',
    t: 'As the Staff Engineer on the project, I owned the migration plan, rollback strategy, and zero-downtime deployment path.',
    a: 'I broke the migration into 14 weekly phases, one service per week. I set up feature flags so each service could be toggled back to monolith traffic in 60 seconds. I ran weekly syncs with SRE, on-call rotations through each switchover, and wrote a 12-page runbook the team used for every migration.',
    r: 'We shipped all 14 services on schedule with zero revenue-impacting incidents. Deploy time dropped from 45 minutes to 4 minutes. Post-audit, the external firm flagged our migration doc as best-practice for their other clients.' },
  { q: 'Describe a time you had to convince a stakeholder who disagreed with you.', industry: 'Product',
    s: 'At Swiggy, the business team wanted to launch a 10 percent blanket discount for all Instamart users during festive season. My data showed this would cannibalise our paid-subscription members.',
    t: 'As the PM for subscription, I needed to change the plan without damaging the cross-functional relationship.',
    a: 'I built a 3-slide deck showing the cohort analysis: 23 percent of discount redemptions would come from existing paying members, costing us Rs 4.2 crore in lost subscription value over 90 days. I proposed an alternative (members-only 15 percent discount, non-members 5 percent) and invited the business lead to a 30-min working session.',
    r: 'The alternative was adopted. Festive GMV grew 34 percent year-over-year, subscription renewals stayed flat (vs a projected 12 percent drop under the original plan), and the business lead and I co-presented results at the next all-hands.' },
  { q: 'Tell me about a time you failed.', industry: 'Design',
    s: 'I was lead designer on a payments redesign at a fintech startup. I pushed a visual overhaul without running it past the customer support team first.',
    t: 'The redesign shipped to 100 percent of users in one go, not staged.',
    a: 'Within 48 hours, support tickets tripled because existing users could not find the Add Funds button (I had moved it behind a two-tap flow). I rolled back in 6 hours, held a blameless post-mortem, and rebuilt the rollout plan with a 10 percent staged ramp + CS pre-brief.',
    r: 'The second release shipped 2 weeks later to 100 percent with a 4 percent drop in support tickets vs baseline. The learning: I now default to a staged rollout plus CS sync for any visual change above surface-level polish.' },
  { q: 'Describe a time you had to work with an underperforming team member.', industry: 'Management',
    s: 'An engineer on my team was missing sprint commitments 3 sprints in a row and his PRs were being reopened by reviewers.',
    t: 'As his manager, I needed to understand the root cause and either restore performance or transition him out, without damaging team morale.',
    a: 'I had a private 45-min 1:1 to ask about blockers. Turned out he was going through a personal health issue and not flagging it. I rebalanced his load by 40 percent for 60 days, paired him with a senior mentor on architecture, and set weekly micro-goals. I also set a clear 90-day performance plan in writing.',
    r: 'He cleared the 90-day plan, shipped the auth rewrite (his largest ship to date) the following quarter, and is now one of my strongest seniors. The tradeoff: we slipped 1 mid-priority feature by 2 weeks, which I owned with my manager.' },
  { q: 'Tell me about a time you had to learn something new quickly.', industry: 'Finance',
    s: 'I joined an IB team covering Indian mid-cap IT services, but my prior experience was only in consumer tech coverage.',
    t: 'I had 3 weeks before my first model-build and pitch on a new coverage initiation (Persistent Systems).',
    a: 'I read 4 years of annual reports, listened to 12 earnings calls at 1.5x speed, set up daily 45-min calls with the sector head, and built a comparable-company model from scratch using Bloomberg + company filings. I cross-checked my assumptions with two buy-side analysts I had worked with before.',
    r: 'The Persistent Systems initiation note was published with an OUTPERFORM rating. The stock beat our target by 18 percent over the next 6 months, and 3 of our key buy-side clients increased their position within 2 weeks of publication.' },
  { q: 'Tell me about a conflict with a coworker.', industry: 'Marketing',
    s: 'The head of sales and I disagreed on lead-qualification criteria. He wanted every inbound demo request booked; I argued unqualified demos were wasting AE time.',
    t: 'As head of growth, I needed to find a data-backed resolution without escalating or damaging the relationship.',
    a: 'I pulled 90 days of demo-to-closed-won data. Qualified leads (using my proposed criteria) closed at 24 percent; unqualified leads at 3 percent. I built a shared dashboard so both teams saw the same numbers. I proposed a 30-day trial with stricter qualification plus a nurture track for unqualified leads.',
    r: 'Qualified pipeline grew 45 percent in the trial. CAC dropped 22 percent. Sales leader became one of my strongest advocates internally; we now co-own the qualification model.' },
  { q: 'Describe a time you prioritised effectively under pressure.', industry: 'Engineering Management',
    s: 'We had 3 sev-1 incidents in the same week: a payment gateway outage, a data-loss bug in our mobile app, and a security CVE in a third-party library.',
    t: 'As engineering manager on-call, I had 4 senior engineers available across all 3 issues.',
    a: 'I ranked by impact and reversibility. Payment outage = customer-facing revenue loss, non-reversible = top priority (2 engineers). Data-loss bug = customer trust, partially reversible = P1 (1 engineer on rollback, 1 on fix). CVE = security exposure but no active exploit = P2 (1 engineer on patch). I set 30-min check-ins and communicated status to CEO every hour.',
    r: 'Payment restored in 47 minutes. Data-loss fix rolled out in 4 hours with 100 percent recovery of affected records. CVE patched and deployed within 24 hours (ahead of disclosure). The weekly incident post-mortem became our template for future multi-incident weeks.' },
  { q: 'Describe a time you had to deliver bad news.', industry: 'HR / People',
    s: 'We had to reduce our engineering team by 15 percent during a Series B bridge round. 11 engineers out of 72.',
    t: 'As Head of People, I had to design the process and communicate with each affected engineer personally.',
    a: 'I drafted a clear rubric (last-in-first-out plus skill-gap analysis), had every decision peer-reviewed by two directors, and prepared individual severance packages before any conversation. I held 1-on-1 meetings with each affected engineer within a single day, followed by company-wide announcement 2 hours after the last 1-on-1. I offered 8 weeks severance + 3 months of India health insurance + external placement support.',
    r: 'Of 11 affected, 9 had new offers within 45 days. Retention of remaining team held at 97 percent over the next 6 months (vs industry average ~70 percent post-layoff). Two of the affected engineers rehired us 18 months later when we resumed hiring.' },
];

const MISTAKES = [
  'Spending 60 seconds on Situation and only 10 on Result. Ratio should be the opposite.',
  'Using we did instead of I did. The interviewer wants to know your individual contribution.',
  'Skipping the metric. A Result without a number is not evidence.',
  'Picking stories that are too old (5+ years back) when fresh equivalents exist.',
  'Using the same story for two different questions in the same round.',
  'Forgetting the Lesson Learned beat at the end of failure stories, which is the whole point of the question.',
];

const TOC = [
  { id: 'intro', label: 'What the STAR method actually is' },
  { id: 'formula', label: 'The 90-second STAR formula' },
  { id: 'examples', label: '8 STAR examples by industry' },
  { id: 'mistakes', label: '6 STAR mistakes to avoid' },
  { id: 'buildbank', label: 'Build your 6-story bank' },
  { id: 'variations', label: 'CAR / SAR / PAR: are they different?' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: '3-part present-past-future formula with weak / strong pairs.', read: 13 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: '4-part structure + 6 industry templates.', read: 8 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '15 by career stage, 10 by industry, weak / strong pairs.', read: 14 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: '10-minute JD-first tailoring for 3x callback rate.', read: 10 },
];

export default function StarMethodExamplesPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="STAR method examples"
      title="STAR Method for Behavioural Interviews: 8 Full Examples (2026)"
      subtitle="The 90-second STAR formula (Situation, Task, Action, Result), 8 full worked examples across Tech, Product, Design, Finance, Marketing, Management, and HR, and the 6 mistakes that tank behavioural answers."
      dateModified="2026-05-05"
      readingTime={15}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why STAR works</p>
          <p className="text-gray-700">
            Behavioural questions (Tell me about a time when..., Describe a situation where...) are designed to predict how you will behave in the future role. Interviewers are not looking for the right answer; they are looking for specific, real, recent examples that show judgement and outcome. STAR is the structure that keeps your story focused: Situation, Task, Action, Result. Under 90 seconds. Every time.
          </p>
        </div>
        <p>
          Candidates who do not use STAR ramble. They spend 90 seconds setting context, 10 seconds on what they actually did, and forget the result. Interviewers grade behavioural answers almost entirely on Action + Result. STAR forces you to budget your time so the scoring beats get airtime.
        </p>
      </section>

      <section id="formula" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 90-second STAR formula</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-3 text-sm">
            <div><strong className="text-indigo-600">S. Situation (10 to 15 seconds).</strong> Where, when, your role. Concrete, not generic.</div>
            <div><strong className="text-indigo-600">T. Task (10 seconds).</strong> The specific problem you owned. What success looked like.</div>
            <div><strong className="text-indigo-600">A. Action (40 to 50 seconds).</strong> What YOU did (not the team). Decisions, tradeoffs, how you moved through blockers. This is the longest beat and the most scored.</div>
            <div><strong className="text-indigo-600">R. Result (15 to 20 seconds).</strong> The measurable outcome, with a number. For failure stories, add a Lesson Learned sentence at the very end.</div>
          </div>
        </div>
        <p className="mt-4">
          Note the proportions. If your Situation is 30 seconds long, you are over-setting context. If your Action is under 30 seconds, you have not said enough. If your Result has no number, the story reads as anecdote not evidence.
        </p>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 full STAR examples by industry</h2>
        <p className="mb-5">Every example below hits all four beats with concrete numbers. Read the Action + Result aloud, time yourself, and copy the structure for your own stories.</p>
        <div className="space-y-6">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">{ex.industry}</p>
              <p className="font-semibold text-gray-900 mb-3">Q. {ex.q}</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong className="text-indigo-600">S.</strong> {ex.s}</p>
                <p><strong className="text-indigo-600">T.</strong> {ex.t}</p>
                <p><strong className="text-indigo-600">A.</strong> {ex.a}</p>
                <p><strong className="text-indigo-600">R.</strong> {ex.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 STAR mistakes to avoid</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-3 text-sm text-gray-700">{m}</li>
          ))}
        </ul>
      </section>

      <section id="buildbank" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Build your 6-story bank</h2>
        <p className="mb-4">You do not prepare one answer per question. You prepare 6 stories, each mapped to 4 to 5 questions. The bank covers these archetypes:</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>A big ship.</strong> The biggest project you shipped in the past 2 years. Scope + outcome + your specific role.</li>
          <li><strong>A conflict resolved.</strong> Disagreement with a peer, manager, or stakeholder that you turned around.</li>
          <li><strong>A failure plus learning.</strong> Real, owned, with a specific lesson that changed how you work.</li>
          <li><strong>A leadership moment without authority.</strong> Cross-functional project or peer initiative you drove without formal ownership.</li>
          <li><strong>A quick-learn.</strong> A skill or domain you picked up fast under deadline.</li>
          <li><strong>A hard decision.</strong> Build vs buy, hire vs fire, pivot vs persist.</li>
        </ol>
        <p className="mt-4">Any behavioural question can be answered from one of these 6 with light reframing. This is how senior candidates stay sharp across 8-round onsite loops without memorising 40 scripts.</p>
      </section>

      <section id="variations" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CAR, SAR, PAR: are they different?</h2>
        <p className="mb-3">
          You may see variants: CAR (Context, Action, Result), SAR (Situation, Action, Result), PAR (Problem, Action, Result). They are all the same structure; STAR is the most common in the US and India. Functionally, any 4-beat frame that forces a measurable Result will work. Pick one and stay consistent.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.amazon.jobs/en/principles" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Amazon Leadership Principles (amazon.jobs)</a> &mdash; reference for the ownership, bias for action, and deliver-results behaviours STAR questions probe for.</li>
          <li><a href="https://hbr.org/2021/07/using-the-star-method-to-shine-in-job-interviews" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on the STAR interview method</a> &mdash; independent walkthrough of the framework from hiring-science researchers.</li>
          <li><a href="https://www.themuse.com/advice/star-interview-method" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse: STAR Interview Method Guide</a> &mdash; longer-form explanation with additional worked examples.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How old can a STAR story be?', a: 'Ideally within the last 18 to 24 months. Anything over 3 years old makes the interviewer wonder what you have been doing recently. For senior candidates, strongest-ever story can be older if nothing from recent years matches the scope.' },
            { q: 'Can I use the same story for two questions?', a: 'Yes, in different rounds. In the same round, always use a new story, even if you have to reach for a second-best example. Repeating stories in one round is the single biggest red flag interviewers flag.' },
            { q: 'What if my Result does not have a number?', a: 'Find one. Users, time saved, tickets closed, revenue, complaints avoided. If the only outcome was qualitative (praise from manager), the story is weak and should not anchor your bank.' },
            { q: 'Does STAR work for technical interviews?', a: 'Yes, for the behavioural / project walk-through portion. For coding and systems design, STAR is less relevant; use structured problem-solving frames (clarify, plan, code, test) instead.' },
            { q: 'How do I answer "tell me about a failure" without tanking the interview?', a: 'Pick a real failure (not I worked too hard), own your role, end with the Lesson Learned beat and a concrete example of applying the lesson later.' },
            { q: 'What if I go blank mid-answer?', a: 'Pause, acknowledge, go back to Task. Repeating the Task beat gives you 10 seconds to remember the Action. Never fabricate.' },
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
        <h2 className="text-2xl font-bold mb-3">Get your resume interview-ready</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Strong STAR answers come from a resume that already surfaces the numbers. Build one in 10 minutes, free.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Build my resume free
        </button>
      </section>
    </BlogPostLayout>
  );
}
