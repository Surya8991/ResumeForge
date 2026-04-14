const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Convert "Jan 2020" or "January 2020" to "2020-01" for month input */
export function toMonthInput(display: string): string {
  if (!display || display === 'Present') return '';
  // Already in YYYY-MM format
  if (/^\d{4}-\d{2}$/.test(display)) return display;
  // Try "Mon YYYY" format
  const match = display.match(/^(\w+)\s+(\d{4})$/);
  if (match) {
    const monthIdx = MONTHS.findIndex(
      (m) => match[1].toLowerCase().startsWith(m.toLowerCase())
    );
    if (monthIdx !== -1) {
      return `${match[2]}-${String(monthIdx + 1).padStart(2, '0')}`;
    }
  }
  return '';
}

/** Convert "2020-01" to "Jan 2020" for display/storage */
export function fromMonthInput(value: string): string {
  if (!value) return '';
  const [year, month] = value.split('-');
  const idx = parseInt(month, 10) - 1;
  if (idx >= 0 && idx < 12 && year) {
    return `${MONTHS[idx]} ${year}`;
  }
  return value;
}
