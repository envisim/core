import {expect, test} from 'vitest';

import {FeatureCollection} from '../../src/geojson/collections/class-feature-collection.js';
import {
  AreaObject,
  Circle,
  Feature,
  GeoJSON as GJ,
  MultiCircle,
  MultiPoint,
  Point,
  Polygon,
} from '../../src/index.js';

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

const collection = FeatureCollection.createAreaFromJson({features: [feature1, feature2]}, true);

test('FeatureCollection', () => {
  expect(FeatureCollection.isArea(collection)).toBe(true);

  const fcArea = FeatureCollection.createAreaFromJson({features: [feature1, feature2]});
  const fcLine = FeatureCollection.createLineFromJson({features: [feature1, feature2]});
  const fcPoint = FeatureCollection.createPointFromJson({features: [feature1, feature2]});
  expect(FeatureCollection.isArea(fcArea)).toBe(true);
  expect(FeatureCollection.isLine(fcLine)).toBe(true);
  expect(FeatureCollection.isPoint(fcPoint)).toBe(true);

  expect(fcArea.size()).toBe(1);
  expect(fcLine.size()).toBe(1);
  expect(fcPoint.size()).toBe(0);

  const fcGC = FeatureCollection.createPointFromJson({
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 1],
        },
        properties: null,
      },
      {
        type: 'Feature',
        geometry: {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'GeometryCollection',
              geometries: [
                {
                  type: 'GeometryCollection',
                  geometries: [
                    {
                      type: 'MultiPoint',
                      coordinates: [
                        [0, 1],
                        [0, 2],
                      ],
                    },
                    {
                      type: 'LineString',
                      coordinates: [
                        [1, 0],
                        [1, 1],
                      ],
                    },
                  ],
                },
                {type: 'Point', coordinates: [0, 3]},
              ],
            },
            {type: 'Point', coordinates: [0, 4]},
          ],
        },
        properties: null,
      },
    ],
  });

  expect(FeatureCollection.isPoint(fcGC)).toBe(true);
  expect(fcGC.size()).toBe(2);

  expect(MultiPoint.isObject(fcGC.features[1].geometry)).toBe(true);
  expect(fcGC.features[1].geometry.coordinates).toEqual(
    expect.arrayContaining([
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]),
  );
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

test('copy', () => {
  const fc = FeatureCollection.newArea();
  fc.addGeometry(Circle.create([20.27, 63.83], 10));
  fc.addGeometry(
    MultiCircle.create(
      [
        [20.27, 63.83],
        [20.271, 63.83],
      ],
      100,
    ),
  );
  fc.addGeometry(
    Polygon.create([
      [
        [0, 1],
        [0, 2],
        [1, 3],
        [0, 1],
      ],
    ]),
  );
  const woc = fc.copy(true, {convertCircles: true});
  const wc = fc.copy(true, {convertCircles: false});

  expect(woc.features.map((f) => f.geometry.type)).toEqual(['Polygon', 'MultiPolygon', 'Polygon']);
  expect(wc.features.map((f) => f.geometry.type)).toEqual(['Point', 'MultiPoint', 'Polygon']);
});
