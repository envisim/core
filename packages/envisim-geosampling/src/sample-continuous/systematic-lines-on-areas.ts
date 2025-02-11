import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  type LineObject,
  bbox4,
  bboxCenter,
  cutLineGeometry,
  toLineObject,
} from '@envisim/geojson-utils';

import {intersectLineSampleAreaFrame} from '../utils/index.js';
import {
  SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
  type SampleSystematicLineOnAreaOptions,
  sampleSystematicLineOnAreaOptionsCheck,
} from './options.js';

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}

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
    throw new RangeError(optionsError);
  }

  const box = bbox4(collection.getBBox());
  const center = bboxCenter(box);
  const bottomLeft: GJ.Position = [box[0], box[1]];
  const topRight: GJ.Position = [box[2], box[3]];
  const radius = Math.max(
    Geodesic.distance(center, bottomLeft),
    Geodesic.distance(center, topRight),
  );

  const numPointsPerLine = 20;
  const numLines = Math.ceil((2.0 * radius) / distBetween);
  const randomStart = rand.float() * distBetween;

  const sc = FeatureCollection.newLine([]);

  for (let i = 0; i < numLines; i++) {
    const x = -radius + i * distBetween + randomStart;
    const thisLine = [];
    for (let j = 0; j < numPointsPerLine; j++) {
      const y = -radius + (2 * radius * j) / (numPointsPerLine - 1);
      thisLine.push(placePoint([x, y], center, rotation));
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
