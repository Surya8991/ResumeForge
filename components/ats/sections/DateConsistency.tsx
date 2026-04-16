'use client';

import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface DateCheck {
  label: string;
  passed: boolean;
  message: string;
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export default function DateConsistency() {
  const { resumeData } = useResumeStore();

  const checks = useMemo(() => {
    const results: DateCheck[] = [];

    // Collect all date entries from experience and education
    const expEntries = resumeData.experience;
    const eduEntries = resumeData.education;

    if (expEntries.length === 0 && eduEntries.length === 0) {
      return [{ label: 'No entries', passed: true, message: 'Add experience or education to check dates.' }];
    }

    // Check 1: All dates filled
    const missingDates: string[] = [];
    for (const exp of expEntries) {
      if (!exp.startDate) missingDates.push(`${exp.position || 'Untitled'} (start date)`);
      if (!exp.endDate && !exp.current) missingDates.push(`${exp.position || 'Untitled'} (end date)`);
    }
    for (const edu of eduEntries) {
      if (!edu.startDate) missingDates.push(`${edu.degree || 'Untitled'} (start date)`);
      if (!edu.endDate) missingDates.push(`${edu.degree || 'Untitled'} (end date)`);
    }
    results.push({
      label: 'All dates filled',
      passed: missingDates.length === 0,
      message: missingDates.length === 0
        ? 'All entries have dates.'
        : `Missing: ${missingDates.slice(0, 3).join(', ')}${missingDates.length > 3 ? ` +${missingDates.length - 3} more` : ''}`,
    });

    // Check 2: Consistent date format (all YYYY-MM or all YYYY)
    const allDates = [
      ...expEntries.flatMap((e) => [e.startDate, e.endDate]),
      ...eduEntries.flatMap((e) => [e.startDate, e.endDate]),
    ].filter(Boolean);

    const hasMonthDates = allDates.some((d) => /^\d{4}-\d{2}$/.test(d));
    const hasYearOnly = allDates.some((d) => /^\d{4}$/.test(d));
    const formatConsistent = !(hasMonthDates && hasYearOnly);

    results.push({
      label: 'Consistent format',
      passed: formatConsistent,
      message: formatConsistent
        ? 'All dates use the same format.'
        : 'Mix of YYYY-MM and YYYY formats detected. Use one format consistently.',
    });

    // Check 3: Chronological order (most recent first for experience)
    let chronoPass = true;
    for (let i = 0; i < expEntries.length - 1; i++) {
      const current = parseDate(expEntries[i].startDate);
      const next = parseDate(expEntries[i + 1].startDate);
      if (current && next && current < next) {
        chronoPass = false;
        break;
      }
    }
    results.push({
      label: 'Chronological order',
      passed: chronoPass,
      message: chronoPass
        ? 'Experience entries are in reverse chronological order.'
        : 'Experience entries are not in order. Most recent should come first.',
    });

    // Check 4: No overlapping dates in experience
    let overlapPass = true;
    const sortedExp = [...expEntries]
      .filter((e) => e.startDate)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    for (let i = 0; i < sortedExp.length - 1; i++) {
      const currentEnd = sortedExp[i].endDate
        ? parseDate(sortedExp[i].endDate)
        : new Date();
      const nextStart = parseDate(sortedExp[i + 1].startDate);

      // Check overlap only if the earlier job's start is after the later job's end
      // (since sorted by startDate descending, sortedExp[i] is more recent)
      // This checks if the previous (older) job overlaps with the current one
      if (currentEnd && nextStart) {
        const nextEnd = sortedExp[i + 1].endDate
          ? parseDate(sortedExp[i + 1].endDate)
          : new Date();
        const currentStart = parseDate(sortedExp[i].startDate);
        if (nextEnd && currentStart && nextEnd > currentStart) {
          // Overlap detected
          overlapPass = false;
          break;
        }
      }
    }
    results.push({
      label: 'No date overlaps',
      passed: overlapPass,
      message: overlapPass
        ? 'No overlapping date ranges detected.'
        : 'Some experience entries have overlapping dates.',
    });

    return results;
  }, [resumeData]);

  return (
    <div className="space-y-1.5">
      {checks.map((check, i) => (
        <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          {check.passed ? (
            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{check.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{check.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
