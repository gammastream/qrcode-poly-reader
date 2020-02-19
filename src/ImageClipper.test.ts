import {clipBytes} from './ImageClipper';

// test bitmap
// 00 01 02 03 | 04 05 06 07
// 08 09 10 11 | 12 13 14 15
// -------------------------
// 16 17 18 19 | 20 21 22 23
// 24 25 26 27 | 28 29 30 31

const imgWidth = 2;
const imgHeight = 4;

const buffer = new Uint8ClampedArray([
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
  16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
]);

test('clip top left quadrant', () => {
  const bytes = clipBytes(buffer, imgWidth, imgHeight, 0, 0, 1, 2);
  expect(bytes).toEqual(
    new Uint8ClampedArray([0,1,2,3,8,9,10,11])
  );
});
