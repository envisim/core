import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {type AreaObject} from '../objects/index.js';
import {AbstractGeometryCollection} from './AbstractGeometryCollection.js';
import {toAreaGeometry} from './toAreaGeometry.js';

export class AreaGeometryCollection
  extends AbstractGeometryCollection<AreaObject, GJ.AreaObject>
  implements GJ.AreaGeometryCollection
{
  static isGeometryCollection(obj: unknown): obj is AreaGeometryCollection {
    return obj instanceof AreaGeometryCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected AreaGeometryCollection',
  ): asserts obj is AreaGeometryCollection {
    if (!(obj instanceof AreaGeometryCollection)) throw new TypeError(msg);
  }

  static create(
    geometries: GJ.AreaObject[],
    shallow: boolean = true,
  ): AreaGeometryCollection {
    return new AreaGeometryCollection({geometries}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.AreaGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.AreaObject) =>
      toAreaGeometry(g, shallow, false),
    );
  }

  geometricPrimitive(): GeometricPrimitive.AREA {
    return GeometricPrimitive.AREA;
  }

  /* GEOJSON COMMON */
  override distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      const d = curr.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(d, prev);
      }
      return Math.min(d, prev);
    }, Infinity);
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.geometries.map((geom: AreaObject) => {
      return {
        centroid: geom.centroid(iterations),
        weight: geom.area(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations)
      .centroid;
  }

  buffer(distance: number, steps: number = 10): AreaGeometryCollection | null {
    const geoms: GJ.AreaObject[] = [];
    this.geometries.forEach((geom: AreaObject) => {
      const bg = geom.buffer(distance, steps);
      if (bg) geoms.push(bg);
    });
    if (geoms.length === 0) return null;
    return AreaGeometryCollection.create(geoms, true);
  }

  /* AREA SPECIFIC */
  area(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.area(), 0);
  }

  perimeter(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.perimeter(), 0);
  }
}
