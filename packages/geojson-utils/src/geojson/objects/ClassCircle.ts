import type * as GJ from '../../types/geojson.js';
import {bboxFromPositions, getPositionsForCircle} from '../../bbox.js';
import {destination} from '../../destination.js';
import {distance} from '../../distance.js';
import type {GeomEachCallback} from '../callback-types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {Polygon} from './ClassPolygon.js';

export class Circle extends BaseAreaObject<GJ.Circle> implements GJ.Circle {
  static isObject(obj: any): obj is Circle {
    return obj instanceof Circle;
  }

  static create(
    coordinates: GJ.Circle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): Circle {
    return new Circle({coordinates, radius}, shallow);
  }

  radius: number;

  constructor(obj: OptionalParam<GJ.Circle, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
    this.radius = obj.radius;
  }

  toPolygon({
    shallow = true,
    pointsPerCircle = 16,
  }: {shallow?: boolean; pointsPerCircle?: number} = {}): Polygon {
    // Check shallow for bbox, as this is the only prop in need of copy
    const bbox: GJ.BBox | undefined =
      shallow === true ? this.bbox : this.bbox ? [...this.bbox] : undefined;
    const coordinates: GJ.Position[] = new Array(pointsPerCircle);

    // Use the radius that gives equal area to the polygon for best approx.
    const v = Math.PI / pointsPerCircle;
    const radius = Math.sqrt(
      (Math.PI * this.radius ** 2) /
        (pointsPerCircle * Math.sin(v) * Math.cos(v)),
    );

    for (let i = 0; i < pointsPerCircle; i++) {
      const angle = 360.0 - (i / pointsPerCircle) * 360.0;
      coordinates[i] = destination(this.coordinates, radius, angle);
    }

    // Close the polygon by adding the first point as the last
    coordinates.push([...coordinates[0]]);

    return new Polygon({coordinates: [coordinates], bbox}, true);
  }

  get size(): number {
    return 1;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  geomEach(
    callback: GeomEachCallback<Circle>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    return distance(coords, this.coordinates) - this.radius;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(
      getPositionsForCircle(this.coordinates, this.radius),
    );
    return this.bbox;
  }
}
