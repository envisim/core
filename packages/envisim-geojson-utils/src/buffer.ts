// @ts-expect-error: TypeScript cannot find declaration for 'GeoJSONReader'
import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js';
// @ts-expect-error: TypeScript cannot find declaration for 'GeoJSONWriter'
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js';
// @ts-expect-error: TypeScript cannot find declaration for 'BufferOp'
import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp.js';

import type * as GJ from './types/geojson.js';
import {
  AreaObject,
  Circle,
  LineObject,
  LineString,
  MultiCircle,
  MultiLineString,
  MultiPolygon,
  Polygon,
} from './geojson/index.js';
import {bbox4} from './utils/bbox.js';
import {longitudeCenter} from './utils/position.js';
import {
  type NestedPosition,
  azimuthalEquidistant,
  projectCoords,
} from './utils/projections.js';

type BufferOpts = {
  /**
   * The radius/distance to buffer in meters
   */
  distance?: number;
  /**
   * The number of steps in the buffer.
   */
  steps?: number;
};

/**
 * Internal function to check if coords are NaN
 * @param coords
 */
function coordsIsNaN(coords: NestedPosition): boolean {
  if (Array.isArray(coords[0])) return coordsIsNaN(coords[0]);
  return isNaN(coords[0]);
}

/**
 * Buffer a geometry (AreaObject|LineObject) using jsts
 * @param geom
 * @param opts
 */
export function bufferGeometry(
  geom: AreaObject | LineObject,
  opts: BufferOpts,
): Polygon | MultiPolygon | null {
  const radius = opts.distance ?? 0;
  const steps = opts.steps ?? 10;

  // Lines cannot be buffered with non-positive distance
  if (
    radius <= 0.0 &&
    (LineString.isObject(geom) || MultiLineString.isObject(geom))
  ) {
    return null;
  }

  // Set up projection for this geometry
  const box = bbox4(geom.getBBox());
  const center: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    (box[1] + box[3]) / 2,
  ];
  const projection = azimuthalEquidistant(center);

  // If geom is a Circle or MultiCircle, convert it to a Polygon first
  // only used if the function is used stand alone (not as method on a class)
  let newGeom: GJ.Polygon | GJ.MultiPolygon | GJ.LineObject;
  if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
    newGeom = geom.toPolygon();
  } else {
    newGeom = geom;
  }
  // Project the geometry to azimuthal equidistant
  const projected = {
    type: newGeom.type,
    coordinates: projectCoords(newGeom.coordinates, projection.project),
  };

  // Use jsts to buffer
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const reader = new GeoJSONReader() as {read: (g: object) => object};
  const writer = new GeoJSONWriter() as {write: (g: object) => object};
  const g = reader.read(projected);
  const bufOp = new BufferOp(g) as {
    setQuadrantSegments: (x: number) => void;
    getResultGeometry: (radius: number) => object;
  };
  bufOp.setQuadrantSegments(steps);
  const jstsGeom = bufOp.getResultGeometry(radius);
  const buffered = writer.write(jstsGeom) as GJ.Polygon | GJ.MultiPolygon;
  /* eslint-enable @typescript-eslint/no-unsafe-call */

  // Project back and return as Polygon | MultiPolygon
  // buffer may return coordinates that are undefined in case of empty Polygon
  // in that case return null
  if (!coordsIsNaN(buffered.coordinates)) {
    if (buffered.type === 'Polygon') {
      return Polygon.create(
        projectCoords(buffered.coordinates, projection.unproject),
        true,
      );
    }
    return MultiPolygon.create(
      projectCoords(buffered.coordinates, projection.unproject),
      true,
    );
  }
  return null;
}
