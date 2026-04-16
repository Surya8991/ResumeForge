/**
 * Shared validation helpers for forms.
 * Each validator returns null for valid input or a string error message.
 */

export type Validator = (value: string) => string | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;
const PHONE_DIGIT_RE = /\d/g;
const URL_RE = /^https?:\/\/[^\s]+$/;
const URL_RELAXED_RE = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/?#].*)?$/i;

export const validators = {
  required: (value: string): string | null =>
    value.trim().length > 0 ? null : 'This field is required',

  email: (value: string): string | null => {
    if (!value) return null;
    return EMAIL_RE.test(value) ? null : 'Enter a valid email address';
  },

  phone: (value: string): string | null => {
    if (!value) return null;
    if (!PHONE_RE.test(value)) return 'Enter a valid phone number';
    const digitCount = (value.match(PHONE_DIGIT_RE) || []).length;
    return digitCount >= 7 ? null : 'Phone number must have at least 7 digits';
  },

  url: (value: string): string | null => {
    if (!value) return null;
    return URL_RELAXED_RE.test(value) ? null : 'Enter a valid URL';
  },

  strictUrl: (value: string): string | null => {
    if (!value) return null;
    return URL_RE.test(value) ? null : 'URL must start with http:// or https://';
  },

  minLength: (min: number): Validator => (value) =>
    value.length >= min ? null : `Must be at least ${min} characters`,

  maxLength: (max: number): Validator => (value) =>
    value.length <= max ? null : `Must be at most ${max} characters`,
};

/** Run multiple validators and return the first error found, or null. */
export function runValidators(value: string, ...validatorList: Validator[]): string | null {
  for (const v of validatorList) {
    const err = v(value);
    if (err) return err;
  }
  return null;
}

/** Sanitize free-text input by trimming and collapsing whitespace. */
export function sanitizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Strip control characters and zero-width characters that can break ATS parsing. */
export function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, '');
}
