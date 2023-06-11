import {
  AreaFeature,
  LineFeature,
  LineString,
  intersectLineAreaFeatures,
  GeoJSON,
} from '../src/index.js';
import {intersectLineAreaFeatures as iLAF} from '../src/intersectLineAreaFeatures2.js';
import './_equalArrays.testf';

describe('intersectLinePolygonFeatures', () => {
  const polycoords: GeoJSON.Position[][] = [
    [
      [-0.5, -0.5],
      [0.5, -0.5],
      [0.5, 0.5],
      [-0.5, 0.5],
      [-0.5, -0.5],
    ],
  ];
  const linecoords: GeoJSON.Position[] = [
    [-2, 0],
    [-0.5, 0],
    [0, 0.1],
    [0.1, 0],
    [0.4, 0],
    [0.5, 0],
    [2, 0],
  ];
  const line = LineFeature.create(
    {
      type: 'LineString',
      coordinates: linecoords,
    },
    {},
    true,
  );

  test('Simple polygon', () => {
    const polygon = AreaFeature.create({
      type: 'Polygon',
      coordinates: polycoords,
    });

    const intersection = intersectLineAreaFeatures(
      line,
      polygon,
    ) as LineFeature;
    expect(intersection).not.toBeNull();

    expect(LineString.isObject(intersection.geometry)).toBe(true);
    const coords = (intersection.geometry as LineString).coordinates;

    expect(coords.length).toBe(5);
    expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
    expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
    expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
    expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
    expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  });

  test('Overlapping multipolygon', () => {
    const polygon = AreaFeature.create({
      type: 'MultiPolygon',
      coordinates: [polycoords, polycoords],
    });

    const intersection = intersectLineAreaFeatures(
      line,
      polygon,
    ) as LineFeature;
    expect(intersection).not.toBeNull();

    expect(LineString.isObject(intersection.geometry)).toBe(true);
    const coords = (intersection.geometry as LineString).coordinates;

    expect(coords.length).toBe(5);
    expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
    expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
    expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
    expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
    expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  });
});

describe('intersectLinePolygonFeatures 2', () => {
  const polycoords: GeoJSON.Position[][] = [
    [
      [-0.5, -0.5],
      [0.5, -0.5],
      [0.5, 0.5],
      [-0.5, 0.5],
      [-0.5, -0.5],
    ],
  ];
  const linecoords: GeoJSON.Position[] = [
    [-2, 0],
    [-0.5, 0],
    [0, 0.1],
    [0.1, 0],
    [0.4, 0],
    [0.5, 0],
    [2, 0],
  ];
  const line = LineFeature.create(
    {
      type: 'LineString',
      coordinates: linecoords,
    },
    {},
    true,
  );

  test('Simple polygon', () => {
    const polygon = AreaFeature.create({
      type: 'Polygon',
      coordinates: polycoords,
    });

    const intersection = iLAF(line, polygon) as LineFeature;
    expect(intersection).not.toBeNull();

    expect(LineString.isObject(intersection.geometry)).toBe(true);
    const coords = (intersection.geometry as LineString).coordinates;

    expect(coords.length).toBe(5);
    expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
    expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
    expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
    expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
    expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  });

  test('Overlapping multipolygon', () => {
    const polygon = AreaFeature.create({
      type: 'MultiPolygon',
      coordinates: [polycoords, polycoords],
    });

    const intersection = iLAF(line, polygon) as LineFeature;
    expect(intersection).not.toBeNull();

    expect(LineString.isObject(intersection.geometry)).toBe(true);
    const coords = (intersection.geometry as LineString).coordinates;

    expect(coords.length).toBe(5);
    expect(coords[0]).arrayToAlmostEqual(linecoords[1], 1e-9);
    expect(coords[1]).arrayToAlmostEqual(linecoords[2], 1e-9);
    expect(coords[2]).arrayToAlmostEqual(linecoords[3], 1e-9);
    expect(coords[3]).arrayToAlmostEqual(linecoords[4], 1e-9);
    expect(coords[4]).arrayToAlmostEqual(linecoords[5], 1e-9);
  });
});
