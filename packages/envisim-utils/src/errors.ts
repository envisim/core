export class EnvisimError extends AggregateError {
  static isError(error: unknown): error is EnvisimError {
    return error instanceof EnvisimError;
  }

  static checkErrors(errors?: EnvisimError): undefined {
    if (EnvisimError.isError(errors)) errors.throwErrors();
    return;
  }

  declare errors: Error[];
  constructor() {
    super([]);
    this.name = "EnvisimError";
  }

  get length() {
    return this.errors.length;
  }
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  add(error?: Error): this {
    if (error !== undefined) this.errors.push(error);
    return this;
  }
  append(errors?: EnvisimError | Error[]): this {
    if (errors === undefined) return this;
    if (EnvisimError.isError(errors)) this.errors.push(...errors.errors);
    else this.errors.push(...errors);
    return this;
  }

  throwErrors(holdIfEmpty: boolean = true): undefined {
    if (holdIfEmpty && !this.hasErrors()) return;
    throw this;
  }
  orNull(): null | this {
    return this.hasErrors() ? this : null;
  }
}

export class ValidationError<C extends ValidationErrorCodes> extends Error {
  static OTHER_CODES = [
    "other-value-not-existing",
    "other-array-empty",
    "other-index-oob",
    "other-incorrect-shape",
  ] as const;
  static createOther<C extends (typeof this.OTHER_CODES)[number]>(
    code: C,
    arg?: string,
    msg?: string,
  ): ValidationError<C> {
    switch (code) {
      case "other-value-not-existing":
        return new ValidationError("value does not exist", { arg, code });
      case "other-array-empty":
        return new ValidationError(
          arg === undefined || arg === ""
            ? "array must not be empty"
            : `array of '${arg}' must not be empty`,
          { arg, code },
        );
      case "other-index-oob":
        return new ValidationError(
          arg === undefined || arg === "" ? "index out of bound" : `${arg} out of bounds`,
          { arg, code },
        );
      case "other-incorrect-shape":
        return new ValidationError(
          arg === undefined || arg === ""
            ? `shapes must match: '${msg}'`
            : `shape '${arg}' must math: ${msg}`,
          { arg, code },
        );
    }
  }
  static checkOther<C extends (typeof this.OTHER_CODES)[number]>(
    code: C,
    arg: string,
    value: unknown,
  ): ValidationError<C> | undefined {
    switch (code) {
      case "other-value-not-existing":
        if (value !== undefined && value !== null) return;
        break;
      case "other-array-empty":
        if (Array.isArray(value) && value.length > 0) return;
        break;
      default:
        throw new RangeError(`cannot check: ${code}`);
    }

    return this.createOther(code, arg);
  }

  static NUMBER_CODES = [
    "number-not-number",
    "number-not-integer",
    "number-not-positive",
    "number-not-negative",
    "number-not-nonnegative",
    "number-not-nonpositive",
    "number-not-finite",
    "number-not-in-unit-interval",
    "number-not-in-interval",
  ] as const;
  static createNumber<C extends (typeof this.NUMBER_CODES)[number]>(
    code: C,
    arg?: string,
    msg?: string,
  ): ValidationError<C> {
    const cause = { arg, code };

    switch (code) {
      case "number-not-number":
        return new ValidationError(`${specifyOption(arg)}must be number`, cause);
      case "number-not-integer":
        return new ValidationError(`"${specifyOption(arg)}must be integer`, cause);
      case "number-not-positive":
        return new ValidationError(`${specifyOption(arg)}must be positive`, cause);
      case "number-not-negative":
        return new ValidationError(`${specifyOption(arg)}must be negative`, cause);
      case "number-not-nonnegative":
        return new ValidationError(`${specifyOption(arg)}must be non-negative`, cause);
      case "number-not-nonpositive":
        return new ValidationError(`${specifyOption(arg)}must be non-positive`, cause);
      case "number-not-finite":
        return new ValidationError(`${specifyOption(arg)}must be finite`, cause);
      case "number-not-in-unit-interval":
        return new ValidationError(`${specifyOption(arg)}must be in the interval [0, 1]`, cause);
      case "number-not-in-interval":
        return new ValidationError(`${specifyOption(arg)}must be in the interval: ${msg}`, cause);
    }
  }
  static checkNumber<C extends (typeof this.NUMBER_CODES)[number]>(
    code: C,
    arg: string,
    value: number,
  ): ValidationError<C> | undefined {
    switch (code) {
      case "number-not-number":
        if (typeof value === "number") return;
        break;
      case "number-not-integer":
        if (Number.isInteger(value)) return;
        break;
      case "number-not-positive":
        if (value > 0.0) return;
        break;
      case "number-not-negative":
        if (value < 0.0) return;
        break;
      case "number-not-nonnegative":
        if (value >= 0.0) return;
        break;
      case "number-not-nonpositive":
        if (value <= 0.0) return;
        break;
      case "number-not-finite":
        if (Number.isFinite(value)) return;
        break;
      case "number-not-in-unit-interval":
        if (0.0 <= value && value <= 1.0) return;
        break;
      default:
        throw new RangeError(`cannot check: ${code}`);
    }

    return this.createNumber(code, arg);
  }

