// Helper function for cross product of 3d vectors.
const cross3d = (a: number[], b: number[]): number[] => {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
};

// Helper function for dot product of 3d vectors.
const dot3d = (a: number[], b: number[]): number => {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

// Helper function to multiply 3d vector by scalar.
const multScalar3d = (a: number[], scalar: number): number[] => {
  return [scalar * a[0], scalar * a[1], scalar * a[2]];
};

// Helper function to add two 3d vectors.
const add3d = (a: number[], b: number[]): number[] => {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

// Helper function to convert from polar coordinates to
// cartesian coordinates on unit sphere.
const polarToCartesian = (polar: number, azimuthal: number): number[] => {
  return [
    Math.sin(polar) * Math.cos(azimuthal),
    Math.sin(polar) * Math.sin(azimuthal),
    Math.cos(polar),
  ];
};

// Constants for conversion to radians and degrees.
const toRad = Math.PI / 180;
const toDeg = 180 / Math.PI;

/**
 * Rotates coord around refCoord by angle. Uses conversion first to
 * polar coordinates and then to cartesian [x,y,z] vectors on
 * the unit sphere. Then converts back to [longitude,latitude] after rotation.
 *
 * @param coord - The [longitude,latitude] coordinate to rotate.
 * @param refCoord - The [longitude,latitude] reference coordinate to rotate around.
 * @param angle - The angle of the rotation in degrees.
 * @returns - The new coordinate as [longitude,latitude].
 */
export const rotateCoord = (
  coord: GeoJSON.Position,
  refCoord: GeoJSON.Position,
  angle: number,
): GeoJSON.Position => {
  // The angel to rotate in radians.
  const beta = angle * toRad;

  // Create cartesian vector p from coord.
  const polar_p = (90 + coord[1]) * toRad; //90+latitude1
  const azimuthal_p = coord[0] * toRad; //longitude1
  const p = polarToCartesian(polar_p, azimuthal_p);

  // Create cartesian vector q from refCoord to rotate around.
  const polar_q = (90 + refCoord[1]) * toRad;
  const azimuthal_q = refCoord[0] * toRad;
  const q = polarToCartesian(polar_q, azimuthal_q);

  // Some intermediate steps to compute rotated vector r.
  const part1 = multScalar3d(p, Math.cos(beta));
  const part2 = multScalar3d(cross3d(q, p), Math.sin(beta));
  const part3 = multScalar3d(q, dot3d(q, p) * (1 - Math.cos(beta)));

  // Rotated cartesian vector r on the unit sphere.
  const r = add3d(part1, add3d(part2, part3));

  // Convert r to polar coordinates.
  const polar_r = Math.acos(r[2]);
  const azimuthal_r = Math.atan2(r[1], r[0]);

  // Return longitude and latitude of the new rotated coordinate.
  return [azimuthal_r * toDeg, polar_r * toDeg - 90];
};
