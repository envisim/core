export class KdNode {
  parent: KdNode | null;
  cleft: KdNode | null = null;
  cright: KdNode | null = null;
  terminal: boolean = false;

  split: number = 0;
  value: number = 0.0;

  units: number[] = [];

  constructor(parent: KdNode | null, terminal: boolean) {
    this.parent = parent;
    this.terminal = terminal;
    return this;
  }

  getSibling(): KdNode | null {
    if (this.parent == null) return null;

    return this == this.parent.cleft ? this.parent.cright : this.parent.cleft;
  }

  addUnit(id: number): void {
    if (!this.terminal) return;

    this.units.push(id);
  }

  replaceUnits(units: number[], fr: number, to: number): this {
    const n = to - fr;
    this.units = new Array<number>(n);

    for (let i = 0; i < n; i++) this.units[i] = units[fr + i];

    return this;
  }

  removeUnit(id: number) {
    const it = this.units.indexOf(id);
    if (it < 0) return;

    if (it < this.units.length - 1)
      this.units[it] = this.units[this.units.length - 1];

    this.units.pop();
  }

  unitExists(id: number): boolean {
    return this.units.includes(id);
  }

  getSize(): number {
    return this.terminal ? this.units.length : 0;
  }
}
