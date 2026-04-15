'use client';

// Global page-transition loading indicator — Option 4 from /loader-preview.
//
// Visual: a centered skeletal "resume building" card on top of an 85% white
// backdrop. Mirrors the homepage Fill7_Ultimate hero aesthetic so every
// page transition reinforces the resume-building brand metaphor.
//
// Behavior:
// - Triggers on every internal <a> click and on browser back/forward.
// - 150ms grace period before showing — quick navigations that complete in
//   under 150ms never flash the loader.
// - Hides when usePathname() reports the new route mounted.
// - Filters: external links, mailto/tel, anchor jumps, modifier-key clicks,
//   target=_blank, downloads, same-pathname clicks.

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const SHOW_DELAY_MS = 150;

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPathnameRef = useRef(pathname);

  const startLoading = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    // Wait SHOW_DELAY_MS before actually rendering, so a fast same-route
    // recompile or instant client-side nav never causes the loader to flash.
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);
  }, []);

  const stopLoading = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    setVisible(false);
  }, []);

  // Detect navigation start by intercepting <a> clicks anywhere in the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Modifier keys = open in new tab, ignore.
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      if (anchor.getAttribute('rel')?.includes('external')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Cross-origin? Skip — the browser will navigate away and our loader
      // would be stuck on screen.
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      // Same path = anchor jump or no-op, ignore.
      const targetPath = href.startsWith('/') ? href.split('?')[0].split('#')[0] : href;
      if (targetPath === window.location.pathname) return;

      startLoading();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [startLoading]);

  // Browser back/forward
  useEffect(() => {
    const onPopState = () => startLoading();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [startLoading]);

  // When the pathname actually changes, hide the loader. queueMicrotask
  // defers the setState out of the effect body to avoid the cascading-
  // renders lint warning.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      queueMicrotask(stopLoading);
    }
  }, [pathname, stopLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/85 backdrop-blur-sm pointer-events-none animate-fade-in"
    >
      <div className="w-64 rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-blue-500/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Loading page
          </p>
        </div>

        {/* Header skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-900 rounded animate-pulse" style={{ width: '60%' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '90%', animationDelay: '100ms' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '75%', animationDelay: '200ms' }} />
        </div>

        {/* Section heading */}
        <div className="h-2.5 bg-blue-500 rounded mb-2 animate-pulse" style={{ width: '40%' }} />

        {/* Body lines */}
        <div className="space-y-1.5 mb-3">
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '100%', animationDelay: '300ms' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '85%', animationDelay: '400ms' }} />
        </div>

        {/* Skill pills */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 bg-blue-100 rounded-full animate-pulse"
              style={{ width: `${24 + i * 8}px`, animationDelay: `${500 + i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
