import polygonClipping from 'polygon-clipping';

import {AreaObject} from './geojson/areas/AreaObjects.js';
import {AreaCollection} from './geojson/areas/ClassAreaCollection.js';
import {AreaFeature} from './geojson/areas/ClassAreaFeature.js';
import {MultiPolygon} from './geojson/areas/ClassMultiPolygon.js';
import {Polygon} from './geojson/areas/ClassPolygon.js';

/**
 * @param areaCollection The AreaCollection to compute the union from
 * @param pointsPerCircle number of points per circle
 * @returns the union of the polygons in the areaCollection
 */
export function unionOfPolygons(
  collection: AreaCollection,
  pointsPerCircle = 16,
): AreaCollection {
  const geoms: polygonClipping.Geom[] = [];

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
    return new AreaCollection(collection, false);
  }

  const union = polygonClipping.union(
    geoms[geoms.length - 1],
    ...geoms.slice(-1),
  );

  if (union.length === 1) {
    return AreaCollection.create([
      AreaFeature.create(Polygon.create(union[0]), {}),
    ]);
  }

  return AreaCollection.create([
    AreaFeature.create(MultiPolygon.create(union), {}),
  ]);
}
