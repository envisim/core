import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  GeoJSON as GJ,
  GeometricPrimitive,
  Layer,
  LineCollection,
} from '../src/index.js';

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
  const line: GJ.LineString = {
    type: 'LineString',
    coordinates: ring,
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
    geometry: line,
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

  const layer = Layer.createLayer(collection, GeometricPrimitive.AREA);

  test('Layer', () => {
    expect(AreaCollection.isCollection(layer.collection)).toBe(true);
    expect(Layer.isLayer(layer, GeometricPrimitive.AREA)).toBe(true);
  });

  test('appendFromLayer', () => {
    const layer_area = new Layer(layer.collection, layer.propertyRecord);
    const layer_line = new Layer(
      LineCollection.create([
        feature2 as GJ.LineFeature,
        feature2 as GJ.LineFeature,
      ]),
      layer.propertyRecord,
    );

    expect(() => layer_area.appendFromLayer(layer)).not.toThrowError();

    expect(() =>
      layer_area.appendFromLayer(
        layer_line as unknown as Layer<AreaCollection>,
      ),
    ).toThrowError();
  });

  test('appendFromLayerWithDifferentProps', () => {
    const layer_area = Layer.createLayer(collection, GeometricPrimitive.AREA);
    expect(() => layer_area.appendFromLayer(layer)).toThrowError();
  });
});
