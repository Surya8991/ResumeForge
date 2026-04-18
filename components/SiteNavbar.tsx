'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Menu, X, ArrowRight, LogOut, User, ChevronDown, Settings, KeyRound, Crown, Download, Trash2, BookOpen, Building2, GraduationCap, Briefcase, Lightbulb, Sparkles, Compass, HelpCircle, Target, MessageSquare } from 'lucide-react';
// Note: FileText is reused for both the brand logo and the "Resume Writing" dropdown icon.
import { useAuthContext as useAuth } from '@/components/Providers';
import { useLoginGateway } from '@/components/LoginGateway';

// Main nav — Notion-inspired clean white layout. FAQ lives inside the
// Resources dropdown's Help section, freeing a top-level slot. Blog clusters
// are grouped into 4 parent columns.
const NAV_LINKS = [
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

// Mega-dropdown: 4 parent columns (Ahrefs-style nested 2-tier).
// Each child is a preset filter on /blog (e.g. /blog?cat=resume-writing).
interface MegaItem {
  href: string;
  label: string;
  desc: string;
  icon: typeof BookOpen;
}
interface MegaColumn {
  parent: string;
  parentDesc: string;
  parentColor: string; // Tailwind text color for parent header
  items: MegaItem[];
}

const MEGA_COLUMNS: MegaColumn[] = [
  {
    parent: 'Resume & ATS',
    parentDesc: 'Write a resume that gets past the scanners.',
    parentColor: 'text-blue-600',
    items: [
      { href: '/blog?cat=resume-writing', label: 'Resume Writing', desc: 'Format, bullets, sections', icon: FileText },
      { href: '/blog?cat=ats-keywords', label: 'ATS & Keywords', desc: 'Beat the scanners', icon: Target },
      { href: '/blog?cat=ai-resume', label: 'AI Resume Tools', desc: 'AI writing + prompts', icon: Sparkles },
    ],
  },
  {
    parent: 'Job Search',
    parentDesc: 'From application to offer.',
    parentColor: 'text-purple-600',
    items: [
      { href: '/blog?cat=interviews-cover-letters', label: 'Interviews & Cover Letters', desc: 'Templates + STAR prep', icon: MessageSquare },
      { href: '/blog?cat=career-transitions', label: 'Career Transitions', desc: 'Layoffs, gaps, pivots', icon: Compass },
    ],
  },
  {
    parent: 'India Hiring',
    parentDesc: 'Naukri, campus, NQT, InfyTQ.',
    parentColor: 'text-orange-600',
    items: [
      { href: '/blog?cat=india-hiring', label: 'Naukri & Campus', desc: 'TCS, Infosys, Wipro', icon: GraduationCap },
    ],
  },
  {
    parent: 'Company Guides',
    parentDesc: '22 top employers.',
    parentColor: 'text-indigo-600',
    items: [
      { href: '/blog?cat=company-guides', label: 'Company Deep Dives', desc: 'FAANG, consulting, IT', icon: Building2 },
      { href: '/resume-for', label: '22 Companies Hub', desc: 'Direct index', icon: Briefcase },
    ],
  },
];

// Help section at the bottom of the dropdown — kept separate from blog content
// so the cluster taxonomy stays clean.
const HELP_LINKS = [
  { href: '/blog', label: 'All Articles', desc: 'Browse the full blog', icon: BookOpen },
  { href: '/faq', label: 'FAQ', desc: 'Common questions', icon: HelpCircle },
  { href: '/resume-tips', label: 'Resume Tips', desc: 'Quick wins', icon: Lightbulb },
];

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut, loading, isPro, exportUserData, deleteAccount } = useAuth();
  const { openGateway } = useLoginGateway();

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone. All your data will be permanently erased.')) return;
    if (!confirm('Last warning: This will permanently delete your account, profile, and all resume data. Continue?')) return;
    const { error } = await deleteAccount();
    if (error) alert('Failed to delete account: ' + error.message);
    else alert('Your account has been deleted.');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (blogRef.current && !blogRef.current.contains(e.target as Node)) {
        setBlogOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-900 font-bold text-lg">
              Resume<span className="text-blue-500">Buildz</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/templates"
              className="text-gray-700 hover:text-blue-600 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Templates
            </Link>

            {/* Resources mega-dropdown — 4 parent columns + Help footer */}
            <div className="relative" ref={blogRef}>
              <button
                onClick={() => setBlogOpen(!blogOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                aria-expanded={blogOpen}
              >
                Resources
                <ChevronDown className={`h-3 w-3 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
              </button>
              {blogOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBlogOpen(false)} />
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl shadow-gray-300/40 w-[min(calc(100vw-2rem),780px)] animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* Header */}
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        <BookOpen className="inline-block h-3 w-3 mr-1 -mt-0.5" /> Blog — topic clusters
                      </p>
                      <Link
                        href="/blog"
                        onClick={() => setBlogOpen(false)}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                      >
                        View all <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* 4-column mega grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 p-3">
                      {MEGA_COLUMNS.map((col) => (
                        <div key={col.parent} className="px-2">
                          <div className="px-2 pt-2 pb-1.5">
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${col.parentColor}`}>
                              {col.parent}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{col.parentDesc}</p>
                          </div>
                          <div className="space-y-0.5">
                            {col.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setBlogOpen(false)}
                                  className="flex items-start gap-2 px-2 py-2 rounded-md text-xs text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                  <div className="h-6 w-6 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-semibold leading-tight">{item.label}</p>
                                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{item.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Help footer */}
                    <div className="border-t border-gray-100 px-3 py-2.5 bg-gray-50/60 rounded-b-xl">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 px-2 mb-1.5">
                        <HelpCircle className="inline-block h-3 w-3 mr-1 -mt-0.5" /> Help
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {HELP_LINKS.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setBlogOpen(false)}
                              className="flex items-center gap-2 px-2 py-1.5 rounded text-[11px] text-gray-700 hover:text-gray-900 hover:bg-white transition"
                            >
                              <Icon className="h-3 w-3 text-amber-600 shrink-0" />
                              <span className="truncate">{link.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {NAV_LINKS.filter((l) => l.href !== '/templates').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth + CTA + Mobile toggle */}
          <div className="flex items-center gap-1.5">
            {!loading && (
              user ? (
                <>
                  <button
                    onClick={() => openGateway('/builder')}
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                  >
                    Build Resume <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {/* Profile dropdown - visible on all screens */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-gray-700 hover:text-gray-900 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {(profile?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <ChevronDown className={`h-3 w-3 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl py-2 w-56 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            {isPro() && (
                              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-600">
                                <Crown className="h-3 w-3" /> PRO
                              </span>
                            )}
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => { setProfileOpen(false); openGateway('/builder'); }}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors sm:hidden"
                            >
                              <ArrowRight className="h-3.5 w-3.5" /> Build Resume
                            </button>
                            <Link
                              href="/pricing"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              <Settings className="h-3.5 w-3.5" /> Manage Plan
                            </Link>
                            <Link
                              href="/forgot-password"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              <KeyRound className="h-3.5 w-3.5" /> Reset Password
                            </Link>
                            {!isPro() && (
                              <Link
                                href="/pricing"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                              >
                                <Crown className="h-3.5 w-3.5" /> Upgrade to Pro
                              </Link>
                            )}
                          </div>
                          <div className="border-t border-gray-100 pt-1">
                            <button
                              onClick={() => { exportUserData(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full"
                            >
                              <Download className="h-3.5 w-3.5" /> Export My Data
                            </button>
                            <button
                              onClick={() => { signOut(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full"
                            >
                              <LogOut className="h-3.5 w-3.5" /> Sign Out
                            </button>
                            <button
                              onClick={() => { handleDeleteAccount(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors w-full"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete Account
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-blue-600 text-sm rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    <User className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Log in</span>
                  </Link>
                  <button
                    onClick={() => openGateway('/builder')}
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                  >
                    Get started free <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 animate-fade-in-up">
            {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
            ))}
            {/* Resources mega-dropdown on mobile — grouped by parent */}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide px-3 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" /> Resources · Blog
              </p>
              {MEGA_COLUMNS.map((col) => (
                <div key={col.parent} className="mb-2">
                  <p className={`text-[10px] font-bold uppercase tracking-wider px-3 mt-2 mb-0.5 ${col.parentColor}`}>
                    {col.parent}
                  </p>
                  {col.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-700 hover:text-gray-900 text-sm px-5 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <p className="text-xs text-amber-600 uppercase tracking-wide px-3 mt-3 mb-1 flex items-center gap-1.5">
                <HelpCircle className="h-3 w-3" /> Help
              </p>
              {HELP_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 text-sm px-5 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { setMobileOpen(false); openGateway('/builder'); }}
              className="block w-full text-center mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
            >
              Get started free
            </button>
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block w-full text-center mt-2 px-4 py-2 text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center mt-2 px-4 py-2 text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Log in
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
