import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions, bufferPolygons, defaultBufferOptions} from '../../buffer/index.js';
import {moveCoordsAroundEarth} from '../../utils/antimeridian.js';
import {areaOfPolygonLonLat} from '../../utils/area.js';
import {bboxCrossesAntimeridian, bboxFromPositions, unionOfBBoxes} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids, centroidOfPolygon} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distance-position-to-segment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {
  pointInMultiPolygonPosition,
  pointInSinglePolygonPosition,
} from '../../utils/point-in-polygon.js';
import {AbstractAreaObject} from './abstract-area-object.js';
import {Polygon} from './class-polygon.js';

export class MultiPolygon extends AbstractAreaObject<GJ.MultiPolygon> implements GJ.MultiPolygon {
  static isObject(obj: unknown): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  static assert(obj: unknown, msg: string = 'Expected MultiPolygon'): asserts obj is MultiPolygon {
    if (!(obj instanceof MultiPolygon)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.MultiPolygon['coordinates'],
    shallow: boolean = true,
  ): MultiPolygon {
    return new MultiPolygon({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.MultiPolygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }

  copy(shallow: boolean = true): MultiPolygon {
    return new MultiPolygon(this, shallow);
  }

  // SINGLE TYPE OBJECT
  setBBox(): GJ.BBox {
    const bboxes = this.coordinates.map((pos) => bboxFromPositions(pos[0]));
    this.bbox = unionOfBBoxes(bboxes);
    return this.bbox;
  }

  override size(): number {
    return this.coordinates.length;
  }

  getCoordinateArray(): GJ.Position[][][] {
    return this.coordinates;
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
          d = Math.min(d, distancePositionToSegment(coords, [c[i][j][k], c[i][j][k + 1]]));
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

  centroid(iterations: number = 2): GJ.Position {
    const bbox = this.getBBox();
    const centroids = this.coordinates.map((coord) => centroidOfPolygon(coord, bbox, iterations));
    return centroidFromMultipleCentroids(centroids, bbox, iterations).centroid;
  }

  // AREA
  area(): number {
    return this.coordinates.reduce((prev, curr) => prev + areaOfPolygonLonLat(curr), 0);
  }

  perimeter(): number {
    return this.coordinates.reduce(
      (prev, curr) => prev + curr.reduce((prev, curr) => prev + lengthOfLineString(curr), 0),
      0,
    );
  }

  includesPosition(position: GJ.Position): boolean {
    return this.pointInBBox(position) && pointInMultiPolygonPosition(position, this.coordinates);
  }

  // MULTIPOLYGON
  toPolygon(): Polygon | MultiPolygon | null {
    if (this.coordinates.length === 0) {
      return null;
    } else if (this.coordinates.length === 1) {
      return Polygon.create(this.coordinates[0], true);
    }

    return this;
  }

  buffer(options: BufferOptions): Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);

    if (opts.distance === 0.0) return MultiPolygon.create(this.coordinates, false);

    if (bboxCrossesAntimeridian(this.getBBox())) {
      return bufferPolygons(
        this.coordinates.map((r) => r.map(moveCoordsAroundEarth)),
        opts,
      );
    }

    return bufferPolygons(this.coordinates, opts);
  }
}
