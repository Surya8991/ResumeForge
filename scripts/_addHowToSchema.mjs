import fs from 'node:fs';

const HOWTOS = {
  'tell-me-about-yourself': {
    name: 'How to Answer "Tell Me About Yourself" in an Interview',
    description: 'A 3-part present-past-future formula for the opening interview question, delivered in 60 to 90 seconds.',
    totalTime: 'PT2M',
    steps: [
      { name: 'Present (20 to 30 seconds)', text: 'State your current role and what you are working on right now. Include one line that signals scope (team size, revenue, users, or a named product).' },
      { name: 'Past (30 to 40 seconds)', text: 'Describe one or two past roles or wins most relevant to this job. Pick the ones that bridge to the role you are interviewing for.' },
      { name: 'Future (10 to 20 seconds)', text: 'Close with why this role, at this company, right now. Name a specific reason tied to the company or team.' },
    ],
  },
  'star-method-examples': {
    name: 'How to Answer a Behavioural Interview Question Using STAR',
    description: 'The 90-second STAR formula (Situation, Task, Action, Result) for answering Tell me about a time when questions.',
    totalTime: 'PT2M',
    steps: [
      { name: 'Situation (10 to 15 seconds)', text: 'State where, when, and what your role was. Concrete and brief. Avoid generic context.' },
      { name: 'Task (10 seconds)', text: 'Name the specific problem you owned and what success looked like.' },
      { name: 'Action (40 to 50 seconds)', text: 'Describe what YOU did (not the team). Decisions, tradeoffs, how you moved through blockers. This is the scored beat.' },
      { name: 'Result (15 to 20 seconds)', text: 'Close with the measurable outcome and a number. For failure stories, add a one-line lesson learned.' },
    ],
  },
  'salary-negotiation-scripts': {
    name: 'How to Negotiate a Job Offer',
    description: 'A 5-step playbook to negotiate cash, equity, sign-on, and start date across India and US markets.',
    totalTime: 'PT7D',
    steps: [
      { name: 'Research market data', text: 'Pull compensation ranges from Levels.fyi, Glassdoor, AmbitionBox. Triangulate 3 sources and anchor at the 75th percentile for your level.' },
      { name: 'Ask for time to review', text: 'Request 24 to 48 hours before responding. Never accept or counter the same day you receive the offer.' },
      { name: 'Counter with a specific number', text: 'Propose a precise figure backed by your research. Use email so everything is in writing.' },
      { name: 'Negotiate non-cash levers', text: 'Sign-on bonus, equity, PTO, start date, WFH days, title. Each is its own negotiation with its own budget.' },
      { name: 'Get the final offer in writing', text: 'Never accept verbally. Confirm the full package (base, bonus, equity, joining date) via signed offer letter before resigning anywhere.' },
    ],
  },
  'why-should-we-hire-you': {
    name: 'How to Answer "Why Should We Hire You"',
    description: 'A 60-to-90-second pitch structured around Problem, Proof, and Compounding.',
    totalTime: 'PT2M',
    steps: [
      { name: 'Name the Problem', text: 'State the specific problem the role exists to solve. Pull it from the JD, earnings calls, or the LinkedIn profiles of the team.' },
      { name: 'Give one Proof point', text: 'Describe your closest past win that addresses the same problem, in one sentence with a metric.' },
      { name: 'Close with Compounding value', text: 'Name the non-obvious value you will keep generating in months 6, 12, and 24 that the next candidate cannot match.' },
    ],
  },
  'tailor-resume': {
    name: 'How to Tailor a Resume to a Job Description in 10 Minutes',
    description: 'A minute-by-minute process to customise your resume without rewriting it from scratch.',
    totalTime: 'PT10M',
    steps: [
      { name: 'Read the JD and highlight 5 key requirements', text: 'Focus on hard skills, tools, and responsibilities the JD repeats or leads with.' },
      { name: 'Rewrite the summary to mention the top 2 requirements', text: 'One line that mirrors the language of the JD while staying true to your actual experience.' },
      { name: 'Swap your top 3 bullets to match JD language', text: 'Replace verbs and nouns in your strongest bullets with terms directly from the JD, where it is honest.' },
      { name: 'Reorder the Skills section', text: 'Put the JD-matched skills first. Cap at 12 to 15 skills.' },
      { name: 'Re-export with a company-named filename', text: 'Save as firstname-lastname-company.pdf so the file itself signals intent to the recruiter.' },
    ],
  },
  'cover-letter': {
    name: 'How to Write a Cover Letter',
    description: 'A 4-paragraph structure for a cover letter that actually gets read and pairs with your resume.',
    totalTime: 'PT45M',
    steps: [
      { name: 'Open with specific intent', text: 'State the role you are applying for and one concrete reason you want it at this company (recent launch, team, strategy). No generic praise.' },
      { name: 'Show proof that matches the top JD requirement', text: 'One paragraph with a measurable past win that mirrors the most important responsibility listed in the JD.' },
      { name: 'Address the problem the role is hired to solve', text: 'Name the problem explicitly and describe how you will approach it in the first 90 days. This differentiates you from generic cover letters.' },
      { name: 'Close with a clear next step', text: 'One sentence thanking the reader and proposing the next step (call, interview, portfolio walkthrough).' },
    ],
  },
};

let n = 0;
for (const slug in HOWTOS) {
  const p = `app/${slug}/page.tsx`;
  if (!fs.existsSync(p)) { console.log('missing', p); continue; }
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('howToSchema')) { console.log('skip (already has howToSchema)', slug); continue; }

  // 1. Add howToSchema to imports
  s = s.replace(
    /(articleSchema,\s*breadcrumbSchema,\s*faqPageSchema,)/,
    `$1 howToSchema,`
  );
  if (!s.includes('howToSchema,')) {
    console.log('failed import for', slug); continue;
  }

  // 2. Build the call
  const ht = HOWTOS[slug];
  const stepsSrc = ht.steps.map(st => `        { name: ${JSON.stringify(st.name)}, text: ${JSON.stringify(st.text)} }`).join(',\n');
  const insert = `    howToSchema({\n      name: ${JSON.stringify(ht.name)},\n      description: ${JSON.stringify(ht.description)},\n      totalTime: ${JSON.stringify(ht.totalTime)},\n      steps: [\n${stepsSrc},\n      ],\n    }),\n`;

  // 3. Insert BEFORE breadcrumbSchema([...]) call
  s = s.replace(
    /(\s+)(breadcrumbSchema\(\[)/,
    `$1${insert.trimStart()}$1$2`
  );

  fs.writeFileSync(p, s);
  n++;
  console.log('patched', slug);
}
console.log('patched', n, 'pages with howToSchema');
