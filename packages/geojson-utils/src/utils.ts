export function degreeToRadian<T extends number | GeoJSON.Position>(p: T): T {
  if (typeof p === 'number') {
    return ((p * Math.PI) / 180.0) as T;
  }

  const r = [(p[0] * Math.PI) / 180.0, (p[1] * Math.PI) / 180.0];

  if (p.length === 3) {
    r.push(p[2]);
  }

  return r as T;
}

export function sincos(v: number): [number, number] {
  return [Math.sin(v), Math.cos(v)];
}
