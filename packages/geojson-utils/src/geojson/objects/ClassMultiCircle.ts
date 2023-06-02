import type * as GJ from '../types.js';
import {bboxFromPositions} from '../../bbox.js';
import {destination} from '../../destination.js';
import {distance} from '../../distance.js';
import type {GeomEachCallback} from '../callback-types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';

export class MultiCircle
  extends BaseAreaObject<GJ.MultiCircle>
  implements GJ.MultiCircle
{
  static isObject(obj: any): obj is MultiCircle {
    return obj instanceof MultiCircle;
  }

  static create(
    coordinates: GJ.MultiCircle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): MultiCircle {
    return new MultiCircle({coordinates, radius}, shallow);
  }

  radius: number;

  constructor(
    obj: OptionalParam<GJ.MultiCircle, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPoint'}, shallow);
    this.radius = obj.radius;
  }

  toPolygon({
    shallow = true,
    pointsPerCircle = 16,
  }: {shallow?: boolean; pointsPerCircle?: number} = {}): MultiPolygon {
    // Check shallow for bbox, as this is the only prop in need of copy
    const bbox: GJ.BBox | undefined =
      shallow === true ? this.bbox : this.bbox ? [...this.bbox] : undefined;

    // Early return
    if (this.coordinates.length === 0)
      return new MultiPolygon({coordinates: [], bbox}, true);

    const coordinates: GJ.Position[][][] = new Array(this.coordinates.length);

    // Use the radius that gives equal area to the polygon for best approx.
    const v = Math.PI / pointsPerCircle;
    const radius = Math.sqrt(
      (Math.PI * this.radius ** 2) /
        (pointsPerCircle * Math.sin(v) * Math.cos(v)),
    );

    for (let i = 0; i < this.coordinates.length; i++) {
      const coords: GJ.Position[] = new Array(pointsPerCircle);
      for (let j = 0; j < pointsPerCircle; j++) {
        const angle = 360.0 - (j / pointsPerCircle) * 360.0;
        coords[j] = destination(this.coordinates[i], radius, angle);
      }
      // Close the polygon by adding the first point as the last
      coords.push([...coords[0]]);

      coordinates[i] = [coords];
    }

    return new MultiPolygon({coordinates, bbox}, true);
  }

  get size(): number {
    return this.coordinates.length;
  }

  area(): number {
    return this.coordinates.length * Math.PI * this.radius ** 2;
  }

  geomEach(
    callback: GeomEachCallback<MultiCircle>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    return (
      this.coordinates.reduce((prev, curr) => {
        return Math.min(prev, distance(coords, curr));
      }, Infinity) - this.radius
    );
  }

  setBBox(): GJ.BBox {
    const bbox = bboxFromPositions(this.coordinates);
    const pos1: GJ.Position = [bbox[0], bbox[1]];
    const pos2: GJ.Position =
      bbox.length === 4 ? [bbox[2], bbox[3]] : [bbox[3], bbox[4]];
    const west = destination(pos1, this.radius, 270.0)[0];
    const south = destination(pos1, this.radius, 180.0)[1];
    const east = destination(pos2, this.radius, 90.0)[0];
    const north = destination(pos2, this.radius, 0.0)[1];

    if (bbox.length === 4) {
      this.bbox = [west, south, east, north];
    } else {
      this.bbox = [west, south, bbox[2], east, north, bbox[5]];
    }

    return this.bbox;
  }
}
