'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const BEHAVIORAL = [
  { q: 'Tell me about yourself.', a: '60 to 90 seconds. Present-past-future: one line on what you do today, two on the most relevant past wins, one on why this role now. No childhood bio, no full resume read-back.' },
  { q: 'Why do you want this role?', a: 'Name one specific thing about the company (product, team, strategy) plus one bridge to your strengths. Generic answers ("great culture") get filtered.' },
  { q: 'Why are you leaving your current job?', a: 'Forward-looking and neutral. "Looking for bigger scope in X" beats "my manager is..." Never bash a past employer.' },
  { q: 'What is your greatest strength?', a: 'Pick one strength relevant to the role plus a 30-second story that proves it. Range + depth, not a list.' },
  { q: 'What is your greatest weakness?', a: 'Real and in-progress, not humble-brag. "I under-communicate status on long tasks; I fixed it by shipping weekly written updates to my manager." Shows self-awareness + action.' },
  { q: 'Where do you see yourself in 5 years?', a: 'Direction, not a title. "Deep expertise in X with growing ownership of Y" beats "your job". Leaves room for the interviewer to see a path.' },
  { q: 'Why should we hire you?', a: 'Three sentences. One line on the biggest problem they hire this role for. One line on your closest past win. One line on the compounding you will create.' },
  { q: 'Describe a time you failed.', a: 'Pick a real failure with a clear lesson. STAR: Situation, Task, Action, Result + Learned. The learning is the whole point.' },
  { q: 'Tell me about a conflict with a coworker.', a: 'Pick a substantive, resolved conflict. Describe the disagreement factually, what you did to understand their view, how you resolved it, what you would do differently.' },
  { q: 'Describe a time you led without authority.', a: 'Cross-functional project or peer initiative. Focus on influence: how you got buy-in, handled pushback, kept momentum.' },
];

const SITUATIONAL = [
  { q: 'How do you prioritise when everything is urgent?', a: 'Frame: impact x reversibility x deadline. Walk through how you cut 10 asks to 3 and communicated the trade-offs up.' },
  { q: 'How do you handle tight deadlines?', a: 'Scope cut first, team help second, overtime last. Concrete example of each lever.' },
  { q: 'How do you handle a disagreement with your manager?', a: 'Disagree-and-commit. State view in writing, hear theirs, commit if decision stands; revisit with data if outcome proves it wrong.' },
  { q: 'How would you handle an underperforming team member?', a: 'Clarify expectations, specific feedback, agree PIP, weekly 1:1s, clear outcomes at 30/60/90. Document throughout.' },
  { q: 'How do you handle ambiguity?', a: 'Break into what you know, what you can find in a day, what needs a decision. Ship the smallest version first.' },
];

const TECHNICAL = [
  { q: 'Walk me through a recent project.', a: 'Problem, constraints, key trade-off, outcome with a metric. 2 minutes. End by offering to go deeper on any part.' },
  { q: 'How do you debug a production outage?', a: 'Stabilise (rollback/feature-flag) first, root-cause second. Logs, traces, last-known-good commit. Post-mortem with blameless review + action items.' },
  { q: 'What is the hardest technical decision you made?', a: 'Build vs buy, migration, architecture. Focus on the trade-offs you evaluated and the cost of the option you did NOT pick.' },
  { q: 'How do you stay current?', a: 'Source the answer: one newsletter, one podcast, one hands-on project. Names and specifics, not "I read a lot".' },
  { q: 'How do you design [system X]?', a: 'Requirements first, read-vs-write path next, data model, scale assumptions, bottlenecks, trade-offs. Use 4 quadrants; stop and check scope every 2 mins.' },
  { q: 'Explain [concept] to a non-technical person.', a: 'Analogy + one concrete example + why it matters. Skip the jargon. Interviewer is testing communication range.' },
];

