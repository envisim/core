import { type CirclesToPolygonsOptions, FeatureCollection, type Point } from "@envisim/geojson";
import { type RandomGenerator } from "@envisim/random";
import { EnvisimError, ValidationError } from "@envisim/utils";
import { type DetectionFunction } from "./distance-utils.js";

/**
 * @inline
 * @expand
 */
export interface OptionsBase {
  /**
   * An random number generator
   * @defaultValue `new Random()`
   */
  rand?: RandomGenerator;
  /**
   * Prescribed sample size
   */
  sampleSize: number;
  /**
   * @defaultValue `'independent'`
   */
  pointSelection?: "independent" | "systematic";
}

export function optionsBaseCheck({ sampleSize }: OptionsBase): EnvisimError {
  const errors = new EnvisimError();

  // sampleSize must positive
  errors.add(ValidationError.checkNumber("number-not-positive", "sampleSize", sampleSize));

  return errors;
}

export type OptionsCircleConversion = CirclesToPolygonsOptions;

export function optionsCircleConversionCheck({
  pointsPerCircle,
}: OptionsCircleConversion): EnvisimError {
  const errors = new EnvisimError();

  if (pointsPerCircle !== undefined && pointsPerCircle < 3)
    errors.add(
      ValidationError.createNumber(
        "number-not-in-interval",
        "pointsPerCircle",
        "3 <= pointsPerCircle",
      ),
    );

  return errors;
}

/**
 * @inline
 * @expand
 */
export interface OptionsPointsOnAreas extends OptionsBase, OptionsCircleConversion {
  /**
   * @defaultValue `1.0`
   */
  ratio?: number;

  /**
   * If true, then the grid will be rotated (systematic only)
   * @defaultValue `0.0`
   */
  rotationOfGrid?: number | "random";
}

export function optionsPointsOnAreasCheck({
  ratio,
  rotationOfGrid,
  ...options
}: OptionsPointsOnAreas): EnvisimError {
  const errors = optionsBaseCheck(options).append(optionsCircleConversionCheck(options));

  if (ratio !== undefined)
    errors.add(ValidationError.checkNumber("number-not-positive", "ratio", ratio));

  if (typeof rotationOfGrid === "string" && rotationOfGrid !== "random")
    errors.add(ValidationError.createOther("other-value-not-existing", rotationOfGrid));

  return errors;
}

/**
 * @inline
 */
export interface OptionsParallelLines {
  /**
   * The distance in meters between the parallel lines.
   */
  interspace: number;
  /**
   * Optional fixed rotation angle in degrees.
   * @defaultValue `0.0`
   */
  rotation?: number;
}

export function optionsParallelLinesCheck({ interspace }: OptionsParallelLines): EnvisimError {
  const errors = new EnvisimError();

  errors.add(ValidationError.checkNumber("number-not-positive", "interspace", interspace));

  return errors;
}

/**
 * @inline
 */
export interface OptionsDistancePoints {
  /**
   * The point layer to collect objects from.
   */
  baseCollection: FeatureCollection<Point>;
  /**
   * The detection function giving the detection probability as a
   * function of distance.
   */
  detectionFunction: DetectionFunction;
  /**
   * The cutoff distance in meters.
   */
  cutoff: number;
}

export function optionsDistancePointsCheck({
  baseCollection,
  cutoff,
}: OptionsDistancePoints): EnvisimError {
  const errors = new EnvisimError();

  errors.add(ValidationError.checkNumber("number-not-positive", "cutoff", cutoff));
  if (FeatureCollection.isPoint(baseCollection) === false)
    errors.add(ValidationError.createGeoJson("geojson-not-point", "baseCollection", "collection"));

  return errors;
}
