'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const PHASES = [
  { name: 'Phase 1, Registration & Profile', who: 'CS / IT / Circuit branch students in their 5th or 6th semester', what: 'Sign up on Infosys Springboard (the InfyTQ platform) using your college email. Complete the profile, verify email, link your academic details.', outcome: 'Access to the full learning track + assessment schedule.' },
  { name: 'Phase 2, Foundation Learning Track', who: 'All registered students', what: 'Self-paced modules on Programming Fundamentals (Python), Data Structures, Database Management (SQL), and OOP. ~120 hours of structured content.', outcome: 'Foundation certificate. Required to sit the Foundation Assessment.' },
  { name: 'Phase 3, Foundation Certification Assessment', who: 'Students who cleared the learning track', what: 'Online proctored test covering Python, DSA basics, DBMS, and OOP. ~70 questions in 90 minutes.', outcome: 'Pass at 65 percent or above = Infosys Certified Software Developer (Foundation).' },
  { name: 'Phase 4, Advanced Certification', who: 'Foundation-certified students targeting higher roles', what: 'Advanced modules on full-stack (Java / Angular), cloud fundamentals, microservices. Paid with a modest fee; college placement cells often sponsor.', outcome: 'Advanced certificate (Infosys Certified Software Developer, Advanced). Qualifier for Digital and Power Programmer interviews.' },
  { name: 'Phase 5, Interview Shortlisting', who: 'Certified candidates (Foundation or Advanced) in their final year', what: 'Infosys reaches out via InfyTQ platform + email. Technical interview (45 min) + HR round.', outcome: 'Offer letter for Systems Engineer (Foundation) or Digital Specialist Engineer (Advanced) role.' },
];

const ROLES_OFFERED = [
  { role: 'Systems Engineer', pack: 'Rs 3.6 LPA', track: 'Foundation', location: 'Bengaluru / Mysore / Pune / Chennai / Hyderabad' },
  { role: 'Digital Specialist Engineer', pack: 'Rs 6.5 LPA', track: 'Advanced', location: 'Bengaluru / Hyderabad (primary)' },
  { role: 'Power Programmer', pack: 'Rs 9.5 LPA', track: 'Advanced + HackWithInfy Finalist', location: 'Bengaluru / Hyderabad' },
  { role: 'Specialist Programmer', pack: 'Rs 11 LPA', track: 'Advanced + top HackWithInfy', location: 'Bengaluru' },
];

const SYLLABUS = {
  foundation: [
    'Python: syntax, data types, functions, OOP (classes, inheritance, polymorphism), file handling',
    'Data Structures: lists, stacks, queues, linked lists, trees, hashmaps, basic sorting / searching',
    'DBMS: SQL (SELECT, JOIN, subqueries, aggregations), normalisation (1NF / 2NF / 3NF), ACID, indexing basics',
    'OOP: encapsulation, inheritance, polymorphism, abstraction; class vs object design problems',
    'Algorithmic problem-solving: 2-pointer, sliding window, basic recursion',
  ],
  advanced: [
    'Java: Collections framework, streams, multi-threading, exception handling',
    'Angular / React: components, state management, routing, API integration',
    'Microservices: REST API design, service discovery, API gateway concepts',
    'Databases advanced: indexing strategies, query optimisation, NoSQL basics (MongoDB)',
    'Cloud fundamentals: AWS EC2 / S3 / IAM basics, Azure fundamentals',
    'Agile + Scrum: sprint planning, retros, story pointing',
  ],
};

const RESUME_ADDS = [
  'Add &quot;Infosys Certified Software Developer, Foundation, 2026&quot; under Certifications with the certificate ID.',
  'If Advanced: list it separately with the same format, higher in the Certifications list.',
  'HackWithInfy finalist / semi-finalist: goes under Achievements with year + round reached.',
  'Add Infosys Springboard course completions that map to target role keywords (eg Cloud Foundations, Data Analytics).',
  'Link the certificate verification URL (infyspringboard.onwingspan.com/...) if the hiring platform supports clickable resumes.',
];

const TIMELINE = [
  { when: 'Jun - Aug', what: 'Registration window opens for the next academic year batch. Enrol as soon as your 5th semester starts.' },
  { when: 'Sep - Nov', what: 'Foundation track self-paced learning. Target 6 to 8 hours per week to finish in 3 months.' },
  { when: 'Dec - Jan', what: 'Foundation Certification Assessment. Two or three attempt windows; first-attempt clearance is best.' },
  { when: 'Feb - Mar', what: 'Advanced track (optional but highly recommended for Digital / Power Programmer roles). HackWithInfy preliminary round runs in parallel.' },
  { when: 'Apr - Jun', what: 'Interview shortlisting + offers. Infosys reaches out via InfyTQ platform and college TPO.' },
  { when: 'Jul - Sep', what: 'Onboarding at Infosys Mysore campus. 3-month Generic Foundation Training before stream allocation.' },
];

