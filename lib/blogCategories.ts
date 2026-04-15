// Blog topic-cluster definitions.
// Each category is a semantic grouping of posts. Pages retain their original
// URLs for SEO — the blog hub is an index layer on top, not a URL move.

import type { LucideIcon } from 'lucide-react';
import { FileText, Target, Compass, MapPin, Building2, Sparkles } from 'lucide-react';

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string; // Tailwind text color class for accents
  bgColor: string; // Tailwind bg color class for accents
  keywords: string[]; // SEO meta keywords for the category page
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'resume-writing',
    name: 'Resume Writing',
    description: 'How to structure, format, and write every section of your resume.',
    longDescription:
      'The foundations of a resume that actually lands interviews — from header format and bullet structure to action verbs, tense consistency, and ATS-friendly layout. Start here if you are writing a resume for the first time or if your current resume is getting zero responses.',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    keywords: ['resume writing', 'resume format', 'how to write a resume', 'resume sections', 'resume bullets'],
  },
  {
    slug: 'ats-keywords',
    name: 'ATS & Keywords',
    description: 'How Applicant Tracking Systems work and how to write for them.',
    longDescription:
      '98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to screen resumes before a human ever sees them. This cluster covers how ATS parses your resume, which keywords matter, how to score yours against a job description, and the formatting choices that kill parseability.',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    keywords: ['ATS', 'applicant tracking system', 'resume keywords', 'ATS optimization', 'beat ATS'],
  },
  {
    slug: 'career-transitions',
    name: 'Career Transitions',
    description: 'Resumes for layoffs, gaps, pivots, and re-entry after a break.',
    longDescription:
      'Career transitions require a different resume strategy than standard updates. Whether you are recovering from a layoff, explaining a multi-year gap, pivoting from one field to another, or returning after parental leave — these guides give you the exact framing, wording, and email templates that work.',
    icon: Compass,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    keywords: ['career change', 'layoff recovery', 'career gap', 'career pivot', 'returnship'],
  },
  {
    slug: 'india-hiring',
    name: 'India Hiring Guides',
    description: 'Naukri, campus placements, TCS NQT, Infosys InfyTQ, and more.',
    longDescription:
      'India has the world\'s largest campus placement system and its own set of hiring rituals: NQT, InfyTQ, NTH, WILP, and Naukri profile optimization. These guides are written specifically for Indian students and early-career professionals navigating IT services, product companies, and campus drives.',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    keywords: ['TCS NQT', 'Infosys InfyTQ', 'Wipro NTH', 'campus placement', 'Naukri resume', 'India hiring'],
  },
  {
    slug: 'company-guides',
    name: 'Company Deep Dives',
    description: 'Resume guides for Google, Amazon, Microsoft, Flipkart, TCS, and 17 more.',
    longDescription:
      'Every employer has a different screening philosophy. Google cares about measurable scale, Amazon scores on Leadership Principles, McKinsey hunts distinctive achievement, TCS filters on NQT scores. These company-specific guides distill the exact keywords, formatting choices, and tailoring moves that perform best at each employer.',
    icon: Building2,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    keywords: ['Google resume', 'Amazon resume', 'McKinsey resume', 'TCS resume', 'Infosys resume', 'company resume guides'],
  },
  {
    slug: 'ai-resume',
    name: 'AI Resume Tools',
    description: 'How to use AI to write, improve, and audit your resume.',
    longDescription:
      'AI has transformed resume writing from a 3-hour task to a 30-minute one — if you use it well. This cluster covers prompt patterns for rewriting bullets, how to generate cover letters with Groq/ChatGPT, where AI still makes mistakes, and how to combine AI drafts with your own voice.',
    icon: Sparkles,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    keywords: ['AI resume', 'AI resume writer', 'AI cover letter', 'ChatGPT resume', 'Groq resume'],
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return BLOG_CATEGORIES.map((c) => c.slug);
}
