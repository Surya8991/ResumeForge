'use client';

// Shared blog-post layout (docs-style). Wraps article content with:
//  - SiteNavbar + SiteFooter
//  - Left sidebar TOC (sticky, scroll-anchor links)
//  - Article header: breadcrumb, indigo category eyebrow, H1, subtitle,
//    author strip (monogram avatar + byline + dateModified + readingTime)
//  - Children render in the main column
//  - Bottom block order: Was-this-helpful row, Prev/Next nav, Related cards

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

export interface TocItem {
  id: string;
  label: string;
}

export interface RelatedItem {
  title: string;
  slug: string; // relative to site root, no leading slash
  excerpt: string;
  read: number;
}

export interface PrevNextItem {
  title: string;
  slug: string;
}

export interface BlogPostLayoutProps {
  category: string;
  breadcrumbCurrent: string;
  title: string;
  subtitle?: string;
  author?: string;
  dateModified: string; // ISO
  readingTime: number; // minutes
  toc: TocItem[];
  related?: RelatedItem[];
  prev?: PrevNextItem;
  next?: PrevNextItem;
  children: ReactNode;
}

export default function BlogPostLayout({
  category,
  breadcrumbCurrent,
  title,
  subtitle,
  author = 'Surya L',
  dateModified,
  readingTime,
  toc,
  related = [],
  prev,
  next,
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteNavbar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full grid lg:grid-cols-[260px_1fr]">
        {/* Left sidebar: On this page TOC */}
        <aside className="hidden lg:block border-r border-gray-200 py-10 px-6 sticky top-0 h-screen overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            On this page
          </p>
          <ul className="space-y-1 text-sm">
            {toc.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 line-clamp-2 pl-3 border-l-2 transition ${
                    idx === 0
                      ? 'text-gray-900 font-medium border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600 border-transparent hover:border-gray-200'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main article column */}
        <article className="py-10 px-6 md:px-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
            <Link href="/blog" className="hover:text-gray-900">
              Guides
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900">{breadcrumbCurrent}</span>
          </nav>

          {/* Category eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
            {category}
          </p>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4 scroll-mt-6">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{subtitle}</p>
          )}

          {/* Author strip */}
          <div className="flex items-center gap-4 pb-6 mb-10 border-b border-gray-200 text-sm text-gray-600 flex-wrap">
            <div
              className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0"
              aria-hidden
            >
              {author.charAt(0)}
            </div>
            <span>
              By <strong className="text-gray-900">{author}</strong>
            </span>
            <span className="text-gray-300">.</span>
            <span>Updated {formatDate(dateModified)}</span>
            <span className="text-gray-300">.</span>
            <span>{readingTime} min</span>
          </div>

          {/* Article body */}
          <div className="text-gray-800 text-[16px] leading-[1.7] blog-post-body">{children}</div>

          {/* Was this helpful */}
          <div className="mt-14 pt-6 border-t border-gray-200 flex items-center gap-3 text-sm flex-wrap">
            <p className="text-gray-500">Was this guide helpful?</p>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
              Yes
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
              No
            </button>
            <Link
              href="/contact"
              className="md:ml-auto text-indigo-600 hover:underline"
            >
              Suggest an edit
            </Link>
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav className="mt-10 grid grid-cols-2 gap-3 text-sm">
              {prev ? (
                <Link
                  href={`/${prev.slug}`}
                  className="border border-gray-200 rounded-md p-3 hover:border-indigo-300"
                >
                  <p className="text-xs text-gray-500">. Previous</p>
                  <p className="font-semibold text-gray-900">{prev.title}</p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/${next.slug}`}
                  className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 text-right"
                >
                  <p className="text-xs text-gray-500">Next .</p>
                  <p className="font-semibold text-gray-900">{next.title}</p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}

          {/* Related articles (5th bottom block, card grid) */}
          {related.length > 0 && (
            <section
              id="related"
              className="mt-16 pt-10 border-t border-gray-200 scroll-mt-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Related articles
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Keep going. More guides on adjacent topics.
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group block border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm hover:bg-gray-50 transition"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 leading-snug mb-2 tracking-tight">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{r.excerpt}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{r.read} min read</span>
                      <span className="inline-flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                        Read <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      <SiteFooter />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
