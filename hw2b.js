let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg'; 
let robot = lib220.loadImageFromURL(url);

test('imageMapXY function definition is correct', function() { let identityFunction = function(image, x, y) {
return image.getPixel(x, y); };
let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
let outputImage = imageMapXY(inputImage, identityFunction);
// Output should be an image, so getPixel must work without errors. 
let p = outputImage.getPixel(0, 0);
assert(p[0] === 0);
assert(p[1] === 0);
assert(p[2] === 0);
assert(inputImage !== outputImage);
});

function pixelEq (p1, p2) { 
    const epsilon = 0.002;
    for (let i = 0; i < 3; ++i) {
         if(Math.abs(p1[i] - p2[i]) > epsilon) {
            return false;
         }
    }
    return true;
 };

test('identity function with imageMapXY', function() {
let identityFunction = function(image, x, y) {
   return image.getPixel(x, y);
};
let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
    inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
    inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]); 
    inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
let outputImage = imageMapXY(inputImage, identityFunction); 
    assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5])); 
    assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3])); 
    assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8])); 
    assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('blurHalfImage when conditions are not met, false', function() {
let inputImage = lib220.createImage(17, 17, [0.2, 0.2, 0.2]);
    inputImage.setPixel(0, 0, [0.5, 0.4, 0.3]);
    inputImage.setPixel(8, 8, [0.3, 0.64, 0.36]);
    inputImage.setPixel(8, 7, [0.5, 0.3, 0.1]);
    inputImage.setPixel(7, 7, [0.4, 0.3, 0.6]);
    inputImage.setPixel(16, 6, [0.6, 0.8, 0.7]);
    inputImage.setPixel(16, 16, [0.9, 0.1, 0.5]);
    let outputImage = blurHalfImage(inputImage, false);
    let b = blurImage(inputImage);
    //checks if left side of img (x < img.width/2) is blurred)
    assert(pixelEq(outputImage.getPixel(0, 0), b.getPixel(0, 0))); 
    assert(pixelEq(outputImage.getPixel(8, 7), b.getPixel(8, 7))); 
    //checks if x === img.width/2 - 1 is blurred
    assert(pixelEq(outputImage.getPixel(7, 7), b.getPixel(7, 7))); 
    //checks if x === img.width/2 is not blurred
    assert(pixelEq(outputImage.getPixel(8, 7), [0.5, 0.3, 0.1])); 
    //checks if right side of img (x > img.width/2) remains untouched
    assert(pixelEq(outputImage.getPixel(16, 16), [0.9, 0.1, 0.5])); 
    assert(pixelEq(outputImage.getPixel(16, 6), [0.6, 0.8, 0.7])); 
});

test('identity function with isGrayish', function() {
  //checks when condition is met within bounds 
  let p1 = [0.5, 0.7, 0.3];
  assert(isGrayish(p1));
  //checks when at least one color parameter exceeds bounds
  let p2 = [0.1, 0.7, 0.3];
  assert(!isGrayish(p2));
});

test('toGrayscale when isGrayish(p: Pixel): boolean is true', function() {
    let inputImage = lib220.createImage(17, 17, [0.2, 0.2, 0.2]);
    inputImage.setPixel(0, 0, [0.5, 0.4, 0.3]);
    inputImage.setPixel(8, 8, [0.3, 0.64, 0.36]);
    inputImage.setPixel(8, 7, [0.5, 0.3, 0.1]);
    inputImage.setPixel(16, 16, [0.9, 0.1, 0.5]);
    let outputImage = toGrayscale(inputImage);
    //changes pixels to gray when isGrayish is true
    assert(pixelEq(outputImage.getPixel(0, 0), [0.4, 0.4, 0.4])); 
    //assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3])); 
    assert(pixelEq(outputImage.getPixel(2, 8), [0.33333, 0.33333, 0.33333])); 
    //assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
    //if isGrayish is false, then pixel isn't modified to gray
    assert(pixelEq(outputImage.getPixel(4, 9), [0.2, 0.2, 0.2])); 
    assert(pixelEq(outputImage.getPixel(15, 10), [0.1, 0.9, 0.8])); 
    assert(pixelEq(outputImage.getPixel(12, 3), [0.1, 0.8, 0.8])); 
});

