import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions, bufferPolygons, defaultBufferOptions} from '../../buffer/index.js';
import {moveCoordsAroundEarth} from '../../utils/antimeridian.js';
import {bboxCrossesAntimeridian, bboxFromPositions} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {CirclesToPolygonsOptions, circlesToPolygons} from '../../utils/circles-to-polygons.js';
import {Geodesic} from '../../utils/class-geodesic.js';
import {AbstractAreaObject} from './abstract-area-object.js';
import {Circle} from './class-circle.js';
import {MultiPolygon} from './class-multipolygon.js';
import {Polygon} from './class-polygon.js';

export class MultiCircle extends AbstractAreaObject<GJ.MultiCircle> implements GJ.MultiCircle {
  static isObject(obj: unknown): obj is MultiCircle {
    return obj instanceof MultiCircle;
  }

  static assert(obj: unknown, msg: string = 'Expected MultiCircle'): asserts obj is MultiCircle {
    if (!(obj instanceof MultiCircle)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.MultiCircle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): MultiCircle {
    return new MultiCircle({coordinates, radius}, shallow);
  }

  radius: number;

  /**
   * The `Circle` is a {@link MultiPoint} with the extra property `radius`.
   * Thus, it does not follow the GeoJSON standard, but can be converted to
   * a {@link MultiPolygon} through the {@link MultiCircle.toPolygon}.
   *
   * MultiCircles MUST be non-overlapping.
   *
   * @param obj
   * @param shallow if `true`, copys by reference when possible.
   */
  constructor(obj: OptionalParam<GJ.MultiCircle, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'MultiPoint'}, shallow);
    this.radius = obj.radius;
  }

  copy(shallow: boolean = true): MultiCircle {
    return new MultiCircle(this, shallow);
  }

  // SINGLE TYPE OBJECT
  setBBox(): GJ.BBox {
    const bbox = bboxFromPositions(this.coordinates);
    const pos1: GJ.Position = [bbox[0], bbox[1]];
    const pos2: GJ.Position = bbox.length === 4 ? [bbox[2], bbox[3]] : [bbox[3], bbox[4]];
    const west = Geodesic.destination(pos1, this.radius, 270.0)[0];
    const south = Geodesic.destination(pos1, this.radius, 180.0)[1];
    const east = Geodesic.destination(pos2, this.radius, 90.0)[0];
    const north = Geodesic.destination(pos2, this.radius, 0.0)[1];

    if (bbox.length === 4) {
      this.bbox = [west, south, east, north];
    } else {
      this.bbox = [west, south, bbox[2], east, north, bbox[5]];
    }

    return this.bbox;
  }

  override size(): number {
    return this.coordinates.length;
  }

  getCoordinateArray(): GJ.Position[] {
    return this.coordinates;
  }

  distanceToPosition(coords: GJ.Position): number {
    let distance = Infinity;

    for (const c of this.coordinates) {
      const d = Geodesic.distance(coords, c);
      if (d < distance) {
        if (d <= this.radius) {
          // Guaranteed to be smallest, because non-overlapping promise
          return d - this.radius;
        }

        distance = d;
      }
    }

    return distance - this.radius;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.coordinates.map((coord) => ({
      centroid: coord,
      weight: Math.PI * this.radius ** 2,
    }));
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  // AREA
  area(): number {
    return this.coordinates.length * Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return this.coordinates.length * Math.PI * this.radius * 2;
  }

  includesPosition(position: GJ.Position): boolean {
    return this.pointInBBox(position) && this.distanceToPosition(position) <= 0.0;
  }

  // MULTICIRCLE
  toPolygon(options: CirclesToPolygonsOptions = {}): Polygon | MultiPolygon | null {
    // Early return
    if (this.coordinates.length === 0) {
      return null;
    }

    const polygons = circlesToPolygons(this.coordinates, this.radius, options);

    if (polygons.length === 0) {
      return null;
    } else if (polygons.length === 1) {
      return Polygon.create(polygons[0], true);
    }

    return MultiPolygon.create(polygons, true);
  }

  buffer(options: BufferOptions): Circle | MultiCircle | Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);
    const newRadius = this.radius + opts.distance;

    if (this.coordinates.length === 0) {
      return null;
    } else if (this.coordinates.length === 1) {
      if (newRadius <= 0.0) return null;
      return Circle.create(this.coordinates[0], newRadius, false);
    }

    if (opts.distance <= 0.0) {
      if (newRadius <= 0.0) return null;
      return MultiCircle.create(this.coordinates, newRadius, false);
    }

    // Check if we can safely expand the circles
    if (distanceBetweenCentresBelowThreshold(this.coordinates, newRadius) === false) {
      return MultiCircle.create(this.coordinates, newRadius, false);
    }

    // If not, we convert all to polygons
    // poly cannot be a Polygon, as this only happens if this.coordinates.length === 1, which we
    // already have checked for.
    const polys = this.toPolygon({pointsPerCircle: opts.steps * 4}) as MultiPolygon | null;
    if (polys === null) return null;

    if (bboxCrossesAntimeridian(this.getBBox())) {
      return bufferPolygons(
        polys.coordinates.map((r) => r.map(moveCoordsAroundEarth)),
        opts,
      );
    }

    return bufferPolygons(polys.coordinates, opts);
  }
}

function distanceBetweenCentresBelowThreshold(points: GJ.Position[], threshold: number): boolean {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Geodesic.distance(points[i], points[j]);
      if (d < threshold) return true;
    }
  }

  return false;
}
