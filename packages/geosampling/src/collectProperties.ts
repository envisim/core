import {IPropertyRecord} from '@envisim/geojson-utils';
import {typeOfFrame} from './typeOfFrame.js';
import {
  area,
  length,
  count,
  copy,
  forwardAzimuth,
  intersectLineLineFeatures,
} from '@envisim/geojson-utils';
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {v4 as uuidv4} from 'uuid';
import {projectedLengthOfFeature} from './projectedLengthOfFeature.js';

/* 
    properties = [
        {id:"", name:"", type:"numeric|categorical", values?:["",""]},
        {id:"", name:"", type:"numeric|categorical", values?:["",""]}
    ];
*/

/*
interface Property {
  name: string;
  type: 'numeric' | 'categorical';
  values?: string[];
}

type PropertiesObject = {
  [key: string]: Property;
};
*/

type ICollect = {
  properties: IPropertyRecord;
  geoJSON: GeoJSON.FeatureCollection;
};

const addPropertiesToFeature = (
  properties: IPropertyRecord,
  feature: GeoJSON.Feature,
): void => {
  // for now, add name and value 0 for numeric and name and value {} for categorical
  // later fill categorical {} with "cat":value if "cat" exists for feature.
  Object.keys(properties).forEach((key) => {
    if (!feature.properties) {
      feature.properties = {};
    }
    const variable = properties[key];
    if (variable && variable.name && variable.type) {
      if (!feature.properties[variable.name]) {
        // add property
        if (variable.type === 'numerical') {
          feature.properties[variable.name] = 0;
        }
        if (variable.type === 'categorical') {
          feature.properties[variable.name] = {};
        }
      }
    }
  });
};

type AggregateOpts = {
  to: GeoJSON.Feature;
  from: GeoJSON.Feature;
  toSize: number;
  intersectSize: number;
  properties: IPropertyRecord;
  toType: string;
  fromType: string;
};

const aggregateProperties = (opts: AggregateOpts) => {
  // If line collects from line an additional factor is needed
  let factor = 1;
  if (opts.toType === 'line' && opts.fromType === 'line') {
    if (opts.to.properties?._randomRotation === true) {
      factor = Math.PI / (2 * length(opts.from));
    } else {
      let azimuth = 0;
      if (opts.to.geometry.type === 'LineString') {
        azimuth = forwardAzimuth(
          opts.to.geometry.coordinates[0],
          opts.to.geometry.coordinates[1],
        );
      } else if (opts.to.geometry.type === 'MultiLineString') {
        azimuth = forwardAzimuth(
          opts.to.geometry.coordinates[0][0],
          opts.to.geometry.coordinates[0][1],
        );
      }
      factor = 1 / projectedLengthOfFeature(opts.from, azimuth);
    }
  }

  Object.keys(opts.properties).forEach((key) => {
    // for now, aggregate based on name
    const variable = opts.properties[key];

    if (opts.to.properties && opts.from.properties) {
      if (variable.type === 'numerical' && variable.name) {
        opts.to.properties[variable.name] +=
          ((opts.from.properties[variable.name] * opts.intersectSize) /
            opts.toSize) *
          factor;
      }
      if (variable.type === 'categorical' && variable.name) {
        if (
          !opts.to.properties[variable.name][
            opts.from.properties[variable.name]
          ]
        ) {
          opts.to.properties[variable.name][
            opts.from.properties[variable.name]
          ] = (opts.intersectSize / opts.toSize) * factor;
        } else {
          opts.to.properties[variable.name][
            opts.from.properties[variable.name]
          ] += (opts.intersectSize / opts.toSize) * factor;
        }
      }
    }
  });
};

/**
 * Collect properties to the sample GeoJSON from a GeoJSON base-layer
 * @param frame - A GeoJSON FeatureCollection
 * @param base - A GeoJSON FeatureCollection
 * @param properties - A properties object describing the properties to collect.
 */
export const collectProperties = (
  frame: GeoJSON.FeatureCollection,
  base: GeoJSON.FeatureCollection,
  properties: IPropertyRecord,
): ICollect => {
  if (frame.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for sample.');
  }
  if (base.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for base.');
  }
  const sample: GeoJSON.FeatureCollection = copy(frame);
  // add the properties to all sampleFeatures with default values
  // 0 for numeric and {} for categorical
  sample.features.forEach((feature: GeoJSON.Feature) => {
    addPropertiesToFeature(properties, feature);
  });

  // get geometry type for sample and base
  const toType = typeOfFrame(sample);
  const fromType = typeOfFrame(base);

  // aggregate values for all properties based on
  // intersect size
  if (toType === 'point' && fromType === 'area') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = count(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          sampleFeature,
          baseFeature,
        );
        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  } else if (toType === 'line' && fromType === 'line') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = length(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  } else if (toType === 'line' && fromType === 'area') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = length(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          const intersectSize = length(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  } else if (toType === 'area' && fromType === 'point') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = area(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          baseFeature,
          sampleFeature,
        );
        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  } else if (toType === 'area' && fromType === 'line') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = area(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, sampleFeature);
        if (intersect.geoJSON) {
          const intersectSize = length(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  } else if (toType === 'area' && fromType === 'area') {
    sample.features.forEach((sampleFeature) => {
      const sampleUnitSize = area(sampleFeature);
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(sampleFeature, baseFeature);
        if (intersect.geoJSON) {
          const intersectSize = area(intersect.geoJSON);
          aggregateProperties({
            to: sampleFeature,
            toType: toType,
            from: baseFeature,
            fromType: fromType,
            toSize: sampleUnitSize,
            intersectSize: intersectSize,
            properties: properties,
          });
        }
      });
    });
  }
  return {properties: properties, geoJSON: sample};
};