test('grayHalfImage for 1x1 image edge case', function() {
  let inputImage = lib220.createImage(1, 1, [0.0, 0.0, 0.0]);
  let outputImage = grayHalfImage(inputImage);
  // Output should be an image, so getPixel must work without errors. 
  let p = outputImage.getPixel(0, 0);
  assert(p[0] === 0);
  assert(p[1] === 0);
  assert(p[2] === 0);
  assert(inputImage !== outputImage);
});

test('grayHalfImage within correct conditions and bounds', function() {
    let inputImage = lib220.createImage(17, 17, [0.2, 0.2, 0.2]);
    inputImage.setPixel(0, 0, [0.5, 0.4, 0.3]);
    inputImage.setPixel(8, 5, [0.5, 0.3, 0.1]);
    inputImage.setPixel(7, 5, [0.3, 0.3, 0.5]);
    inputImage.setPixel(12, 9, [0.6, 0.6, 0.6]);
    inputImage.setPixel(16, 16, [0.5, 0.4, 0.5]);
    let outputImage = grayHalfImage(inputImage);
    //checks if left side of the image is gray
    assert(pixelEq(outputImage.getPixel(16, 16), [0.4, 0.4, 0.4])); 
    assert(pixelEq(outputImage.getPixel(12, 9), [0.6, 0.6, 0.6])); 
    //checks when x === img.width/2 is gray
    assert(pixelEq(outputImage.getPixel(8,5), [0.33333, 0.33333, 0.33333]));
    //checks when x === img.width/2-1 is gray
    assert(pixelEq(outputImage.getPixel(7,5), [0.36667, 0.36667, 0.36667]));
    //assert(pixelEq(outputImage.getPixel(12, 9), [0.2, 0.2, 0.2]));
    //checks if left side of image (x > img.width/2) is not gray
    assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.4, 0.3])); 
    assert(pixelEq(outputImage.getPixel(16, 6), [0.5, 0.4, 0.5])); 
});

 //imageMapXY(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image
 function imageMapXY(img, f){
   let imgCopy = img.copy();
   let newCopy = img.copy();
   for(let i = 0; i < imgCopy.width; ++i){
        for(let j = 0; j < imgCopy.height; ++j){
            imgCopy.setPixel(i, j, f(newCopy, i, j));
        }
   }
   return imgCopy;
 }

imageMapXY(robot, function(img, x, y) {
const c = img.getPixel(x, y);
return [c[0], 0, 0]; }).show();

//blurPixel(img: Image, x: number, y: number): Pixel
function blurPixel(img, x, y) {
  let neighbors = [[x, y], [x+1, y], [x-1, y], [x, y+1], [x, y-1], [x+1, y+1], [x-1, y-1], [x+1, y-1], [x-1, y+1]];
  let values = [];
  for (let i = 0; i < neighbors.length; ++i) {
      let curr = neighbors[i];
      if(curr[0] >= 0 && curr[1] >= 0 && 
         curr[0] < img.width && curr[1] < img.height) {
         values.push(curr);
      }
  } 
  let pixel = [];
  let r = 0;
  let g = 0;
  let b = 0;
  for (let j = 0; j < values.length; ++j) {
      let p = img.getPixel(values[j][0], values[j][1]);
      r += p[0];
      g += p[1];
      b += p[2];
  } 
  pixel = [r / values.length, g / values.length, b / values.length];
  return pixel;
}

