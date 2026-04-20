import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, combineSchemas, jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { getBlogSeo } from '@/lib/blogSeo';
import { isPublished } from '@/lib/blogPosts';
import Content from './Content';

const seo = getBlogSeo('why-should-we-hire-you')!;

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
      name: "How to Answer \"Why Should We Hire You\"",
      description: "A 60-to-90-second pitch structured around Problem, Proof, and Compounding.",
      totalTime: "PT2M",
      steps: [
        { name: "Name the Problem", text: "State the specific problem the role exists to solve. Pull it from the JD, earnings calls, or the LinkedIn profiles of the team." },
        { name: "Give one Proof point", text: "Describe your closest past win that addresses the same problem, in one sentence with a metric." },
        { name: "Close with Compounding value", text: "Name the non-obvious value you will keep generating in months 6, 12, and 24 that the next candidate cannot match." },
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
