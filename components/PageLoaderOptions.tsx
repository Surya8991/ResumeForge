'use client';

// 10 page-transition loader treatments for ResumeBuildz.
// Each is a self-contained component that renders a constantly-animating
// "loading" state. Used for the /loader-preview gallery so the user can
// pick one to wire into the global PageLoader.
//
// All loaders are styled to work on top of any background (light or dark).
// None depend on libraries beyond Tailwind + React + Lucide icons.
//
// Inspired by: Stripe, Vercel, Spotify, Notion, LinkedIn, Apple, GitHub,
// Figma, Linear, Discord, Material Design.

import { useEffect, useRef, useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';

// ───────────────────────────────────────────────────────────
// Option 1 — Centered Brand Spinner (Stripe / Vercel)
// Single circular spinner in the middle of the viewport with a soft
// backdrop. The classic "we are working" indicator.
// ───────────────────────────────────────────────────────────
export function Loader1_CenteredSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-[3px] border-blue-500/20" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 2 — Pulsing Logo Splash (Apple / Spotify)
// Brand logo (square + FileText icon) in the middle, scaling up and down
// with a gentle pulse. Reinforces brand recognition during transitions.
// ───────────────────────────────────────────────────────────
export function Loader2_LogoPulse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse-scale">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <p className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Loading</p>
      </div>
      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.85; }
        }
        :global(.animate-pulse-scale) { animation: pulse-scale 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 3 — 3-Dot Bounce (Apple iMessage / ChatGPT)
// Three dots in the center bouncing in sequence. Most playful and
// minimal of the indicators.
// ───────────────────────────────────────────────────────────
export function Loader3_ThreeDotBounce() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm z-50">
      <div className="flex items-end gap-2 h-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-blue-500"
            style={{
              animation: 'dot-bounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 4 — Centered Skeleton Resume Card (LinkedIn / GitHub)
// Mid-screen card with skeletal bars filling in. Tells the user
// "we're loading your next page" by showing what's coming.
// ───────────────────────────────────────────────────────────
export function Loader4_SkeletonCard() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm z-50">
      <div className="w-64 rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-blue-500/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Loading page
          </p>
        </div>
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-900 rounded animate-pulse" style={{ width: '60%' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '90%', animationDelay: '100ms' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '75%', animationDelay: '200ms' }} />
        </div>
        <div className="h-2.5 bg-blue-500 rounded mb-2 animate-pulse" style={{ width: '40%' }} />
        <div className="space-y-1.5 mb-3">
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '100%', animationDelay: '300ms' }} />
          <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ width: '85%', animationDelay: '400ms' }} />
        </div>
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

// ───────────────────────────────────────────────────────────
// Option 5 — Pulse Ring Expand (Material Design / Google)
// Centered ring that expands outward continuously, with multiple staggered
// rings creating a ripple effect.
// ───────────────────────────────────────────────────────────
export function Loader5_PulseRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm z-50">
      <div className="relative h-20 w-20 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute h-20 w-20 rounded-full border-2 border-blue-500"
            style={{
              animation: 'pulse-ring 2s ease-out infinite',
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
        <div className="relative h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
          <FileText className="h-4 w-4 text-white" />
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.4); opacity: 1; }
          80%, 100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 6 — Equalizer Bars (Spotify play state)
// 5 vertical bars in the center, each animating its height with stagger.
// Looks like an audio equalizer playing.
// ───────────────────────────────────────────────────────────
export function Loader6_EqualizerBars() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm z-50">
      <div className="flex items-end gap-1.5 h-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
            style={{
              animation: 'eq-bar 1s ease-in-out infinite',
              animationDelay: `${i * 0.12}s`,
              height: '12px',
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes eq-bar {
          0%, 100% { height: 12px; }
          50% { height: 40px; }
        }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 7 — Bottom-right Floating Mini Card
// The current PageLoader card style but WITHOUT the top progress bar.
// Subtle, non-blocking, always positioned in the bottom-right corner.
// ───────────────────────────────────────────────────────────
export function Loader7_BottomRightCard() {
  return (
    <div className="absolute bottom-4 right-4 w-44 bg-white rounded-xl shadow-2xl shadow-blue-500/30 border border-gray-200 p-4 z-50">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Loading page
        </p>
      </div>
      <div className="space-y-1.5 mb-2">
        <div className="h-2 bg-gray-900 rounded animate-pulse" style={{ width: '60%' }} />
        <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '90%', animationDelay: '100ms' }} />
        <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '75%', animationDelay: '200ms' }} />
      </div>
      <div className="h-2 bg-blue-500 rounded mb-1.5 animate-pulse" style={{ width: '40%' }} />
      <div className="space-y-1">
        <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '100%', animationDelay: '300ms' }} />
        <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '85%', animationDelay: '400ms' }} />
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 8 — Backdrop Blur with Center Spinner (Notion)
// Heavy backdrop blur on the entire viewport with a centered spinner.
// Most visible / unmistakable indication of loading.
// ───────────────────────────────────────────────────────────
export function Loader8_BackdropBlur() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-md z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-6 py-5 flex items-center gap-3">
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-semibold text-gray-900">Loading</p>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 9 — Aurora Sweep Top Bar
// Single horizontal aurora gradient ribbon that sweeps across the top of
// the viewport. Like the current top bar but with a holographic gradient
// instead of a flat blue line.
// ───────────────────────────────────────────────────────────
export function Loader9_AuroraSweep() {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 z-50 overflow-hidden">
      <div
        className="h-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #3b82f6 25%, #a855f7 50%, #ec4899 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'aurora-sweep 1.5s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes aurora-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Option 10 — Sparkle Cursor (Linear / modern AI tools)
// A small glowing pill that appears near the cursor with a sparkle icon
// and "Loading" text. Discreet, on-cursor, no overlay.
// ───────────────────────────────────────────────────────────
export function Loader10_SparkleCursor() {
  const ref = useRef<HTMLDivElement>(null);
  // Lazy initializer: read the parent's center on first mount instead of
  // calling setPos inside the effect body (which trips the cascading-renders
  // lint rule). The parent isn't available during this initial call so we
  // fall back to (0, 0); the effect below corrects it on first mousemove.
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = ref.current?.parentElement;
    if (!container) return;
    const handler = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    container.addEventListener('mousemove', handler);
    // Defer the initial center positioning to a microtask so it doesn't fire
    // synchronously inside the effect body.
    const rect = container.getBoundingClientRect();
    queueMicrotask(() => setPos({ x: rect.width / 2, y: rect.height / 2 }));
    return () => container.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-50 pointer-events-none">
      <div
        className="absolute bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${pos.x + 16}px, ${pos.y + 16}px)`,
        }}
      >
        <Sparkles className="h-3 w-3 text-blue-400 animate-spin" style={{ animationDuration: '2s' }} />
        Loading
      </div>
    </div>
  );
}
