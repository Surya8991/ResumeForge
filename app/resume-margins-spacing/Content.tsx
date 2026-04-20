'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const SPEC = [
  { item: 'Page size', value: 'A4 (210 x 297 mm) for India / EU / rest of world; US Letter (8.5 x 11 in) for US applications. Same resume, different page size on export.' },
  { item: 'Top / bottom margins', value: '0.5 in (1.27 cm) minimum, 0.75 in (1.9 cm) preferred. Under 0.5 risks getting clipped on some printers.' },
  { item: 'Left / right margins', value: '0.5 in (1.27 cm) minimum, 0.7 in (1.78 cm) preferred. Asymmetric margins (larger on one side) break hierarchy; keep L/R equal.' },
  { item: 'Line height (leading)', value: '1.15 to 1.25 for body bullets. 1.0 is too tight. 1.5 is too loose (wastes vertical space).' },
  { item: 'Space between sections', value: '10 to 14 pt of vertical space. Enough that sections feel distinct; not so much that it looks like wasted real estate.' },
  { item: 'Space between bullets', value: '2 to 4 pt. Bullets should feel grouped, not crowded.' },
  { item: 'Space between paragraphs', value: '4 to 6 pt if you use narrative paragraphs (summaries). Keep tighter than section spacing.' },
  { item: 'Indent for bullets', value: '0.2 to 0.25 in from the paragraph margin. Second-line hangs should align with the bullet character, not with the first character.' },
];

const FIX = [
  { problem: 'Resume looks cramped', fix: 'Increase line-height to 1.2, add 2pt between bullets, reduce body font from 11 to 10.5 pt. Re-check.' },
  { problem: 'Page 2 has only 3 lines', fix: 'Either expand content on page 1 to push more to page 2 (minimum 60 percent fill), or tighten to a single page.' },
  { problem: 'Headings blend into body', fix: 'Make heading 2 to 3 pt larger, bold, and add 6 pt of extra space above. A subtle horizontal rule under headings also works.' },
  { problem: 'Left margin feels wasteful', fix: 'Left-align everything. Centre-aligned section headings break scannability. Pick left and keep it.' },
  { problem: 'Text hits the page edge', fix: 'Increase margin to 0.75 in. Printers often have ~0.2 in unprintable edge; 0.5 in is the absolute minimum safe margin.' },
];

