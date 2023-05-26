import {destination, copy} from '@envisim/geojson-utils';

interface IpointOpts {
  _radius?: number;
  pointsPerCircle: number;
}

// Internal.
const pointToPolygon = (
  point: GeoJSON.Geometry,
  opts: IpointOpts,
): GeoJSON.Geometry => {
  if (opts._radius && point.type === 'Point') {
    const geometry: GeoJSON.Geometry = {type: 'Polygon', coordinates: []};
    const coords: GeoJSON.Position[] = [];
    const n = opts.pointsPerCircle;
    const v = Math.PI / n;
    // use the radius that gives equal area to the polygon for best approximation
    const radius = Math.sqrt(
      (Math.PI * Math.pow(opts._radius, 2)) / (n * Math.sin(v) * Math.cos(v)),
    );
    for (let i = 0; i < n; i++) {
      let angle = 360 - (i / n) * 360;
      coords.push(destination(point.coordinates, radius, angle));
    }
    // close the polygon by adding first point last
    coords.push([...coords[0]]);
    geometry.coordinates = [coords];
    return geometry;
  } else {
    return point;
  }
};

// Internal.
const convertPointCirclesInGeometry = (
  geoJSON: GeoJSON.Geometry,
  opts: IpointOpts,
): GeoJSON.Geometry => {
  switch (geoJSON.type) {
    case 'Point':
      if (opts._radius) {
        return pointToPolygon(geoJSON, opts);
      }
      return geoJSON;
    case 'MultiPoint':
      if (opts._radius) {
        let coordinates: GeoJSON.Position[][][] = [];
        let geometry: GeoJSON.Geometry = {
          type: 'MultiPolygon',
          coordinates: [],
        };
        for (let i = 0; i < geoJSON.coordinates.length; i++) {
          let geom: GeoJSON.Geometry = pointToPolygon(
            {type: 'Point', coordinates: geoJSON.coordinates[i]},
            opts,
          );
          if (geom.type === 'Polygon') {
            coordinates.push(geom.coordinates);
          }
        }
        geometry.coordinates = coordinates;
        return geometry;
      }
      return geoJSON;
    default:
      return geoJSON;
  }
};

// Internal.
const convertPointCirclesInGeometryCollection = (
  geoJSON: GeoJSON.GeometryCollection,
  opts: IpointOpts,
): GeoJSON.GeometryCollection => {
  for (let i = 0; i < geoJSON.geometries.length; i++) {
    geoJSON.geometries[i] = convertPointCirclesInGeometry(
      geoJSON.geometries[i],
      opts,
    );
  }
  return geoJSON;
};

// Internal.
const convertPointCirclesInFeature = (
  feature: GeoJSON.Feature,
  opts: IpointOpts,
): GeoJSON.Feature => {
  if (feature.properties?._radius) {
    opts._radius = feature.properties._radius;
    if (feature.geometry.type === 'GeometryCollection') {
      feature.geometry = convertPointCirclesInGeometryCollection(
        feature.geometry,
        opts,
      );
    } else {
      feature.geometry = convertPointCirclesInGeometry(feature.geometry, opts);
    }
    return feature;
  }
  return feature;
};

/**
 * Convert Point circles to Polygons in a GeoJSON.
 *
 * @param geoJSON - Input GeoJSON Feature or FeatureCollection.
 * @param opts - An object containing optional parameters.
 * @param opts.pointsPerCircle - Number of Points for circle Polygon (default: 36).
 * @returns - A new GeoJSON with Polygons instead of Points for circles.
 */
export const convertPointCirclesToPolygons = <
  T extends GeoJSON.Feature | GeoJSON.FeatureCollection,
>(
  geoJSON: T,
  opts: IpointOpts = {pointsPerCircle: 36},
): T => {
  const geo = copy(geoJSON);
  switch (geo.type) {
    case 'Feature':
      return convertPointCirclesInFeature(geo, opts) as T;
    case 'FeatureCollection':
      geo.features.forEach((feature: GeoJSON.Feature, index: number) => {
        geo.features[index] = convertPointCirclesInFeature(feature, opts);
      });
      return geo;
    default:
      return geo;
  }
};
