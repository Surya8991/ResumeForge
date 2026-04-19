'use client';

// Sticky bottom-CTA bar for mobile.
//
// Fires after the user scrolls past the hero on phones, giving them a
// persistent "Build free" button without forcing a scroll-back-up. Dismissible
// (per-session, via sessionStorage) so it doesn't nag repeat visitors.
//
// Visibility rules:
//   - Hidden by default (not in DOM during SSR)
//   - Shows only after scrollY > 600 AND viewport < lg (1024px)
//   - Hidden if user dismissed it this session
//   - Hidden if user is already on /builder (pointless there)

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import { useLoginGateway } from '@/components/LoginGateway';

const DISMISSED_KEY = 'sticky-cta-dismissed';

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const { openGateway } = useLoginGateway();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show on the builder page itself
    if (pathname === '/builder') return;
    // Don't show on mobile if already dismissed this session
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === '1') return;
    } catch {
      // sessionStorage blocked (private mode) — keep showing, no-op
    }

    const onScroll = () => {
      if (window.innerWidth >= 1024) {
        setShow(false);
        return;
      }
      setShow(window.scrollY > 600);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden animate-in slide-in-from-bottom duration-200"
      role="complementary"
      aria-label="Quick start CTA"
    >
      <div className="mx-3 mb-3 flex items-center gap-2 bg-indigo-600 text-white rounded-xl shadow-lg px-4 py-3">
        <button
          onClick={() => openGateway('/builder')}
          className="flex-1 flex items-center justify-center gap-2 font-semibold text-sm py-1"
        >
          Build free. No sign-up.
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISSED_KEY, '1');
            } catch {
              // ignore
            }
            setShow(false);
          }}
          aria-label="Dismiss"
          className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
