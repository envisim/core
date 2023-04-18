// Return area in square meters.
// Computes area on a spherical earth model.
// Internal.
// TODO: Check if this can be improved by using (local) squared distance ratio
// between ellipsoidal distance and spherical distance. Then multiply result
// by this local scale factor.
const areaOfSimplePolygonLngLat = (points: GeoJSON.Position[]): number => {
  const R = 6371000;
  const toRad = Math.PI / 180;
  let area = 0; // Accumulates area in the loop.
  let j = points.length - 1; // The last vertex is the 'previous' one to the first.
  for (let i = 0; i < points.length; i++) {
    area +=
      (points[j][0] - points[i][0]) *
      toRad *
      (2 + Math.sin(points[i][1] * toRad) + Math.sin(points[j][1] * toRad));
    j = i; //j is previous vertex to i.
  }
  return Math.abs((area * R * R) / 2);
};

// Internal.
const areaOfPolygonLngLat = (points: GeoJSON.Position[][]): number => {
  // Full area of outer ring.
  let area = areaOfSimplePolygonLngLat(points[0]);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - areaOfSimplePolygonLngLat(points[i]);
  }
  return area;
};

/**
 * Computes the sum of all areas of all geometries in a geoJSON object.
 * Note: Not the same as area of union.
 *
 * @param geoJSON - A geoJSON object.
 * @param opts - Internal.
 * @returns - The sum of area in square meters.
 */
export const area = (geoJSON: GeoJSON.GeoJSON, opts = {_radius: 0}): number => {
  switch (geoJSON.type) {
    case 'Point':
      if (opts._radius > 0) {
        return Math.PI * opts._radius * opts._radius;
      }
      return 0;
    case 'MultiPoint':
      if (opts._radius > 0) {
        return (
          Math.PI * opts._radius * opts._radius * geoJSON.coordinates.length
        );
      }
      return 0;
    case 'LineString':
    case 'MultiLineString':
      return 0;
    case 'Polygon':
      return areaOfPolygonLngLat(geoJSON.coordinates);
    case 'MultiPolygon':
      return geoJSON.coordinates.reduce(
        (prev, curr) => areaOfPolygonLngLat(curr) + prev,
        0,
      );
    case 'GeometryCollection':
      return geoJSON.geometries.reduce(
        (prev, curr) => area(curr, opts) + prev,
        0,
      );
    case 'Feature':
      // Need to check for _radius here and treat Point and MultiPoint geometries.
      if (geoJSON.properties?._radius) {
        return area(geoJSON.geometry, {_radius: geoJSON.properties._radius});
      }
      return area(geoJSON.geometry);
    case 'FeatureCollection':
      return geoJSON.features.reduce((prev, curr) => area(curr) + prev, 0);
    default:
      throw new Error('area: Unknown GeoJSON type.');
  }
};
