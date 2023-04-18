import {IPropertyRecord} from '@envisim/geojson-utils';

import {typeOfFrame} from './typeOfFrame.js';
import {area} from './area.js';
import {length} from './length.js';
import {count} from './count.js';
//import { size } from "./size.js";
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {intersectLineLineFeatures} from './intersectLineLineFeatures.js';
import {deepCopy} from './deepCopy.js';
import {v4 as uuidv4} from 'uuid';

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
    if (!feature.properties[properties[key].name]) {
      // add property
      if (properties[key].type === 'numeric') {
        feature.properties[properties[key].name] = 0;
      }
      if (properties[key].type === 'categorical') {
        feature.properties[properties[key].name] = {};
      }
    }
  });
};

const aggregateProperties = (
  toFeature: GeoJSON.Feature,
  fromFeature: GeoJSON.Feature,
  size: number,
  properties: IPropertyRecord,
) => {
  Object.keys(properties).forEach((key) => {
    // for now, aggregate based on name
    const name = properties[key].name;
    if (toFeature.properties && fromFeature.properties) {
      if (properties[key].type === 'numeric') {
        toFeature.properties[name] += fromFeature.properties[name] * size;
      }
      if (properties[key].type === 'categorical') {
        if (!toFeature.properties[name][fromFeature.properties[name]]) {
          toFeature.properties[name][fromFeature.properties[name]] = size;
        } else {
          toFeature.properties[name][fromFeature.properties[name]] += size;
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
    throw new Error('collect: FeatureCollection is required for sample.');
  }
  if (base.type !== 'FeatureCollection') {
    throw new Error('collect: FeatureCollection is required for base.');
  }
  const sample: GeoJSON.FeatureCollection = deepCopy(frame);
  // add the properties to all sampleFeatures with default values
  // 0 for numeric and {} for categorical
  sample.features.forEach((feature: GeoJSON.Feature) => {
    addPropertiesToFeature(properties, feature);
  });

  // get geometry type for sample and base
  const sampleType = typeOfFrame(sample);
  const baseType = typeOfFrame(base);

  // aggregate values for all properties based on
  // intersect size
  if (sampleType === 'point' && baseType === 'area') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          sampleFeature,
          baseFeature,
        );

        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  if (sampleType === 'line' && baseType === 'line') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineLineFeatures(baseFeature, sampleFeature);

        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  if (sampleType === 'line' && baseType === 'area') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(sampleFeature, baseFeature);

        if (intersect.geoJSON) {
          const intersectSize = length(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'point') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectPointAreaFeatures(
          baseFeature,
          sampleFeature,
        );

        if (intersect.geoJSON) {
          const intersectSize = count(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'line') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectLineAreaFeatures(baseFeature, sampleFeature);

        if (intersect.geoJSON) {
          const intersectSize = length(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  if (sampleType === 'area' && baseType === 'area') {
    sample.features.forEach((sampleFeature) => {
      base.features.forEach((baseFeature) => {
        const intersect = intersectAreaAreaFeatures(sampleFeature, baseFeature);

        if (intersect.geoJSON) {
          const intersectSize = area(intersect.geoJSON);
          aggregateProperties(
            sampleFeature,
            baseFeature,
            intersectSize,
            properties,
          );
        }
      });
    });
  }
  return {properties: properties, geoJSON: sample};
};
