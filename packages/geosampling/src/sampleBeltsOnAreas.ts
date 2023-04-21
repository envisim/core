import {Random} from '@envisim/random';
import {bbox, destination, distance, rotateCoord} from '@envisim/geojson-utils';
import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';
import {intersectAreaSampleAreaFrame} from './intersectAreaSampleAreaFrame.js';

interface IsampleBeltsOnAreasOpts {
  distBetween: number;
  rotation?: number;
  halfWidth: number;
  rand?: Random;
}
/**
 * Selects a systematic sample of belts (or lines) on areas.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing Polygon/MultiPolygon.
 * @param opts - An options object.
 * @param opts.distBetween - Distance > 0 in meters between center lines.
 * @param opts.halfWidth - Half the width of the belt (= 0 for line sampling).
 * @param opts.rotation - Rotation angle in degrees.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of Polygon/MultiPolygon.
 */
export const sampleBeltsOnAreas = (
  geoJSON: GeoJSON.FeatureCollection,
  opts: IsampleBeltsOnAreasOpts = {halfWidth: 0, distBetween: 100, rotation: 0},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const halfWidth = opts.halfWidth || 0;
  const distBetween = opts.distBetween || 100;
  const rotation = opts.rotation || 0;
  const rand = opts.rand ?? new Random();
  const numPointsPerLine = 20;
  const box = geoJSON.bbox || bbox(geoJSON);
  const randomStart = rand.float() * distBetween;
  const latPerMeter =
    (box[3] - box[1]) / distance([box[0], box[1]], [box[0], box[3]]);
  const refCoord = [
    box[0] + (box[2] - box[0]) / 2,
    box[1] + (box[3] - box[1]) / 2,
  ];
  let maxRadius = Math.max(
    distance([box[0], box[1]], refCoord),
    distance([box[2], box[3]], refCoord),
  );
  let smallestAtLat = 0;
  if (box[1] > 0) {
    smallestAtLat = box[3];
  }
  if (box[3] < 0) {
    smallestAtLat = box[1];
  }
  if (box[3] > 0 && box[1] < 0) {
    smallestAtLat = Math.max(box[3], -box[1]);
  }
  const minLon = destination([refCoord[0], smallestAtLat], maxRadius, 270)[0];
  const maxLon = destination([refCoord[0], smallestAtLat], maxRadius, 90)[0];
  const minLat = destination(refCoord, maxRadius + halfWidth, 180)[1];
  const maxLat = destination(refCoord, maxRadius + halfWidth, 0)[1];
  const numLines = Math.ceil(
    distance([box[0], minLat], [box[0], maxLat]) / distBetween,
  );
  const lineStrings = [];
  let latitude = 0;
  if (halfWidth === 0) {
    // Sample of lines, not belts.
    for (let i = 0; i < numLines; i++) {
      latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
      let thisLine = [];
      for (let j = 0; j < numPointsPerLine; j++) {
        thisLine.push(
          rotateCoord(
            [
              minLon + (j / (numPointsPerLine - 1)) * (maxLon - minLon),
              latitude,
            ],
            refCoord,
            rotation,
          ),
        );
      }
      lineStrings.push(thisLine);
    }
    let prelResult: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: lineStrings.map((coords) => {
        const feature: GeoJSON.Feature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords,
          },
          properties: {
            _designWeight: distBetween,
          },
        };
        feature.bbox = bbox(feature);
        return feature;
      }),
    };
    return intersectLineSampleAreaFrame(prelResult, geoJSON);
  }
  // It is belts, not lines.
  for (let i = 0; i < numLines; i++) {
    latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
    let thisLine = []; // Will be polygon.
    // First side of belt (counterclockwise).
    for (let j = 0; j < numPointsPerLine; j++) {
      thisLine.push(
        rotateCoord(
          [
            minLon + (j / (numPointsPerLine - 1)) * (maxLon - minLon),
            latitude - halfWidth * latPerMeter,
          ],
          refCoord,
          rotation,
        ),
      );
    }
    // Reverse direction on other side.
    for (let j = numPointsPerLine - 1; j >= 0; j--) {
      thisLine.push(
        rotateCoord(
          [
            minLon + (j / (numPointsPerLine - 1)) * (maxLon - minLon),
            latitude + halfWidth * latPerMeter,
          ],
          refCoord,
          rotation,
        ),
      );
    }
    // Close the polygon by adding first coordinate at the end.
    thisLine.push([...thisLine[0]]);
    lineStrings.push(thisLine);
  }
  let prelResult: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: lineStrings.map((coords) => {
      const feature: GeoJSON.Feature = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coords],
        },
        properties: {
          _designWeight: distBetween / (halfWidth * 2),
        },
      };
      feature.bbox = bbox(feature);
      return feature;
    }),
  };
  return intersectAreaSampleAreaFrame(prelResult, geoJSON);
};
