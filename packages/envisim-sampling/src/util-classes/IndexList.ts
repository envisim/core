import {Random} from '@envisim/random';

import {swap} from '../utils.js';

export class IndexList {
  protected list: number[];
  protected reverse: number[];
  protected len: number;
  protected capacity: number;

  constructor(N: number) {
    this.list = new Array<number>(N);
    this.reverse = new Array<number>(N);
    this.len = N;
    this.capacity = N;
  }

  copy(): IndexList {
    const il = new IndexList(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      il.list[i] = this.list[i];
      il.reverse[i] = this.reverse[i];
    }

    il.len = this.len;
    return il;
  }

  copyLen(): IndexList {
    const il = new IndexList(this.capacity);

    for (let i = 0; i < this.len; i++) {
      il.list[i] = this.list[i];
      il.reverse[this.list[i]] = i;
    }

    il.len = this.len;
    return il;
  }

  length(): number {
    return this.len;
  }

  fill(): void {
    for (let i = 0; i < this.capacity; i++) {
      this.list[i] = i;
      this.reverse[i] = i;
    }

    this.len = this.capacity;
  }

  reset(): void {
    this.len = this.capacity;
  }

  resize(len: number): void {
    if (len > this.capacity) throw new RangeError('Inadmissable value of len');

    this.len = len;
  }

  shuffle(rand: Random): void {
    for (let i = 0; i < this.len - 1; i++) {
      const k = i + rand.intn(this.len - i);

      if (i === k) continue;

      swap(this.list, i, k);
      this.reverse[this.list[i]] = i;
      this.reverse[this.list[k]] = k;
    }

    return;
  }

  setId(id: number): void {
    if (id >= this.capacity) throw new RangeError('Inadmissible value of id');

    this.list[id] = id;
    this.reverse[id] = id;
  }

  // get
  getId(k: number): number {
    if (k >= this.len) throw new RangeError('Inadmissible value of k');

    return this.list[k];
  }

  getK(id: number): number {
    if (id >= this.capacity) throw new RangeError('Inadmissable value of id');

    return this.reverse[id];
  }

  exists(id: number): boolean {
    if (id >= this.capacity) return false;

    return this.reverse[id] < this.len;
  }

  draw(rand: Random): number {
    return this.list[rand.intn(this.len)];
  }

  erase(id: number): void {
    if (id >= this.capacity)
      throw new RangeError(`Inadmissible value of id: ${id}, len: ${this.len}`);

    const k = this.reverse[id];

    if (k >= this.len)
      throw new RangeError(
        `Inadmissible value of id: ${id}, k: ${k}, len: ${this.len}`,
      );

    this.len -= 1;

    // Early return, no need to swap
    if (k == this.len) return;

    swap(this.list, k, this.len);
    this.reverse[this.list[k]] = k;
    this.reverse[this.list[this.len]] = this.len;
  }
}
