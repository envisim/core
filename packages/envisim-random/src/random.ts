// Notice regarding parts relating to UHEPRNG::
//
//
// ============================================================================
//                 Gibson Research Corporation
//       UHEPRNG - Ultra High Entropy Pseudo-Random Number Generator
// ============================================================================
// LICENSE AND COPYRIGHT:  THIS CODE IS HEREBY RELEASED INTO THE PUBLIC DOMAIN
// Gibson Research Corporation releases and disclaims ALL RIGHTS AND TITLE IN
// THIS CODE OR ANY DERIVATIVES. Anyone may be freely use it for any purpose.
// ============================================================================
// This is GRC's cryptographically strong PRNG (pseudo-random number generator)
// for JavaScript. It is driven by 1536 bits of entropy, stored in an array of
// 48, 32-bit JavaScript variables.  Since many applications of this generator,
// including ours with the "Off The Grid" Latin Square generator, may require
// the deteriministic re-generation of a sequence of PRNs, this PRNG's initial
// entropic state can be read and written as a static whole, and incrementally
// evolved by pouring new source entropy into the generator's internal state.
// ----------------------------------------------------------------------------
// ENDLESS THANKS are due Johannes Baagoe for his careful development of highly
// robust JavaScript implementations of JS PRNGs.  This work was based upon his
// JavaScript "Alea" PRNG which is based upon the extremely robust Multiply-
// With-Carry (MWC) PRNG invented by George Marsaglia. MWC Algorithm References:
// http://www.GRC.com/otg/Marsaglia_PRNGs.pdf
// http://www.GRC.com/otg/Marsaglia_MWC_Generators.pdf
// ----------------------------------------------------------------------------
// The quality of this algorithm's pseudo-random numbers have been verified by
// multiple independent researchers. It handily passes the fermilab.ch tests as
// well as the "diehard" and "dieharder" test suites.  For individuals wishing
// to further verify the quality of this algorithm's pseudo-random numbers, a
// 256-megabyte file of this algorithm's output may be downloaded from GRC.com,
// and a Microsoft Windows scripting host (WSH) version of this algorithm may be
// downloaded and run from the Windows command prompt to generate unique files
// of any size:
// The Fermilab "ENT" tests: http://fourmilab.ch/random/
// The 256-megabyte sample PRN file at GRC: https://www.GRC.com/otg/uheprng.bin
// The Windows scripting host version: https://www.GRC.com/otg/wsh-uheprng.js
// ----------------------------------------------------------------------------
// Qualifying MWC multipliers are: 187884, 686118, 898134, 1104375, 1250205,
// 1460910 and 1768863. (We use the largest one that's < 2^21)
// ============================================================================

export class Random {
  // set the 'order' number of ENTROPY-holding 32-bit values
  /** @ignore */
  private o: number = 48;
  // init the 'carry' used by the multiply-with-carry (MWC) algorithm
  /** @ignore */
  private c: number = 1;
  // init the 'phase' (max-1) of the intermediate variable pointer
  /** @ignore */
  private p: number = this.o;
  // declare our intermediate variables array
  /** @ignore */
  private s: number[] = Array.from<number>({ length: this.o });

  // general purpose local
  /** @ignore */
  private k = 0;

  // ===========================================================================
  // This is based upon Johannes Baagoe's carefully designed and efficient hash
  // function for use with JavaScript.  It has a proven "avalanche" effect such
  // that every bit of the input affects every bit of the output 50% of the time,
  // which is good.	See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
  // ===========================================================================
  /** @ignore */
  private n = 0xefc8249d;
  /** @ignore */
  private mash(data: number | string): number {
    data = data.toString();
    for (let i = 0; i < data.length; i++) {
      this.n += data.charCodeAt(i);
      let h = 0.02519603282416938 * this.n;
      this.n = h >>> 0;
      h -= this.n;
      h *= this.n;
      this.n = h >>> 0;
      h -= this.n;
      this.n += h * 0x100000000; // 2^32
    }
    return (this.n >>> 0) * 2.3283064365386963e-10; // 2^-32
  }
  /** @ignore */
  private mashInit(): void {
    this.n = 0xefc8249d;
  }

  /**
   * Returns an instance of Random. TS/class implementation of Uheprng.
   * @see [grc.com/otg/uheprng.htm](https://www.grc.com/otg/uheprng.htm)
   *
   * @example
   * const rand = new Random('selectrandom');
   * const a = rand.float();
   * const b = rand.float();
   * const c = rand.seed('selectrandom').float();
   * console.log(a === b, a === c); // false, true
   *
   * @param seed - Seed for random number generator.
   * @returns Uheprng
   */
  constructor(seed?: number | string) {
    // when our "uheprng" is initially invoked our PRNG state is initialized
    // from the browser's own local PRNG. This is okay since although its
    // generator might not be wonderful, it's useful for establishing large
    // startup entropy for our usage.
    // get a pointer to our high-performance "Mash" hash
    // this.#mash = new (Mash as any)();

    if (typeof seed === "string" || typeof seed === "number") return this.seed(seed);

    // fill the array with initial mash hash values
    for (let i = 0; i < this.o; i++) this.s[i] = this.mash(Math.random());
    return this;
  }

