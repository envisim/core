// @ts-ignore
//import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader';
// @ts-ignore
//import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter';
// @ts-ignore
//import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp';

import turfBuffer from '@turf/buffer';

type BufferOpts = {
  radius?: number;
  steps?: number;
};

/**
 * Buffers a GeoJSON FeatureCollection. Geometries are buffered individually.
 * May result in overlapping geometries. Use unionOfPolygons() on resulting
 * FeatureCollection to union overlapping polygons.
 *
 * @param geoJSON - The GeoJSON to buffer.
 * @param opts - Options object.
 * @param opts.radius - The radius/distance to buffer in meters.
 * @param opts.steps - The number of steps in the buffer.
 * @returns - A GeoJSON FeatureCollection with result of buffering. An empty FeatureCollection if failed.
 */
export const buffer = (
  geoJSON: GeoJSON.FeatureCollection,
  opts: BufferOpts,
): GeoJSON.FeatureCollection => {
  const radius = opts.radius ?? 0;
  return turfBuffer(geoJSON, radius / 1000, {
    units: 'kilometers',
    steps: opts.steps ?? 10,
  });
};

/*
import {toFeatureCollection} from './toFeatureCollection.js';
import {copy} from './copy.js';
import {bbox} from './bbox.js';
import {azimuthalEquidistant} from './projections.js';
import {geomEach} from './geomEach.js';



type Geom =
  | GeoJSON.Point
  | GeoJSON.MultiPoint
  | GeoJSON.LineString
  | GeoJSON.MultiLineString
  | GeoJSON.Polygon
  | GeoJSON.MultiPolygon;

type Projection = {
  project: Function;
  unproject: Function;
};

const reader = new GeoJSONReader();
const writer = new GeoJSONWriter();

const bufferGeometry = (
  geom: Geom,
  opts: BufferOpts = {},
  proj: Projection,
): Geom => {
  const g = copy(geom);
  g.coordinates = projectCoords(g.coordinates, proj.project);
  const radius = opts.radius || 0;
  const steps = opts.steps || 10;
  return writer.write(BufferOp.bufferOp(reader.read(g), radius, steps));
};

const checkCoords = (coords: any): boolean => {
  if (Array.isArray(coords[0])) return checkCoords(coords[0]);
  return isNaN(coords[0]);
};

const projectCoords = (coords: any, proj: Function) => {
  if (typeof coords[0] !== 'object') return proj(coords);
  return coords.map((coord: any) => {
    return projectCoords(coord, proj);
  });
};

const bufferFeature = (
  feature: GeoJSON.Feature,
  opts: BufferOpts,
  proj: Projection,
): GeoJSON.Feature[] => {
  const result: Geom[] = [];
  geomEach(feature, (geom: Geom) => {
    const buffered = bufferGeometry(geom, opts, proj);
    if (checkCoords(buffered.coordinates)) {
      // Buffering successful, unproject coordinates
      buffered.coordinates = projectCoords(
        buffered.coordinates,
        proj.unproject,
      );
      // Push geometry
      result.push(buffered);
    }
  });
  // Return array of feature with successful geometries
  if (result.length === 1) {
    return [{type: 'Feature', geometry: result[0], properties: {}}];
  }
  // By geomEach, nested geometry collections will be
  // converted to a single geometry collection.
  if (result.length > 1) {
    return [
      {
        type: 'Feature',
        geometry: {type: 'GeometryCollection', geometries: result},
        properties: {},
      },
    ];
  }
  // Return empty array as no geometries could be buffered
  return [];
};
*/

/*
export const buffer = (
  geoJSON: GeoJSON.GeoJSON,
  opts: BufferOpts,
): GeoJSON.FeatureCollection => {
  const g = toFeatureCollection(geoJSON, {copy: false});
  const box = geoJSON.bbox || bbox(g);
  if (box.length !== 4) {
    throw new Error('The bbox needs to be of length 4.');
  }
  // Fix one azimuthalEquidistant projection for entire collection
  const refCoord: GeoJSON.Position = [
    box[0] + (box[2] - box[0]) / 2,
    box[1] + (box[3] - box[1]) / 2,
  ];
  const proj = azimuthalEquidistant(refCoord);
  // Store buffered features
  const features: GeoJSON.Feature[] = [];
  // Buffer and push features if buffering is successful
  g.features.forEach(feature => {
    const buffered = bufferFeature(feature, opts, proj);
    if (buffered.length === 1) {
      features.push(buffered[0]);
    }
  });
  // Return the collection
  return {type: 'FeatureCollection', features: features};
};
*/