  static GEOJSON_CODES = [
    "geojson-incorrect",
    "geojson-not-area",
    "geojson-not-line",
    "geojson-not-point",
    "geojson-not-at-least-line",
    "geojson-not-at-most-line",
    "geojson-empty",
    "geojson-zero-measure",
  ] as const;
  static createGeoJson<C extends (typeof this.GEOJSON_CODES)[number]>(
    code: C,
    arg?: string,
    type: "collection" | "feature" | "geometry" | "primitive" = "collection",
  ): ValidationError<C> {
    switch (code) {
      case "geojson-incorrect":
        return new ValidationError(`${arg ?? type} is incorrect`, { code, arg: arg ?? type });
      case "geojson-not-area":
        return new ValidationError(`${arg ?? type} must be an area primitive`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-not-line":
        return new ValidationError(`${arg ?? type} must be a line primitive`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-not-point":
        return new ValidationError(`${arg ?? type} must be a point primitive`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-not-at-least-line":
        return new ValidationError(`${arg ?? type} must be a line or area primitive`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-not-at-most-line":
        return new ValidationError(`${arg ?? type} must be a line or point primitive`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-empty":
        return new ValidationError(`${arg ?? type} must not be an empty ${type}`, {
          code,
          arg: arg ?? type,
        });
      case "geojson-zero-measure":
        return new ValidationError(`${arg ?? type} must not be have zero measure`, {
          code,
          arg: arg ?? type,
        });
    }
  }

  static GEOMETRY_CODES = ["geometry-incorrect"] as const;
  static createGeometry<C extends (typeof this.GEOMETRY_CODES)[number]>(
    code: C,
    arg: string | undefined,
    type:
      | "Polygon"
      | "MultiPolygon"
      | "Circle"
      | "MultiCircle"
      | "LineString"
      | "MultiLineString"
      | "Point"
      | "MultiPoint",
  ): ValidationError<C> {
    switch (code) {
      case "geometry-incorrect":
        return new ValidationError(
          arg === undefined || arg === ""
            ? `geometry must be ${type}`
            : `geometry '${arg}' must be ${type}`,
          { code, arg: arg ?? type },
        );
    }
  }

  static PROPERTY_CODES = [
    "property-special-key",
    "property-name-conflict",
    "property-not-categorical",
    "property-not-numerical",
    "property-records-not-identical",
    "property-not-existing",
  ] as const;
  static createProperty<C extends (typeof this.PROPERTY_CODES)[number]>(
    code: C,
    arg?: string,
    key?: string,
  ): ValidationError<C> {
    switch (code) {
      case "property-special-key":
        return new ValidationError(`${specifyKey(key)}must not be special key`, { code, arg, key });
      case "property-name-conflict":
        return new ValidationError(`${specifyKey(key)}already exist`, { code, arg, key });
      case "property-not-categorical":
        return new ValidationError(`${specifyKey(key)}must be categorical`, { code, arg, key });
      case "property-not-numerical":
        return new ValidationError(`${specifyKey(key)}must be numerical`, { code, arg, key });
      case "property-records-not-identical":
        return new ValidationError(`property records must match`, { code, arg, key });
      case "property-not-existing":
        return new ValidationError(`${specifyKey(key)}must exist`, { code, arg, key });
    }
  }

  static CAUSE_CODES = [
    ...this.OTHER_CODES,
    ...this.NUMBER_CODES,
    ...this.GEOJSON_CODES,
    ...this.GEOMETRY_CODES,
    ...this.PROPERTY_CODES,
  ] as const;

  declare cause?: ValidationCause<C>;
  constructor(message: string, cause: ValidationCause<C>) {
    super(message, { cause });
    this.name = "ValidationError";
  }

  cast() {
    throw this;
  }
}

export type ValidationErrorCodes = (typeof ValidationError.CAUSE_CODES)[number];
export interface ValidationCause<C extends string> {
  code: C;
  arg?: string;
  key?: string;
}

// function quote(msg?: string): string {
//   return msg === undefined || msg === "" ? "" : `'${msg}'`;
// }

function specifyOption(arg?: string): string {
  return arg === undefined || arg === "" ? "" : `argument '${arg}': `;
}

function specifyKey(key?: string): string {
  return key === undefined || key === "" ? "property " : `property id '${key}': `;
}