const LEADERSHIP = [
  { q: 'Describe your management style.', a: 'High context, high autonomy. Example of how you set a team North Star and how often you step in on execution.' },
  { q: 'How do you give hard feedback?', a: 'Specific, private, within 48 hours. SBI (Situation-Behaviour-Impact). End on a clear ask, not a rant.' },
  { q: 'How do you hire?', a: 'Rubric first. Panel with diverse views. Paid or scoped take-home for senior roles. Debrief independently, then together, before vote.' },
  { q: 'Tell me about a time you had to let someone go.', a: 'Factual: what was communicated, what PIP looked like, when decision was made, how transition was handled. No bitter tone.' },
];

const CULTURE = [
  { q: 'Do you prefer working alone or in a team?', a: 'Both, with examples. Deep solo focus for craft work, team for architecture calls and reviews. Healthy oscillation.' },
  { q: 'How do you handle stress?', a: 'Systems, not willpower. Named habits (end-of-day shutdown, weekly review). One real example of a high-stress period and what you did.' },
  { q: 'What motivates you?', a: 'Impact, craft, growth. Pick the one closest to your real driver and a 30-second story.' },
  { q: 'What are you passionate about outside work?', a: 'Real, specific, 1 sentence. Not "Netflix". Something that shows depth or curiosity. No red flags (extreme views).' },
  { q: 'Describe your ideal work environment.', a: 'Match it to the company you are interviewing at. If they are remote-first, say remote-first with specifics on async habits.' },
  { q: 'How do you handle criticism?', a: 'Pause, clarify, thank, act. Example of feedback you received that changed how you work.' },
  { q: 'What is your proudest professional accomplishment?', a: 'Something that required stretch and had measurable impact. Skip the trophy story; tell a shipping story.' },
];

const TRICKY = [
  { q: 'Why is there a gap in your resume?', a: 'Direct and brief. Caregiving, health, learning, layoff. Name it, one sentence on what you did during, pivot back to what you bring now.' },
  { q: 'Why were you laid off?', a: 'Business context (role/team/company cuts), not performance. Transition to what you are focused on now.' },
  { q: 'Why are you job-hopping?', a: 'Pattern + reason + stability plan. "2 short stints were at failing startups; looking for a 5+ year home at a profitable company."' },
  { q: 'You are overqualified for this role.', a: 'Acknowledge + deflect. "I stepped down in scope deliberately for [reason]; here is how I will bring outsized value without being bored."' },
  { q: 'What are your salary expectations?', a: 'Give a researched range + offer flexibility on structure. Deflect if too early: "I would like to understand the role better first; can you share the band?"' },
  { q: 'Will you take a counter-offer from your current employer?', a: 'No (if true). Explain reason for leaving is not pay. Counters rarely fix real issues.' },
];

const CLOSE = [
  { q: 'Do you have any questions for us?', a: 'Always yes. Three prepared: one about the role (what does success look like in 6 months), one about the team (biggest recent challenge), one about the company (bet you are most excited about).' },
  { q: 'What other companies are you interviewing with?', a: 'Honest but vague. "A few similar-stage companies in fintech." Do not name them unless you are late-stage and leveraging.' },
  { q: 'How soon can you start?', a: 'Give real notice period. 30 days is standard for senior IC in India; 60 for US. Do not over-promise to win the offer.' },
  { q: 'Is there anything else you would like us to know?', a: 'One sentence that reinforces your strongest signal for the role. Not a redo of your resume.' },
];

