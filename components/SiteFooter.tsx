'use client';

import Link from 'next/link';
import { FileText, Heart, ExternalLink } from 'lucide-react';
import { useLoginGateway } from '@/components/LoginGateway';

export default function SiteFooter() {
  const { openGateway } = useLoginGateway();
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <div className="space-y-2 text-sm">
              <button onClick={() => openGateway('/builder')} className="block text-left w-full hover:text-white transition-colors">Resume Builder</button>
              <Link href="/templates" className="block hover:text-white transition-colors">Templates</Link>
              <Link href="/cover-letter" className="block hover:text-white transition-colors">Cover Letter</Link>
              <Link href="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
              <Link href="/changelog" className="block hover:text-white transition-colors">Changelog</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Blog</h4>
            <div className="space-y-2 text-sm">
              <Link href="/blog" className="block hover:text-white transition-colors">All Articles</Link>
              <Link href="/blog/category/resume-writing" className="block hover:text-white transition-colors">Resume Writing</Link>
              <Link href="/blog/category/ats-keywords" className="block hover:text-white transition-colors">ATS &amp; Keywords</Link>
              <Link href="/blog/category/career-transitions" className="block hover:text-white transition-colors">Career Transitions</Link>
              <Link href="/blog/category/india-hiring" className="block hover:text-white transition-colors">India Hiring</Link>
              <Link href="/faq" className="block hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              <a href="https://github.com/Surya8991/resumebuildz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://linkedin.com/in/surya-l" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-blue-500 flex items-center justify-center">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-white font-bold">Resume<span className="text-blue-400">Buildz</span></span>
          </Link>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Designed with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by Surya L &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
