import type * as GJ from "./geojson.js";

export function copyCoordinates<T extends GJ.SingleTypeObject["coordinates"]>(coords: T): T {
  return coords.map((c) => (Array.isArray(c) ? copyCoordinates(c) : c)) as T;
}
