// Exercise 8: Audio Visualization


let maehii = []; 
let bg = [];
let mic, sound; 

function preload() {
  maehii[0] = loadImage("maehii_1a.png");
  maehii[1] = loadImage("maehii_1b.png");
  maehii[2] = loadImage("maehii_2.png");
  bg[0] = loadImage("square_fieldbg1.png");
  bg[1] = loadImage("square_fieldbg2.png");
}

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
}

function drawBG() {
  let currentBG;
  
  if (frameCount % 120 > 60) {
    currentBG = bg[0];
  } else {
    currentBG = bg[1];
  }
  
  image(currentBG, width / 2, height / 2, width, height);
}

function draw() {
  drawBG(); 

  sound = mic.getLevel();

  let currentImage;

  if (sound > 0.01) {  // may be adjusted!
    currentImage = maehii[2];
} else if (frameCount % 180 > 170) {
  currentImage = maehii[1]; // simple blink animation
} else {
  currentImage = maehii[0];
}

  imageMode(CENTER);
  image(currentImage, width / 2, height / 2, 350, 350);

  fill("white");
  text("mic level: " + nf(sound, 1, 3), 20, 20);
}