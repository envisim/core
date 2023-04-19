import {Random} from '@envisim/random';

export class RandomMock extends Random {
  i = 0;
  arr: number[];

  constructor(arr: number | number[] = 0.1) {
    super();

    if (typeof arr === 'number') {
      this.arr = [arr];
      return this;
    }

    this.arr = [...arr];
    return this;
  }

  float() {
    if (this.i === this.arr.length) this.resetCounter();
    const v = this.arr[this.i++];
    return v;
  }

  intn(len: number) {
    if (this.i === this.arr.length) this.resetCounter();
    const v = Math.floor(this.arr[this.i++] * len);
    return v;
  }

  resetCounter() {
    this.i = 0;
  }
}
