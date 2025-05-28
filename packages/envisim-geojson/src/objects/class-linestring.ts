import { bboxFromPositions, Segment, lengthOfLineString } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { ValidationError, type OptionalParam } from "@envisim/utils";
import {
  type BufferOptions,
  bufferPolygons,
  defaultBufferOptions,
  lineToRing,
} from "../buffer/index.js";
import { centroidOfLineString } from "../utils/centroid.js";
import { AbstractLineObject } from "./abstract-line-object.js";
import { type MultiPolygon } from "./class-multipolygon.js";
import { type Polygon } from "./class-polygon.js";

export class LineString extends AbstractLineObject<GJ.LineString> implements GJ.LineString {
  static isObject(obj: unknown): obj is LineString {
    return obj instanceof LineString;
  }

  static assert(obj: unknown): asserts obj is LineString {
    if (!this.isObject(obj))
      throw ValidationError.createGeometry("geometry-incorrect", "obj", "LineString");
  }

  static create(coordinates: GJ.LineString["coordinates"], shallow: boolean = true): LineString {
    return new LineString({ coordinates }, shallow);
  }

  constructor(obj: OptionalParam<GJ.LineString, "type">, shallow: boolean = true) {
    super({ ...obj, type: "LineString" }, shallow);
  }

  copy(shallow: boolean = true): LineString {
    return new LineString(this, shallow);
  }

  // SINGLE TYPE OBJECT
  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates);
    return this.bbox;
  }

  getCoordinateArray(): GJ.Position[][] {
    return [this.coordinates];
  }

  distanceToPosition(position: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const n = c.length - 1;
    for (let i = 0; i < n; i++) {
      d = Math.min(d, new Segment(c[i], c[i + 1]).distanceToPosition(position));
    }
    return d;
  }

  centroid(iterations: number = 2): GJ.Position {
    return centroidOfLineString(this.coordinates, this.getBBox(), iterations).centroid;
  }

  // LINE
  length(): number {
    return lengthOfLineString(this.coordinates);
  }

  // LINESTRING
  buffer(options: BufferOptions): Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);
    if (opts.distance <= 0.0) return null;

    return bufferPolygons([lineToRing(this.coordinates)], opts);
  }
}
