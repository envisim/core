import { type RandomGenerator, randomInt } from "@envisim/random";
import { swap, ValidationError } from "@envisim/utils";

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

  resize(len: number): void {
    ValidationError.check["number-not-in-interval"](
      { arg: "len", interval: [0, this.capacity], ends: "closed" },
      len,
    )?.raise();

    this.len = len;
  }

  shuffle(rand: RandomGenerator): void {
    for (let i = 0; i < this.len - 1; i++) {
      const k = i + randomInt(this.len - i, rand);

      if (i === k) continue;

      swap(this.list, i, k);
      this.reverse[this.list[i]] = i;
      this.reverse[this.list[k]] = k;
    }

    return;
  }

  setId(id: number): void {
    ValidationError.check["number-not-in-interval"](
      { arg: "id", interval: [0, this.capacity], ends: "right-open" },
      id,
    )?.raise();

    this.list[id] = id;
    this.reverse[id] = id;
  }

  // get
  getId(k: number): number {
    ValidationError.check["number-not-in-interval"](
      { arg: "k", interval: [0, this.len], ends: "right-open" },
      k,
    )?.raise();

    return this.list[k];
  }

  getK(id: number): number {
    ValidationError.check["number-not-in-interval"](
      { arg: "id", interval: [0, this.capacity], ends: "right-open" },
      id,
    )?.raise();

    return this.reverse[id];
  }

  exists(id: number): boolean {
    if (id >= this.capacity) return false;

    return this.reverse[id] < this.len;
  }

  draw(rand: RandomGenerator): number {
    return this.list[randomInt(this.len, rand)];
  }

  erase(id: number): void {
    ValidationError.check["number-not-in-interval"](
      { arg: "id", interval: [0, this.capacity], ends: "right-open" },
      id,
    )?.raise();

    const k = this.reverse[id];

    ValidationError.check["number-not-in-interval"](
      { arg: "k", interval: [0, this.len], ends: "right-open" },
      k,
    )?.raise();

    this.len -= 1;
    this.reverse[id] = this.capacity;

    // Early return, no need to swap
    if (k == this.len) return;

    this.list[k] = this.list[this.len];
    this.reverse[this.list[k]] = k;
  }
}
