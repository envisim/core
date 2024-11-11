import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  type LineObject,
  bbox4,
  createDesignWeightProperty,
  cutLineGeometry,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  rotateCoord,
  toLineObject,
} from '@envisim/geojson-utils';

import {intersectLineSampleAreaFrame} from '../utils/index.js';
import {
  SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
  type SampleSystematicLineOnAreaOptions,
  sampleSystematicLineOnAreaOptionsCheck,
} from './options.js';

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param collection
 * @param opts
 */
export function sampleSystematicLinesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rand,
    pointsPerCircle = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.pointsPerCircle,
    distBetween,
    rotation = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rotation,
  }: SampleSystematicLineOnAreaOptions,
): FeatureCollection<LineObject> {
  const optionsError = sampleSystematicLineOnAreaOptionsCheck({
    pointsPerCircle,
    distBetween,
    rotation,
  });
  if (optionsError !== null) {
    throw new RangeError(`samplePointsOnAreas error: ${optionsError}`);
  }

  const numPointsPerLine = 20;

  const box = bbox4(collection.getBBox());
  const randomStart = rand.float() * distBetween;

  const latPerMeter = (box[3] - box[1]) / Geodesic.distance([box[0], box[1]], [box[0], box[3]]);

  const refCoord: GJ.Position = [longitudeCenter(box[0], box[2]), box[1] + (box[3] - box[1]) / 2.0];

  const maxRadius = Math.max(
    Geodesic.distance([box[0], box[1]], refCoord),
    Geodesic.distance([box[2], box[3]], refCoord),
  );

  let smallestAtLat = 0;

  if (box[3] > 0.0 && box[1] < 0.0) {
    smallestAtLat = Math.max(box[3], -box[1]);
  } else if (box[3] < 0.0) {
    smallestAtLat = box[1];
  } else if (box[1] > 0.0) {
    smallestAtLat = box[3];
  }

  const minLon = Geodesic.destination([refCoord[0], smallestAtLat], maxRadius, 270.0)[0];
  const maxLon = Geodesic.destination([refCoord[0], smallestAtLat], maxRadius, 90.0)[0];
  const minLat = Geodesic.destination(refCoord, maxRadius, 180.0)[1];
  const lonDist = longitudeDistance(minLon, maxLon);

  const numLines = Math.ceil((2.0 * maxRadius) / distBetween);

  const sc = FeatureCollection.newLine([], {_designWeight: createDesignWeightProperty()});
  // const lineFeatures: LineFeature[] = [];
  for (let i = 0; i < numLines; i++) {
    const latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
    const thisLine = [];
    for (let j = 0; j < numPointsPerLine; j++) {
      thisLine.push(
        rotateCoord(
          [normalizeLongitude(minLon + (j / (numPointsPerLine - 1)) * lonDist), latitude],
          refCoord,
          rotation,
        ),
      );
    }
    // Cut at antimeridian if needed
    const lineGeom = toLineObject(
      cutLineGeometry({
        type: 'LineString',
        coordinates: thisLine,
      }),
    );
    if (lineGeom === null) continue;
    sc.addGeometry(lineGeom, {_designWeight: distBetween}, true);
  }

  return intersectLineSampleAreaFrame(sc, collection, {pointsPerCircle});
}
