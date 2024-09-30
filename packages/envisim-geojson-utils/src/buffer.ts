import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js';
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js';
import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp.js';

import type * as GJ from './types/geojson.js';
import {
  AreaCollection,
  AreaFeature,
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
  const features: AreaFeature[] = [];

  areaCollection.geomEach((geom) => {
    const bg = bufferGeometry(geom, opts);
    if (bg) {
      features.push(AreaFeature.create(bg, {}));
    }
  });

  if (features.length === 0) return null;
  return AreaCollection.create(features, true);
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
  //if (radius === 0) return copy(geom);

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
