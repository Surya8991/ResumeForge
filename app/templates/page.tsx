'use client';

import Link from 'next/link';
import { FileText, Filter } from 'lucide-react';
import { useState } from 'react';
import { TEMPLATES } from '@/types/resume';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

const STYLE_TAGS: Record<string, string> = {
  classic: 'Classic',
  modern: 'Modern',
  minimalist: 'Minimal',
  professional: 'Professional',
  executive: 'Professional',
  creative: 'Creative',
  compact: 'Minimal',
  tech: 'Modern',
  elegant: 'Classic',
  bold: 'Modern',
  academic: 'Classic',
  corporate: 'Professional',
  nordic: 'Minimal',
  gradient: 'Modern',
  timeline: 'Creative',
  sidebar: 'Modern',
  infographic: 'Creative',
  federal: 'Professional',
  startup: 'Creative',
  monochrome: 'Minimal',
};

const FILTER_OPTIONS = ['All', 'Classic', 'Modern', 'Creative', 'Minimal', 'Professional'];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => STYLE_TAGS[t.name] === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">20 ATS-Friendly Templates</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Every template is designed to pass Applicant Tracking Systems while looking great on screen and in print.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-10 animate-fade-in delay-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  activeFilter === f
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="bg-gray-50 py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No templates match this filter.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((t, i) => (
                <div key={t.name} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group animate-scale-in delay-${Math.min((i + 1) * 100, 500)}`}>
                  <div className="h-56 relative bg-gray-100 overflow-hidden">
                    <img
                      src={`/templates/${t.name}.png`}
                      alt={`${t.label} template preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{t.label}</h3>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {STYLE_TAGS[t.name]}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{t.description}</p>
                    <Link
                      href="/builder"
                      className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
