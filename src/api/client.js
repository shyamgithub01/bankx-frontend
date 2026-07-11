import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-5z27.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Turn any axios failure into a single human-readable line.
 *
 * FastAPI reports validation errors as `detail: [{loc, msg, ...}]`, so a naive
 * `detail` read renders "[object Object]". Handle that shape, the plain-string
 * shape, and the no-response (server down) case.
 */
export function errorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (!err?.response) {
    return 'Cannot reach the server. Check your connection and try again.';
  }

  const { status, data } = err.response;
  const detail = data?.detail;

  if (typeof detail === 'string' && detail.trim()) return detail;

  if (Array.isArray(detail) && detail.length) {
    return detail
      .map((d) => {
        const field = Array.isArray(d.loc) ? d.loc[d.loc.length - 1] : null;
        return field ? `${field}: ${d.msg}` : d.msg;
      })
      .join('\n');
  }

  if (status === 401) return 'Invalid credentials. Please check your details and try again.';
  if (status === 403) return 'You are not authorised to perform this action.';
  if (status === 404) return 'Not found.';
  if (status >= 500) return 'The server ran into a problem. Please try again shortly.';

  return fallback;
}
