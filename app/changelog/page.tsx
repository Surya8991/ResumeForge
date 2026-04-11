'use client';

import Link from 'next/link';
import { Plus, Zap, Tag } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  added: string[];
  improved: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.3.0',
    date: 'April 11, 2026',
    title: 'PDF Import & Multi-Profile Support',
    added: [
      'PDF import support via pdfjs-dist -- upload existing PDF resumes and extract content automatically.',
      'Multiple resume profiles -- save up to 10 separate resume versions, each with its own data and template selection.',
      'Template preview modal with full-size preview before applying a template.',
      'Drag-and-drop entry reordering within Experience, Education, and Projects sections.',
    ],
    improved: [
      'Print CSS polish with color-adjust: exact, proper page-break rules, and consistent spacing across all templates.',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'April 11, 2026',
    title: 'UI Modernization',
    added: [],
    improved: [
      'Modernized help dialog with icons, card-based layout, and gradient header for a cleaner look.',
      'Modernized onboarding flow with progress bar, achievement badges, and larger action buttons.',
      'Updated README with expanded Getting Started instructions and inline changelog.',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'April 11, 2026',
    title: 'ATS Tools & AI Gap Analysis',
    added: [
      '12 ATS analysis tools: readability score, formatting checker, active voice detector, industry keywords matcher, section completeness, bullet point analyzer, quantification checker, verb strength analyzer, length optimizer, consistency checker, contact info validator, and file format advisor.',
      '20 industries with 201 roles and 25-30 keywords each for targeted keyword analysis.',
      'AI Gap Analysis powered by Groq -- identify missing skills and experience relative to job descriptions.',
      'HelpTip tooltips on all major sections to guide users through the resume building process.',
      'Custom section dropdown navigator for quick access to resume sections.',
      'Smart Matching suggestion triggered on job title input to recommend relevant keywords.',
      'Clickable contact links (email, phone, LinkedIn, GitHub) in all 20 templates.',
    ],
    improved: [
      'Navbar redesign with better navigation and branding.',
      'Footer update with improved layout and links.',
      'Text size adjustments across the application for better readability.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'April 10, 2026',
    title: 'Initial Release',
    added: [
      'Initial release of ResumeForge.',
      '20 professionally designed resume templates, each ATS-optimized.',
      'AI writing assistant powered by Groq for generating summaries, bullet points, and cover letters.',
      'Cover letter builder with customizable templates.',
      'ATS score checker with job description keyword matching.',
      'Multi-format import: DOCX, TXT, HTML, and Markdown.',
      'Multi-format export: PDF, DOCX, and HTML.',
      'Dark mode and light mode with system preference detection.',
      'Progressive Web App (PWA) support for offline use.',
      'SEO optimization with meta tags and Open Graph support.',
      'Fully client-side -- no data ever leaves the browser.',
      'localStorage-based data persistence.',
      'Responsive design for desktop, tablet, and mobile.',
    ],
    improved: [],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">Changelog</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            All notable changes and updates to ResumeForge, documented by version.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

            <div className="space-y-12">
              {CHANGELOG.map((entry, index) => (
                <div key={entry.version} className={`relative md:pl-16 animate-slide-in-left delay-${Math.min((index + 1) * 100, 500)}`}>
                  {/* Dot */}
                  <div className="absolute left-4 top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow hidden md:block" />

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        <Tag className="h-3.5 w-3.5" />
                        {entry.version}
                      </span>
                      <span className="text-gray-500 text-sm">{entry.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{entry.title}</h3>

                    {entry.added.length > 0 && (
                      <div className="mb-4">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                          <Plus className="h-4 w-4" /> Added
                        </h4>
                        <ul className="space-y-2">
                          {entry.added.map((item, i) => (
                            <li key={i} className="flex gap-2 text-gray-600 text-sm">
                              <span className="text-green-500 mt-1 shrink-0">&#8226;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.improved.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                          <Zap className="h-4 w-4" /> Improved
                        </h4>
                        <ul className="space-y-2">
                          {entry.improved.map((item, i) => (
                            <li key={i} className="flex gap-2 text-gray-600 text-sm">
                              <span className="text-blue-500 mt-1 shrink-0">&#8226;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
