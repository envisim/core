import {bufferArea} from './buffer-area.js';
import {AreaObject, LineObject, MultiPolygon, Polygon} from './geojson/index.js';
import {GeometricPrimitive} from './geometric-primitive/EnumGeometricPrimitive.js';

export interface BufferOptions {
  /**
   * The radius/distance to buffer in meters
   */
  radius?: number;
  /**
   * The number of steps in the buffer.
   */
  steps?: number;
}

export function bufferGeometry(gj: AreaObject, options: BufferOptions): AreaObject | null;
export function bufferGeometry(
  gj: LineObject,
  options: BufferOptions,
): Polygon | MultiPolygon | null;
export function bufferGeometry(
  gj: AreaObject | LineObject,
  options: BufferOptions,
): AreaObject | null {
  const opts: Required<BufferOptions> = {
    radius: 0.0,
    steps: 10,
    ...options,
  };

  if (gj.geometricPrimitive() === GeometricPrimitive.AREA) {
    return bufferArea(gj as AreaObject, opts);
  }

  // return bufferLine(gj as LineObject, opts);
}
