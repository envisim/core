import polygonClipping from 'polygon-clipping';

import type * as GJ from './geojson/types.js';
import {AreaObject} from './geojson/areas/AreaObjects.js';
import {AreaCollection} from './geojson/areas/ClassAreaCollection.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {MultiPolygon} from './geojson/areas/ClassMultiPolygon.js';
import {Polygon} from './geojson/areas/ClassPolygon.js';

/**
 * Computes the union of the polygons in a GeoJSON FeatureCollection
 * @param areaCollection - An AreaFeatureCollection
 * @param pointsPerCircle - Points per circle, default 16.
 * @returns - A FeatureCollection
 */
export const unionOfPolygons = (
  areaCollection: GJ.AreaFeatureCollection,
  pointsPerCircle = 16,
): AreaCollection => {
  const geoms: polygonClipping.Geom[] = [];
  const collection = AreaCollection.isCollection(areaCollection)
    ? areaCollection
    : new AreaCollection(areaCollection);
  collection.geomEach((geom: AreaObject) => {
    switch (geom.type) {
      case 'Point':
      case 'MultiPoint':
        geoms.push(
          geom.toPolygon({pointsPerCircle}).coordinates as polygonClipping.Geom,
        );
        break;
      case 'Polygon':
      case 'MultiPolygon':
        geoms.push(geom.coordinates as polygonClipping.Geom);
        break;
    }
  });

  if (geoms.length < 2) {
    // A single geometry, copy and return as a new AreaCollection
    return new AreaCollection(collection,false);
  }

  const union = polygonClipping.union(geoms[0], ...geoms.slice(1));
  if (union.length === 1) {
    return AreaCollection.create([
      AreaFeature.create(Polygon.create(union[0]), {}),
    ]);
  }

  return AreaCollection.create([
    AreaFeature.create(MultiPolygon.create(union), {}),
  ]);
};
