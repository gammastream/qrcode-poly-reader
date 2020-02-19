import {Point, Dimension} from './PolyReaderConfig';

export function clipBytes(
    buffer: Uint8ClampedArray, 
    imgWidth: number, 
    imgHeight: number,
    startX: number, 
    startY: number, 
    rectWidth: number, 
    rectHeight: number
    ){
        const pixelCount = imgWidth * imgHeight;
        const dataLength = buffer.length;
        const bytesPerPixel = dataLength / pixelCount;  // usually 4
        const stride = bytesPerPixel * imgWidth;        // discount padding
    
        const bytes = new Uint8ClampedArray(rectWidth * rectHeight * bytesPerPixel);
        let i = 0;
        for(let y = startY; y < startY + rectHeight; y++) {
            for(let k = startX * bytesPerPixel + y * stride; k < (startX + rectWidth) * bytesPerPixel + y * stride; k++) {
                bytes[i] = buffer[k];
                i++;
            }
        }
        return bytes;
    };
