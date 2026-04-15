'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  PenLine,
  Eye,
  Settings2,
  BarChart3,
  Sparkles,
  Download,
  Upload,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Camera,
  Layers,
  Mail,
} from 'lucide-react';

const STORAGE_KEY = 'resumeforge-onboarding-done';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  tip?: string;
}

const STEPS: Step[] = [
  {
    title: 'Welcome to ResumeBuildz!',
    description: 'Create professional, ATS-optimized resumes in minutes. This quick tour will show you the key features.',
    icon: <FileText className="h-8 w-8" />,
    tip: 'You can restart this tour anytime from the Help menu.',
  },
  {
    title: 'Edit Your Resume',
    description: 'Use the Edit tab to fill in your details  -  Personal Info, Summary, Experience, Education, Skills, Projects, Certifications, and Languages. The completion bar at the top tracks your progress across 10 criteria. On mobile, swipe left/right to switch between tabs.',
    icon: <PenLine className="h-8 w-8" />,
    tip: 'Required fields are marked with a red asterisk (*). A sample resume is pre-loaded to help you get started. On mobile, use the bottom sheet section picker to jump between sections.',
  },
  {
    title: 'Upload a Photo',
    description: 'Add an optional profile photo in the Personal Info section. It will appear on your resume header across all templates.',
    icon: <Camera className="h-8 w-8" />,
    tip: 'Photos are optional. Some industries prefer resumes without photos.',
  },
  {
    title: 'Live Preview',
    description: 'See your resume update in real-time as you type. Use the zoom controls to adjust the preview size. On mobile, the preview auto-scales to fit your screen.',
    icon: <Eye className="h-8 w-8" />,
    tip: 'The preview shows an estimated page count. Use Ctrl+P to quickly export as PDF.',
  },
  {
    title: '20 Templates & Styling',
    description: 'Choose from 20 unique templates in the Style panel. Click the eye icon to see a full-size preview in the template preview modal before selecting. Customize fonts, colors, spacing, and margins to match your style.',
    icon: <Settings2 className="h-8 w-8" />,
    tip: 'Try the "Compact" preset to fit more content on one page, or "Comfortable" for better readability.',
  },
  {
    title: 'Custom Sections & Reordering',
    description: 'Add custom sections like Volunteer Work, Publications, or Awards. Drag and drop to reorder sections and individual entries within Experience, Education, and Projects. On mobile, drag handles are larger for easier touch interaction. In the Skills section, you will see intelligent suggestions based on your job title.',
    icon: <Layers className="h-8 w-8" />,
    tip: 'Click "Add Section" in the sidebar, and "Reorder Sections" at the bottom of any form.',
  },
  {
    title: 'Cover Letter Builder',
    description: 'Write a cover letter or generate one with AI. Just enter the job title and company name, and AI does the rest.',
    icon: <Mail className="h-8 w-8" />,
    tip: 'Find the Cover Letter tab in the sidebar section navigation.',
  },
  {
    title: 'ATS Score & JD Matcher',
    description: 'Check your resume\'s ATS compatibility score. Paste a job description to see which keywords you\'re missing. Expand \'Enhanced Analysis\' for readability, resume length, date consistency, and active voice checks. Use \'Smart Matching\' for industry-specific keywords, multi-JD comparison, and AI gap analysis.',
    icon: <BarChart3 className="h-8 w-8" />,
    tip: 'Aim for 80+ ATS score and 60-70 readability. Use Industry Keywords to find role-specific terms across 20 industries.',
  },
  {
    title: 'AI Writing Assistant',
    description: 'Get AI-powered suggestions for your summary, bullet points, and skills. Requires your own Groq API key (free)  -  no key is included with the app.',
    icon: <Sparkles className="h-8 w-8" />,
    tip: 'Bring your own key from console.groq.com/keys (free, takes 1 minute). Stored in your browser only.',
  },
  {
    title: 'Import & Export',
    description: 'Import existing resumes from PDF, DOCX, TXT, HTML, or MD files. Export as PDF (best for ATS), DOCX, or HTML.',
    icon: <div className="flex gap-2"><Upload className="h-8 w-8" /><Download className="h-8 w-8" /></div>,
    tip: 'Use Ctrl+S to save a JSON backup of your resume data.',
  },
  {
    title: 'You\'re All Set!',
    description: 'Start editing the sample resume or clear it and start fresh. Save up to 10 resume profiles for different job targets. Your data auto-saves to your browser. Happy job hunting!',
    icon: <span className="text-4xl">🎉</span>,
    tip: 'Keyboard shortcuts: Ctrl+P to print PDF, Ctrl+S to save backup.',
  },
];

export default function OnboardingGuide() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      // Small delay so the app renders first
      const timer = setTimeout(() => setShow(true), 1500);
      return () => { cancelAnimationFrame(id); clearTimeout(timer); };
    }
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!mounted || !show) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;
  const progress = ((step + 1) / STEPS.length) * 100;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={close}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar with label */}
        <div className="px-6 pt-4 pb-0">
          <div className="flex items-center justify-between mb-1.5">
            <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0.5">
              Step {step + 1} of {STEPS.length}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close tour"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="px-8 pt-6 pb-6">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              {current.icon}
            </div>
          </div>

          {/* Text */}
          <h2 className="text-lg font-bold text-center mb-2">{current.title}</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
            {current.description}
          </p>

          {/* Tip */}
          {current.tip && (
            <Card className="mb-5 border-primary/20 bg-primary/5">
              <CardContent className="px-4 py-3">
                <p className="text-[11px] text-muted-foreground text-center">
                  <span className="font-semibold text-primary">Tip:</span> {current.tip}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mb-5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all ${
                  i === step ? 'w-6 h-2 bg-primary' : i < step ? 'w-2 h-2 bg-primary/40' : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {!isFirst && (
                <Button variant="outline" size="default" onClick={prev} className="gap-1 h-10 px-4">
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              )}
              {!isLast && (
                <Button variant="ghost" size="default" onClick={close} className="text-muted-foreground text-xs h-10 px-4">
                  Skip tour
                </Button>
              )}
            </div>

            <Button size="default" onClick={next} className="gap-1 h-10 px-6 font-semibold">
              {isLast ? 'Get Started' : 'Next'} {!isLast && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/** Call this to restart the tour manually */
export function resetOnboarding() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
