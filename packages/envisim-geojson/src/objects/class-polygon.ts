import {
  areaOfPolygonLonLat,
  bboxFromPositions,
  Segment,
  lengthOfLineString,
  pointInSinglePolygonPosition,
} from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { ValidationError, type OptionalParam } from "@envisim/utils";
import { type BufferOptions, bufferPolygons, defaultBufferOptions } from "../buffer/index.js";
import { centroidOfPolygon } from "../utils/centroid.js";
import { AbstractAreaObject } from "./abstract-area-object.js";
import { type MultiPolygon } from "./class-multipolygon.js";

export class Polygon extends AbstractAreaObject<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: unknown): obj is Polygon {
    return obj instanceof Polygon;
  }

  static assert(obj: unknown): asserts obj is Polygon {
    if (!this.isObject(obj))
      ValidationError.create["geojson-incorrect"]({ arg: "obj", type: "Polygon" }).raise();
  }

  static create(coordinates: GJ.Polygon["coordinates"], shallow: boolean = true): Polygon {
    return new Polygon({ coordinates }, shallow);
  }

  constructor(obj: OptionalParam<GJ.Polygon, "type">, shallow: boolean = true) {
    super({ ...obj, type: "Polygon" }, shallow);
  }

  copy(shallow: boolean = true): Polygon {
    return new Polygon(this, shallow);
  }

  // SINGLE TYPE OBJECT
  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates[0]);
    return this.bbox;
  }

  getCoordinateArray(): GJ.Position[][][] {
    return [this.coordinates];
  }

  distanceToPosition(position: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const nRing = c.length;
    for (let i = 0; i < nRing; i++) {
      const nSeg = c[i].length - 1;
      for (let j = 0; j < nSeg; j++) {
        d = Math.min(d, new Segment(c[i][j], c[i][j + 1]).distanceToPosition(position));
      }
    }
    if (pointInSinglePolygonPosition(position, c)) {
      return -d;
    }
    return d;
  }

  centroid(iterations: number = 2): GJ.Position {
    return centroidOfPolygon(this.coordinates, this.getBBox(), iterations).centroid;
  }

  // AREA
  area(): number {
    return areaOfPolygonLonLat(this.coordinates);
  }

  perimeter(): number {
    return this.coordinates.reduce((prev, curr) => prev + lengthOfLineString(curr), 0);
  }

  includesPosition(position: GJ.Position): boolean {
    return this.pointInBBox(position) && pointInSinglePolygonPosition(position, this.coordinates);
  }

  // POLYGON
  toPolygon(): Polygon {
    return this;
  }

  buffer(options: BufferOptions): Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);

    if (opts.distance === 0.0) return Polygon.create(this.coordinates, false);
    return bufferPolygons([this.coordinates], opts);
  }
}
