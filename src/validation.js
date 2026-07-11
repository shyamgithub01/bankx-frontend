/**
 * Split-based rather than regex-based: the usual `[^\s@]+@[^\s@]+\.[^\s@]+`
 * pattern backtracks super-linearly on long non-matching input.
 */
export function isEmail(value) {
  const parts = String(value).split('@');
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  if (!local || !domain || /\s/.test(value)) return false;

  const labels = domain.split('.');
  return labels.length >= 2 && labels.every(Boolean);
}
