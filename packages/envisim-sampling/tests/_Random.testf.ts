export class RandomMock {
  i = 0;
  arr: number[];

  constructor(arr: number | number[] = 0.1) {
    if (typeof arr === 'number') {
      this.arr = [arr];
      return this;
    }

    this.arr = [...arr];
    return this;
  }

  random() {
    if (this.i === this.arr.length) this.resetCounter();
    const v = this.arr[this.i++];
    return v;
  }

  resetCounter() {
    this.i = 0;
  }
}
