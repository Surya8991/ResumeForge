'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  HelpCircle,
  X,
  RotateCcw,
  Rocket,
  FileText,
  Layout,
  ArrowDownUp,
  Sparkles,
  Keyboard,
  Target,
  CircleHelp,
  Palette,
} from 'lucide-react';
import { resetOnboarding } from '@/components/OnboardingGuide';

export default function HelpDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const dialog = isOpen && mounted ? createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header bar */}
        <div className="sticky top-0 z-10 rounded-t-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">How to Use ResumeForge</h2>
              <p className="text-[10px] text-primary-foreground/70">Created by Surya L</p>
            </div>
            <button
              onClick={close}
              className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              aria-label="Close help dialog"
            >
              <X className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4 text-sm">
          {/* Getting Started */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <Rocket className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Getting Started</h3>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
                <li><strong className="text-foreground">Edit the sample resume</strong> — Replace the pre-loaded sample with your own details, or click Reset to start blank.</li>
                <li><strong className="text-foreground">Upload a photo</strong> — Add an optional profile photo in Personal Info (max 2MB).</li>
                <li><strong className="text-foreground">Choose a template</strong> — Click &quot;Style&quot; to browse 20 ATS-friendly designs. Use the eye icon to preview full-size before selecting.</li>
                <li><strong className="text-foreground">Customize appearance</strong> — Adjust font, accent color, font size, line spacing, and margins.</li>
                <li><strong className="text-foreground">Add custom sections</strong> — Click &quot;Add Section&quot; for Volunteer Work, Publications, Awards, etc.</li>
                <li><strong className="text-foreground">Reorder sections &amp; entries</strong> — Click &quot;Reorder Sections&quot; at the bottom of any form. You can also drag-and-drop individual entries within Experience, Education, and Projects.</li>
                <li><strong className="text-foreground">Write a cover letter</strong> — Use the Cover Letter tab with optional AI generation.</li>
                <li><strong className="text-foreground">Check ATS score</strong> — Click &quot;ATS&quot; to analyze compatibility, readability, formatting, and match keywords from a job description. Expand &quot;Enhanced Analysis&quot; for readability scoring, resume length check, date consistency, and active voice detection. Use &quot;Smart Matching&quot; for industry-specific keywords and multi-JD comparison.</li>
                <li><strong className="text-foreground">Use AI suggestions</strong> — Click &quot;AI&quot; to generate summaries, bullet points, and skills (bring your own free Groq API key).</li>
                <li><strong className="text-foreground">Import existing resume</strong> — Upload a PDF, DOCX, TXT, HTML, or MD file to auto-fill the form.</li>
                <li><strong className="text-foreground">Navigate sections</strong> — Use Previous/Next buttons at the bottom, the dropdown navigator, or click any progress dot at the top.</li>
                <li><strong className="text-foreground">Manage profiles</strong> — Save up to 10 resume profiles from the header menu. Load, rename, or delete profiles to target different jobs.</li>
                <li><strong className="text-foreground">Download</strong> — Export as PDF (best for ATS), DOCX, HTML, or JSON.</li>
              </ol>
            </CardContent>
          </Card>

          {/* Resume Sections */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Resume Sections</h3>
              </div>
              <div className="space-y-1.5 text-muted-foreground text-xs">
                <div><strong className="text-foreground">Personal Info:</strong> Name, title, email, phone, location, LinkedIn, website, GitHub, photo.</div>
                <div><strong className="text-foreground">Summary:</strong> 2-4 sentence professional overview. Use the rich text toolbar for bold/italic.</div>
                <div><strong className="text-foreground">Experience:</strong> Work positions with bullet points. Rich text toolbar available (Ctrl+B for bold, Ctrl+I for italic).</div>
                <div><strong className="text-foreground">Education:</strong> Degrees, institutions, dates, GPA, and achievements.</div>
                <div><strong className="text-foreground">Skills:</strong> Organize by category (e.g., Programming, Frameworks). Type and press Enter to add.</div>
                <div><strong className="text-foreground">Projects:</strong> Personal or professional projects with tech stacks. Rich text toolbar available.</div>
                <div><strong className="text-foreground">Certifications:</strong> Professional certifications with issuer, date, and credential ID.</div>
                <div><strong className="text-foreground">Languages:</strong> Spoken languages with proficiency levels (Native to Basic).</div>
                <div><strong className="text-foreground">Cover Letter:</strong> Write or AI-generate a tailored cover letter for each job application.</div>
                <div><strong className="text-foreground">Custom Sections:</strong> Add unlimited custom sections with title, subtitle, date, and description fields.</div>
                <div><strong className="text-foreground">ATS Analysis:</strong> 12 analysis tools including keyword density, section score breakdown, readability scoring, formatting warnings, industry keyword matching (20 industries, 201 roles), resume length check, date consistency, active voice detection, JD text comparison, multi-JD matching, keyword auto-insert suggestions, and AI gap analysis.</div>
              </div>
            </CardContent>
          </Card>

          {/* 20 Templates */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <Palette className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">20 Templates</h3>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-muted-foreground text-[11px]">
                <div><strong className="text-foreground">Classic</strong> — Serif</div>
                <div><strong className="text-foreground">Modern</strong> — Sidebar</div>
                <div><strong className="text-foreground">Minimalist</strong> — Clean</div>
                <div><strong className="text-foreground">Professional</strong> — Bold</div>
                <div><strong className="text-foreground">Executive</strong> — Elegant</div>
                <div><strong className="text-foreground">Creative</strong> — Colorful</div>
                <div><strong className="text-foreground">Compact</strong> — Dense</div>
                <div><strong className="text-foreground">Tech</strong> — Dark code</div>
                <div><strong className="text-foreground">Elegant</strong> — Refined</div>
                <div><strong className="text-foreground">Bold</strong> — Heavy type</div>
                <div><strong className="text-foreground">Academic</strong> — Research</div>
                <div><strong className="text-foreground">Corporate</strong> — Formal</div>
                <div><strong className="text-foreground">Nordic</strong> — Airy</div>
                <div><strong className="text-foreground">Gradient</strong> — Modern</div>
                <div><strong className="text-foreground">Timeline</strong> — Vertical</div>
                <div><strong className="text-foreground">Sidebar</strong> — Right panel</div>
                <div><strong className="text-foreground">Infographic</strong> — Visual</div>
                <div><strong className="text-foreground">Federal</strong> — Government</div>
                <div><strong className="text-foreground">Startup</strong> — Tech-forward</div>
                <div><strong className="text-foreground">Monochrome</strong> — B&amp;W</div>
              </div>
            </CardContent>
          </Card>

          {/* Import & Export */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <ArrowDownUp className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Import & Export</h3>
              </div>
              <div className="space-y-1.5 text-muted-foreground text-xs">
                <div><strong className="text-foreground">Import:</strong> PDF, DOCX, TXT, HTML, MD. AI-powered parsing available with your own Groq API key (free).</div>
                <div><strong className="text-foreground">PDF Export:</strong> Best for ATS. Uses browser print for pixel-perfect output.</div>
                <div><strong className="text-foreground">DOCX Export:</strong> Microsoft Word format. Use when employers require .docx.</div>
                <div><strong className="text-foreground">HTML Export:</strong> Web-ready format. Can be hosted online as a resume page.</div>
                <div><strong className="text-foreground">Backup:</strong> Press Ctrl+S to save your resume data as JSON for backup.</div>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">AI Features (Free)</h3>
              </div>
              <div className="space-y-1.5 text-muted-foreground text-xs">
                <div><strong className="text-foreground">Setup:</strong> No key is included. Get your own free key at <span className="text-primary">console.groq.com/keys</span>, paste it in the AI tab.</div>
                <div><strong className="text-foreground">Writing Assistant:</strong> Generate professional summaries, bullet points, skills, or custom prompts.</div>
                <div><strong className="text-foreground">Cover Letter:</strong> AI-generate cover letters with job title and company context.</div>
                <div><strong className="text-foreground">Smart Import:</strong> AI parses uploaded resumes more accurately than heuristic parsing.</div>
                <div><strong className="text-foreground">Privacy:</strong> Your API key stays in your browser only. Never sent to our servers.</div>
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <Keyboard className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Keyboard Shortcuts</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center justify-center min-w-[4rem] px-2 py-1 bg-muted border border-border rounded-md text-[11px] font-mono font-semibold text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">Ctrl+P</kbd>
                  <span>Export as PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center justify-center min-w-[4rem] px-2 py-1 bg-muted border border-border rounded-md text-[11px] font-mono font-semibold text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">Ctrl+S</kbd>
                  <span>Save backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center justify-center min-w-[4rem] px-2 py-1 bg-muted border border-border rounded-md text-[11px] font-mono font-semibold text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">Ctrl+B</kbd>
                  <span>Bold text (in editor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center justify-center min-w-[4rem] px-2 py-1 bg-muted border border-border rounded-md text-[11px] font-mono font-semibold text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">Ctrl+I</kbd>
                  <span>Italic text (in editor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="inline-flex items-center justify-center min-w-[4rem] px-2 py-1 bg-muted border border-border rounded-md text-[11px] font-mono font-semibold text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">Esc</kbd>
                  <span>Close dialogs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ATS Tips */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">ATS Tips</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                <li>Use keywords from the job description in your resume</li>
                <li>Start bullets with action verbs (Led, Developed, Managed, Implemented)</li>
                <li>Quantify achievements with numbers (e.g., &quot;Increased sales by 25%&quot;)</li>
                <li>Use the JD Matcher to check keyword coverage for each application</li>
                <li>Submit as PDF unless the employer specifically asks for DOCX</li>
                <li>Aim for 80+ ATS score and 70%+ keyword match</li>
                <li>Keep readability at 60-70 (Flesch-Kincaid) — use the Readability Score tool to check</li>
                <li>Use the Active Voice Detector to replace passive voice in bullet points</li>
                <li>Check Industry Keywords for role-specific terms across 20 industries and 201 roles</li>
                <li>Save multiple job descriptions with Multi-JD Matching to compare scores across applications</li>
                <li>Use Keyword Auto-Insert to see which section each missing keyword belongs in</li>
              </ul>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
                  <CircleHelp className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">FAQ</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">Where is my data stored?</strong> Locally in your browser (localStorage). Nothing is sent to any server.</div>
                <div><strong className="text-foreground">How do I transfer my resume to another device?</strong> Export as JSON, then import the JSON file on the other device.</div>
                <div><strong className="text-foreground">Why is the preview blank?</strong> Fill in at least your name and one section. The preview updates in real-time.</div>
                <div><strong className="text-foreground">Can I have multiple resumes?</strong> Yes! Use the Resume Profiles feature in the header menu to save up to 10 separate profiles. Each stores its own data, template, and accent color.</div>
                <div><strong className="text-foreground">How do I navigate between sections?</strong> Use the Previous/Next buttons at the bottom of each form, or click any progress dot at the top.</div>
                <div><strong className="text-foreground">Is this free?</strong> Yes, completely free. AI features require your own Groq API key (also free at console.groq.com).</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        <div className="px-6 py-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => { close(); resetOnboarding(); }} className="gap-2 h-10">
            <RotateCcw className="h-4 w-4" /> Restart Tour
          </Button>
          <Button onClick={close} className="h-10 px-6 font-semibold">Got it!</Button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(true)} title="Help & Guide">
        <HelpCircle className="h-4 w-4" />
      </Button>
      {dialog}
    </>
  );
}
