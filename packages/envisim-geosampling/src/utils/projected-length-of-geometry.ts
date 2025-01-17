import {
  type AreaObject,
  Circle,
  type CirclesToPolygonsOptions,
  type GeoJSON as GJ,
  Geodesic,
  type LineObject,
  MultiCircle,
  bbox4,
  longitudeCenter,
} from '@envisim/geojson-utils';

type TdistCoord = {
  dist: number;
  type: 'start' | 'end';
};

const toRad = Math.PI / 180;

// Internal, used for computing projected length.
function distCoordsForLineString(
  lineString: GJ.Position[],
  refPointLonLat: GJ.Position,
  azimuth: number,
): TdistCoord[] {
  let minDist = Infinity;
  let maxDist = -Infinity;

  lineString.forEach((coord) => {
    const [azi1, dist] = Geodesic.forwardAzimuthDistance(refPointLonLat, coord);
    // Compute equidistant x-coord rotated counterclockwise by azimuth.
    const x = dist * Math.cos((90 - azi1 - azimuth) * toRad);
    // Store min and max x-value.
    minDist = Math.min(minDist, x);
    maxDist = Math.max(maxDist, x);
  });

  return [
    {dist: minDist, type: 'start'},
    {dist: maxDist, type: 'end'},
  ];
}

// Internal, used for computing projected length.
function distCoordsForMultiLineString(
  multiLineString: GJ.Position[][],
  refPointLonLat: GJ.Position,
  azimuth: number,
): TdistCoord[] {
  let distCoords: TdistCoord[] = [];

  multiLineString.forEach((lineString) => {
    distCoords = distCoords.concat(distCoordsForLineString(lineString, refPointLonLat, azimuth));
  });
  return distCoords;
}

// Internal, used for computing projected length.
function lengthFromDistCoords(distCoords: TdistCoord[]): number {
  // Sort distCoords by dist first
  // then loop over all to find length of
  // union.
  distCoords.sort((a, b) => (a.dist < b.dist ? -1 : 1));
  let start = 0; // Number of start points passed.
  let end = 0; // Number of endpoints passed.
  let L = 0; // Length of union.
  let p1 = 0; // start point of an interval
  let p2 = 0; // end point of an interval

  distCoords.forEach((e) => {
    if (e.type == 'start') {
      if (start == end) {
        p1 = e.dist;
      }
      start++;
    } else {
      end++;
      if (end == start) {
        p2 = e.dist;
        L += p2 - p1;
      }
    }
  });
  return L;
}

function geometryToMultiLineString(
  geom: AreaObject | LineObject,
  options: CirclesToPolygonsOptions = {},
): GJ.Position[][] {
  if (geom.isLine()) {
    return geom.getCoordinateArray();
  }

  if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
    const polygon = geom.toPolygon(options);
    if (polygon === null) return [];
    return geometryToMultiLineString(polygon);
  }

  const mls: GJ.Position[][] = [];
  geom.getCoordinateArray().forEach((p) => p.forEach((r) => mls.push(r)));
  return mls;
}

/**
 * Computes projected length of a feature. This is the
 * total length of the feature projected to a line
 * perpendicular to the sample line.
 * @param azimuth the azimuth of the sample line (angle clockwise from north).
 * @returns the projected length in meters.
 */
export function projectedLengthOfGeometry(
  geometry: AreaObject | LineObject,
  azimuth: number,
  options: CirclesToPolygonsOptions = {},
): number {
  // 1. build one MultiLineString of the feature geometries
  const coords = geometryToMultiLineString(geometry, options);

  // 2. Compute reference coordinate as center of box
  const box = bbox4(geometry.getBBox());

  const refCoord: GJ.Position = [longitudeCenter(box[0], box[2]), box[1] + (box[3] - box[1]) / 2];

  return lengthFromDistCoords(distCoordsForMultiLineString(coords, refCoord, azimuth));
}
