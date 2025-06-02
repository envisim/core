import config from "@envisim/config-typedoc";

export default {
  ...config,
  entryPoints: [
    "./src/model-geometry.ts",
    "./src/sample-continuous/index.ts",
    "./src/sample-finite/index.ts",
    "./src/collect-properties.ts",
    "./src/select-intersects.ts",
    "./src/point-processes/index.ts",
  ],
};