const TOC = [
  { id: 'intro', label: 'How to use this guide' },
  { id: 'behavioral', label: '10 behavioural (Tell me about yourself)' },
  { id: 'situational', label: '5 situational (How would you...)' },
  { id: 'technical', label: '6 technical' },
  { id: 'leadership', label: '4 leadership / management' },
  { id: 'culture', label: '7 culture fit' },
  { id: 'tricky', label: '6 tricky (gaps, layoffs, salary)' },
  { id: 'close', label: '4 questions at the end' },
  { id: 'star', label: 'The STAR method' },
  { id: 'mistakes', label: 'Top 10 mistakes' },
  { id: 'prep', label: '48-hour prep plan' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "STAR Method: 8 Full Examples", slug: "star-method-examples", excerpt: "90-second STAR formula with worked examples across 8 industries.", read: 15 },
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: '4-part structure, 6 industry templates, and recruiter do/don\'t list.', read: 8 },
  { title: 'How to Tailor Your Resume in 10 Minutes', slug: 'tailor-resume', excerpt: '3x callback rate via JD-first tailoring. AI workflow included.', read: 10 },
  { title: 'Campus Placement Resume 2026', slug: 'campus-placement-resume', excerpt: '10-point checklist + 5-round walkthrough for Indian campus drives.', read: 10 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '15 by career stage + 10 by industry. Weak and strong side-by-side.', read: 14 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
];

function QAList({ items, tone = 'indigo' }: { items: { q: string; a: string }[]; tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' | 'slate' }) {
  const toneMap: Record<string, string> = {
    indigo: 'border-indigo-200 bg-indigo-50/40',
    emerald: 'border-emerald-200 bg-emerald-50/40',
    amber: 'border-amber-200 bg-amber-50/40',
    rose: 'border-rose-200 bg-rose-50/40',
    sky: 'border-sky-200 bg-sky-50/40',
    violet: 'border-violet-200 bg-violet-50/40',
    slate: 'border-slate-200 bg-slate-50/40',
  };
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className={`border ${toneMap[tone]} rounded-lg p-4`}>
          <p className="font-semibold text-gray-900 mb-1">Q. {it.q}</p>
          <p className="text-sm text-gray-700 leading-relaxed"><strong>A.</strong> {it.a}</p>
        </div>
      ))}
    </div>
  );
}

