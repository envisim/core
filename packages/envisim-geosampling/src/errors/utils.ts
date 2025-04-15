/** helper type for error objects */
export type ErrorType<T> = T[keyof T] | null;
