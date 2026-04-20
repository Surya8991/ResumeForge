import type { NextRequest } from 'next/server';
import { ogImage } from '@/lib/ogImage';

/**
 * Dynamic Open Graph image endpoint.
 *
 * Usage:
 *   <meta property="og:image"
 *         content="https://resumebuildz.tech/api/og?title=..&badge=..&subtitle=..">
 *
 * Every blog post points its metadata.openGraph.images at this URL with its
 * own title + category badge. That gives each post a unique social card
 * without hand-authoring an opengraph-image.tsx per route.
 *
 * Params (all optional):
 *   title    — main headline rendered on the card (default: ResumeBuildz)
 *   badge    — small eyebrow above the title (usually the category, UPPERCASE)
 *   subtitle — one-line strap under the title
 *
 * Notes:
 *   - runtime = 'edge' so ImageResponse from next/og works
 *   - cache aggressively: these never change for the same query string
 */
export const runtime = 'edge';

export function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = (url.searchParams.get('title') || 'ResumeBuildz').slice(0, 140);
  const badge = url.searchParams.get('badge')?.slice(0, 40) || undefined;
  const subtitle = url.searchParams.get('subtitle')?.slice(0, 200) || undefined;
  return ogImage({ title, badge, subtitle });
}
