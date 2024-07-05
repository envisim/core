export function swap<T>(arr: T[], a: number, b: number): void {
  if (a === b) return;

  const t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}