//blurHalfImage(img: Image, right: boolean): Image
function blurHalfImage(img, right) {
    if(img.height === 0 || img.width === 0 || img.height === 1) {
       return img.copy();
    }
    let b = blurImage(robot);
    if(right) {
       return imageMapXY(img, function(img, x, y){
          if(x >= img.width / 2) {
             return b.getPixel(x, y);
          } else {
             return img.getPixel(x, y);
          }
       });
    } else {
      return imageMapXY(img, function(img, x, y){
          if(x < img.width / 2) {
             return b.getPixel(x, y);
          } else {
             return img.getPixel(x, y);
          }
       });
    }
}

//blurImage(img: Image): Image
function blurImage(img){
    return imageMapXY(img, blurPixel);
}
blurImage(robot).show();

//isGrayish(p: Pixel): boolean
function isGrayish(p){
  return p.every(x => x >= 0.3 && x <= 0.7);
}

//grayScale(p: Pixel): Pixel
function grayScale(p) {
   let mean = (p[0]+p[1]+p[2]) / 3;
   return [mean, mean, mean];
}

//grayScale(img: Image, x: number, y: number): Pixel
function grayScaleImage(img, x, y) {
   let p = img.getPixel(x, y);
   let mean = (p[0]+p[1]+p[2]) / 3;
   return [mean, mean, mean];
}

//grayHalfImage(img: Image): Image
function grayHalfImage(img) {
    if(img.height === 0 || img.width === 0 || img.height === 1) {
       return img.copy();
    }
    return imageMapXY(img, function(img, x, y) {
       if(x >= img.width / 2) {
          return grayScaleImage(img, x, y);
       } else {
         return img.getPixel(x, y);
       }
    });
}

//toGrayscale(img: Image): Image
function toGrayscale(img){
   function pixelized(img, x, y) {
      let p = img.getPixel(x, y);
      if(isGrayish(p)) {
         p = grayScaleImage(img, x, y);
      }
      return p;
   }
   return imageMapXY(img, pixelized);
}
toGrayscale(robot).show();

//saturate(p: Pixel): Pixel
function saturate(p){
  if(p[0] > 0.7) {
    p[0] = 1.0;
  }
  if(p[1] > 0.7){
    p[1] = 1.0;
  }
  if(p[2] > 0.7){
    p[2] = 1.0;
  }
  return p;
}

//blacken(p: Pixel): Pixel
function blacken(p){
  if(p[0] < 0.3){
    p[0] = 0.0;
  }
  if(p[1] < 0.3){
    p[1] = 0.0;
  }
  if(p[2] < 0.3){
    p[2] = 0.0;
  }
  return p;
}

//saturateHigh(img: Image): Image
function saturateHigh(img){
  function helper(img, x, y){
    if(!(isGrayish(img.getPixel(x,y)))){
      return saturate(img.getPixel(x,y));
    } else {
      return img.getPixel(x,y);
    }
  }
  return imageMapXY(img, helper);
}

//blackenLow(img: Image): Image
function blackenLow(img){
  function helper(img, x, y){
    if(!(isGrayish(img.getPixel(x,y)))){
      return blacken(img.getPixel(x,y));
  } else {
    return img.getPixel(x,y);
  }
}
return imageMapXY(img, helper);

}
saturateHigh(robot).show();
blackenLow(robot).show();

//reduceFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
function reduceFunctions(f){
    function helper(p, func) {
      return func(p);
    }
    return p => f.reduce(helper, p);
}

//toGrayscalePixel(p: Pixel): Pixel
function toGrayscalePixel(p) {
  return isGrayish(p) ? grayScale(p) : p;
}

//blackenLowPixel(p: Pixel): Pixel
function blackenLowPixel(p) {
  return p.map(x => x < 0.3 ? 0.0 : x);
}

//saturateHighPixel(p: Pixel): Pixel
function saturateHighPixel(p) {
  return p.map(x => x > 0.7 ? 1.0 : x);
}

//colorize(img: Image): Image
function colorize(img){
  let functions = reduceFunctions([toGrayscalePixel, blackenLowPixel, saturateHighPixel]);
  function helper(img, x, y) {
    return functions(img.getPixel(x, y));
  }
  return imageMapXY(img, helper);
}



