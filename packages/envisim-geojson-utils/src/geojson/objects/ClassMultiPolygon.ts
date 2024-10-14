import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {bufferGeometry} from '../../buffer.js';
import {areaOfPolygonLonLat} from '../../utils/area.js';
import {bboxFromPositions, unionOfBBoxes} from '../../utils/bbox.js';
import {
  centroidFromMultipleCentroids,
  centroidOfPolygon,
} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {pointInSinglePolygonPosition} from '../../utils/pointInPolygonPosition.js';
import {type GeomEachCallback} from '../base/index.js';
import {AbstractAreaObject} from './AbstractAreaObject.js';
import {Polygon} from './ClassPolygon.js';

export class MultiPolygon
  extends AbstractAreaObject<GJ.MultiPolygon>
  implements GJ.MultiPolygon
{
  static isObject(obj: unknown): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected MultiPolygon',
  ): asserts obj is MultiPolygon {
    if (!(obj instanceof MultiPolygon)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.MultiPolygon['coordinates'],
    shallow: boolean = true,
  ): MultiPolygon {
    return new MultiPolygon({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.MultiPolygon, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }

  area(): number {
    return this.coordinates.reduce(
      (prev, curr) => prev + areaOfPolygonLonLat(curr),
      0,
    );
  }

  buffer(distance: number, steps: number = 10): Polygon | MultiPolygon | null {
    return bufferGeometry(this, {distance, steps});
  }

  perimeter(): number {
    return this.coordinates.reduce(
      (prev, curr) =>
        prev + curr.reduce((prev, curr) => prev + lengthOfLineString(curr), 0),
      0,
    );
  }

  centroid(iterations: number = 2): GJ.Position {
    const bbox = this.getBBox();
    const centroids = this.coordinates.map((coord) =>
      centroidOfPolygon(coord, bbox, iterations),
    );
    return centroidFromMultipleCentroids(centroids, bbox, iterations).centroid;
  }

  geomEach(
    callback: GeomEachCallback<MultiPolygon>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const nPoly = c.length;
    let inside = false;
    for (let i = 0; i < nPoly; i++) {
      const nRing = c[i].length;
      for (let j = 0; j < nRing; j++) {
        const nSeg = c[i][j].length - 1;
        for (let k = 0; k < nSeg; k++) {
          d = Math.min(
            d,
            distancePositionToSegment(coords, [c[i][j][k], c[i][j][k + 1]]),
          );
        }
      }
      if (pointInSinglePolygonPosition(coords, c[i])) {
        inside = true;
      }
    }
    if (inside) {
      return -d;
    }
    return d;
  }

  setBBox(): GJ.BBox {
    const bboxes = this.coordinates.map((pos) => bboxFromPositions(pos[0]));
    this.bbox = unionOfBBoxes(bboxes);
    return this.bbox;
  }
}
