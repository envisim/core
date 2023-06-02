/**
 * @module geosampling
 */

// Sampling methods
export {samplePointsOnLines} from './samplePointsOnLines.js';
export {samplePointsOnAreas} from './samplePointsOnAreas.js';
export {sampleLinesOnAreas} from './sampleLinesOnAreas.js';
export {sampleBeltsOnAreas} from './sampleBeltsOnAreas.js';
export {sampleTractsOnAreas} from './sampleTractsOnAreas.js';
export {sampleRelascopePoints} from './sampleRelascopePoints.js';
export {sampleDistancePoints} from './sampleDistancePoints.js';
export {sampleDistanceLines} from './sampleDistanceLines.js';

// Distance sampling utils.
export {
  integrate,
  effectiveRadius,
  effectiveHalfWidth,
  uniformDetectionFunction,
  halfNormalDetectionFunction,
} from './sampleDistanceUtils.js';

// Sampling methods callable from engine
export {sampleFinite, sampleFiniteStratified} from './sampling/sampleFinite.js';
export {
  sampleContinuous,
  sampleContinuousStratified,
} from './sampling/sampleContinuous.js';

// Maybe these two should only be internal
export {typeOfTract} from './typeOfTract.js';

// Model tracts
export {
  straightLineTract,
  ellLineTract,
  rectangularLineTract,
  squareLineTract,
  regularPolygonLineTract,
  circularLineTract,
  circleAreaTract,
  squareCircleAreaTract,
  regularPolygonAreaTract,
  squareAreaTract,
  pointTract,
  squarePointTract,
} from './modelTract.js';

// Collection from layers
export {collectProperties} from './collectProperties.js';
export {collectIntersects} from './collectIntersects.js';

// Point processes
export {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';
export {uniformPoissonPointProcess} from './uniformPoissonPointProcess.js';
export {maternClusterProcess} from './maternClusterProcess.js';
export {thomasClusterProcess} from './thomasClusterProcess.js';