const TOC = [
  { id: 'intro', label: 'Why margins and spacing matter' },
  { id: 'spec', label: 'The exact spec (8 values)' },
  { id: 'single-vs-two', label: 'Single page vs two page spacing' },
  { id: 'columns', label: '1-column vs 2-column (which ATS prefers)' },
  { id: 'fix', label: 'Common layout problems + fixes' },
  { id: 'setup', label: 'How to set margins in Word / Docs / LaTeX' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
    { title: "How to Write a Resume Headline That Gets Clicks", slug: "resume-headline", excerpt: "4-part formula, 15 examples by role, and how it differs from a LinkedIn headline.", read: 9 },
    { title: "STAR Method: 8 Full Examples", slug: "star-method-examples", excerpt: "90-second STAR formula with worked examples across 8 industries.", read: 15 },
  { title: 'Best Resume Fonts 2026', slug: 'best-resume-fonts', excerpt: '10 fonts tested across 4 ATS platforms.', read: 12 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, certifications, tools.', read: 11 },
];

export default function ResumeMarginsSpacingPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Resume margins and spacing"
      title="Resume Margins & Spacing: The Ideal Setup (2026)"
      subtitle="The exact margin, line-height, and section-spacing values that make a resume feel professional, parse cleanly on ATS, and leave room for content. 8-point spec plus common layout fixes."
      dateModified="2026-05-14"
      readingTime={10}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Content is king, but layout is the frame that makes content readable. Tight margins and cramped spacing make recruiters squint and trigger ATS parse failures on some platforms. Loose spacing wastes real estate and makes a thin resume look thinner. This guide gives you the exact millimetre values that work across Word, Google Docs, and LaTeX exports.
          </p>
        </div>
        <p>
          The difference between a resume that feels professional and one that does not is rarely the content. It is the breathing room. Recruiters decide in 7 seconds whether to keep reading; cramped layouts trigger a no before they process a single word. Loose layouts look amateur in the opposite direction. The target is a Goldilocks zone: enough whitespace that sections feel distinct, tight enough that every inch earns its keep.
        </p>
      </section>

      <section id="spec" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The exact spec: 8 values to set</h2>
        <div className="space-y-3">
          {SPEC.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.item}</p>
              <p className="text-sm text-gray-700">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="single-vs-two" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Single page vs two page spacing</h2>
        <p className="mb-3">On a single-page resume, run tighter: 0.5 in margins, 1.15 line-height, 10 pt between sections. You are fighting for space. On a two-page resume you can relax: 0.75 in margins, 1.2 line-height, 12 pt between sections. The goal is to make page 2 look deliberately filled, not padded. Minimum 60 percent fill on page 2 or cut back to one page.</p>
      </section>

      <section id="columns" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1-column vs 2-column (which ATS prefers)</h2>
        <p>Single column, every time, for ATS-bound resumes. Most ATS parsers read top to bottom, left to right, and interpret 2-column layouts as scrambled content (headings glued to the wrong bullet). 2-column is fine for recruiter-handed-directly resumes (executive search, creative roles) but those are the minority. Default to one column.</p>
      </section>

      <section id="fix" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Common layout problems + fixes</h2>
        <ul className="space-y-3">
          {FIX.map((f, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{f.problem}</p>
              <p className="text-sm text-gray-700">{f.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="setup" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to set margins in Word / Docs / LaTeX</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>MS Word:</strong> Layout, Margins, Custom Margins. Set top / bottom / left / right to 0.7 in. For line-height: Home, Paragraph, Line spacing, Multiple, 1.2.</li>
          <li><strong>Google Docs:</strong> File, Page setup, margins (top / bottom / left / right 1.78 cm). Line spacing: Format, Line spacing, Custom spacing, 1.2.</li>
          <li><strong>LaTeX:</strong> Use the geometry package. Example: usepackage[margin=0.7in]{'{geometry}'}. Line-height via onehalfspacing from setspace or linespread{'{1.15}'}.</li>
          <li><strong>Figma / Canva:</strong> Set frame to 612 x 792 pt (US Letter) or 595 x 842 pt (A4). Use a 0.5 in safe-zone guide on all four sides.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://practicaltypography.com/page-margins.html" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Butterick Practical Typography: page margins</a></li>
          <li><a href="https://fonts.google.com/knowledge/using_type/working_with_line_height" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Google Fonts on line-height fundamentals</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/resume-margins" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide on resume margins</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Are 0.5 in margins too tight?', a: 'Marginal (pun intended). 0.5 in is the minimum safe value that still prints cleanly. Preferred is 0.7 to 0.75 in. Do not go below 0.5.' },
            { q: 'Does ATS care about margins?', a: 'Not directly. ATS parses text content, not margins. But margins affect how much content fits, and ATS does care about the resulting content layout (single column, clear section headings).' },
            { q: 'Can I use different margins on a 2-page resume?', a: 'No. Keep margins identical across both pages. Different margins make the document feel inconsistent.' },
            { q: 'How much space should I put between sections?', a: '10 to 14 pt. Enough to visually separate Experience from Skills from Education, not so much that the second page is half empty.' },
            { q: 'Is 1.0 line-height too tight?', a: 'Yes. Text feels crammed together and reduces readability by ~20 percent. Minimum 1.15, preferred 1.2.' },
            { q: 'Should headers have extra space before them?', a: 'Yes. 6 to 8 pt of space before a section heading signals visual break. Pair with a 2 to 3 pt bolder size.' },
            { q: 'Does my printer matter for margin choice?', a: 'Most modern printers have a ~0.17 in unprintable edge. 0.5 in margins are safe. Only go tighter if you know the recipient uses a specific office setup.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build with margin defaults that just work</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz uses the exact 0.7 in margins, 1.2 line-height, and 12 pt section spacing covered above. Zero layout tweaking required.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