const TOC = [
  { id: 'intro', label: 'What is InfyTQ?' },
  { id: 'phases', label: '5-phase process walkthrough' },
  { id: 'roles', label: 'Roles + packages on offer' },
  { id: 'syllabus', label: 'Foundation + Advanced syllabus' },
  { id: 'hackwithinfy', label: 'HackWithInfy: the accelerator' },
  { id: 'resume', label: 'How to show InfyTQ on your resume' },
  { id: 'timeline', label: 'Year-round timeline' },
  { id: 'interview', label: 'Interview prep (technical + HR)' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
  { title: 'TCS NQT 2026: Resume & Process Playbook', slug: 'tcs-nqt-resume-guide', excerpt: '5-round process + TCS iON-safe resume format.', read: 14 },
  { title: 'Campus Placement Resume 2026', slug: 'campus-placement-resume', excerpt: '10-point checklist + 5-round walkthrough for campus drives.', read: 10 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: '7-section template built for Indian + global ATS.', read: 11 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
  { title: '8 Naukri Resume Tips That 3x Views', slug: 'naukri-resume-tips', excerpt: 'Rank higher in recruiter filters on Naukri.', read: 9 },
];

export default function InfosysInfyTQGuidePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="Infosys InfyTQ complete guide"
      title="Infosys InfyTQ Certification: The Complete 2026 Guide"
      subtitle="Everything you need to clear Infosys InfyTQ in 2026: 5-phase process, Foundation + Advanced syllabus, roles on offer (Systems Engineer to Specialist Programmer), HackWithInfy accelerator, and how to show it on your resume."
      dateModified="2026-04-30"
      readingTime={15}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">What is InfyTQ?</p>
          <p className="text-gray-700">
            InfyTQ is Infosys&apos;s certification-and-hiring program built for pre-final and final-year engineering students. It lives on the Infosys Springboard platform (the rebranded name of the earlier Wingspan portal) and combines free self-paced learning, a Foundation certification, an Advanced paid track, and a direct interview pipeline for Systems Engineer, Digital Specialist Engineer, Power Programmer, and Specialist Programmer roles. Clearing InfyTQ is the single most reliable path into Infosys from a non-IIT campus.
          </p>
        </div>
        <p>
          Roughly 5 lakh students register for InfyTQ each academic year. Around 60 to 80 thousand clear the Foundation Certification. A smaller slice, typically 30 thousand, takes the Advanced track and gets shortlisted for Digital or Power Programmer roles that pay twice the Systems Engineer base. Understanding where the funnel narrows lets you invest your time in the phases that actually move your placement outcome.
        </p>
      </section>

      <section id="phases" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5-phase process walkthrough</h2>
        <div className="space-y-4">
          {PHASES.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2">{p.name}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Who:</strong> {p.who}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>What:</strong> {p.what}</p>
              <p className="text-sm text-gray-700"><strong>Outcome:</strong> {p.outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Roles and packages on offer</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900">Role</th>
                <th className="text-left p-3 font-semibold text-gray-900">Package (approx)</th>
                <th className="text-left p-3 font-semibold text-gray-900">Track</th>
                <th className="text-left p-3 font-semibold text-gray-900">Location</th>
              </tr>
            </thead>
            <tbody>
              {ROLES_OFFERED.map((r, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-medium text-gray-900">{r.role}</td>
                  <td className="p-3 text-gray-700">{r.pack}</td>
                  <td className="p-3 text-gray-700">{r.track}</td>
                  <td className="p-3 text-gray-700">{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-700">Numbers are typical ranges for 2025 to 2026 intakes; exact CTC varies year-to-year and by market conditions. Variable pay, joining bonus, and relocation allowance add on top.</p>
      </section>

      <section id="syllabus" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Foundation + Advanced syllabus</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-3">Foundation Track</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {SYLLABUS.foundation.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-3">Advanced Track</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {SYLLABUS.advanced.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="hackwithinfy" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">HackWithInfy: the fast-track accelerator</h2>
        <p className="mb-3">
          HackWithInfy is Infosys&apos;s annual coding competition for pre-final year students. It runs in parallel with the InfyTQ cycle and is the single fastest route to the Power Programmer (Rs 9.5 LPA) and Specialist Programmer (Rs 11 LPA) bands.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-4">
          <li><strong>Round 1:</strong> Online coding test, 3 problems in 3 hours. Focus: DSA (graphs, DP, strings). Top ~10 percent advance.</li>
          <li><strong>Round 2:</strong> Harder coding round with 2 hard problems. Top ~2 percent advance.</li>
          <li><strong>Grand Finale:</strong> Top 100 candidates compete in a live on-campus hackathon. Top 3 teams win cash prizes plus direct Specialist Programmer offers.</li>
        </ul>
        <p className="text-sm text-gray-700">Even reaching Round 2 is a strong signal that unlocks Power Programmer interviews. List the highest round reached under Achievements on your resume.</p>
      </section>

      <section id="resume" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to show InfyTQ on your resume</h2>
        <ul className="space-y-3">
          {RESUME_ADDS.map((r, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: r }} />
          ))}
        </ul>
        <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs text-gray-800 whitespace-pre-wrap">
{`CERTIFICATIONS
Infosys Certified Software Developer, Advanced   2026
   Credential ID: INFY-2026-CSDA-xxxxx

Infosys Certified Software Developer, Foundation 2025
   Credential ID: INFY-2025-CSDF-xxxxx

ACHIEVEMENTS
HackWithInfy 2025, Round 2 qualifier (top 2 percent of 2.1 lakh participants)`}
        </div>
      </section>

      <section id="timeline" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Year-round timeline</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 w-36">When</th>
                <th className="text-left p-3 font-semibold text-gray-900">What happens</th>
              </tr>
            </thead>
            <tbody>
              {TIMELINE.map((t, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-medium text-gray-900">{t.when}</td>
                  <td className="p-3 text-gray-700">{t.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview prep</h2>
        <p className="mb-4">
          <strong>Technical round (40 to 50 min):</strong> 1 project walkthrough, 1 DSA problem (medium difficulty, usually array or string), OOP concepts, DBMS queries, basic SQL. Interviewer expects clean reasoning, not optimal-first code. Explain your approach aloud, especially on DSA.
        </p>
        <p className="mb-4">
          <strong>HR round (15 to 25 min):</strong> Standard behavioural plus Infosys-specific questions: location preference (Infosys posts across 10 Indian cities), bond acceptance (typically 2 years, Rs 50,000 penalty for early exit), willingness to work on legacy tech (some client projects involve COBOL / mainframe), and salary negotiation if you cleared Advanced or HackWithInfy.
        </p>
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>Red flags to avoid:</strong> Naming only one city as acceptable. Being unclear on bond willingness. Claiming you &quot;built projects with AI&quot; without explaining what you actually wrote. Disparaging the stack (saying you prefer startups over services) in HR.
          </p>
        </div>
      </section>
      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <p className="mb-3 text-sm text-gray-700">Further reading on this topic from independent sources. All external links open in a new tab.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><a href="https://www.naukri.com/career-guidance" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Naukri Career Guidance hub</a></li>
            <li><a href="https://www.ncs.gov.in" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">National Career Service (Govt of India) portal</a></li>
            <li><a href="https://www.shine.com/career-advice" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Shine career advice archives</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is InfyTQ Foundation free?', a: 'Yes. The Foundation track + assessment is fully free for college students. The Advanced track has a modest fee (roughly Rs 3,500 to Rs 5,000) which colleges often subsidise or reimburse for placed students.' },
            { q: 'What is the pass mark for Foundation Certification?', a: '65 percent overall. Some years also enforce sectional cut-offs of 55 percent per subject. Check the current year InfyTQ portal for exact numbers.' },
            { q: 'Can I retake the Foundation Assessment?', a: 'Yes, up to 2 to 3 retake attempts per year depending on the cycle. There is usually a 30 to 60 day cooling period between attempts.' },
            { q: 'Is the Advanced certification worth the fee?', a: 'Yes if you are targeting Digital Specialist Engineer (Rs 6.5 LPA) or above. The delta between Systems Engineer and Digital salary pays back the Advanced fee in a week of work.' },
            { q: 'Can InfyTQ help me if I am from a non-CS branch?', a: 'ECE / EEE / Mech students are eligible if they have relevant projects. Non-circuit branches can register but interview selection is stricter. Build 2 strong coding projects to compensate.' },
            { q: 'Does InfyTQ count toward other companies?', a: 'The certificate itself is Infosys-branded, but the skills and Springboard learning show up on your resume as verified credentials. Several other Indian IT services firms recognise the rigor.' },
            { q: 'What is the bond at Infosys?', a: 'Typically 2 years with a Rs 50,000 penalty for early exit. The bond is legally enforceable but rarely pursued for genuine reasons (higher studies, verified medical, family emergencies).' },
            { q: 'How does HackWithInfy differ from InfyTQ?', a: 'InfyTQ is the certification track; HackWithInfy is the coding competition for elite bands. They run in parallel, and strong candidates attempt both.' },
            { q: 'What languages can I use in InfyTQ assessments?', a: 'Python is the primary language for Foundation; Advanced supports Java, Python, and C++. Use the language you are strongest in; the assessment does not reward language choice, only correctness and efficiency.' },
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
        <h2 className="text-2xl font-bold mb-3">Build an InfyTQ-ready resume free</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          ResumeBuildz renders clean single-column resumes that clear Infosys&apos;s parsing on first try, and has a dedicated Certifications block for your InfyTQ credentials.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
