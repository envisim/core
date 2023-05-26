import {
  bbox,
  length,
  forwardAzimuth,
  intersectLineLineFeatures,
} from '@envisim/geojson-utils';
import {typeOfFrame} from './typeOfFrame.js';
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

type TransferPropsOpts = {
  newFeature: GeoJSON.Feature;
  sampleFeature: GeoJSON.Feature;
  sampleType: string;
  baseFeature: GeoJSON.Feature;
  baseType: string;
  newFeatures: GeoJSON.Feature[];
  index: number;
};

const transferProperties = (opts: TransferPropsOpts): void => {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (opts.sampleType === 'line' && opts.baseType === 'line') {
    if (opts.sampleFeature.properties?._randomRotation === true) {
      factor = Math.PI / (2 * length(opts.baseFeature));
    } else {
      let azimuth = 0;
      if (opts.sampleFeature.geometry.type === 'LineString') {
        azimuth = forwardAzimuth(
          opts.sampleFeature.geometry.coordinates[0],
          opts.sampleFeature.geometry.coordinates[1],
        );
      } else if (opts.sampleFeature.geometry.type === 'MultiLineString') {
        azimuth = forwardAzimuth(
          opts.sampleFeature.geometry.coordinates[0][0],
          opts.sampleFeature.geometry.coordinates[0][1],
        );
      }
      factor = 1 / projectedLengthOfFeature(opts.baseFeature, azimuth);
    }
  }

  // Transfer all properties from baseFeature to newFeature
  if (opts.baseFeature.properties) {
    Object.keys(opts.baseFeature.properties).forEach((key) => {
      if (opts.baseFeature.properties && opts.newFeature.properties) {
        opts.newFeature.properties[key] = opts.baseFeature.properties[key];
      }
    });
  }
  // Transfer designWeight to newFeature from sampleFeature
  if (
    opts.sampleFeature.properties?._designWeight &&
    opts.newFeature.properties
  ) {
    opts.newFeature.properties._designWeight =
      opts.sampleFeature.properties._designWeight * factor;
  }
  // Transfer index of parent sample unit as _parent
  if (opts.newFeature.properties) {
    opts.newFeature.properties._parent = opts.index;
  }
  // Add a bbox to newFeature
  opts.newFeature.bbox = bbox(opts.newFeature);
  // Push newFeature
  opts.newFeatures.push(opts.newFeature);
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
    throw new Error('FeatureCollection is required for sample.');
  }
  if (base.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for base.');
  }

  // The same frame object may be included in multiple intersects
  // as collection is done for each sample feature.

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
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  if (sampleType === 'line' && baseType === 'line') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  if (sampleType === 'line' && baseType === 'area') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  if (sampleType === 'area' && baseType === 'point') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          baseFeature,
          sampleFeature,
        );
        if (intersect.geoJSON) {
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  if (sampleType === 'area' && baseType === 'line') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  if (sampleType === 'area' && baseType === 'area') {
    sample.features.forEach((sampleFeature, indexOfSampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          transferProperties({
            newFeature: intersect.geoJSON,
            sampleFeature: sampleFeature,
            sampleType: sampleType,
            baseFeature: baseFeature,
            baseType: baseType,
            newFeatures: newFeatures,
            index: indexOfSampleFeature,
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: newFeatures,
    };
  }
  // Return empty collection if no intersects.
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
