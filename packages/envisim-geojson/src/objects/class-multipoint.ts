import { bboxFromPositions } from "@envisim/geojson-utils";
import { distance } from "@envisim/geojson-utils/geodesic";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { ValidationError, type OptionalParam } from "@envisim/utils";
import { type BufferOptions } from "../buffer/index.js";
import { centroidFromMultipleCentroids } from "../utils/centroid.js";
import { AbstractPointObject } from "./abstract-point-object.js";
import { type Circle } from "./class-circle.js";
import { MultiCircle } from "./class-multicircle.js";
import { type MultiPolygon } from "./class-multipolygon.js";
import { type Polygon } from "./class-polygon.js";

export class MultiPoint extends AbstractPointObject<GJ.MultiPoint> implements GJ.MultiPoint {
  static isObject(obj: unknown): obj is MultiPoint {
    return obj instanceof MultiPoint;
  }

  static assert(obj: unknown): asserts obj is MultiPoint {
    if (!this.isObject(obj))
      throw ValidationError.createGeometry("geometry-incorrect", "obj", "MultiPoint");
  }

  static create(coordinates: GJ.MultiPoint["coordinates"], shallow: boolean = true): MultiPoint {
    return new MultiPoint({ coordinates }, shallow);
  }

  constructor(obj: OptionalParam<GJ.MultiPoint, "type">, shallow: boolean = true) {
    super({ ...obj, type: "MultiPoint" }, shallow);
  }

  copy(shallow: boolean = true): MultiPoint {
    return new MultiPoint(this, shallow);
  }

  // SINGLE TYPE OBJECT
  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates);
    return this.bbox;
  }

  override size(): number {
    return this.coordinates.length;
  }

  getCoordinateArray(): GJ.Position[] {
    return this.coordinates;
  }

  distanceToPosition(position: GJ.Position): number {
    return this.coordinates.reduce(
      (prev, curr) => Math.min(prev, distance(curr, position)),
      Infinity,
    );
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.coordinates.map((coord) => ({
      centroid: coord,
      weight: 1,
    }));
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  // POINTOBJECT
  // MULTIPOINT
  buffer(options: BufferOptions): Circle | MultiCircle | Polygon | MultiPolygon | null {
    const mc = MultiCircle.create(this.coordinates, 0.0, true);
    return mc.buffer(options);
  }
}
