let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

//makeGrayscale(img: Image): Image
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

//imageMap(img: Image): Image
function highlightEdges(img) {
   let imgCopy = makeGrayscale(img).copy();
   for (let i = 0; i < imgCopy.width; ++i) {
      for (let j = 0; j < imgCopy.height; ++j) {
            if (i === imgCopy.width - 1) {
              imgCopy.setPixel(i, j, imgCopy.getPixel(i - 1, j));
            } else {
            let p1 = imgCopy.getPixel(i, j);
            let p2 = imgCopy.getPixel(i+1, j);
            imgCopy.setPixel(i, j, [Math.abs(p1[0]-p2[0]), Math.abs(p1[1]-p2[1]), Math.abs(p1[2]-p2[2])]);
            }
      }
    } 
    return imgCopy;
 }

//getMean(p: Pixel): number
function getMean(p) {
    let avg = 0;
    for(let i = 0; i < p.length; ++i){
        avg += p[i];
    }
      avg /= p.length;
      return avg;
 }

 //pixelAvg(img: Img, xa: number, xb: number, ya: number, yb: number ): number[]
 function pixelAvg(img, xa, xb, ya, yb){
    let r = [];
    let g = [];
    let b = [];
    for(let x = xa; x < xb; ++x){
         for(let y = ya; y < yb; ++y){
           let curr = img.getPixel(x,y);
           r.push(curr[0]);
           g.push(curr[1]);
           b.push(curr[2]);
         }
    }
   return [getMean(r),getMean(g),getMean(b)];
 }
//blur(img: Image): Image
 function blur(img){
    if((img.height === 0) || (img.width === 0)) {
      return img.copy();
    }

    let imgCopy = img.copy();
    let w = imgCopy.width;
    let h = imgCopy.height;
    for(let i = 0; i < w; ++i){
        for(let j = 0; j < h; ++j){
         let mean = [0,0,0];
         if(i === 0){
            if (j === 0) {
                mean = pixelAvg(img,i,i+2,j,j+2);
            } else if (j === h - 1) {
                mean = pixelAvg(img,i,i+2,j-1,j+1);
            } else {
                mean = pixelAvg(img,i,i+2,j-1,j+2);
            }
        } else if(i === w - 1){
            if (j === 0) {
              mean = pixelAvg(img,i-1,i+1,j,j+2);
            } else if (j === h - 1) {
              mean = pixelAvg(img,i-1,i+1,j-1,j+1);
            } else{
              mean = pixelAvg(img,i-1,i+1,j-1,j+2);
            }
        } else if (j === 0) {
              mean = pixelAvg(img,i-1,i+2,j,j+2);
        } else if (j === h - 1) {
              mean = pixelAvg(img,i-1,i+2,j-1,j+1);
        } else { 
              mean = pixelAvg(img,i-1,i+2,j-1,j+2);
     } 
       imgCopy.setPixel(i, j, mean);
     }
   }
   return imgCopy;
 }

//swapRB(img: Image): Image
function swapRB(img) { 
  return imageMap(img, sRB);
}

//shiftRGB(img: Image): Image
function shiftRGB(img) {
  return imageMap(img, sRGB);
}

//sRB(p: Pixel): number[]
function sRB(p) {
  return [p[2], p[1], p[0]];
}

//sRGB(p: Pixel): number[]
function sRGB(p) {
  return [p[1], p[2], p[0]];
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

highlightEdges(robot);
blur(robot);
swapRB(robot);
shiftRGB(robot);

