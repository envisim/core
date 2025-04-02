import { BoundingBox, GeometricPrimitive, copyCoordinates } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import type { AreaObject, LineObject, PointObject } from "./index.js";

export abstract class AbstractSingleTypeObject<T extends GJ.SingleTypeObject> {
  readonly type: T["type"];
  coordinates: T["coordinates"];
  bbox?: GJ.BBox;

  isArea(): this is AreaObject {
    return GeometricPrimitive.isArea(this.geometricPrimitive());
  }
  isLine(): this is LineObject {
    return GeometricPrimitive.isLine(this.geometricPrimitive());
  }
  isPoint(): this is PointObject {
    return GeometricPrimitive.isPoint(this.geometricPrimitive());
  }

  constructor(obj: GJ.SingleTypeObject, shallow: boolean = true) {
    this.type = obj.type;

    if (shallow === true) {
      this.coordinates = obj.coordinates;
      this.bbox = obj.bbox;
      return;
    }

    this.coordinates = copyCoordinates(obj.coordinates);
    if (obj.bbox) this.bbox = [...obj.bbox];
  }

  abstract copy(): AbstractSingleTypeObject<T>;

  abstract geometricPrimitive(): GeometricPrimitive;
  abstract measure(): number;

  abstract setBBox(): GJ.BBox;
  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
  pointInBBox(point: GJ.Position): boolean {
    return BoundingBox.includesPoint(this.getBBox(), point);
  }

  size(): number {
    return 1;
  }

  abstract getCoordinateArray(): GJ.Position[] | GJ.Position[][] | GJ.Position[][][];
  abstract distanceToPosition(position: GJ.Position): number;
  abstract centroid(iterations: number): GJ.Position;
}
