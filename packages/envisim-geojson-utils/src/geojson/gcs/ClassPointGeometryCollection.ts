import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {type PointObject} from '../objects/index.js';
import {AbstractGeometryCollection} from './AbstractGeometryCollection.js';
import {AreaGeometryCollection} from './ClassAreaGeometryCollection.js';
import {toPointGeometry} from './toPointGeometry.js';

export class PointGeometryCollection
  extends AbstractGeometryCollection<PointObject, GJ.PointObject>
  implements GJ.PointGeometryCollection
{
  static isGeometryCollection(obj: unknown): obj is PointGeometryCollection {
    return obj instanceof PointGeometryCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected PointGeometryCollection',
  ): asserts obj is PointGeometryCollection {
    if (!(obj instanceof PointGeometryCollection)) throw new TypeError(msg);
  }

  static create(geometries: GJ.PointObject[], shallow: boolean = true): PointGeometryCollection {
    return new PointGeometryCollection({geometries}, shallow);
  }

  constructor(obj: OptionalParam<GJ.PointGeometryCollection, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.PointObject) => toPointGeometry(g, shallow, false));
  }

  geometricPrimitive(): GeometricPrimitive.POINT {
    return GeometricPrimitive.POINT;
  }

  buffer(): AreaGeometryCollection | null {
    return null;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.geometries.map((geom: PointObject) => {
      return {
        centroid: geom.centroid(iterations),
        weight: geom.count(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  /* POINT SPECIFIC */
  count(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.count(), 0);
  }
}
