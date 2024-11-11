import type {BufferOptions} from './types.js';

export {BufferOptions};
export {lineToRing} from './line-to-ring.js';
export {bufferPolygons} from './buffer-polygons.js';

export function defaultBufferOptions(options: BufferOptions): Required<BufferOptions> {
  return {
    distance: 0.0,
    steps: 10,
    ...options,
  };
}
