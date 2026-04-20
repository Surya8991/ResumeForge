import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, combineSchemas, jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { getBlogSeo } from '@/lib/blogSeo';
import { isPublished } from '@/lib/blogPosts';
import Content from './Content';

const seo = getBlogSeo('salary-negotiation-scripts')!;

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
      name: "How to Negotiate a Job Offer",
      description: "A 5-step playbook to negotiate cash, equity, sign-on, and start date across India and US markets.",
      totalTime: "PT7D",
      steps: [
        { name: "Research market data", text: "Pull compensation ranges from Levels.fyi, Glassdoor, AmbitionBox. Triangulate 3 sources and anchor at the 75th percentile for your level." },
        { name: "Ask for time to review", text: "Request 24 to 48 hours before responding. Never accept or counter the same day you receive the offer." },
        { name: "Counter with a specific number", text: "Propose a precise figure backed by your research. Use email so everything is in writing." },
        { name: "Negotiate non-cash levers", text: "Sign-on bonus, equity, PTO, start date, WFH days, title. Each is its own negotiation with its own budget." },
        { name: "Get the final offer in writing", text: "Never accept verbally. Confirm the full package (base, bonus, equity, joining date) via signed offer letter before resigning anywhere." },
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
