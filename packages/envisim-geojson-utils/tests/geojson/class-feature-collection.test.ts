import {expect, test} from 'vitest';

import {FeatureCollection} from '../../src/geojson/collections/class-feature-collection.js';
import {AreaObject, Feature, GeoJSON as GJ, MultiPoint, Point} from '../../src/index.js';

test('geomEach', () => {
  const pointCollection = FeatureCollection.newPoint();
  pointCollection.addGeometry(Point.create([0, 0]));
  pointCollection.addGeometry(Point.create([1, 1]));

  let count = 0;
  pointCollection.geomEach((geom) => {
    count += geom.count();
  });

  expect(count).toBe(2);

  pointCollection.addGeometry(Point.create([0, 0]));
  pointCollection.addGeometry(
    MultiPoint.create([
      [0, 0],
      [1, 0],
      [2, 0],
    ]),
  );

  count = 0;
  pointCollection.geomEach((geom) => {
    count += geom.count();
  });

  expect(count).toBe(6);
});

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

const collection = FeatureCollection.createArea([feature1, feature2], true, true);

test('FeatureCollection', () => {
  expect(FeatureCollection.isArea(collection)).toBe(true);
});

test('appendFromLayer', () => {
  const fcArea = FeatureCollection.newArea(collection.features, collection.propertyRecord);
  const fcLine = FeatureCollection.newLine(
    [feature2 as GJ.LineFeature, feature2 as GJ.LineFeature].flatMap((f) => {
      const ff = Feature.createLine(f.geometry);
      if (ff === null) return [];
      return [ff];
    }),
    collection.propertyRecord,
  );
  expect(() => fcArea.appendFeatureCollection(collection)).not.toThrowError();
  expect(() =>
    fcArea.appendFeatureCollection(fcLine as unknown as FeatureCollection<AreaObject>),
  ).toThrowError();
});

test('appendFromLayerWithDifferentProps', () => {
  const fcArea = FeatureCollection.newArea(collection.features, undefined, true);
  expect(() => collection.appendFeatureCollection(fcArea)).toThrowError();
  expect(() => fcArea.appendFeatureCollection(collection)).toThrowError();
});
