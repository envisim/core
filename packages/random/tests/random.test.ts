import {Random} from '../src/index.js';

describe('Random', () => {
  const rand = new Random();

  test('rand', () => {
    expect(rand.float()).toBeGreaterThanOrEqual(0.0);
    expect(rand.float()).toBeLessThan(1.0);
  });
  test.todo('Random');
});
