'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Sparkles, BookOpen, Filter } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import ReadingProgress from '@/components/ReadingProgress';
import { BLOG_CATEGORIES } from '@/lib/blogCategories';
import { BLOG_POSTS, VIRTUAL_POSTS, getFeaturedPosts, getAllPosts, getPostCountByCategory } from '@/lib/blogPosts';

export default function BlogHubPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    document.title = 'Blog - Resume Writing, ATS, and Career Guides | ResumeForge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Practical, research-backed guides on resume writing, ATS optimization, career transitions, Indian hiring, and company-specific job applications. Updated weekly.');
  }, []);

  const allPosts = getAllPosts();
  const featured = getFeaturedPosts();
  const filteredPosts =
    activeCategory === 'all'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 animate-fade-in">
            <BookOpen className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" /> ResumeForge Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Resume, ATS, and Career Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl animate-fade-in-up delay-100">
            Research-backed writing from people who have read 10,000+ resumes. Every post is updated quarterly and fact-checked against current hiring data.
          </p>
          <div className="flex flex-wrap gap-3 mt-6 animate-fade-in-up delay-200">
            <span className="text-xs text-gray-400">{BLOG_POSTS.length} posts · {BLOG_CATEGORIES.length} categories · Updated weekly</span>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Featured</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.slice(0, 4).map((post) => {
                const cat = BLOG_CATEGORIES.find((c) => c.slug === post.category);
                const CatIcon = cat?.icon;
                return (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg p-5 transition flex flex-col"
                  >
                    {cat && CatIcon && (
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide ${cat.color} mb-3`}>
                        <CatIcon className="h-3 w-3" /> {cat.name}
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readingTime} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(post.dateModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Categories grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Browse by topic cluster</h2>
          <p className="text-gray-600 mb-10">
            Each cluster is a coherent set of guides on one theme. Start with whichever matches your situation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const count = getPostCountByCategory(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl p-6 transition"
                >
                  <div className={`inline-flex h-12 w-12 rounded-xl ${cat.bgColor} items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <CatIcon className={`h-6 w-6 ${cat.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cat.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{count} guide{count === 1 ? '' : 's'}</span>
                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Browse <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All posts with filter */}
      <main className="flex-1 bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All posts</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              Filter:
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All ({allPosts.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const count = getPostCountByCategory(cat.slug);
              if (count === 0) return null;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${activeCategory === cat.slug ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No posts in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => {
                const cat = BLOG_CATEGORIES.find((c) => c.slug === post.category);
                const CatIcon = cat?.icon;
                return (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg p-6 transition flex flex-col"
                  >
                    {cat && CatIcon && (
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide ${cat.color} mb-3`}>
                        <CatIcon className="h-3 w-3" /> {cat.name}
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readingTime} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Updated {new Date(post.dateModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                );
              })}
              {/* Virtual posts (e.g., company guides hub) in all view */}
              {activeCategory === 'all' &&
                VIRTUAL_POSTS.map((v) => {
                  const cat = BLOG_CATEGORIES.find((c) => c.slug === v.category);
                  const CatIcon = cat?.icon;
                  return (
                    <Link
                      key={v.slug}
                      href={v.href}
                      className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:border-blue-400 hover:shadow-lg p-6 transition flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-3">
                        {cat && CatIcon && (
                          <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide ${cat.color}`}>
                            <CatIcon className="h-3 w-3" /> {cat.name}
                          </div>
                        )}
                        <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">{v.badge}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition">
                        {v.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-1">{v.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold pt-3 border-t border-indigo-100 group-hover:translate-x-1 transition">
                        Open hub <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
