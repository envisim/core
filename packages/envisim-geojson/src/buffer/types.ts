export interface BufferOptions {
  /**
   * The radius/distance to buffer in meters.
   */
  distance?: number;
  /**
   * How to connect segments: A step of 1 (or undefined) will connect segments by straight
   * lines. Any other positive step will connect segments by a (semi)-circle, with `steps` segments
   * per quadrant.
   */
  steps?: number;
}
