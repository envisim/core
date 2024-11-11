import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  bbox4,
  createDesignWeightProperty,
  cutAreaGeometry,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  rotateCoord,
  toAreaObject,
} from '@envisim/geojson-utils';

import {intersectAreaSampleAreaFrame} from '../utils/index.js';
import {
  SAMPLE_BELT_ON_AREA_OPTIONS,
  type SampleBeltOnAreaOptions,
  sampleBeltOnAreaOptionsCheck,
} from './options.js';

/**
 * Selects a systematic sample of belts on areas.
 *
 * @param collection
 * @param opts
 */
export const sampleSystematicBeltsOnAreas = (
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_BELT_ON_AREA_OPTIONS.rand,
    pointsPerCircle = SAMPLE_BELT_ON_AREA_OPTIONS.pointsPerCircle,
    distBetween,
    rotation = SAMPLE_BELT_ON_AREA_OPTIONS.rotation,
    halfWidth,
  }: SampleBeltOnAreaOptions,
): FeatureCollection<AreaObject> => {
  const optionsError = sampleBeltOnAreaOptionsCheck({
    pointsPerCircle,
    distBetween,
    rotation,
    halfWidth,
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

  let smallestAtLat = 0.0;

  if (box[3] > 0.0 && box[1] < 0.0) {
    smallestAtLat = Math.max(box[3], -box[1]);
  } else if (box[3] < 0.0) {
    smallestAtLat = box[1];
  } else if (box[1] > 0.0) {
    smallestAtLat = box[3];
  }

  const minLon = Geodesic.destination([refCoord[0], smallestAtLat], maxRadius, 270.0)[0];
  const maxLon = Geodesic.destination([refCoord[0], smallestAtLat], maxRadius, 90.0)[0];
  const minLat = Geodesic.destination(refCoord, maxRadius + halfWidth, 180.0)[1];
  const lonDist = longitudeDistance(minLon, maxLon);
  const numLines = Math.ceil((2.0 * maxRadius) / distBetween);

  const rings: GJ.Position[][] = [];
  for (let i = 0; i < numLines; i++) {
    const latitude = minLat + (randomStart + i * distBetween) * latPerMeter;
    const thisRing: GJ.Position[] = [];
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
    rings.push(thisRing);
  }

  const sc = FeatureCollection.newArea([], {_designWeight: createDesignWeightProperty()});
  for (const coords of rings) {
    const geom = toAreaObject(cutAreaGeometry({type: 'Polygon', coordinates: [coords]}));
    if (geom === null) continue;
    sc.addGeometry(geom, {_designWeight: distBetween / (halfWidth * 2.0)}, true);
  }

  return intersectAreaSampleAreaFrame(sc, collection, {pointsPerCircle});
};
