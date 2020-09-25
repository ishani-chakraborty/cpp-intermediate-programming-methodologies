test('removeBlueAndGreen function definition is correct', function() { 
  const white = lib220.createImage(10, 10, [1,1,1]); 
  let p = removeBlueAndGreen(white).getPixel(0,0);
  // Need to use assert
  // The red channel should be unchanged.
  assert(p[0] === 1);
  // The green channel should be 0.
  assert(p[1] === 0);
  // The blue channel should be 0.
  assert(p[2] === 0);
});

test('No blue or green in removeBlueAndGreen result', function() {
// Create a test image, of size 10 pixels x 10 pixels, and set it to all white. 
const white = lib220.createImage(10, 10, [1,1,1]);
// Get the result of the function.
const shouldBeRed = removeBlueAndGreen(white);
// Read the center pixel.
const pixelValue = shouldBeRed.getPixel(5, 5);
// The red channel should be unchanged.
assert(pixelValue[0] === 1);
// The green channel should be 0.
assert(pixelValue[1] === 0);
// The blue channel should be 0.
assert(pixelValue[2] === 0);
});

let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
function removeBlueAndGreen(img) {
  let imgCopy = img.copy();
  for (let i = 0; i < imgCopy.width; ++i) {
    for (let j = 0; j < imgCopy.height; ++j) {
          let p = imgCopy.getPixel(i, j);
          let r_index = p[0];
          imgCopy.setPixel(i, j, [r_index, 0.0, 0.0]);
        }
  } 
    return imgCopy;
}

 function makeGrayscale(img) {
   let imgCopy = img.copy();
   for (let i = 0; i < img.width; ++i) {
      for (let j = 0; j < img.height; ++j) {
            let p = imgCopy.getPixel(i, j);
            let mean = (p[0] + p[1] + p[2]) / 3;
            imgCopy.setPixel(i, j, [mean, mean, mean]);
      }
    } 
    return imgCopy;
 }

 //imageMap(img: Image, func: (p: Pixel) => Pixel): Image
 function imageMap(img, func) { 
   let imgCopy = img.copy();
    for (let i = 0; i < imgCopy.width; ++i) {
        for (let j = 0; j < imgCopy.height; ++j) {
            let p = imgCopy.getPixel(i, j);
            imgCopy.setPixel(i, j, func(p));
        }
    } 
    return imgCopy;
 }

 function allRed(p) {
   return [p[0], 0.0, 0.0];
 }

 function grayScale(p) {
   let mean = (p[0]+p[1]+p[2])/3;
   return [mean, mean, mean];
 }

 function mapToRed(img) {
    return imageMap(img, allRed);
 }

 function mapToGrayscale(img) {
    return imageMap(img, grayScale);
 }

 mapToRed(robot);
 mapToGrayscale(robot);