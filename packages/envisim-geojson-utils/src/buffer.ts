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

  if (
    radius <= 0.0 &&
    (LineString.isObject(geom) || MultiLineString.isObject(geom))
  ) {
    return null;
  }

  const box = bbox4(geom.getBBox());
  const center: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    (box[1] + box[3]) / 2,
  ];
  const projection = azimuthalEquidistant(center);

  // if geom is a Circle or MultiCircle, convert it to a Polygon
  let newGeom: AreaObject | LineObject;
  if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
    newGeom = geom.toPolygon();
  } else {
    newGeom = geom;
  }
  // project to azimuthal equidistant
  const projected = {
    type: newGeom.type,
    coordinates: projectCoords(newGeom.coordinates, projection.project),
  };
  // buffer
  const reader = new GeoJSONReader();
  const g = reader.read(projected);

  const bufOp = new BufferOp(g);
  bufOp.setQuadrantSegments(steps);

  const writer = new GeoJSONWriter();
  const buffered = writer.write(bufOp.getResultGeometry(radius)) as any;

  // project back and return as AreaFeature
  if (!coordsIsNaN(buffered.coordinates)) {
    if (buffered.type === 'Polygon') {
      return new Polygon(
        {
          type: buffered.type,
          coordinates: projectCoords(
            buffered.coordinates,
            projection.unproject,
          ),
        },
        true,
      );
    }
    return new MultiPolygon(
      {
        type: buffered.type,
        coordinates: projectCoords(buffered.coordinates, projection.unproject),
      },
      true,
    );
  }
  return null;
}
