export {Random, random, randomFloat, randomArray} from './random.js';

export interface RandomGenerator {
  random(): number;
}
