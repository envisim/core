import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {Geodesic} from '../../utils/Geodesic.js';
import {bboxFromPositions} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {AbstractPointObject} from './AbstractPointObject.js';
import {MultiCircle} from './ClassMultiCircle.js';

export class MultiPoint extends AbstractPointObject<GJ.MultiPoint> implements GJ.MultiPoint {
  static isObject(obj: unknown): obj is MultiPoint {
    return obj instanceof MultiPoint;
  }

  static assert(obj: unknown, msg: string = 'Expected MultiPoint'): asserts obj is MultiPoint {
    if (!(obj instanceof MultiPoint)) throw new TypeError(msg);
  }

  static create(coordinates: GJ.MultiPoint['coordinates'], shallow: boolean = true): MultiPoint {
    return new MultiPoint({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.MultiPoint, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'MultiPoint'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }

  buffer(distance: number): MultiCircle | null {
    if (distance <= 0.0) return null;
    return MultiCircle.create(this.coordinates, distance, false);
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.coordinates.map((coord) => ({
      centroid: coord,
      weight: 1,
    }));
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  count(): number {
    return this.coordinates.length;
  }

  distanceToPosition(coords: GJ.Position): number {
    return this.coordinates.reduce(
      (prev, curr) => Math.min(prev, Geodesic.distance(curr, coords)),
      Infinity,
    );
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates);
    return this.bbox;
  }
}
