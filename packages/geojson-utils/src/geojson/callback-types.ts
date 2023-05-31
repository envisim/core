export type GeomEachCallback<T> = (
  geom: T,
  featureIndex: number,
  geometryIndex: number,
) => void;

export type ForEachCallback<T> = (obj: T, index: number) => void;
