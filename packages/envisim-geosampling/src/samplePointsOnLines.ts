import {
  type GeoJSON as GJ,
  Layer,
  LineCollection,
  LineGeometryCollection,
  LineObject,
  PlateCarree,
  Point,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

// Type for keeping track of distance travelled (dt) and index of sample point
// to be placed next (currentIndex).
type Track = {
  dt: number;
  currentIndex: number;
};

// Internal.
function samplePointsOnGeometry(
  geoJSON: LineObject,
  track: Track,
  distances: number[],
) {
  const points: GJ.Position[] = [];
  let segmentLength = 0;
  let fraction = 0;
  switch (geoJSON.type) {
    case 'LineString': {
      const lineStringCoords = geoJSON.coordinates;

      for (let i = 0; i < lineStringCoords.length - 1; i++) {
        segmentLength = PlateCarree.distance(
          lineStringCoords[i],
          lineStringCoords[i + 1],
        );

        for (let l = track.currentIndex; l < distances.length; l++) {
          if (distances[l] < track.dt + segmentLength) {
            fraction = (distances[l] - track.dt) / segmentLength;
            points.push(
              PlateCarree.intermediate(
                lineStringCoords[i],
                lineStringCoords[i + 1],
                fraction,
              ),
            );
            track.currentIndex += 1;
          }
        }

        track.dt += segmentLength;
      }

      break;
    }

    case 'MultiLineString': {
      const mlsCoords = geoJSON.coordinates;

      for (let i = 0; i < mlsCoords.length; i++) {
        for (let j = 0; j < mlsCoords[i].length - 1; j++) {
          segmentLength = PlateCarree.distance(
            mlsCoords[i][j],
            mlsCoords[i][j + 1],
          );

          for (let l = track.currentIndex; l < distances.length; l++) {
            if (distances[l] < track.dt + segmentLength) {
              fraction = (distances[l] - track.dt) / segmentLength;
              points.push(
                PlateCarree.intermediate(
                  mlsCoords[i][j],
                  mlsCoords[i][j + 1],
                  fraction,
                ),
              );
              track.currentIndex += 1;
            }
          }

          track.dt += segmentLength;
        }
      }

      break;
    }

    default:
      throw new Error('Unknown GeoJSON LineObject.');
  }

  return points;
}

// Internal.
function samplePointsOnGeometryCollection(
  geoJSON: LineGeometryCollection,
  track: Track,
  distances: number[],
): GJ.Position[] {
  let points: GJ.Position[] = [];
  let result: GJ.Position[] = [];

  for (let i = 0; i < geoJSON.geometries.length; i++) {
    result = samplePointsOnGeometry(geoJSON.geometries[i], track, distances);
    points = points.concat(result);
  }
  return points;
}

/**
 * Selects points according to method and sampleSize on a line layer.
 *
 * @param layer a line layer.
 * @param method the method to use. Either 'uniform' or 'systematic'.
 * @param sampleSize an integer > 0 for number of points to sample.
 * @param opts an options object.
 * @param opts.rand an optional instance of Random.
 */
export function samplePointsOnLines(
  layer: Layer<LineCollection>,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  opts: {rand?: Random} = {},
): Layer<PointCollection> {

  if (method !== 'systematic' && method !== 'uniform') {
    throw new Error("Input method must be either 'uniform' or 'systematic'.");
  }

  if (
    typeof sampleSize !== 'number' ||
    sampleSize !== Math.round(sampleSize) ||
    sampleSize <= 0
  ) {
    throw new Error('Input sampleSize must be a positive integer.');
  }

  const rand = opts.rand ?? new Random();

  const L = layer.collection.length(); // total length of input geoJSON
  if (L === 0) {
    throw new Error('Input layer has zero length.');
  }

  let distances: number[] = []; // Holds sample points as distances from 0 to L.

  switch (method) {
    case 'uniform':
      distances = new Array(sampleSize)
        .fill(0)
        .map(() => rand.float() * L)
        .sort((a, b) => a - b);
      break;

    case 'systematic': {
      const start = (rand.float() * L) / sampleSize;
      distances = new Array(sampleSize)
        .fill(0)
        .map((_val, index) => (index * L) / sampleSize + start);
      break;
    }

    default:
      throw new Error('Unknown method');
  }

  const track = {dt: 0, currentIndex: 0};
  let points: GJ.Position[] = [];
  let parentIndex: number[] = [];
  const designWeight = L / sampleSize;

  layer.collection.features.forEach((feature, index) => {
    const geom = feature.geometry;
    let result;
    if (geom.type === 'GeometryCollection') {
      result = samplePointsOnGeometryCollection(geom, track, distances);
    } else {
      result = samplePointsOnGeometry(geom, track, distances);
    }

    points = points.concat(result);
    parentIndex = parentIndex.concat(new Array(result.length).fill(index));
  });

  const features: PointFeature[] = points.map((coords, index): PointFeature => {
    // transfer design weights if the frame has been sampled before
    let dw = designWeight;
    const parentFeature = layer.collection.features[parentIndex[index]];

    if (parentFeature.properties?.['_designWeight']) {
      dw = dw * parentFeature.properties['_designWeight'];
    }

    return PointFeature.create(Point.create(coords), {_designWeight: dw});
  });

  return new Layer(
    new PointCollection({features}, true),
    {
      _designWeight: {
        id: '_designWeight',
        name: '_designWeight',
        type: 'numerical',
      },
    },
    true,
  );
}
