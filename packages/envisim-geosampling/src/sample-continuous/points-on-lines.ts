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
  createDesignWeightProperty,
} from '@envisim/geojson-utils';

import {
  SAMPLE_POINT_OPTIONS,
  type SamplePointOptions,
  samplePointOptionsCheck,
} from './options.js';

/**
 * Type for keeping track of distance travelled (dt) and index of sample point
 * to be placed next (currentIndex).
 */
type Track = {
  dt: number;
  currentIndex: number;
};

/** @internal */
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

/** @internal */
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
 * @param layer
 * @param opts
 */
export function samplePointsOnLines(
  layer: Layer<LineCollection>,
  {
    rand = SAMPLE_POINT_OPTIONS.rand,
    pointSelection,
    sampleSize,
  }: SamplePointOptions,
): Layer<PointCollection> {
  const optionsError = samplePointOptionsCheck(layer, {
    pointSelection,
    sampleSize,
  });
  if (optionsError !== 0) {
    throw new RangeError(`samplePointsOnLines error: ${optionsError}`);
  }

  const L = layer.collection.length(); // total length of input geoJSON
  if (L === 0) {
    throw new Error('Input layer has zero length.');
  }

  let distances: number[] = []; // Holds sample points as distances from 0 to L.

  switch (pointSelection) {
    case 'independent':
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
    {_designWeight: createDesignWeightProperty()},
    true,
  );
}
