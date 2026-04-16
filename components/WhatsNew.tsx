'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';

const APP_VERSION = '1.12.0';

const WHATS_NEW_ITEMS = [
  'Project renamed from ResumeForge to ResumeBuildz across the entire site.',
  'New blog section with 7 topic clusters (Resume Writing, ATS, Job Search, India Hiring, etc.) at /blog.',
  'Resources mega-dropdown in the navbar with 4-column nested layout.',
  'Interactive 3D hero animation on the homepage with cursor parallax + AI score climb.',
];

export default function WhatsNew() {
  // SSR renders null (show starts false). Effect runs on client and
  // schedules the reveal via requestAnimationFrame, so setState happens
  // in a callback — no cascading renders.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const savedVersion = localStorage.getItem('resumeforge-version');
        if (savedVersion !== APP_VERSION) {
          setShow(true);
        }
      } catch { /* localStorage unavailable (e.g. Safari private browsing) */ }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('resumeforge-version', APP_VERSION);
    setShow(false);
  };

  if (!show) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-gray-900 border border-blue-500/30 rounded-xl shadow-2xl animate-slide-in-right">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">
              What&apos;s New in v{APP_VERSION}
            </h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="space-y-2 mb-4">
          {WHATS_NEW_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
              <span className="text-blue-400 mt-0.5 shrink-0">&#8226;</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={handleDismiss}
          className="w-full px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}
