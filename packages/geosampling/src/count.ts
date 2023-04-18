/**
 * Compute number of (single) Point geometries including
 * Point and MultiPoint but excluding PointCircles.
 *
 * @param geoJSON - The GeoJSON to count (single) points in Point/MultiPoint geometries.
 * @param opts - Internal.
 * @returns - The number of (single) points in Point/MultiPoint geometries.
 */
export const count = (
  geoJSON: GeoJSON.GeoJSON,
  opts = {_radius: 0},
): number => {
  let size = 0;
  switch (geoJSON.type) {
    case 'Point':
      if (opts._radius === 0) {
        size = 1;
      }
      break;
    case 'MultiPoint':
      if (opts._radius === 0) {
        size = geoJSON.coordinates.length;
      }
      break;
    case 'GeometryCollection':
      geoJSON.geometries.forEach((geometry) => {
        size += count(geometry, opts);
      });
      break;
    case 'Feature':
      if (geoJSON.properties?._radius) {
        opts._radius = geoJSON.properties._radius;
      }
      size = count(geoJSON.geometry, opts);
      break;
    case 'FeatureCollection':
      geoJSON.features.forEach((feature) => {
        size += count(feature);
      });
      break;
    default:
      break;
  }
  return size;
};
