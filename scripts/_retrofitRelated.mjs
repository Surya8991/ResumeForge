import fs from 'node:fs';

// Post metadata for the 2 new posts to prepend per category.
// Ensures link authority flows from older posts to the new Weeks 5-17 batch.
const NEW_POSTS = {
  'resume-headline': { title: 'How to Write a Resume Headline That Gets Clicks', read: 9, excerpt: '4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.' },
  'resume-margins-spacing': { title: 'Resume Margins & Spacing: The Ideal Setup', read: 10, excerpt: '8-point spec for margins, line height, and section spacing that parses cleanly.' },
  'resume-objective-vs-summary': { title: 'Resume Objective vs Summary: When to Use Each', read: 9, excerpt: 'The decision rule plus 8 weak-vs-strong examples.' },
  'certifications-on-resume': { title: 'How to List Certifications on a Resume by Field', read: 11, excerpt: 'Format rules and top 5 certs for 8 fields.' },
  'workday-resume-tips': { title: 'Workday Resume Tips That Actually Pass', read: 11, excerpt: '8 tactical tips for Workday-powered ATS + Profile Sync gotcha.' },
  'greenhouse-ats-tips': { title: 'Greenhouse ATS: How to Stand Out in Startup Hiring', read: 11, excerpt: 'Greenhouse parsing rules, scorecard flow, and auto-reject logic.' },
  'icims-taleo-resume': { title: 'iCIMS and Taleo: Legacy ATS Rules', read: 11, excerpt: '8 rules for legacy ATS and the mistakes that drop your match score.' },
  'resume-keywords-by-industry': { title: 'Resume Keywords by Industry: 12 Industries', read: 14, excerpt: '20 to 30 keywords per industry plus a 3-minute JD-keyword extractor.' },
  'tell-me-about-yourself': { title: 'How to Answer Tell Me About Yourself (10 Examples)', read: 13, excerpt: '3-part present-past-future formula with weak/strong pairs.' },
  'star-method-examples': { title: 'STAR Method: 8 Full Examples', read: 15, excerpt: '90-second STAR formula with worked examples across 8 industries.' },
  'why-should-we-hire-you': { title: 'How to Answer Why Should We Hire You', read: 12, excerpt: '3-pillar formula with 8 examples and the 6 answer-killing mistakes.' },
  'interview-questions-and-answers': { title: '100 Common Interview Questions & Answers', read: 16, excerpt: 'Behavioural, technical, tricky, closing categories.' },
  'resume-for-promotion': { title: 'Resume for a Promotion: Internal Transfer Playbook', read: 12, excerpt: 'Promotion Case Doc framework + 5 examples.' },
  'resume-after-parental-leave': { title: 'Resume After Maternity or Paternity Leave', read: 11, excerpt: 'Framing that works, returnship programmes, and the flex conversation.' },
  'resume-over-50': { title: 'Resume for Over 50: Beat Age Bias', read: 12, excerpt: '7 tactics and 4 worked summaries for older workers.' },
  'chatgpt-prompts-resume': { title: '50 ChatGPT Prompts for Resume Writing', read: 14, excerpt: '50 copy-paste prompts across 6 categories plus 5 tips for better output.' },
  'claude-prompts-job-search': { title: '30 Claude Prompts for Job Search', read: 12, excerpt: '30 prompts across resume, cover letter, mocks, negotiation, LinkedIn.' },
  'ai-rewrite-bullets': { title: 'How to Rewrite Resume Bullets with AI', read: 13, excerpt: '20 before/after pairs across 6 roles plus the 6 hallucination patterns.' },
  'tcs-nqt-resume-guide': { title: 'TCS NQT 2026: Resume & Process Playbook', read: 14, excerpt: '5-round process + TCS iON-safe resume format.' },
  'infosys-infytq-guide': { title: 'Infosys InfyTQ Certification: Full Guide', read: 15, excerpt: '5-phase process, Foundation + Advanced syllabus, HackWithInfy.' },
  'wipro-elite-nth-guide': { title: 'Wipro Elite NTH 2026: Syllabus & Process', read: 13, excerpt: '3-round process, full syllabus, Elite vs Turbo Hire.' },
};

