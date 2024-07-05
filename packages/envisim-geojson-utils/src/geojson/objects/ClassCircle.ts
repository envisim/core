import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {Geodesic} from '../../utils/Geodesic.js';
import {cutAreaGeometry} from '../../utils/antimeridian.js';
import {bboxFromPositions, getPositionsForCircle} from '../../utils/bbox.js';
import {type GeomEachCallback} from '../base/index.js';
import {AbstractAreaObject} from './AbstractAreaObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Polygon} from './ClassPolygon.js';

export class Circle extends AbstractAreaObject<GJ.Circle> implements GJ.Circle {
  static isObject(obj: unknown): obj is Circle {
    return obj instanceof Circle;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected Circle',
  ): asserts obj is Circle {
    if (!(obj instanceof Circle)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.Circle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): Circle {
    return new Circle({coordinates, radius}, shallow);
  }

  radius: number;

  /**
   * The `Circle` is a {@link Point} with the extra property `radius`.
   * Thus, it does not follow the GeoJSON standard, but can be converted to
   * a {@link Polygon} through the {@link Circle.toPolygon}.
   *
   * @param obj
   * @param shallow if `true`, copys by reference when possible.
   */
  constructor(obj: OptionalParam<GJ.Circle, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
    this.radius = obj.radius;
  }

  toPolygon({
    pointsPerCircle = 16,
  }: {
    pointsPerCircle?: number;
  } = {}): Polygon | MultiPolygon {
    const coordinates = new Array<GJ.Position>(pointsPerCircle);

    // Use the radius that gives equal area to the polygon for best approx.
    const v = Math.PI / pointsPerCircle;
    const radius = Math.sqrt(
      (Math.PI * this.radius ** 2) /
        (pointsPerCircle * Math.sin(v) * Math.cos(v)),
    );

    for (let i = 0; i < pointsPerCircle; i++) {
      const angle = 360.0 - (i / pointsPerCircle) * 360.0;
      coordinates[i] = Geodesic.destination(this.coordinates, radius, angle);
    }

    // Close the polygon by adding the first point as the last
    coordinates.push([...coordinates[0]]);
    // Create initial Polygon
    const polygon = new Polygon({coordinates: [coordinates]}, true);
    // Check if it is closer than new radius to antimeridian
    if (
      Geodesic.distance([180, this.coordinates[1]], this.coordinates) < radius
    ) {
      // Run cut to see if it was needed
      const poly = cutAreaGeometry(polygon);
      if (poly.type === 'MultiPolygon') {
        return new MultiPolygon(poly);
      }
    }
    return polygon;
  }

  get size(): number {
    return 1;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return Math.PI * this.radius * 2;
  }

  centroid(): GJ.Position {
    return [...this.coordinates];
  }

  geomEach(
    callback: GeomEachCallback<Circle>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    return Geodesic.distance(coords, this.coordinates) - this.radius;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(
      getPositionsForCircle(this.coordinates, this.radius),
    );
    return this.bbox;
  }
}
