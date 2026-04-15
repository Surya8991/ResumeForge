'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock, Calendar } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import ReadingProgress from '@/components/ReadingProgress';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCategoryBySlug } from '@/lib/blogCategories';
import type { BlogPost, VirtualPost } from '@/lib/blogPosts';

interface Props {
  categorySlug: string;
  posts: BlogPost[];
  virtualPosts: VirtualPost[];
}

export default function CategoryView({ categorySlug, posts, virtualPosts }: Props) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  const CatIcon = category.icon;
  const totalCount = posts.length + virtualPosts.length;

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category.name },
            ]}
            className="mb-4"
          />
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition">
            <ArrowLeft className="h-4 w-4" /> All topic clusters
          </Link>
          <div className="flex items-start gap-4">
            <div className={`hidden sm:flex h-14 w-14 rounded-2xl ${category.bgColor} items-center justify-center shrink-0`}>
              <CatIcon className={`h-7 w-7 ${category.color}`} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 animate-fade-in-up">{category.name}</h1>
              <p className="text-gray-300 text-lg max-w-2xl animate-fade-in-up delay-100">{category.description}</p>
              <p className="text-xs text-gray-400 mt-3">
                {totalCount} guide{totalCount === 1 ? '' : 's'} in this cluster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed">{category.longDescription}</p>
        </div>
      </section>

      {/* Post grid */}
      <main className="flex-1 bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {totalCount === 0 ? (
            <p className="text-gray-500 text-center py-12">No guides in this cluster yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg p-6 transition flex flex-col"
                >
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
              ))}
              {virtualPosts.map((v) => (
                <Link
                  key={v.slug}
                  href={v.href}
                  className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:border-blue-400 hover:shadow-lg p-6 transition flex flex-col"
                >
                  <div className="flex justify-end mb-2">
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
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