  // this PRIVATE (internal access only) function is the heart of the
  // multiply-with-carry (MWC) PRNG algorithm. When called it returns a
  // pseudo-random number in the form of a 32-bit JavaScript fraction
  // (0.0 to <1.0) it is a PRIVATE function used by the default [0-1] return
  // function, and by the random 'string(n)' function which returns 'n'
  // characters from 33 to 126.
  /** @ignore */
  private rawprng(): number {
    if (++this.p >= this.o) this.p = 0;
    const t = 1768863 * this.s[this.p] + this.c * 2.3283064365386963e-10; // 2^-32
    this.s[this.p] = t - (this.c = t | 0);
    return this.s[this.p];
  }

  // this EXPORTED function is the default function returned by this library.
  // The values returned are integers in the range from 0 to range-1. We first
  // obtain two 32-bit fractions (from rawprng) to synthesize a single high
  // resolution 53-bit prng (0 to <1), then we multiply this by the caller's
  // "range" param and take the "floor" to return a equally probable integer.
  /**
   * @returns A pseudo-random integer on [0, `n`)
   * @throws `RangeError` if `n` is not at positive integer.
   */
  intn(n: number = 1): number {
    if (!Number.isInteger(n) || n < 1) throw new RangeError("n must be a positive integer");
    if (n === 1) return 0;
    return (n * this.random()) | 0;
  }

  // this EXPORTED function 'string(n)' returns a pseudo-random string of
  // 'n' printable characters ranging from chr(33) to chr(126) inclusive.
  /**
   * @returns A pseudo-random string of `n` printable characters ranging from
   *   `chr(33)` to `chr(126)` inclusive.
   */
  str(n: number): string {
    let s = "";
    for (let i = 0; i < n; i++) {
      s += String.fromCharCode(33 + this.intn(94));
    }
    return s;
  }

  // this PRIVATE "hash" function is used to evolve the generator's internal
  // entropy state. It is also called by the EXPORTED addEntropy() function
  // which is used to pour entropy into the PRNG.
  /** @internal */
  private hash(...args: number[] | string[]): void {
    for (let i = 0; i < args.length; i++) {
      for (let j = 0; j < this.o; j++) {
        this.s[j] -= this.mash(args[i]);
        if (this.s[j] < 0) this.s[j] += 1;
      }
    }
  }
  // this EXPORTED "clean string" function removes leading and trailing spaces
  // and non-printing control characters, including any embedded
  // carriage-return (CR) and line-feed (LF) characters, from any string it is
  // handed. this is also used by the 'hashstring' function (below) to help
  // users always obtain the same EFFECTIVE uheprng seeding key.
  /** @internal */
  cleanString(inStr: string): string {
    // remove any/all leading spaces
    inStr = inStr.replace(/(^\s*)|(\s*$)/gi, "");
    // remove any/all control characters
    /* eslint no-control-regex: "off" */
    inStr = inStr.replace(/[\x00-\x1F]/gi, "");
    // remove any/all trailing spaces
    inStr = inStr.replace(/\n /, "\n");
    return inStr; // return the cleaned up result
  }

  // this EXPORTED "hash string" function hashes the provided character string
  // after first removing any leading or trailing spaces and ignoring any
  // embedded carriage returns (CR) or Line Feeds (LF)
  hashString(inStr: string): this {
    inStr = this.cleanString(inStr);
    this.mash(inStr); // use the string to evolve the 'mash' state
    for (let i = 0; i < inStr.length; i++) {
      // scan through the characters in our string
      this.k = inStr.charCodeAt(i); // get the character code at the location
      for (let j = 0; j < this.o; j++) {
        //	"mash" it into the UHEPRNG state
        this.s[j] -= this.mash(this.k);
        if (this.s[j] < 0) this.s[j] += 1;
      }
    }

    return this;
  }

  // this handy exported function is used to add entropy to our uheprng at any
  // time
  /** Adds entropy to Uheprng. */
  addEntropy(...args: string[] | number[]): this {
    this.hash([this.k++, new Date().getTime(), ...args, Math.random()].join(""));

    return this;
  }

  // if we want to provide a deterministic startup context for our PRNG,
  // but without directly setting the internal state variables, this allows
  // us to initialize the mash hash and PRNG's internal state before providing
  // some hashing input
  /** Initializes state */
  initState(): this {
    this.mashInit(); // pass a null arg to force mash hash to init
    for (let i = 0; i < this.o; i++) {
      this.s[i] = this.mash(" "); // fill the array with initial mash hash values
    }
    this.c = 1; // init our multiply-with-carry carry
    this.p = this.o; // init our phase

    return this;
  }

  /** Seed the random generator */
  seed(seed: number | string = Math.random()): this {
    this.initState();
    if (typeof seed === "string") return this.hashString(seed);
    if (typeof seed === "number") return this.hashString(seed.toString());
    return this.hashString(Math.random().toString());
  }

  // Extracted from intn, see original comments there
  /** @returns Pseudo-random (uniform) number on the interval [0.0, 1.0) */
  random(): number {
    return this.rawprng() + ((this.rawprng() * 0x200000) | 0) * 1.1102230246251565e-16; // 2^-53
  }
  float(): number {
    return this.random();
  }

  /** @returns An array of (uniform) numbers on the interval `[0.0, 1.0)` */
  floatArray(n: number): number[] {
    return Array.from({ length: n }, () => this.random());
  }

  /** @returns Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)` */
  floate(): number {
    let u: number;
    do {
      u = this.random();
    } while (u === 0.0);
    return u;
  }
}
