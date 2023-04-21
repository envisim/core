import {pointInPolygon} from '../src/pointInPolygon.js';
import {pointInPolygonSpherical} from '../src/pointInPolygon.js';

describe('pointInPolygon', () => {
  // polygon
  const polygon: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0, 0],
        ],
      ],
    },
    properties: {},
  };

  // inside
  const point1: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.5, 0.5],
    },
    properties: {},
  };

  // outside
  const point2: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [5, 0.5],
    },
    properties: {},
  };

  // on vertex
  const point3: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  };

  // on edge
  const point4: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0.5],
    },
    properties: {},
  };

  // outside
  const point5: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1.000001, 1.000001],
    },
    properties: {},
  };

  test('pointInPolygon', () => {
    expect(pointInPolygon(point1, polygon)).toBe(true);
    expect(pointInPolygon(point2, polygon)).toBe(false);
    expect(pointInPolygon(point3, polygon)).toBe(true);
    expect(pointInPolygon(point4, polygon)).toBe(true);
    expect(pointInPolygon(point5, polygon)).toBe(false);
  });

  test('pointInPolygonSpherical', () => {
    expect(pointInPolygonSpherical(point1, polygon)).toBe(true);
    expect(pointInPolygonSpherical(point2, polygon)).toBe(false);
    expect(pointInPolygonSpherical(point3, polygon)).toBe(true);
    expect(pointInPolygonSpherical(point4, polygon)).toBe(true);
    expect(pointInPolygonSpherical(point5, polygon)).toBe(false);
  });
});
