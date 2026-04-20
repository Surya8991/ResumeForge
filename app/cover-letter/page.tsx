import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, combineSchemas, jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { getBlogSeo } from '@/lib/blogSeo';
import { isPublished } from '@/lib/blogPosts';
import Content from './Content';

const seo = getBlogSeo('cover-letter')!;

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
      name: "How to Write a Cover Letter",
      description: "A 4-paragraph structure for a cover letter that actually gets read and pairs with your resume.",
      totalTime: "PT45M",
      steps: [
        { name: "Open with specific intent", text: "State the role you are applying for and one concrete reason you want it at this company (recent launch, team, strategy). No generic praise." },
        { name: "Show proof that matches the top JD requirement", text: "One paragraph with a measurable past win that mirrors the most important responsibility listed in the JD." },
        { name: "Address the problem the role is hired to solve", text: "Name the problem explicitly and describe how you will approach it in the first 90 days. This differentiates you from generic cover letters." },
        { name: "Close with a clear next step", text: "One sentence thanking the reader and proposing the next step (call, interview, portfolio walkthrough)." },
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
