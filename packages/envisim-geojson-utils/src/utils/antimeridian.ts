import {copy} from '@envisim/utils';

import type * as GJ from '../types/geojson.js';
import {bbox4, bboxCrossesAntimeridian, bboxFromPositions} from './bbox.js';
import {intersectPolygons} from './intersect-polygons.js';
import {normalizeLongitude} from './position.js';

// Internal function to compare two positions
function equalPositions(a: GJ.Position, b: GJ.Position): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
// Internal function that makes sure to not add duplicate positions
function addPosition(arr: GJ.Position[], coord: GJ.Position) {
  if (arr.length > 0 && !equalPositions(arr[arr.length - 1], coord)) {
    arr.push(coord);
  }
  if (arr.length === 0) {
    arr.push(coord);
  }
}

// Internal function that cuts lines on the antimeridian
function cutLineStringCoords(ls: GJ.Position[]): GJ.Position[][] {
  const box = bbox4(bboxFromPositions(ls));
  if (bboxCrossesAntimeridian(box) === false) {
    return [ls];
  }
  // Crosses the antimeridian
  const coords: GJ.Position[] = ls.map((c) => {
    if (c[0] <= box[2]) {
      return [c[0] + 360, ...c.slice(1)] as GJ.Position;
    }
    return [...c];
  });
  // Cut at 180
  let prevSide = coords[0][0] < 180;
  // multilinestring
  const mls: GJ.Position[][] = [];
  let nls: GJ.Position[] = [];
  let prevCoord = [...coords[0]];
  nls.push([normalizeLongitude(coords[0][0]), ...coords[0].slice(1)] as GJ.Position);
  for (let i = 1; i < coords.length; i++) {
    const currSide = coords[i][0] < 180;
    const currCoord = coords[i];
    if (currSide != prevSide) {
      // Find breakpoint, push and start new nls
      const t = (180 - prevCoord[0]) / (currCoord[0] - prevCoord[0]);
      const latAlt = [prevCoord[1] + t * (currCoord[1] - prevCoord[1])];
      if (currCoord[2] !== undefined) {
        // push altitude
        latAlt.push(prevCoord[2] + t * (currCoord[2] - prevCoord[2]));
      }
      if (prevSide) {
        // Positive side for prev, i.e. lon = 180
        addPosition(nls, [180, ...latAlt] as GJ.Position);
      } else {
        // Negative side for prev, i.e. lon = -180
        addPosition(nls, [-180, ...latAlt] as GJ.Position);
      }
      // close
      mls.push([...nls]);
      // clear
      nls = [];
      // start new
      if (currSide) {
        // Positive side for curr, i.e. lon = 180
        addPosition(nls, [180, ...latAlt] as GJ.Position);
      } else {
        // Negative side for curr, i.e. lon = -180
        addPosition(nls, [-180, ...latAlt] as GJ.Position);
      }
    }
    const coord = [normalizeLongitude(currCoord[0]), ...currCoord.slice(1)] as GJ.Position;
    addPosition(nls, coord);
    prevCoord = [...currCoord];
    prevSide = currSide;
  }
  // push the last
  mls.push(nls);
  return mls;
}

/**
 * Cuts a LineGeometry on the antimeridian
 * @param g the LineGeometry to cut
 * @returns the cut LineGeometry
 */
export function cutLineGeometry(g: GJ.LineGeometry): GJ.LineGeometry {
  const gjType = g.type;
  let mls: GJ.Position[][] = [];
  let imls: GJ.Position[][] = [];

  switch (gjType) {
    case 'LineString':
      mls = cutLineStringCoords(g.coordinates);
      break;

    case 'MultiLineString':
      g.coordinates.forEach((ls) => {
        imls = cutLineStringCoords(ls);
        imls.forEach((ls) => mls.push(ls));
      });
      break;

    case 'GeometryCollection':
      g.geometries.forEach((geom) => {
        switch (geom.type) {
          case 'LineString':
            imls = cutLineStringCoords(geom.coordinates);
            imls.forEach((ls) => mls.push(ls));
            break;
          case 'MultiLineString':
            geom.coordinates.forEach((ls) => {
              imls = cutLineStringCoords(ls);
              imls.forEach((ls) => mls.push(ls));
            });
            break;
        }
      });
      break;

    default:
      throw new Error('Invalid type');
  }

  if (mls.length === 1) return {type: 'LineString', coordinates: mls[0]};

  return {type: 'MultiLineString', coordinates: mls};
}