// For each target category, pick 2 new posts to prepend.
const PICKS = {
  'resume-writing': ['resume-headline', 'resume-margins-spacing'],
  'ats-keywords': ['workday-resume-tips', 'greenhouse-ats-tips'],
  'interviews-cover-letters': ['star-method-examples', 'interview-questions-and-answers'],
  'career-transitions': ['resume-for-promotion', 'resume-over-50'],
  'ai-resume': ['chatgpt-prompts-resume', 'ai-rewrite-bullets'],
  'india-hiring': ['tcs-nqt-resume-guide', 'infosys-infytq-guide'],
};

// Map each target old-post slug to its category (for picks).
const TARGETS = {
  'pass-ats-resume-scanning': 'ats-keywords',
  'resume-action-verbs': 'resume-writing',
  'resume-length': 'resume-writing',
  'resume-summary-examples': 'resume-writing',
  'resume-format-guide': 'resume-writing',
  'quantify-resume-achievements': 'resume-writing',
  'cover-letter-vs-resume': 'interviews-cover-letters',
  'tailor-resume': 'ats-keywords',
  'best-free-resume-builder': 'ai-resume',
  'ai-resume-builders-tested': 'ai-resume',
  'fresher-resume': 'resume-writing',
  'resume-tips': 'resume-writing',
  'ats-guide': 'ats-keywords',
  'resume-after-layoff': 'career-transitions',
  'resume-after-career-gap': 'career-transitions',
  'resume-for-career-change': 'career-transitions',
  'cover-letter': 'interviews-cover-letters',
  'campus-placement-resume': 'india-hiring',
  'naukri-resume-tips': 'india-hiring',
  // Weeks 1-4 additions:
  'interview-questions-and-answers': 'interviews-cover-letters',
  'resume-skills-list': 'resume-writing',
  'tcs-nqt-resume-guide': 'india-hiring',
  'tell-me-about-yourself': 'interviews-cover-letters',
  'linkedin-url-on-resume': 'resume-writing',
  'infosys-infytq-guide': 'india-hiring',
  'star-method-examples': 'interviews-cover-letters',
  'best-resume-fonts': 'resume-writing',
  'wipro-elite-nth-guide': 'india-hiring',
  'why-should-we-hire-you': 'interviews-cover-letters',
  'resume-margins-spacing': 'resume-writing',
  'workday-resume-tips': 'ats-keywords',
};

let n = 0;
for (const slug in TARGETS) {
  const p = `app/${slug}/Content.tsx`;
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, 'utf8');

  const cat = TARGETS[slug];
  let picks = PICKS[cat];
  // Drop picks equal to current slug (self-link)
  picks = picks.filter(x => x !== slug);
  if (picks.length < 2) {
    // Fallback: append one cross-category (always safe pick)
    if (picks.length === 1) picks.push(cat === 'resume-writing' ? 'star-method-examples' : 'resume-headline');
    else picks = ['star-method-examples', 'resume-headline'];
  }

  // Extract existing RELATED slugs to avoid duplicates
  const existingBlock = s.match(/const RELATED = \[([\s\S]*?)\];/);
  if (!existingBlock) { console.log('no RELATED in', slug); continue; }
  const existingSlugs = [...existingBlock[1].matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);
  const toAdd = picks.filter(p => !existingSlugs.includes(p));
  if (toAdd.length === 0) { console.log('already has picks for', slug); continue; }

  // Build new items
  const newItems = toAdd.map(newSlug => {
    const meta = NEW_POSTS[newSlug];
    if (!meta) return null;
    return `    { title: ${JSON.stringify(meta.title)}, slug: ${JSON.stringify(newSlug)}, excerpt: ${JSON.stringify(meta.excerpt)}, read: ${meta.read} },`;
  }).filter(Boolean).join('\n');
  if (!newItems) continue;

  // Prepend to the RELATED array: insert after `const RELATED = [\n`
  s = s.replace(/const RELATED = \[\n/, `const RELATED = [\n${newItems}\n`);

  // Trim to 5 items: if the array now has >5, drop the last N-5
  // Count items by counting `{ title:` occurrences inside the new RELATED block
  const updated = s.match(/const RELATED = \[([\s\S]*?)\n\];/);
  if (updated) {
    const items = updated[1].split(/\n(?=\s{4}\{ title:)/);
    if (items.length > 5) {
      const trimmed = items.slice(0, 5).join('\n');
      s = s.replace(/const RELATED = \[([\s\S]*?)\n\];/, `const RELATED = [\n${trimmed.replace(/^\n/, '')}\n];`);
    }
  }

  fs.writeFileSync(p, s);
  n++;
  console.log('retrofit', slug, '+', toAdd.join(', '));
}
console.log('retrofitted', n, 'Content.tsx');
