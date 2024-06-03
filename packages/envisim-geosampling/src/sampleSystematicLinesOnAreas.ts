import {
  AreaCollection,
  type GeoJSON as GJ,
  Geodesic,
  GeometricPrimitive,
  Layer,
  LineCollection,
  LineFeature,
  bbox4,
  cutLineGeometry,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  rotateCoord,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';

export interface SampleSystematicLinesOnAreasOptions {
  /**
   * The distance in meters between the parallel lines.
   */
  distBetween: number;
  /**
   * Optional fixed rotation angle in degrees.
   */
  rotation?: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
  /**
   * The number of points used when converting circles to polygons.
   * @defaultValue `16`
   */
  pointsPerCircle?: number;
}

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param layer
 * @param opts
 */
export function sampleSystematicLinesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleSystematicLinesOnAreasOptions,
): Layer<LineCollection> {
  const {distBetween} = opts;
  Layer.assert(layer, GeometricPrimitive.AREA);

  if (typeof distBetween !== 'number' || distBetween <= 0) {
    throw new Error('Input distBetween must be a positive number.');
  }

  const pointsPerCircle = opts.pointsPerCircle ?? 16;
  const rotation = opts.rotation ?? 0;
  const rand = opts.rand ?? new Random();
  const numPointsPerLine = 20;

  const box = bbox4(layer.collection.getBBox());
  const randomStart = rand.float() * distBetween;

  const latPerMeter =
    (box[3] - box[1]) / Geodesic.distance([box[0], box[1]], [box[0], box[3]]);

  const refCoord: GJ.Position = [
    longitudeCenter(box[0], box[2]),
    box[1] + (box[3] - box[1]) / 2,
  ];

  const maxRadius = Math.max(
    Geodesic.distance([box[0], box[1]], refCoord),
    Geodesic.distance([box[2], box[3]], refCoord),
  );

  let smallestAtLat = 0;

  if (box[3] > 0 && box[1] < 0) {
    smallestAtLat = Math.max(box[3], -box[1]);
  } else if (box[3] < 0) {
    smallestAtLat = box[1];
  } else if (box[1] > 0) {
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
  const minLat = Geodesic.destination(refCoord, maxRadius, 180)[1];
  const lonDist = longitudeDistance(minLon, maxLon);

  const numLines = Math.ceil((2 * maxRadius) / distBetween);

  const lineFeatures: LineFeature[] = [];
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
    // Cut at antimeridian if needed
    const lineGeom = cutLineGeometry({
      type: 'LineString',
      coordinates: thisLine,
    });
    lineFeatures.push(
      LineFeature.create(lineGeom, {_designWeight: distBetween}, true),
    );
  }
  const collection = intersectLineSampleAreaFrame(
    LineCollection.create(lineFeatures, true),
    layer.collection,
    pointsPerCircle,
  );
  return new Layer(
    collection,
    {
      _designWeight: {
        id: '_designWeight',
        name: '_designWeight',
        type: 'numerical',
      },
    },
    true,
  );
}
