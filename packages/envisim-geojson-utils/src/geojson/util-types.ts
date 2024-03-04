export type OptionalParam<T, S extends keyof T> = Omit<T, S> &
  Partial<Pick<T, S>>;
