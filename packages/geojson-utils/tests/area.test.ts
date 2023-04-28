import {area} from '../src/area.js';

describe('area', () => {
  // https://geographiclib.sourceforge.io/scripts/geod-calc.html
  // Polygon coordinates of Antarctica (not valid GeoJSON as
  // the coordinates span the antimeridian)
  const coords = [
    [-58, -63.1],
    [-74, -72.9],
    [-102, -71.9],
    [-102, -74.9],
    [-131, -74.3],
    [-163, -77.5],
    [163, -77.4],
    [172, -71.7],
    [140, -65.9],
    [113, -65.7],
    [88, -66.6],
    [59, -66.9],
    [25, -69.8],
    [-4, -70.0],
    [-14, -71.0],
    [-33, -77.3],
    [-46, -77.9],
    [-61, -74.7],
    [-58, -63.1],
  ];
  const polygon: GeoJSON.Geometry = {
    type: 'Polygon',
    coordinates: [coords],
  };

  const polygon2: GeoJSON.Geometry = {
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
        [0, 0],
      ],
    ],
  };
  const area0 = area(polygon2, 100); // Add points roughly every 100 meters in area computation.
  const area1 = area(polygon2); // Do not add points (default).
  //console.log(area0);
  //console.log(area1);
  test('area', () => {
    // Use default here as the area is for geodesic paths.
    expect(area(polygon)).toBeCloseTo(13662703680020.13, 1);
    // The ratio should be near 1.
    expect(area0 / area1).toBeCloseTo(1, 4);
  });
});
