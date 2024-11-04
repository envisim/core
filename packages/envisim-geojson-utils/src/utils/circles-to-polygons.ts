import type * as GJ from '../types/geojson.js';
import {Geodesic} from './Geodesic.js';
import {rerollPolygons} from './antimeridian.js';

export interface CirclesToPolygonsOptions {
  pointsPerCircle?: number;
}

/**
 * Transform circles to polygons. Assumes that no circles overlap.
 */
export function circlesToPolygons(
  centres: GJ.Position[],
  radius: number,
  options: CirclesToPolygonsOptions,
): GJ.Position2[][][] {
  const pointsPerCircle = options.pointsPerCircle ?? 16;
  if (radius <= 0.0 || centres.length === 0 || pointsPerCircle < 3) return [];

  // Use the radius that gives equal area to the polygon for best approx.
  const v = Math.PI / pointsPerCircle;
  const transformedRadius = Math.sqrt(
    (Math.PI * radius ** 2) / (pointsPerCircle * Math.sin(v) * Math.cos(v)),
  );
  const delta = 360.0 / pointsPerCircle;

  const polygons: GJ.Position2[][][] = Array.from({length: centres.length}, () => [
    Array.from<GJ.Position2>({length: pointsPerCircle + 1}),
  ]);

  let angle = 360.0;

  for (let i = 0; i < centres.length; i++) {
    polygons[i][0][0] = Geodesic.destinationUnrolled(centres[i], transformedRadius, angle);
    polygons[i][0][pointsPerCircle] = [...polygons[i][0][0]];
  }

  for (let j = 1; j < pointsPerCircle; j++) {
    angle -= delta;

    for (let i = 0; i < centres.length; i++) {
      polygons[i][0][j] = Geodesic.destinationUnrolled(centres[i], transformedRadius, angle);
    }
  }

  // If circles can overlap, union would be needed before rolling
  return rerollPolygons(polygons);
}
