import {
  GeoJSON,
  AreaCollection,
  Polygon,
  destination,
  distance,
  rotateCoord,
  bbox4,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  AreaFeature,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {intersectAreaSampleAreaFrame} from './intersectAreaSampleAreaFrame.js';

export type TsampleBeltsOnAreasOpts = {
  rotation?: number;
  rand?: Random;
};
/**
 * Selects a systematic sample of belts on areas.
 *
 * @param collection - A GeoJSON FeatureCollection containing Polygon/MultiPolygon.
 * @param distBetween - Distance > 0 in meters between center lines.
 * @param halfWidth - Half the width of the belt (= 0 for line sampling).
 * @param opts - An options object.
 * @param opts.rotation - Rotation angle in degrees.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of Polygon/MultiPolygon.
 */
export const sampleBeltsOnAreas = (
  collection: AreaCollection,
  distBetween: number,
  halfWidth: number,
  opts: TsampleBeltsOnAreasOpts = {rotation: 0},
): AreaCollection => {
  if (typeof distBetween !== 'number' || distBetween <= 0) {
    throw new Error('Input distBetween must be a positive number.');
  }

  if (typeof halfWidth !== 'number' || halfWidth <= 0) {
    throw new Error('Input halfWidth must be a number > 0.');
  }

  const rotation = opts.rotation ?? 0;
  const rand = opts.rand ?? new Random();
  const numPointsPerLine = 20;
  const box = bbox4(collection.getBBox());
  const randomStart = rand.float() * distBetween;

  const latPerMeter =
    (box[3] - box[1]) / distance([box[0], box[1]], [box[0], box[3]]);

  const refCoord: GeoJSON.Position = [
    longitudeCenter(box[0], box[2]),
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
  const lonDist = longitudeDistance(minLon, maxLon);
  const numLines = Math.ceil((2 * maxRadius) / distBetween);

  const rings: GeoJSON.Position[][] = [];
  for (let i = 0; i < numLines; i++) {
    const latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
    let thisRing: GeoJSON.Position[] = [];
    // First side of belt (counterclockwise).
    for (let j = 0; j < numPointsPerLine; j++) {
      thisRing.push(
        rotateCoord(
          [
            normalizeLongitude(minLon + (j / (numPointsPerLine - 1)) * lonDist),
            latitude - halfWidth * latPerMeter,
          ],
          refCoord,
          rotation,
        ),
      );
    }
    // Reverse direction on other side.
    for (let j = numPointsPerLine - 1; j >= 0; j--) {
      thisRing.push(
        rotateCoord(
          [
            normalizeLongitude(minLon + (j / (numPointsPerLine - 1)) * lonDist),
            latitude + halfWidth * latPerMeter,
          ],
          refCoord,
          rotation,
        ),
      );
    }
    // Close the polygon by adding first coordinate at the end.
    thisRing.push([...thisRing[0]]);
    // TODO?: thisRing may cross antimeridian and thus produce
    // wrong result in intersect below. We may need to create
    // dual geometries.
    rings.push(thisRing);
  }
  const features = rings.map((coords) => {
    return AreaFeature.create(
      Polygon.create([coords], true),
      {_designWeight: distBetween / (halfWidth * 2)},
      true,
    );
  });
  return intersectAreaSampleAreaFrame(
    AreaCollection.create(features, true),
    collection,
  );
};
