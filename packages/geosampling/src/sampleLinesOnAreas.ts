import {
  GeoJSON,
  AreaCollection,
  LineCollection,
  LineString,
  destination,
  distance,
  rotateCoord,
  bbox4,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  LineFeature,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';

export type TsampleLinesOnAreasOpts = {
  rotation?: number;
  rand?: Random;
};

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param collection an AreaCollection.
 * @param distBetween distance in meters between the parallell lines.
 * @param opts an options object.
 * @param opts.rotation rotation angle in degrees.
 * @param opts.rand optional instance of Random.
 * @returns a LineCollection.
 */
export function sampleLinesOnAreas(
  collection: AreaCollection,
  distBetween: number,
  opts: TsampleLinesOnAreasOpts,
): LineCollection {
  if (typeof distBetween !== 'number' || distBetween <= 0) {
    throw new Error('Input distBetween must be a positive number.');
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
  const minLat = destination(refCoord, maxRadius, 180)[1];
  const lonDist = longitudeDistance(minLon, maxLon);

  const numLines = Math.ceil((2 * maxRadius) / distBetween);

  const lineStrings = [];
  for (let i = 0; i < numLines; i++) {
    const latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
    const thisLine = [];
    for (let j = 0; j < numPointsPerLine; j++) {
      thisLine.push(
        rotateCoord(
          [
            normalizeLongitude(minLon + (j / (numPointsPerLine - 1)) * lonDist),
            latitude,
          ],
          refCoord,
          rotation,
        ),
      );
    }
    // TODO?: thisLine may cross antimeridian and thus produce
    // wrong result in intersect below. We may need to create
    // dual geometries.
    lineStrings.push(thisLine);
  }
  let features = lineStrings.map((coords) => {
    return LineFeature.create(
      LineString.create(coords, true),
      {_designWeight: distBetween},
      true,
    );
  });
  return intersectLineSampleAreaFrame(
    LineCollection.create(features, true),
    collection,
  );
}
