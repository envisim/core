import type * as GJ from "@envisim/geojson-utils/geojson";
import { type AreaObject, MultiPolygon, Polygon } from "../objects/index.js";
import { type CirclesToPolygonsOptions } from "../utils/circles-to-polygons.js";
import { unionOfPolygons } from "../utils/union.js";
import { FeatureCollection } from "./class-feature-collection.js";

/**
 * @param collection - the collection to compute the union from
 * @param options -
 * @returns the union of the polygons in the areaCollection
 */
export function union(
  collection: FeatureCollection<AreaObject>,
  options: CirclesToPolygonsOptions = {},
): FeatureCollection<AreaObject, string> {
  const ppc = { pointsPerCircle: options.pointsPerCircle ?? 16 };
  const geoms: GJ.Position[][][] = [];

  for (const feature of collection.features) {
    if (Polygon.isObject(feature.geometry) || MultiPolygon.isObject(feature.geometry)) {
      geoms.push(...feature.geometry.getCoordinateArray());
    } else {
      const cp = feature.geometry.toPolygon(ppc);

      if (cp === null) continue;

      geoms.push(...cp.getCoordinateArray());
    }
  }

  const unionOfGeoms = unionOfPolygons(geoms);

  const fc = FeatureCollection.newArea();

  if (unionOfGeoms.length === 1) {
    fc.addGeometry(Polygon.create(unionOfGeoms[0]), {});
  } else if (unionOfGeoms.length > 1) {
    fc.addGeometry(MultiPolygon.create(unionOfGeoms), {});
  }

  return fc;
}
