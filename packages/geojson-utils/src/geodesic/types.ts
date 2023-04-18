export type GCPosition = [number, number, number];

export interface IGeodesicBase {
  a: number;
  f: number;
}

export interface IGeodesic extends IGeodesicBase {
  b: number;
  n: number;
  e2: number;
  ep2: number;
}
