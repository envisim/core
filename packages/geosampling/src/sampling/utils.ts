// import {IPropertyRecord, sizeOfCollection} from '@envisim/geojson-utils';
// import {ColumnVector, Matrix} from '@envisim/matrix';

// import type {ISampleOptionsFinite} from './types.js';

// function extractPropertyFromCollection(
//   collection: GeoJSON.FeatureCollection,
//   property: string,
// ): ColumnVector {
//   const N = sizeOfCollection(collection);
//   const vec = new Array(N);

//   for (let i = 0, f: GeoJSON.Feature; i < N; i++) {
//     f = collection.features[i];

//     vec[i] = parseFloat(f.properties?.[property]);
//   }

//   return new ColumnVector(vec, N);
// }

// export function matrixFromCollectionProps(
//   collection: GeoJSON.FeatureCollection,
//   properties: string[],
//   validProps: IPropertyRecord,
// ): Matrix {
//   if (!properties.every((prop) => validProps.hasOwnProperty(prop)))
//     throw new Error('all properties not present on validProps');

//   return Matrix.cbind(
//     ...properties.map((prop) =>
//       extractPropertyFromCollection(collection, prop),
//     ),
//   );
// }

// export function categoriesFromValidProps(
//   properties: string[],
//   validProps: IPropertyRecord,
// ): number[] {
//   const arr: number[] = [];

//   properties.forEach((prop, i) => {
//     if (!validProps.hasOwnProperty(prop))
//       throw new Error('all properties not present on validProps');

//     if (validProps[prop].type === 'categorical') arr.push(i);
//   });

//   return arr;
// }

// function probsFromCollection(
//   collection: GeoJSON.FeatureCollection,
//   {sampleSize, probabilitiesFrom}: ISampleOptionsFinite,
//   validProps: IPropertyRecord,
// ): ColumnVector {
//   const N = sizeOfCollection(collection);

//   if (typeof probabilitiesFrom !== 'string') {
//     if (sampleSize <= 0) throw new RangeError('sampleSize is <= 0');
//     return new ColumnVector(1, N);
//   }

//   if (!validProps.hasOwnProperty(probabilitiesFrom))
//     throw new RangeError(
//       'validProps does not contain a property with the required name',
//     );
//   if (validProps[probabilitiesFrom].type === 'categorical')
//     throw new RangeError(
//       'the property to create probabilities from is categorical',
//     );

//   const prop = extractPropertyFromCollection(collection, probabilitiesFrom);

//   // OR set to 0.0?
//   if (!prop.every((e) => e >= 0.0))
//     throw new Error('the selected property has negative values');

//   return prop;
// }

// export function drawprobsFromCollection(
//   collection: GeoJSON.FeatureCollection,
//   options: ISampleOptionsFinite,
//   validProps: IPropertyRecord,
// ): ColumnVector {
//   const probs = probsFromCollection(collection, options, validProps);
//   const sum = probs.sum();

//   return probs.mapInPlace((e) => e / sum);
// }

// export function inclprobsFromCollection(
//   collection: GeoJSON.FeatureCollection,
//   options: ISampleOptionsFinite,
//   validProps: IPropertyRecord,
// ): ColumnVector {
//   if (options.sampleSize <= 0) throw new RangeError('sampleSize is <= 0');
//   const x = probsFromCollection(collection, options, validProps);
//   let n = Math.round(options.sampleSize);
//   const N = sizeOfCollection(collection);

//   let sum: number;
//   let failed: boolean = true;
//   // The return vector
//   const ips = new ColumnVector(0.0, N);

//   /*
//    * Continue this loop while there are still units to decide
//    * The failed flag will be true if any nx / X > 1
//    * where X is sum(x)
//    */
//   while (n > 0 && failed) {
//     failed = false;
//     // Calculate X for all remaining units
//     sum = x.reduce(
//       (tot, e, i) => (ips.atIndex(i) === 1.0 ? tot : tot + e),
//       0.0,
//     );

//     x
//       // Map x to nx/X
//       .map((e) => (n * e) / sum)
//       /*
//        * For each element in x, update ips
//        * If ips already is 1.0, ignore it
//        * If nx/X >= 1.0, remove one from n, and set ips = 1.0
//        * If nx/X > 1.0, we need to do another loop
//        * Otherwise, set ips to nx/X
//        */
//       .forEach((e, i) => {
//         ips.fnIndex(i, (v) => {
//           if (v === 1.0) return 1.0;
//           if (e >= 1.0) {
//             n--;
//             failed = e > 1.0;
//             return 1.0;
//           }
//           return e;
//         });
//       });
//   }

//   return ips;
// }
