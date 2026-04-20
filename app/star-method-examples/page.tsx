import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, combineSchemas, jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { getBlogSeo } from '@/lib/blogSeo';
import { isPublished } from '@/lib/blogPosts';
import Content from './Content';

const seo = getBlogSeo('star-method-examples')!;

export const metadata: Metadata = {
  title: `${seo.title} | ResumeBuildz`,
  description: seo.description,
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
      name: "How to Answer a Behavioural Interview Question Using STAR",
      description: "The 90-second STAR formula (Situation, Task, Action, Result) for answering Tell me about a time when questions.",
      totalTime: "PT2M",
      steps: [
        { name: "Situation (10 to 15 seconds)", text: "State where, when, and what your role was. Concrete and brief. Avoid generic context." },
        { name: "Task (10 seconds)", text: "Name the specific problem you owned and what success looked like." },
        { name: "Action (40 to 50 seconds)", text: "Describe what YOU did (not the team). Decisions, tradeoffs, how you moved through blockers. This is the scored beat." },
        { name: "Result (15 to 20 seconds)", text: "Close with the measurable outcome and a number. For failure stories, add a one-line lesson learned." },
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
