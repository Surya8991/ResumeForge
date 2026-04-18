// Lead capture. Writes waitlist + contact submissions to Supabase when env
// vars are configured, falls back to localStorage otherwise so the forms
// stay useful on a fresh clone without credentials. All operations are
// best-effort; we never block the UI on a network call.
//
// Table shapes expected in Supabase (run these in the SQL editor once):
//
//   create table if not exists public.waitlist (
//     id uuid primary key default gen_random_uuid(),
//     email text not null unique,
//     source text,
//     created_at timestamptz not null default now()
//   );
//   alter table public.waitlist enable row level security;
//   create policy "waitlist insert" on public.waitlist
//     for insert with check (true);
//
//   create table if not exists public.contact_messages (
//     id uuid primary key default gen_random_uuid(),
//     name text not null,
//     email text not null,
//     subject text,
//     message text not null,
//     created_at timestamptz not null default now()
//   );
//   alter table public.contact_messages enable row level security;
//   create policy "contact insert" on public.contact_messages
//     for insert with check (true);

import { createClient } from '@/lib/supabase/client';
import { env } from '@/lib/env';

const WAITLIST_LOCAL_KEY = 'resumeforge-waitlist';
const CONTACT_LOCAL_KEY = 'resumeforge-contact-pending';

function isSupabaseConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

export interface WaitlistResult {
  ok: boolean;
  mode: 'supabase' | 'local';
  error?: string;
}

export async function joinWaitlist(email: string, source = 'pricing'): Promise<WaitlistResult> {
  const clean = email.trim().toLowerCase();
  if (!clean) return { ok: false, mode: 'local', error: 'Email is required.' };

  // Always persist locally as a safety net. If Supabase writes succeed,
  // fine. If they fail or are not configured, the local copy survives.
  try {
    const existing = JSON.parse(localStorage.getItem(WAITLIST_LOCAL_KEY) || '[]') as string[];
    if (!existing.includes(clean)) {
      existing.push(clean);
      localStorage.setItem(WAITLIST_LOCAL_KEY, JSON.stringify(existing));
    }
  } catch {
    // localStorage can fail in privacy modes. Not fatal.
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, mode: 'local' };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('waitlist').insert({ email: clean, source });
    // Unique-violation (user already on the list) is not a real error for us.
    if (error && !/duplicate key|unique/i.test(error.message)) {
      return { ok: false, mode: 'supabase', error: error.message };
    }
    return { ok: true, mode: 'supabase' };
  } catch (e) {
    return { ok: false, mode: 'supabase', error: e instanceof Error ? e.message : 'Network error' };
  }
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  mode: 'supabase' | 'local';
  error?: string;
}

export async function submitContactMessage(payload: ContactPayload): Promise<ContactResult> {
  const trimmed: ContactPayload = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    subject: payload.subject?.trim() || undefined,
    message: payload.message.trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.message) {
    return { ok: false, mode: 'local', error: 'Name, email, and message are required.' };
  }

  // Safety-net local persistence so a pending submission is not lost if
  // Supabase is unavailable.
  try {
    const existing = JSON.parse(localStorage.getItem(CONTACT_LOCAL_KEY) || '[]') as ContactPayload[];
    existing.push(trimmed);
    localStorage.setItem(CONTACT_LOCAL_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, mode: 'local' };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_messages').insert(trimmed);
    if (error) return { ok: false, mode: 'supabase', error: error.message };
    return { ok: true, mode: 'supabase' };
  } catch (e) {
    return { ok: false, mode: 'supabase', error: e instanceof Error ? e.message : 'Network error' };
  }
}
