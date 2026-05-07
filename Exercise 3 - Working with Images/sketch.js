// Exercise 3: Working with Images !


let font, img, x, y;

function preload() {
  img = loadImage("oshawott heh.jpg")
  font = loadFont("Gaegu-Regular.ttf"); 
}

function setup() {
  createCanvas(450, 450)
  noStroke();
  
  clip(mask);

  fill("white");
  textFont(font);
  textSize(25);
  textAlign(CENTER);
  text("OSHAWASHAWASHAWOTT", width/2, 250);
}

function draw() {
  // sped up "watercolor" effect
  for (let i = 0; i < 20; i++) {
    x = random(width);
    y = random(height);

    let paint = img.get(x, y);
    fill(paint[0], paint[1], paint[2], 50);
    ellipse(x, y, random(3, 15));
    }
}


// CRAAAZZYYY heart mask
// was made w the assistance of AI and a lotta trial n error xox

function mask() { 
  let cx = width / 2;
  let cy = height / 2 - 40;
  let s = 180; // scale
  let sx = 1; // scale width

  noStroke();

  beginShape();

  // start bottom center
  vertex(cx, cy + s * 1.2);

  // left bottom curve
  bezierVertex(
    cx - s * 0.4 * sx, cy + s * 1.1,
    cx - s * 0.9 * sx, cy + s * 0.6,
    cx - s * sx, cy + s * 0.2
  );

  // left lobe
  bezierVertex(
    cx - s * 1.3 * sx, cy - s * 0.3,
    cx - s * 0.7 * sx, cy - s * 1.2,
    cx, cy - s * 0.4
  );

  // right lobe
  bezierVertex(
    cx + s * 0.7 * sx, cy - s * 1.2,
    cx + s * 1.3 * sx, cy - s * 0.3,
    cx + s * sx, cy + s * 0.2
  );

  // right bottom curve
  bezierVertex(
    cx + s * 0.9 * sx, cy + s * 0.6,
    cx + s * 0.4 * sx, cy + s * 1.1,
    cx, cy + s * 1.2
  );

  endShape(CLOSE);
}