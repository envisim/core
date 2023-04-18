export function copy<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }

  // Enjoy
  return JSON.parse(JSON.stringify(obj));
}
