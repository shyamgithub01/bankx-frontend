const KEYS = ['user', 'employee', 'admin'];

/** localStorage can hold malformed JSON; never let that crash a render. */
function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export const getUser = () => read('user');
export const getEmployee = () => read('employee');
export const getAdmin = () => read('admin');

export function setSession(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function clearSession() {
  KEYS.forEach((k) => localStorage.removeItem(k));
}