export default function InterviewQuestionsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="Interview questions & answers"
      title="100 Common Interview Questions & How to Answer Them (2026)"
      subtitle="The exact questions hiring managers ask across behavioural, situational, technical, leadership, culture, and tricky categories. Every answer uses the STAR method plus a 48-hour prep plan."
      dateModified="2026-04-21"
      readingTime={16}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">How to use this guide</p>
          <p className="text-gray-700">
            Most interviews reuse the same 30 to 50 questions across every industry. Memorising scripts makes you sound robotic. Instead, build a story bank of 6 to 8 concrete projects and learn to map any question to one. This guide groups 100 questions into 8 buckets so you can rehearse by theme, not rote.
          </p>
        </div>
        <p>
          Interviewers are checking three things: can you do the job, will you work well with the team, and do you want this role specifically. Every answer you give should nudge at least one of those three. If your answer does not land somewhere on that map, cut it.
        </p>
      </section>

      <section id="behavioral" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">10 behavioural questions (the warm-ups)</h2>
        <p className="mb-4">These show up in the first 15 minutes of almost every interview. Nail these and you buy room to breathe in the harder rounds.</p>
        <QAList items={BEHAVIORAL} tone="indigo" />
      </section>

      <section id="situational" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 situational questions</h2>
        <p className="mb-4">&quot;How would you handle...&quot; or &quot;What would you do if...&quot;. they test judgment on scenarios you have not faced yet. Structure beats polish.</p>
        <QAList items={SITUATIONAL} tone="sky" />
      </section>

      <section id="technical" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 technical questions (role-agnostic frames)</h2>
        <p className="mb-4">Exact questions vary by stack. The frames below work for software, data, design, PM, ops. any craft role.</p>
        <QAList items={TECHNICAL} tone="emerald" />
      </section>

      <section id="leadership" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 leadership / management questions</h2>
        <QAList items={LEADERSHIP} tone="violet" />
      </section>

      <section id="culture" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 culture fit questions</h2>
        <QAList items={CULTURE} tone="amber" />
      </section>

      <section id="tricky" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 tricky questions (gaps, layoffs, salary, job-hopping)</h2>
        <p className="mb-4">Handle these badly and you lose the offer in 30 seconds. Practise these out loud, not just in your head.</p>
        <QAList items={TRICKY} tone="rose" />
      </section>

      <section id="close" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 questions you will face at the end</h2>
        <QAList items={CLOSE} tone="slate" />
      </section>

      <section id="star" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The STAR method in 60 seconds</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-3 text-sm">
            <div><strong className="text-indigo-600">S. Situation.</strong> 1 sentence. Where, when, role.</div>
            <div><strong className="text-indigo-600">T. Task.</strong> 1 sentence. What you were responsible for.</div>
            <div><strong className="text-indigo-600">A. Action.</strong> 3 to 4 sentences. What YOU did (not the team). Decisions, trade-offs.</div>
            <div><strong className="text-indigo-600">R. Result.</strong> 1 sentence with a number. What changed because of you.</div>
          </div>
        </div>
        <p className="mt-4">
          Every behavioural answer fits in 90 seconds if you respect the proportions. Candidates who ramble on Situation for 2 minutes never get to Result and lose the question.
        </p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Top 10 interview mistakes</h2>
        <ul className="space-y-3">
          {[
            'Rehearsing answers so tight they sound scripted. Leave room to breathe.',
            'Answering for the team ("we did...") instead of yourself ("I...").',
            'Over-describing Situation. Interviewer wants Action and Result.',
            'No numbers. Every project story needs at least one metric.',
            'Bashing a previous employer. Instant red flag.',
            'Asking zero thoughtful questions at the end.',
            'Not researching the company enough to name one specific thing.',
            'Giving fake weaknesses ("I work too hard").',
            'Interrupting the interviewer. Let them finish.',
            'Arriving un-slept. Sleep beats one more hour of prep the night before.',
          ].map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-3 text-sm text-gray-700">{m}</li>
          ))}
        </ul>
      </section>

      <section id="prep" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 48-hour prep plan</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Day 1 (2 hours)</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Re-read the JD. Highlight 5 key requirements.</li>
              <li>Pick 6 stories from your past 3 roles that cover those 5 plus one failure.</li>
              <li>Write each as STAR bullets (not scripts).</li>
              <li>Research company: last 2 earnings / blog posts / recent news.</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Day 2 (1.5 hours)</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Mock-interview out loud (phone voice recorder). Play back.</li>
              <li>Time each story. Anything over 2 minutes, cut.</li>
              <li>Prepare 3 questions for the interviewer.</li>
              <li>Lay out outfit, test the video/audio setup, write down the interviewer names.</li>
            </ul>
          </div>
        </div>
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
            { q: 'Should I memorise answers word-for-word?', a: 'No. Memorise structure (STAR) and your 6 to 8 stories. Variations in wording make you sound human; rehearsed scripts sound robotic.' },
            { q: 'How long should my answers be?', a: '60 to 120 seconds for behavioural, 2 to 4 minutes for technical deep dives. If you are over 2 minutes on a behavioural, you are padding.' },
            { q: 'Is it OK to say "I do not know"?', a: 'Yes, paired with how you would find out. "I have not worked on X specifically; here is how I would approach it." Bluffing loses more offers than admitting a gap.' },
            { q: 'Should I take notes during the interview?', a: 'Yes, briefly. A notepad for interviewer names and one-word triggers is fine. Do not type on a laptop; it breaks eye contact.' },
            { q: 'Should I ask about salary in the first round?', a: 'Only if they ask you first. Otherwise wait until the offer stage. Asking too early signals misaligned priorities.' },
            { q: 'How do I answer when I do not have the exact experience they want?', a: 'Bridge with the closest equivalent plus learning speed. "I have not used X, but I shipped Y which solves the same problem; I can ramp on X in 2 weeks."' },
            { q: 'What if I bomb one question?', a: 'Acknowledge, move on. "Let me come back to that" works. Do not let one weak answer hijack the rest of the round.' },
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
          Every answer above is easier to tell when your resume already has the story bank. Build one in 10 minutes, free.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Build my resume free
        </button>
      </section>
    </BlogPostLayout>
  );
}
