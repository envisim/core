import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js';
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js';
import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp.js';

import type * as GJ from './types/geojson.js';
import {AreaCollection, Circle, MultiCircle} from './geojson/index.js';
import {bbox4} from './utils/bbox.js';
import {longitudeCenter} from './utils/position.js';
import {type Projection, azimuthalEquidistant} from './utils/projections.js';

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

type ProjFn = (coord: GJ.Position) => GJ.Position;
type NestedPosition = GJ.Position | NestedPosition[];

/**
 * Internal function to project/unproject coords
 * @param coords
 * @param proj
 * @returns
 */
function projectCoords(coords: NestedPosition, proj: ProjFn): NestedPosition {
  if (Array.isArray(coords[0])) {
    return (coords as NestedPosition[]).map((coord: NestedPosition) => {
      return projectCoords(coord, proj);
    });
  }
  return proj(coords as GJ.Position);
}

/**
 * Internal function to check if coords are NaN
 * @param coords
 * @returns
 */
function coordsIsNaN(coords: NestedPosition) {
  if (Array.isArray(coords[0])) return coordsIsNaN(coords[0]);
  return isNaN(coords[0]);
}

/**
 * Buffers a GeoJSON FeatureCollection. Geometries are buffered individually.
 * May result in overlapping geometries. Use unionOfPolygons() on resulting
 * FeatureCollection to union overlapping polygons.
 *
 * @param geoJSON The AreaCollection to buffer.
 * @param opts
 * @returns An buffered AreaCollection, or `null` if buffering failed.
 */
export function buffer(
  geoJSON: AreaCollection,
  opts: BufferOpts,
): AreaCollection | null {
  const radius = opts.radius ?? 0;
  const steps = opts.steps ?? 10;
  const features: GJ.AreaFeature[] = [];
  const box = bbox4(geoJSON.getBBox());
  const center: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    (box[1] + box[3]) / 2,
  ];
  const projection = azimuthalEquidistant(center);

  geoJSON.geomEach((geom) => {
    const bf = bufferGeometry(geom, radius, steps, projection);
    if (bf) {
      features.push(bf);
    }
  });

  if (features.length === 0) return null;
  return new AreaCollection({type: 'FeatureCollection', features}, true);
}

/**
 * Internal function to buffer a geometry (AreaObject) using jsts
 * @param geom
 * @param radius
 * @param steps
 * @param projection
 */
function bufferGeometry(
  geom: GJ.AreaObject,
  radius: number,
  steps: number,
  projection: Projection,
): GJ.AreaFeature | null {
  const reader = new GeoJSONReader();
  const writer = new GeoJSONWriter();
  let newGeom: GJ.AreaObject;
  if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
    newGeom = geom.toPolygon();
  } else {
    newGeom = geom;
  }
  const projected = {
    type: newGeom.type,
    coordinates: projectCoords(newGeom.coordinates, projection.project),
  };
  const g = reader.read(projected);
  const bufOp = new BufferOp(g);
  bufOp.setQuadrantSegments(steps);
  let buffered: any = bufOp.getResultGeometry(radius);
  buffered = writer.write(buffered);
  if (!coordsIsNaN(buffered.coordinates)) {
    return {
      type: 'Feature',
      geometry: {
        type: buffered.type,
        coordinates: projectCoords(
          buffered.coordinates,
          projection.unproject,
        ) as any,
      },
      properties: {},
    };
  }
  return null;
}
