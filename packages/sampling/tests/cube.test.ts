import {cube, lcube} from '../src/index';
import {data} from './_data.testf';
import './_equalArrays.testf';
import {RandomMock} from './_Random.testf';

describe('Cube', () => {
  const rand01 = new RandomMock(0.01);
  const rand99 = new RandomMock(0.99);
  const probs = new Array<number>(10).fill(0.2);

  test('length', () => {
    expect(cube(probs, data).length).toBe(2);
    expect(lcube(probs, data, data).length).toBe(2);
  });

  test.todo('cube proper');
  test.todo('lcube proper');
});
