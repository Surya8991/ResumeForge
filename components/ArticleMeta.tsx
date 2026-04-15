import { Clock, Calendar, UserCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  author?: string;
  authorRole?: string;
  publishedDate: string; // ISO, e.g. '2026-04-15'
  updatedDate?: string; // ISO
  readingTime: number; // minutes
  reviewed?: boolean;
  className?: string;
}

/**
 * Meta bar shown near the top of an article.
 * Displays author, reading time, last updated, and an optional "reviewed" badge.
 * Contributes to Google's E-E-A-T freshness signals.
 */
export default function ArticleMeta({
  author = 'Surya L',
  authorRole = 'Founder, ResumeBuildz',
  publishedDate,
  updatedDate,
  readingTime,
  reviewed = true,
  className = '',
}: Props) {
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500 border-y border-gray-100 py-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
          {author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-gray-900 text-xs">{author}</p>
          <p className="text-[10px] text-gray-500">{authorRole}</p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> {readingTime} min read
      </span>
      {updatedDate ? (
        <span className="inline-flex items-center gap-1" title={`Published ${formatDate(publishedDate)}`}>
          <Calendar className="h-3.5 w-3.5" /> Updated {formatDate(updatedDate)}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" /> Published {formatDate(publishedDate)}
        </span>
      )}
      {reviewed && (
        <span className="inline-flex items-center gap-1 text-green-600">
          <CheckCircle2 className="h-3.5 w-3.5" /> Fact-checked
        </span>
      )}
    </div>
  );
}