// use these polygons to cut polygons
export const EARTH_BOUNDARIES: {
  left: GJ.Position2[][];
  normal: GJ.Position2[][];
  right: GJ.Position2[][];
} = {
  left: [
    [
      [-540.0, -90.0],
      [-180.0, -90.0],
      [-180.0, 90.0],
      [-540.0, 90.0],
      [-540.0, -90.0],
    ],
  ],
  normal: [
    [
      [-180.0, -90.0],
      [180.0, -90.0],
      [180.0, 90.0],
      [-180.0, 90.0],
      [-180.0, -90.0],
    ],
  ],
  right: [
    [
      [180.0, -90.0],
      [540.0, -90.0],
      [540.0, 90.0],
      [180.0, 90.0],
      [180.0, -90.0],
    ],
  ],
} as const;

// Internal function to cut a polygon at the antimeridian
function cutPolygonCoords(pol: GJ.Position[][]): GJ.Position[][][] {
  const box = bbox4(bboxFromPositions(pol[0])); // outer ring only
  if (bboxCrossesAntimeridian(box) === false) {
    return [pol];
  }

  // Crosses the antimeridian
  const coords: GJ.Position[][] = [];
  pol.forEach((ring) => {
    coords.push(
      ring.map((c) => {
        if (c[0] <= box[2]) {
          return [c[0] + 360, ...c.slice(1)] as GJ.Position;
        }
        return [...c];
      }),
    );
  });
  // Intersect coords with leftArea to create the first polygon and rightArea
  // to create the second polygon.
  const mpc: GJ.Position[][][] = [];
  const left = intersectPolygons([coords, EARTH_BOUNDARIES.normal]);
  if (left.length > 0) {
    left.forEach((p) => mpc.push(p));
  }
  const right = intersectPolygons([coords, EARTH_BOUNDARIES.right]);
  if (right.length > 0) {
    // need to fix coords here
    right.forEach((p) => {
      const pc: GJ.Position[][] = [];
      p.forEach((ring) => {
        const rc = ring;
        pc.push(
          rc.map((c) => {
            return [c[0] - 360, ...c.slice(1)] as GJ.Position;
          }),
        );
      });
      mpc.push(pc);
    });
  }
  return mpc;
}

/**
 * Cuts an AreaGeometry on the antimeridian
 * @param g the AreaGeometry to cut
 * @returns the cut AreaGeometry
 */
export function cutAreaGeometry(g: GJ.AreaGeometry): GJ.AreaGeometry {
  const geom = copy(g);
  const type = geom.type;
  let mpc: GJ.Position[][][] = [];
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      // No need to cut circles as long as they are defined by points
      return geom;
    case 'Polygon':
      mpc = cutPolygonCoords(geom.coordinates);
      if (mpc.length === 1) {
        return {type: 'Polygon', coordinates: mpc[0]};
      }
      return {type: 'MultiPolygon', coordinates: mpc};
    case 'MultiPolygon':
      mpc = [];
      geom.coordinates.forEach((p) => {
        const impc = cutPolygonCoords(p);
        impc.forEach((p) => mpc.push(p));
      });
      return {type: 'MultiPolygon', coordinates: mpc};
    case 'GeometryCollection':
      for (let i = 0; i < geom.geometries.length; i++) {
        geom.geometries[i] = cutAreaGeometry(geom.geometries[i]) as GJ.AreaObject;
      }
      return geom;
    default:
      throw new Error('Invalid type');
  }
}

/**
 * Moves rings that starts on the west side of the meridian (-180 -- 0) to the positive counterpart (180--360)
 */
export function moveCoordsAroundEarth(coords: GJ.Position[]): GJ.Position[] {
  const xSmall = coords.reduce((p, c) => Math.min(c[0], p), Number.MAX_VALUE);
  if (xSmall >= 0.0) return coords;
  return coords.map((c) => [c[0] + 360.0, c[1]]);
}
