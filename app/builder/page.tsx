import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl, SITE_URL } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Free Resume Builder with Live ATS Score';
const description = 'Build an ATS-friendly resume for free. 20 tested templates, live 12-point ATS score, AI bullet rewrites, PDF + DOCX export. No sign-up needed.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/builder') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/builder'),
  },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ResumeBuildz',
  operatingSystem: 'Web',
  applicationCategory: 'BusinessApplication',
  url: absoluteUrl('/builder'),
  description,
  publisher: { '@type': 'Organization', name: 'ResumeBuildz', url: SITE_URL },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '20 ATS-tested templates',
    'Live 12-point ATS score',
    'AI bullet rewrites (Groq)',
    'PDF, DOCX, HTML, Markdown export',
    'localStorage-first privacy',
    'Cover letter builder',
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(appSchema) }} />
      {/* sr-only H1 guarantees a heading in server-rendered HTML. The
          builder's real content mounts after client hydration, so
          without this Googlebot + screen readers land on a structureless
          page. Visually hidden so it does not affect layout. */}
      <h1 className="sr-only">Free Resume Builder with Live ATS Score</h1>
      <Content />
    </>
  );
}
