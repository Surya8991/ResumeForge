'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

const STORAGE_KEY = 'resumeforge-cookie-consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Slight delay to avoid layout shift on first paint
        const id = setTimeout(() => setShow(true), 800);
        return () => clearTimeout(id);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    } catch {
      // ignore
    }
    setShow(false);
  };

  const dismiss = () => {
    // Same as accept since we don't actually use cookies, but tracks dismissal
    accept();
  };

  if (!mounted || !show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-1">We respect your privacy</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              ResumeBuildz stores your resume data in your browser&apos;s localStorage only. We don&apos;t use tracking cookies or third-party analytics. By using this site, you agree to our{' '}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Got it
          </button>
          <button
            onClick={dismiss}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
