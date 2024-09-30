import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js';
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js';
import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp.js';

import type * as GJ from './types/geojson.js';
import {
  AreaCollection,
  AreaFeature,
  AreaObject,
  Circle,
  MultiCircle,
} from './geojson/index.js';
import {bbox4} from './utils/bbox.js';
import {longitudeCenter} from './utils/position.js';
import {
  type NestedPosition,
  type Projection,
  azimuthalEquidistant,
  projectCoords,
} from './utils/projections.js';

type BufferOpts = {
  /**
   * The radius/distance to buffer in meters
   */
  radius?: number;
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
 * Buffers a GeoJSON FeatureCollection. Geometries are buffered individually.
 * May result in overlapping geometries. Use unionOfPolygons() on resulting
 * FeatureCollection to union overlapping polygons.
 *
 * @param areaCollection The AreaCollection to buffer.
 * @param opts
 * @returns A buffered AreaCollection, or `null` if buffering failed.
 */
export function buffer(
  areaCollection: AreaCollection,
  opts: BufferOpts,
): AreaCollection | null {
  const radius = opts.radius ?? 0;
  const steps = opts.steps ?? 10;
  const features: AreaFeature[] = [];
  const box = bbox4(areaCollection.getBBox());
  const center: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    (box[1] + box[3]) / 2,
  ];
  const projection = azimuthalEquidistant(center);

  areaCollection.geomEach((geom) => {
    const bf = bufferGeometry(geom, radius, steps, projection);
    if (bf) {
      features.push(bf);
    }
  });

  if (features.length === 0) return null;
  return AreaCollection.create(features, true);
}

/**
 * Internal function to buffer a geometry (AreaObject) using jsts
 * @param geom
 * @param radius
 * @param steps
 * @param projection
 */
function bufferGeometry(
  geom: AreaObject,
  radius: number,
  steps: number,
  projection: Projection,
): AreaFeature | null {
  // if geom is a Circle or MultiCircle, convert it to a Polygon
  let newGeom: AreaObject;
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
    return AreaFeature.create(
      {
        type: buffered.type,
        coordinates: projectCoords(buffered.coordinates, projection.unproject),
      },
      {},
      true,
    );
  }
  return null;
}
