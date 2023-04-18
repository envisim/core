import {typeOfFrame} from './typeOfFrame.js';
import {addBboxes} from './bbox.js';
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {intersectLineLineFeatures} from './intersectLineLineFeatures.js';

const transferProperties = (
  newFeature: GeoJSON.Feature,
  sampleFeature: GeoJSON.Feature,
  baseFeature: GeoJSON.Feature,
  newFeatures: GeoJSON.Feature[],
  index: number,
): void => {
  // Transfer all properties from baseFeature to newFeature
  if (baseFeature.properties) {
    Object.keys(baseFeature.properties).forEach((key) => {
      if (baseFeature.properties && newFeature.properties) {
        newFeature.properties[key] = baseFeature.properties[key];
      }
    });
  }
  // Transfer designWeight to newFeature from sampleFeature
  if (sampleFeature.properties?._designWeight && newFeature.properties) {
    newFeature.properties['_designWeight'] =
      sampleFeature.properties._designWeight;
  }
  if (newFeature.properties) {
    newFeature.properties['_parent'] = index;
  }
  // Add a bbox to newFeature
  addBboxes(newFeature);
  // Push newFeature
  newFeatures.push(newFeature);
};

/**
 * Collect intersect of features as the new sample from a GeoJSON base-layer
 * @param frame - A GeoJSON FeatureCollection
 * @param base - A GeoJSON FeatureCollection
 */
export const collectIntersects = (
  frame: GeoJSON.FeatureCollection,
  base: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  const sample = frame;
  if (sample.type !== 'FeatureCollection') {
    throw new Error('collect: FeatureCollection is required for sample.');
  }
  if (base.type !== 'FeatureCollection') {
    throw new Error('collect: FeatureCollection is required for base.');
  }

  // Get geometry type for sample and base.
  const sampleType = typeOfFrame(sample);
  const baseType = typeOfFrame(base);
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect.
  if (sampleType === 'point' && baseType === 'area') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          sampleFeature,
          baseFeature,
        );
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  if (sampleType === 'line' && baseType === 'line') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  if (sampleType === 'line' && baseType === 'area') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'point') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          baseFeature,
          sampleFeature,
        );
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'line') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'area') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          transferProperties(
            intersect.geoJSON,
            sampleFeature,
            baseFeature,
            newFeatures,
            indexOfSampleFeature,
          );
        }
      });
    });
  }
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
