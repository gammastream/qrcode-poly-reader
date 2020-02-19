import jsQR from 'jsqr';
import { QRCode } from 'jsqr';
import {PolyReaderConfig, makeRegions, SearchRegion} from './PolyReaderConfig';
import {clipBytes} from './ImageClipper';


function transformResult(code: QRCode, region: SearchRegion): QRCode {
    transformLocation(code.location.topRightCorner, region.origin.x, region.origin.y);
    transformLocation(code.location.topLeftCorner, region.origin.x, region.origin.y);
    transformLocation(code.location.bottomRightCorner, region.origin.x, region.origin.y);
    transformLocation(code.location.bottomLeftCorner, region.origin.x, region.origin.y);
    transformLocation(code.location.topRightFinderPattern, region.origin.x, region.origin.y);
    transformLocation(code.location.bottomLeftFinderPattern, region.origin.x, region.origin.y);
    transformLocation(code.location.bottomRightAlignmentPattern, region.origin.x, region.origin.y);
    return code;
}

function transformLocation(location: any, offsetX: number, offsetY: number){
    location.x += offsetX;
    location.y += offsetY;
}

function scan(config: PolyReaderConfig ): QRCode[] | null {
    const codes: QRCode[] = [];
    config.regions.forEach((region) => {
        const bytes = clipBytes(config.data, config.width, config.height, region.origin.x, region.origin.y, region.size.width, region.size.height);
        const result = jsQR(bytes, region.size.width, region.size.height);
        if( result ){
            codes.push( transformResult(result, region) );
        }
    });
    return codes;
}


export function polyReader(data: Uint8ClampedArray, width: number, height: number, regions?:SearchRegion[]): QRCode[] | null {
    const config: PolyReaderConfig = {
        data,
        height,
        width,
        regions: (regions) ? regions : makeRegions(width, height)
    }
    return scan(config);
}