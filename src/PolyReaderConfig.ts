
export interface Point {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface SearchRegion {
  origin: Point;
  size: Dimension;
}

export interface PolyReaderConfig {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  regions?: SearchRegion[];
}

export function makeRegions(width: number, height: number): SearchRegion[] {
    const size: Dimension = {
        width: Math.floor(width / 2),
        height: Math.floor(height / 2)
    };

    // top left quadrant
    const regionA: SearchRegion = {
        origin: {
            x: 0, 
            y: 0
        },
        size
    };

    // top right quadrant
    const regionB: SearchRegion = {
        origin: {
            x: width / 2, 
            y: 0
        },
        size
    };

    // bottom left quadrant
    const regionC: SearchRegion = {
        origin: {
            x: 0, 
            y: height / 2
        },
        size
    };

    // bottom right quadrant
    const regionD: SearchRegion = {
        origin: {
            x: width / 2, 
            y: height / 2
        },
        size
    };

    // center quadrant
    const regionE: SearchRegion = {
        origin: {
            x: width / 4, 
            y: height / 4
        },
        size
    };
    
    return [
        regionA,
        regionB,
        regionC,
        regionD,
        regionE
    ];
}