declare module 'jsts/org/locationtech/jts/io/GeoJSONReader.js' {
  export default class GeoJSONReader {
    read(geoJson: object): object;
  }
}

declare module 'jsts/org/locationtech/jts/io/GeoJSONWriter.js' {
  export default class GeoJSONWriter {
    write(geometry: object): object;
  }
}

declare module 'jsts/org/locationtech/jts/operation/buffer/BufferOp.js' {
  export default class BufferOp {
    constructor(geometry: object);
    getResultGeometry(distance: number): object;
    setQuadrantSegments(quadrantSegments: number): void;
  }
}
