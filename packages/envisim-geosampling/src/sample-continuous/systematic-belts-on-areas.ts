import {
  AreaCollection,
  AreaFeature,
  type GeoJSON as GJ,
  Geodesic,
  GeometricPrimitive,
  Layer,
  Polygon,
  bbox4,
  createDesignWeightProperty,
  cutAreaGeometry,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  rotateCoord,
} from '@envisim/geojson-utils';

import {intersectAreaSampleAreaFrame} from '../utils/index.js';
import {
  SAMPLE_BELT_ON_AREA_OPTIONS,
  type SampleBeltOnAreaOptions,
} from './options.js';

/**
 * Selects a systematic sample of belts on areas.
 *
 * @param layer
 * @param opts
 */
export const sampleSystematicBeltsOnAreas = (
  layer: Layer<AreaCollection>,
  {
    rand = SAMPLE_BELT_ON_AREA_OPTIONS.rand,
    pointsPerCircle = SAMPLE_BELT_ON_AREA_OPTIONS.pointsPerCircle,
    distBetween,
    rotation = SAMPLE_BELT_ON_AREA_OPTIONS.rotation,
    halfWidth,
  }: SampleBeltOnAreaOptions,
): Layer<AreaCollection> => {
  Layer.assert(layer, GeometricPrimitive.AREA);

  if (distBetween <= 0.0) {
    throw new Error('Input distBetween must be a positive number.');
  }

  if (halfWidth <= 0.0) {
    throw new Error('Input halfWidth must be a number > 0.');
  }

  const numPointsPerLine = 20;
  const box = bbox4(layer.collection.getBBox());
  const randomStart = rand.float() * distBetween;

  const latPerMeter =
    (box[3] - box[1]) / Geodesic.distance([box[0], box[1]], [box[0], box[3]]);

  const refCoord: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    box[1] + (box[3] - box[1]) / 2.0,
  ];

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

  const minLon = Geodesic.destination(
    [refCoord[0], smallestAtLat],
    maxRadius,
    270,
  )[0];
  const maxLon = Geodesic.destination(
    [refCoord[0], smallestAtLat],
    maxRadius,
    90,
  )[0];
  const minLat = Geodesic.destination(
    refCoord,
    maxRadius + halfWidth,
    180.0,
  )[1];
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
  const features = rings.map((coords) => {
    return AreaFeature.create(
      cutAreaGeometry(new Polygon({coordinates: [coords]}, true)),
      {_designWeight: distBetween / (halfWidth * 2.0)},
      true,
    );
  });

  return new Layer(
    intersectAreaSampleAreaFrame(
      AreaCollection.create(features, true),
      layer.collection,
      pointsPerCircle,
    ),
    {_designWeight: createDesignWeightProperty()},
    true,
  );
};
