const collectionTypes = ['line', 'point', 'polygon'] as const;
export type TCollectionType = (typeof collectionTypes)[number];

export function checkCollectionType(
  t: string,
  acceptEmpty: boolean = true,
): t is TCollectionType {
  return (
    (collectionTypes as ReadonlyArray<string>).includes(t) ||
    (acceptEmpty === true && t === '')
  );
}
