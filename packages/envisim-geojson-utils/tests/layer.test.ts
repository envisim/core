import {describe, expect, test} from 'vitest';

import {AreaCollection, GeoJSON as GJ, Layer} from '../src/index.js';

describe('Layer', () => {
  const ring: GJ.Position[] = [
    [12.888806360606111, 61.4879814554327],
    [16.389604974232412, 62.03272898392305],
    [18.647276634218542, 63.86015271397079],
    [12.751410965460195, 63.53080548838537],
    [12.888806360606111, 61.4879814554327],
  ];
  const poly: GJ.Polygon = {
    type: 'Polygon',
    coordinates: [ring],
  };
  const feature1: GJ.BaseFeature<GJ.Geometry, any> = {
    type: 'Feature',
    geometry: poly,
    properties: {
      a: 'stringValue1',
      b: 1,
      _designWeight: 0.5,
    },
  };
  const feature2: GJ.BaseFeature<GJ.Geometry, any> = {
    type: 'Feature',
    geometry: poly,
    properties: {
      a: 'stringValue2',
      b: 2,
      _designWeight: 0.5,
    },
  };
  const collection: GJ.FeatureCollection = {
    type: 'FeatureCollection',
    features: [feature1, feature2],
  };

  const layer = Layer.createAreaLayer(collection);
  //console.log(layer.propertyRecord);
  //console.log(JSON.stringify(layer, null, 2));
  test('Layer', () => {
    expect(AreaCollection.isCollection(layer.collection)).toBe(true);
    expect(Layer.isAreaLayer(layer)).toBe(true);
    expect(layer.type).toBe('area');
  });
});
