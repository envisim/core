import {typeOfFrame} from './typeOfFrame.js';
import {count, length, area, toFeatureCollection} from '@envisim/geojson-utils';

// Currently unused.

/**
 * Computes the size of a GeoJSON. All geometries
 * must have the same dimension. Size is number of points, length or area.
 *
 * @param geoJSON - The GeoJSON to compute the size of.
 * @returns - The size.
 */
export const size = (geoJSON: GeoJSON.GeoJSON): number => {
  const gj = toFeatureCollection(geoJSON, {copy: false});
  const type = typeOfFrame(gj);
  switch (type) {
    case 'point':
      return count(gj);
    case 'line':
      return length(gj);
    case 'area':
      return area(gj);
    default:
      throw new Error('Unresolved type.');
  }
};
