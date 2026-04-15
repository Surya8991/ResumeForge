import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_CATEGORIES, getCategoryBySlug } from '@/lib/blogCategories';
import { getPostsByCategory, VIRTUAL_POSTS } from '@/lib/blogPosts';
import CategoryView from './CategoryView';

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) {
    return {
      title: 'Category not found - ResumeForge Blog',
    };
  }
  return {
    title: `${cat.name} - ResumeForge Blog`,
    description: cat.description,
    alternates: { canonical: `https://resume-forge-orcin.vercel.app/blog/category/${cat.slug}` },
    keywords: cat.keywords,
    openGraph: {
      title: `${cat.name} - ResumeForge Blog`,
      description: cat.description,
      type: 'website',
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);
  const virtualInCategory = VIRTUAL_POSTS.filter((v) => v.category === category);

  // Pass only the slug to the client component. The icon + non-serializable
  // fields get resolved client-side via getCategoryBySlug inside CategoryView.
  return <CategoryView categorySlug={cat.slug} posts={posts} virtualPosts={virtualInCategory} />;
}
