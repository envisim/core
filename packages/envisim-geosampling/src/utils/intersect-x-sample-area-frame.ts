import {
  AreaCollection,
  AreaFeature,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
  intersectAreaAreaGeometries,
  intersectLineAreaGeometries,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * to sample of points (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectPointSampleAreaFrame(
  sample: PointCollection,
  frame: AreaCollection,
): PointCollection {
  const newFeatures: PointFeature[] = [];

  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      if (
        sampleFeature.geometry.type === 'GeometryCollection' ||
        frameFeature.geometry.type === 'GeometryCollection'
      )
        return;

      const intersect = intersectPointAreaGeometries(sampleFeature.geometry, frameFeature.geometry);
      if (intersect === null) return;

      let dw = 1.0;
      if (frameFeature.properties?.['_designWeight'] !== undefined) {
        dw *= frameFeature.properties['_designWeight'];
      }
      if (sampleFeature.properties?.['_designWeight'] !== undefined) {
        dw *= sampleFeature.properties['_designWeight'];
      }

      newFeatures.push(PointFeature.create(intersect, {_designWeight: dw}, true));
    });
  });
  return new PointCollection({features: newFeatures}, true);
}

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * to sample of lines (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectLineSampleAreaFrame(
  sample: LineCollection,
  frame: AreaCollection,
  pointsPerCircle: number = 16,
): LineCollection {
  const pps = {pointsPerCircle};
  const newFeatures: LineFeature[] = [];

  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      if (
        sampleFeature.geometry.type === 'GeometryCollection' ||
        frameFeature.geometry.type === 'GeometryCollection'
      )
        return;

      const intersect = intersectLineAreaGeometries(
        sampleFeature.geometry,
        frameFeature.geometry,
        pps,
      );
      if (intersect === null) return;

      let dw = 1.0;
      if (frameFeature.properties?.['_designWeight'] !== undefined) {
        dw *= frameFeature.properties['_designWeight'];
      }
      if (sampleFeature.properties?.['_designWeight'] !== undefined) {
        dw *= sampleFeature.properties['_designWeight'];
      }

      newFeatures.push(LineFeature.create(intersect, {_designWeight: dw}, true));
    });
  });
  return new LineCollection({features: newFeatures}, true);
}

/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * to sample (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectAreaSampleAreaFrame(
  sample: AreaCollection,
  frame: AreaCollection,
  pointsPerCircle: number = 16,
): AreaCollection {
  const pps = {pointsPerCircle};
  const newFeatures: AreaFeature[] = [];

  // Intersect with all area features and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      if (
        sampleFeature.geometry.type === 'GeometryCollection' ||
        frameFeature.geometry.type === 'GeometryCollection'
      )
        return;

      const intersect = intersectAreaAreaGeometries(
        sampleFeature.geometry,
        frameFeature.geometry,
        pps,
      );
      if (intersect === null) return;

      let dw = 1.0;
      if (frameFeature.properties?.['_designWeight'] !== undefined) {
        dw *= frameFeature.properties['_designWeight'];
      }
      if (sampleFeature.properties?.['_designWeight'] !== undefined) {
        dw *= sampleFeature.properties['_designWeight'];
      }

      newFeatures.push(AreaFeature.create(intersect, {_designWeight: dw}, true));
    });
  });
  return new AreaCollection({features: newFeatures}, true);
}
