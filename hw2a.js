test('imageMapXY function definition is correct', function() {
    let identityFunction = function(image, x, y) {
    return image.getPixel(x, y);
    };
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
        if (Math.abs(p1[i] - p2[i]) > epsilon) {
            return false;
        }
    }
    return true;
};

test('identity function with imageMapXY', function() {
    let identityFunction = function(image, x, y ) {
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

//imageMapXY(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image
function imageMapXY(img, func) {
  let imgCopy = img.copy();
  let newCopy = img.copy();
  for (let i = 0; i < imgCopy.width; ++i) {
       for (let j = 0; j < imgCopy.height; ++j) {
            imgCopy.setPixel(i, j, func(newCopy, i, j));
       }
  } 
    return imgCopy;
}

//imageMask(img: Image, func: (img: Image, x: number, y: number) => boolean, maskValue: Pixel): Image
function imageMask(img, func, maskValue) {
  function helper(img, x, y) {
    if(func(img, x, y)) {
      return maskValue;
    } else {
      return img.getPixel(x, y);
    }
  }
  return imageMapXY(img, helper);
}

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

//blurImage(img: Image): Image
function blurImage(img) {
  return imageMapXY(img, blurPixel);
}

let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
let robot = lib220.loadImageFromURL(url);
imageMask(robot, function(img, x, y) {
return (y % 10 === 0);}, [1, 0, 0]).show();