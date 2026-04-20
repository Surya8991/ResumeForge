import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, combineSchemas, jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { getBlogSeo } from '@/lib/blogSeo';
import { isPublished } from '@/lib/blogPosts';
import Content from './Content';

const seo = getBlogSeo('tailor-resume')!;

export const metadata: Metadata = {
  title: `${seo.title} | ResumeBuildz`,
  description: seo.description,
  keywords: [seo.primaryKeyword, ...(seo.secondaryKeywords ?? []), ...(seo.longTailKeywords ?? [])].filter(Boolean) as string[],
  alternates: { canonical: absoluteUrl(`/${seo.slug}`) },
  openGraph: {
    title: `${seo.title} | ResumeBuildz`,
    description: seo.description,
    type: 'article',
    url: absoluteUrl(`/${seo.slug}`),
    images: [{ url: absoluteUrl(`/api/og?title=${encodeURIComponent(seo.title)}&badge=${encodeURIComponent((seo.category || '').toUpperCase())}`), width: 1200, height: 630, alt: seo.title }],
  },
};

export default function Page() {
  if (!isPublished(seo)) notFound();
  const schema = combineSchemas(
    articleSchema({
      headline: seo.title,
      description: seo.description,
      slug: seo.slug,
      datePublished: seo.datePublished,
      dateModified: seo.dateModified,
    }),
    ...(seo.faqs && seo.faqs.length > 0 ? [faqPageSchema(seo.faqs)] : []),
    howToSchema({
      name: "How to Tailor a Resume to a Job Description in 10 Minutes",
      description: "A minute-by-minute process to customise your resume without rewriting it from scratch.",
      totalTime: "PT10M",
      steps: [
        { name: "Read the JD and highlight 5 key requirements", text: "Focus on hard skills, tools, and responsibilities the JD repeats or leads with." },
        { name: "Rewrite the summary to mention the top 2 requirements", text: "One line that mirrors the language of the JD while staying true to your actual experience." },
        { name: "Swap your top 3 bullets to match JD language", text: "Replace verbs and nouns in your strongest bullets with terms directly from the JD, where it is honest." },
        { name: "Reorder the Skills section", text: "Put the JD-matched skills first. Cap at 12 to 15 skills." },
        { name: "Re-export with a company-named filename", text: "Save as firstname-lastname-company.pdf so the file itself signals intent to the recruiter." },
      ],
    }),

    breadcrumbSchema([
      { label: 'Guides', slug: 'blog' },
      { label: seo.category, slug: `blog?cat=${seo.categorySlug}` },
      { label: seo.title },
    ])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Content />
    </>
  );
}
