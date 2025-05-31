import { inInterval, intervalToText, type Interval } from "./interval.js";

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

  add(error?: Error): boolean {
    if (error !== undefined) {
      this.errors.push(error);
      return true;
    }

    return false;
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

export class ValidationError extends Error {
  static create: ValidationErrorCreator = {
    // NUMBER
    "number-not-number": ({ arg }) =>
      new ValidationError(`'${arg}' must be number`, { code: "number-not-number", arg }),
    "number-not-integer": ({ arg }) =>
      new ValidationError(`'${arg}' must be integer`, { code: "number-not-integer", arg }),
    "number-not-positive": ({ arg }) =>
      new ValidationError(`'${arg}' must be positive`, { code: "number-not-positive", arg }),
    "number-not-nonnegative": ({ arg }) =>
      new ValidationError(`'${arg}' must be non-negative`, { code: "number-not-nonnegative", arg }),
    "number-not-finite": ({ arg }) =>
      new ValidationError(`'${arg}' must be finite`, { code: "number-not-finite", arg }),
    "number-not-in-unit-interval": ({ arg, ends }) =>
      new ValidationError(
        `'${arg}' must be in the interval: ${intervalToText({ interval: [0.0, 1.0], ends }, arg)}`,
        {
          code: "number-not-in-unit-interval",
          arg,
          ends,
        },
      ),
    "number-not-in-interval": ({ arg, interval, ends = "closed" }) =>
      new ValidationError(
        `'${arg}' must be in the interval: ${intervalToText({ interval, ends }, arg)}`,
        {
          code: "number-not-in-interval",
          arg,
          interval,
          ends,
        },
      ),

    // GEOJSON
    "geojson-incorrect": ({ arg, type }) =>
      new ValidationError(`${arg} is incorrect`, { code: "geojson-incorrect", arg, type }),
    "geojson-not-area": ({ arg, type }) =>
      new ValidationError(`${arg} must be an area primitive`, {
        code: "geojson-not-area",
        arg,
        type,
      }),
    "geojson-not-line": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must be a line primitive`, {
        code: "geojson-not-line",
        arg,
        type,
      }),
    "geojson-not-point": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must be a point primitive`, {
        code: "geojson-not-point",
        arg,
        type,
      }),
    "geojson-not-at-least-line": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must be a line or area primitive`, {
        code: "geojson-not-at-least-line",
        arg,
        type,
      }),
    "geojson-not-at-most-line": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must be a line or point primitive`, {
        code: "geojson-not-at-most-line",
        arg,
        type,
      }),
    "geojson-empty": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must not be an empty ${type}`, {
        code: "geojson-empty",
        arg,
        type,
      }),
    "geojson-zero-measure": ({ arg, type }) =>
      new ValidationError(`${arg ?? type} must not be have zero measure`, {
        code: "geojson-zero-measure",
        arg,
        type,
      }),

    // PROPERTY
    "property-special-key": ({ arg, key }) =>
      new ValidationError(`in '${arg}', '${key}' must not be special key`, {
        code: "property-special-key",
        arg,
        key,
      }),
    "property-name-conflict": ({ arg, key }) =>
      new ValidationError(`in '${arg}', '${key}' already exist`, {
        code: "property-name-conflict",
        arg,
        key,
      }),
    "property-not-categorical": ({ arg, key }) =>
      new ValidationError(`in '${arg}', '${key}' must be categorical`, {
        code: "property-not-categorical",
        arg,
        key,
      }),
    "property-not-numerical": ({ arg, key }) =>
      new ValidationError(`in '${arg}', '${key}' must be numerical`, {
        code: "property-not-numerical",
        arg,
        key,
      }),
    "property-not-existing": ({ arg, key }) =>
      new ValidationError(`in '${arg}', '${key}' must exist`, {
        code: "property-not-existing",
        arg,
        key,
      }),
    "property-records-not-identical": ({ arg, other }) =>
      new ValidationError(`'${arg}' and '${other}' property records must match`, {
        code: "property-records-not-identical",
        arg,
        other,
      }),

    // OTHER
    "other-value-not-existing": ({ arg }) =>
      new ValidationError("value does not exist", { code: "other-value-not-existing", arg }),
    "other-array-empty": ({ arg }) =>
      new ValidationError(
        unspecifiedArg(arg, "array must not be empty") ?? `array of '${arg}' must not be empty`,
        { code: "other-array-empty", arg },
      ),
    "other-index-oob": ({ arg, index }) =>
      new ValidationError(unspecifiedArg(arg, "index out of bounds") ?? `'${arg}' out of bounds`, {
        code: "other-index-oob",
        arg,
        index,
      }),
    "other-incorrect-shape": ({ arg, shape }) =>
      new ValidationError(
        unspecifiedArg(arg, `shapes must match: '${shape}'`) ??
          `shape '${arg}' must match '${shape}'`,
        { code: "other-incorrect-shape", arg, shape },
      ),
  } as const;

  static check = {
    // NUMBER
    "number-not-number": (arg0, value: number) =>
      typeof value === "number" ? undefined : this.create["number-not-number"](arg0),
    "number-not-integer": (arg0, value: number) =>
      Number.isInteger(value) ? undefined : this.create["number-not-integer"](arg0),
    "number-not-positive": (arg0, value: number) =>
      value > 0.0 ? undefined : this.create["number-not-positive"](arg0),
    "number-not-nonnegative": (arg0, value: number) =>
      value >= 0.0 ? undefined : this.create["number-not-nonnegative"](arg0),
    "number-not-finite": (arg0, value: number) =>
      Number.isFinite(value) ? undefined : this.create["number-not-finite"](arg0),
    "number-not-in-unit-interval": (arg0, value: number) =>
      inInterval(value, { interval: [0.0, 1.0], ends: arg0.ends })
        ? undefined
        : this.create["number-not-finite"](arg0),
    "number-not-in-interval": (arg0, value: number) =>
      inInterval(value, arg0) ? undefined : this.create["number-not-finite"](arg0),

    // OTHER
    "other-value-not-existing": (arg0, value: unknown) =>
      value !== undefined && value !== null
        ? undefined
        : this.create["other-value-not-existing"](arg0),
    "other-array-empty": (arg0, value: unknown[]) =>
      Array.isArray(value) && value.length > 0 ? undefined : this.create["other-array-empty"](arg0),
  } as const satisfies ValidationErrorChecker;

  declare cause?: ValidationErrorCause;
  constructor(message: string, cause: ValidationErrorCause) {
    super(message, { cause });
    this.name = "ValidationError";
  }

  raise() {
    throw this;
  }
}

export interface ValidationErrorCauseBase<C extends string> {
  code: C;
  arg?: string;
}
export type ValidationErrorCause =
  | ValidationErrorCauseBase<"number-not-number">
  | ValidationErrorCauseBase<"number-not-integer">
  | ValidationErrorCauseBase<"number-not-positive">
  | ValidationErrorCauseBase<"number-not-nonnegative">
  | ValidationErrorCauseBase<"number-not-finite">
  | (ValidationErrorCauseBase<"number-not-in-unit-interval"> & { ends?: Interval["ends"] })
  | (ValidationErrorCauseBase<"number-not-in-interval"> & Interval)
  | ValidationErrorCauseBase<"other-value-not-existing">
  | ValidationErrorCauseBase<"other-array-empty">
  | (ValidationErrorCauseBase<"other-index-oob"> & { index?: number })
  | (ValidationErrorCauseBase<"other-incorrect-shape"> & { shape?: string })
  | (ValidationErrorCauseBase<"geojson-incorrect"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-not-area"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-not-line"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-not-point"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-not-at-least-line"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-not-at-most-line"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-empty"> & { type?: string })
  | (ValidationErrorCauseBase<"geojson-zero-measure"> & { type?: string })
  | (ValidationErrorCauseBase<"property-special-key"> & { key?: string })
  | (ValidationErrorCauseBase<"property-name-conflict"> & { key?: string })
  | (ValidationErrorCauseBase<"property-not-categorical"> & { key?: string })
  | (ValidationErrorCauseBase<"property-not-numerical"> & { key?: string })
  | (ValidationErrorCauseBase<"property-not-existing"> & { key?: string })
  | (ValidationErrorCauseBase<"property-records-not-identical"> & { other?: string });

export type ValidationErrorCodes = ValidationErrorCause["code"];
export type ValidationErrorCreator = {
  [C in ValidationErrorCodes]: (
    arg0: Omit<Extract<ValidationErrorCause, { code: C }>, "code">,
  ) => ValidationError;
};
export type ValidationErrorChecker = {
  [C in ValidationErrorCodes]?: (
    arg0: Omit<Extract<ValidationErrorCause, { code: C }>, "code">,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) => ValidationError | undefined;
};

function unspecifiedArg(arg: string | undefined, msg: string): string | undefined {
  return arg === undefined || arg === "" ? msg : undefined;
}
