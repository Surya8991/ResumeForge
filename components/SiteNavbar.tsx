'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Menu, X, ArrowRight, LogOut, User, ChevronDown, Settings, KeyRound, Crown, Download, Trash2, BookOpen, Building2, GraduationCap, Briefcase, Lightbulb } from 'lucide-react';
// Note: FileText is reused for both the brand logo and the "Resume Writing" dropdown icon.
import { useAuthContext as useAuth } from '@/components/Providers';
import { useLoginGateway } from '@/components/LoginGateway';

const NAV_LINKS = [
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const RESOURCE_LINKS = [
  { href: '/blog', label: 'All Articles', desc: 'The full blog', icon: BookOpen },
  { href: '/blog/category/resume-writing', label: 'Resume Writing', desc: 'Format, bullets, sections', icon: FileText },
  { href: '/blog/category/ats-keywords', label: 'ATS & Keywords', desc: 'Beat the resume scanners', icon: Lightbulb },
  { href: '/blog/category/career-transitions', label: 'Career Transitions', desc: 'Layoffs, gaps, pivots', icon: Briefcase },
  { href: '/blog/category/india-hiring', label: 'India Hiring', desc: 'Naukri, campus, TCS, Infosys', icon: GraduationCap },
  { href: '/resume-for', label: 'Company Guides', desc: '22 top employers', icon: Building2 },
];

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
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
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              Resume<span className="text-blue-400">Forge</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link
              href="/templates"
              className="text-gray-300 hover:text-white text-sm px-2.5 py-1.5 rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Templates
            </Link>

            {/* Resources dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-white text-sm px-2.5 py-1.5 rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Resources
                <ChevronDown className={`h-3 w-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setResourcesOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-2 w-72 animate-in fade-in slide-in-from-top-1 duration-150">
                    {RESOURCE_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setResourcesOpen(false)}
                          className="flex items-start gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                          <div className="h-7 w-7 rounded-md bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="h-3.5 w-3.5 text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{link.label}</p>
                            <p className="text-xs text-gray-500 truncate">{link.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {NAV_LINKS.filter((l) => l.href !== '/templates').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm px-2.5 py-1.5 rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap"
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
                      className="flex items-center gap-1.5 px-2 py-1.5 text-gray-300 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {(profile?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <ChevronDown className={`h-3 w-3 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-2 w-56 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-4 py-2 border-b border-gray-700">
                            <p className="text-sm font-medium text-white truncate">{profile?.full_name || 'User'}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            {isPro() && (
                              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-400">
                                <Crown className="h-3 w-3" /> PRO
                              </span>
                            )}
                          </div>
                          <div className="py-1">
                            <Link
                              href="/builder"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors sm:hidden"
                            >
                              <ArrowRight className="h-3.5 w-3.5" /> Build Resume
                            </Link>
                            <Link
                              href="/pricing"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                            >
                              <Settings className="h-3.5 w-3.5" /> Manage Plan
                            </Link>
                            <Link
                              href="/forgot-password"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                            >
                              <KeyRound className="h-3.5 w-3.5" /> Reset Password
                            </Link>
                            {!isPro() && (
                              <Link
                                href="/pricing"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-gray-700 transition-colors"
                              >
                                <Crown className="h-3.5 w-3.5" /> Upgrade to Pro
                              </Link>
                            )}
                          </div>
                          <div className="border-t border-gray-700 pt-1">
                            <button
                              onClick={() => { exportUserData(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors w-full"
                            >
                              <Download className="h-3.5 w-3.5" /> Export My Data
                            </button>
                            <button
                              onClick={() => { signOut(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors w-full"
                            >
                              <LogOut className="h-3.5 w-3.5" /> Sign Out
                            </button>
                            <button
                              onClick={() => { handleDeleteAccount(); setProfileOpen(false); }}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors w-full"
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
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-300 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    <User className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Sign in</span>
                  </Link>
                  <button
                    onClick={() => openGateway('/builder')}
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                  >
                    Build Resume <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-1 animate-fade-in-up">
            {NAV_LINKS.map((link) =>
              link.href === '/builder' ? (
                <button
                  key={link.href}
                  onClick={() => { setMobileOpen(false); openGateway('/builder'); }}
                  className="block w-full text-left text-gray-300 hover:text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            {/* Resources collapsible group on mobile */}
            <div className="pt-2 mt-2 border-t border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wide px-3 mb-1">Resources</p>
              {RESOURCE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { setMobileOpen(false); openGateway('/builder'); }}
              className="block w-full text-center mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
            >
              Build Resume
            </button>
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block w-full text-center mt-2 px-4 py-2 text-gray-300 text-sm rounded-lg border border-gray-700 hover:bg-gray-800"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center mt-2 px-4 py-2 text-gray-300 text-sm rounded-lg border border-gray-700 hover:bg-gray-800"
                >
                  Sign in
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
