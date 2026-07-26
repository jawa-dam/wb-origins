const STORAGE_PREFIX = 'gei-';

export function readState(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return structuredClone(fallback);
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

export function writeState(key, value) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

export function clearState(key) {
  localStorage.removeItem(STORAGE_PREFIX + key);
}