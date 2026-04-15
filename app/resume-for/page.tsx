'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Building2, Globe2, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';
import { COMPANIES, getCompaniesByTier } from '@/lib/resumeCompanyData';

export default function ResumeForHubPage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Company Resume Guides 2026 - 22 Top Employers | ResumeBuildz';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Tailored resume guides for 22 top global and Indian companies including Google, Amazon, McKinsey, TCS, Infosys, Flipkart, Razorpay, and more. Real keywords, formatting tips, recommended templates.'
      );
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Tailored resume guides for 22 top global and Indian companies. Real keywords, formatting tips, recommended templates.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Company Resume Guides 2026 - 22 Top Employers | ResumeBuildz');
  }, []);

  const globalCompanies = getCompaniesByTier('Global');
  const indiaCompanies = getCompaniesByTier('India');

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            Company Resume Guides
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Resume Guides for {COMPANIES.length} Top Companies
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Each guide includes the exact keywords recruiters scan for, the resume tips that actually work, and our recommended template, based on how each company really screens applicants.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in-up delay-200">
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
              <Globe2 className="h-3.5 w-3.5" /> {globalCompanies.length} Global
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5" /> {indiaCompanies.length} India
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> Updated for 2026
            </span>
          </div>
        </div>
      </section>

      {/* Global Companies */}
      <section className="bg-white py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Globe2 className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Global Companies</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            How to write a resume that wins at the world&apos;s most selective employers. Each guide is built from public hiring signal, recruiter interviews, and the company&apos;s own publicly stated screening criteria.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {globalCompanies.map((c, i) => (
              <Link
                key={c.slug}
                href={`/resume-for/${c.slug}`}
                className={`group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition p-5 animate-fade-in-up delay-${Math.min((i + 1) * 50, 500)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{c.industry}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">{c.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{c.hq}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                  Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* India Companies */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">India&apos;s Top Employers</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Tailored guidance for India&apos;s largest IT services, fintech, e-commerce, edtech, and SaaS companies. Built around real Indian hiring portals (TCS NQT, Infosys InfyTQ, Wipro NTH) and the keywords that actually pass their internal ATS.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {indiaCompanies.map((c, i) => (
              <Link
                key={c.slug}
                href={`/resume-for/${c.slug}`}
                className={`group bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition p-5 animate-fade-in-up delay-${Math.min((i + 1) * 50, 500)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
                    <Building2 className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{c.industry}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition">{c.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{c.hq}</p>
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-medium">
                  Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why these guides */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">Why a Company-Specific Resume Wins</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Different ATS, different rules</h3>
              <p className="text-sm text-gray-600">Workday, Greenhouse, Lever, and TCS&apos;s internal portal all parse differently. A resume that flies through one can fail another.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Each company has a screening philosophy</h3>
              <p className="text-sm text-gray-600">Amazon screens for Leadership Principles. McKinsey screens for distinctive achievement. Google screens for impact at scale. Match the philosophy.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Keyword density beats keyword presence</h3>
              <p className="text-sm text-gray-600">It is not enough to mention Java once. The ATS ranks resumes by how many times relevant terms appear in the right sections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to build your company-specific resume?</h2>
          <p className="text-blue-100 mb-6">
            Pick a template, tailor your bullets to one of these companies, and run it through our free ATS checker before you apply.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openGateway('/builder')}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
            >
              Build My Resume <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/templates"
              className="bg-blue-700/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700/60 transition border border-white/30"
            >
              Browse 20 Templates
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
