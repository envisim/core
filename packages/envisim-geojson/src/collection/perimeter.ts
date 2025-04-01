import type { AreaObject } from "../objects/index.js";
import type { FeatureCollection } from "./class-feature-collection.js";

export function perimeter(collection: FeatureCollection<AreaObject>): number {
  return collection.features.reduce((p, c) => p + c.geometry.perimeter(), 0.0);
}
