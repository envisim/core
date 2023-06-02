import {
  geodesic,
  GeoJSON,
  PointCircle,
  MultiPointCircle,
  LineFeature,
  AreaFeature,
  bbox4,
  longitudeCenter,
} from '@envisim/geojson-utils';

// @ts-ignore
const geod = geodesic.Geodesic.WGS84;
const geodInverseOpts = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;

type TdistCoord = {
  dist: number;
  type: 'start' | 'end';
};

const toRad = Math.PI / 180;

// Internal, used for computing projected length.
function distCoordsForLineString(
  lineString: GeoJSON.Position[],
  refPointLonLat: GeoJSON.Position,
  azimuth: number,
): TdistCoord[] {
  let minDist = Infinity;
  let maxDist = -Infinity;
  lineString.forEach((coord) => {
    const result = geod.Inverse(
      refPointLonLat[1],
      refPointLonLat[0],
      coord[1],
      coord[0],
      geodInverseOpts,
    );
    const dist = result.s12 || 0;
    const azi1 = result.azi1 || 0;
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
  multiLineString: GeoJSON.Position[][],
  refPointLonLat: GeoJSON.Position,
  azimuth: number,
): TdistCoord[] {
  let distCoords: TdistCoord[] = [];
  multiLineString.forEach((lineString) => {
    distCoords = distCoords.concat(
      distCoordsForLineString(lineString, refPointLonLat, azimuth),
    );
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
  //let intervals: number[][] = [];
  distCoords.forEach((e) => {
    if (e.type == 'start') {
      if (start == end) {
        p1 = e.dist;
        //intervals.push([e.dist]);
      }
      start++;
    } else {
      end++;
      if (end == start) {
        p2 = e.dist;
        L += p2 - p1;
        //intervals[intervals.length - 1].push(e.dist);
      }
    }
  });
  return L; //{L: L, intervals: intervals};
}

function geometryToMultiLineString(
  geom: GeoJSON.BaseGeometry,
  pointsPerCircle = 16,
) {
  let mls: GeoJSON.Position[][] = [];
  switch (geom.type) {
    case 'Point':
      if (geom.radius) {
        const coords = PointCircle.create(
          geom.coordinates,
          geom.radius,
        ).toPolygon({pointsPerCircle}).coordinates;
        mls.push(...coords);
      }
      break;
    case 'MultiPoint':
      if (geom.radius) {
        const coords = MultiPointCircle.create(
          geom.coordinates,
          geom.radius,
        ).toPolygon({pointsPerCircle}).coordinates;
        coords.forEach((coord) => {
          mls.push(...coord);
        });
      }
      break;
    case 'LineString':
      mls.push(geom.coordinates);
      break;
    case 'MultiLineString':
    case 'Polygon':
      geom.coordinates.forEach((coord) => {
        mls.push(coord);
      });
      break;
    case 'MultiPolygon':
      geom.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => {
          mls.push(ring);
        });
      });
    default:
      throw new Error('Unknown geometry type.');
  }
  return mls;
}

/**
 * Computes projected length of a feature. This is the
 * total length of the feature projected to a line
 * perpendicular to the sample line.
 * @param feature - A GeoJSON Feature.
 * @param azimuth - The azimuth of the sample line (angle clockwise from north).
 * @returns - The projected length in meters.
 */
export function projectedLengthOfFeature(
  feature: LineFeature | AreaFeature,
  azimuth: number,
  pointsPerCircle = 16,
): number {
  // 1. build one MultiLineString of the feature geometries
  let coords: GeoJSON.Position[][] = [];
  const geom = feature.geometry;
  if (geom.type === 'GeometryCollection') {
    geom.geometries.forEach((geometry) => {
      const mls = geometryToMultiLineString(geometry, pointsPerCircle);
      if (mls.length > 0) {
        coords.push(...mls);
      }
    });
  } else {
    coords = geometryToMultiLineString(geom, pointsPerCircle);
  }

  // 2. Compute reference coordinate as center of box
  const box = bbox4(feature.geometry.getBBox());

  const refCoord: GeoJSON.Position = [
    longitudeCenter(box[0], box[2]),
    box[1] + (box[3] - box[1]) / 2,
  ];

  return lengthFromDistCoords(
    distCoordsForMultiLineString(coords, refCoord, azimuth),
  );
}
