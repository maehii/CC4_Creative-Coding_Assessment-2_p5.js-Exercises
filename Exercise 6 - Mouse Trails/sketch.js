// Exercise 6: Mouse Trails !


let trail = [];
let gif; 


function preload() {
  gif = loadImage("buni bounce.gif");
}

function setup() {
  createCanvas(windowHeight, windowWidth);  // sets the entire window as the canvas
}


function draw() {
  clear();  // sets clear background!

  trail.push({
    x: mouseX,
    y: mouseY
  });
  
  if (trail.length > 40) {
    trail.shift();
  }
  
  for (let i = 0; i < trail.length; i++) {
  let t = trail[i];

  // fade older images
  let alpha = map(i, 0, trail.length - 1, 20, 255);

  // shrink older images
  let size = map(i, 0, trail.length - 1, 10, 30);

  tint(255, alpha);

  imageMode(CENTER);
  image(gif, t.x, t.y, size, size);
}

noTint();
  
}