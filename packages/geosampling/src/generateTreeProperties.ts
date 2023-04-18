import {Gamma} from '@envisim/distributions';
import {Normal} from '@envisim/distributions';

interface IShapeScaleParams {
  shape: number;
  scale: number;
}

interface ITreeProperties {
  species: string;
  diameter: number;
  height: number;
  volume: number;
}

// Internal.
const truncatedGammaRandom = (
  min: number,
  max: number,
  params: IShapeScaleParams,
): number => {
  const umin = Gamma.cdf(min, params);
  const umax = Gamma.cdf(max, params);
  const rand = umin + (umax - umin) * Math.random();
  return Gamma.quantile(rand, params);
};

// Pine = Tall
// Näslunds functions southern Sweden

/**
 * Generate properties for a pine tree.
 *
 * @param params - An object {shape:number, scale:number} containing parameters for Gamma distribution of diameter in meters.
 * @returns - An object containing species, diameter, height and volume.
 */
export const generatePineProperties = (
  params: IShapeScaleParams,
): ITreeProperties => {
  const diameter = truncatedGammaRandom(0.04, 0.5, params);
  const alpha0 = 1.869;
  const alpha1 = 0.175;
  const rmse = 2.042;
  const height =
    1.3 +
    Math.pow(diameter * 100, 2) /
      Math.pow(alpha0 + alpha1 * diameter * 100, 2) +
    Normal.random(1, {mu: 0, sigma: rmse})[0];
  let volume = 0;
  if (diameter > 0.05) {
    volume =
      0.1072 * Math.pow(diameter * 100, 2) +
      0.02427 * Math.pow(diameter * 100, 2) * height +
      0.007315 * diameter * 100 * height * height;
  } else {
    volume =
      0.22 +
      0.1066 * Math.pow(diameter * 100, 2) +
      0.02085 * Math.pow(diameter * 100, 2) * height +
      0.008427 * diameter * 100 * height * height;
  }
  return {
    species: 'pine',
    diameter: diameter,
    height: height,
    volume: volume,
  };
};

// Spruce = Gran
// Näslunds functions whole of Sweden

/**
 * Generate properties for a spruce tree.
 *
 * @param params - An object {shape:number, scale:number} containing parameters for Gamma distribution of diameter in meters.
 * @returns - An object containing species, diameter, height and volume.
 */
export const generateSpruceProperties = (
  params: IShapeScaleParams,
): ITreeProperties => {
  const diameter = truncatedGammaRandom(0.04, 0.5, params);
  const alpha0 = 2.023;
  const alpha1 = 0.297;
  const rmse = 2.11;
  const height =
    1.3 +
    Math.pow(diameter * 100, 3) /
      Math.pow(alpha0 + alpha1 * diameter * 100, 3) +
    Normal.random(1, {mu: 0, sigma: rmse})[0];
  let volume = 0;
  if (diameter > 0.05) {
    volume =
      0.115 * Math.pow(diameter * 100, 2) +
      0.01746 * Math.pow(diameter * 100, 2) * height +
      0.02022 * diameter * 100 * height * height -
      0.05618 * height * height;
  } else {
    volume =
      0.22 +
      0.1113 * Math.pow(diameter * 100, 2) +
      0.01599 * Math.pow(diameter * 100, 2) * height +
      0.009406 * diameter * 100 * height * height;
  }
  return {
    species: 'spruce',
    diameter: diameter,
    height: height,
    volume: volume,
  };
};

/**
 * Gererates properties for one random tree from the
 * specified distribution of tree species and diameter
 * distributions. The diameter is generated from a truncated
 * Gamma distribution, so the generated diameter is between
 * 0.04 m to 0.5 m (for pine and spruce). The shape and scale
 * parameters are for the non-trucated Gamma distribution.
 *
 * @param species - An array of strings. E.g. ['spruce','pine'].
 * @param speciesDistribution - An array of numbers, proportions for the species. E.g. [0.4, 0.6].
 * @param diameterGammaParams - An array of Gamma distribution parameters specifying diameter distribution in meters. E.g. [{shape:10, scale:0.02},{shape:5, scale:0.04}].
 * @returns - An object conatining species, diameter, height and volume for a single generated tree.
 */
export const generateTreeProperties = (
  species: string[],
  speciesDistribution: number[],
  diameterGammaParams: IShapeScaleParams[],
): ITreeProperties => {
  if (
    species.length == speciesDistribution.length &&
    species.length == diameterGammaParams.length
  ) {
    const psum = speciesDistribution.reduce((prev, curr) => prev + curr, 0);
    const rand = Math.random();
    let cumsum = 0;
    for (let i = 0; i < species.length; i++) {
      cumsum += speciesDistribution[i] / psum;
      if (rand < cumsum) {
        switch (species[i]) {
          case 'pine':
            return generatePineProperties(diameterGammaParams[i]);
          case 'spruce':
            return generateSpruceProperties(diameterGammaParams[i]);
          default:
            throw new Error(
              'generateTreeProperties: Unknown species: ' +
                species[i] +
                '. Only pine and spruce are implemented.',
            );
        }
      }
    }
  } else {
    throw new Error(
      'generateTreeProperties: All inputs must be of equal length.',
    );
  }
  return {
    species: '',
    diameter: 0,
    height: 0,
    volume: 0,
  };
};
