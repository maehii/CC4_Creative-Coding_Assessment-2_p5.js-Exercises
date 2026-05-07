// Exercise 2: Alien !
// AMOGUS IS AN ALIEN


let stars = []; // for BG (random star generation)

// for crewmate float
let xPos = -100; // ensures the crewmate enters from off-screen
let angle = 0;

// colors
const space_color = "black",
      star_color = "white";

const cm_color = "#F21A1A",
      cm_color2 = "#A2172A",
        STcolor = "#0D0D0D",
      cmVisor_color = "#67C1D9",
      cmVisor_color2 = "#45717D";


function draw() {
  background(space_color);

  drawStars();
  drawText();
  
  floatCrewmate();
  drawCrewmate(xPos, height / 2, angle);
}


// --------------- CANVAS/BG ---------------
function setup() {
  createCanvas(400, 400);
  
  // stars pt. 1
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(1, 3)});
  }
}

// stars pt. 2
function drawStars() {  
  noStroke();
  fill(star_color);
  
  for (let s of stars) {
    ellipse(s.x, s.y, s.r);
  }

}


// --------------- CREWMATE ---------------
function floatCrewmate() {  // crewmate float animation !
  
  xPos += 2;  // updates horizontal position to move the CM from left to right; speed of animation
  angle += 0.03;  // updates angle to rotate CM clockwise; speed of rotation

  if (xPos > width + 100) {
    xPos = -100;  // resets/loops the animation when the CM fully exits to the right
  }
} 

function drawCrewmate(x, y, angle) {
  push();
  translate(x, y); // moves origin to CM so that it's drawn on its own point of origin & spins around itself
  rotate(angle);
  
  // body + "backpack"
  fill(cm_color2);
  stroke(STcolor);
  strokeWeight(4);
  
  rect(-30, -20, 40, 40, 8); 
    push();
    fill(cm_color);
    noStroke();
    rect(-26, -17, 40, 8, 3)
    pop();
  
  //backpack
  rect(2, 5, 15, 30, 6);
  rect(-18, 5, 15, 30, 6);
  rect(-20, -30, 40, 55, 23);
  
  fill(cm_color);
  noStroke();
  rect(-13, -27, 30, 43, 23, 23, 13);
  
  
  // visor
  fill(cmVisor_color2);
  stroke(STcolor);
  strokeWeight(4);
  rect(-9, -20, 33, 23, 25);

  fill(cmVisor_color);
  noStroke();
  rect(-3, -17, 25, 15, 25);
  
  fill("white");
  noStroke();
  rect(3, -14, 16, 5, 25);

}


function drawText() {
  fill("white");
  textAlign(CENTER);
  textSize(15);
  text("amogus was an Imposter.", width/2, height/2);
}