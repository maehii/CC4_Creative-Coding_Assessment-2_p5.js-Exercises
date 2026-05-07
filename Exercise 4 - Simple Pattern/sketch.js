// Exercise 4: Simple Pattern


let petals = [];
let sakura = [];

const sakura_color = "#F6D9D9",
      sakura_color2 = "#F7C4C4",
        sakura_STcolor = "#CA8F87",
      sakuraCenter_color = "#F9F9C4",
        sakuraCenter_STcolor = "#DBBEA4",
      
      grass_color = "#E9F4C0",
      grass_color2 = "#9CC275";


function setup() {
  createCanvas(500, 500);
  background(grass_color);
  
  for (let i = 0; i < 100; i++) {
    petals.push({
      x: random(width),
      y: random(height),
      size: random(15, 40),
      rotation: random(TWO_PI)
    });
  }
  
  for (let i = 0; i < 4; i++) {
    sakura.push({
      x: random(60, width - 60),
      y: random(60, height - 60),
      size: random(25, 45)
    });
  }
}


function draw() {
  drawBG();
  
  drawPetalS();
  
  for (let s of sakura) {
    drawSakura(s.x, s.y, s.size);
  }
}


function drawBG() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    
    let BGgradient = lerpColor(grass_color, grass_color2, inter);
    
    stroke(BGgradient);
    line(0, y, width, y);
  }
}

function drawPetal(x, y, size) {
  push();
  translate(x, y);

  fill(sakura_color);
  stroke(sakura_STcolor);
  strokeWeight(3);

    beginShape();

    // Bottom tip
    vertex(0, size);

    // Left side up
    bezierVertex(
      -size * 0.8, size * 0.5,
      -size * 0.8, -size * 0.3,
      -size * 0.15, -size * 0.8
    );

    // Top notch dip
    vertex(0, -size * 0.6);

    // Right top lobe
    vertex(size * 0.15, -size * 0.8);

    // Right side down
    bezierVertex(
      size * 0.8, -size * 0.3,
      size * 0.8, size * 0.5,
      0, size
    );
    endShape(CLOSE);
 
  fill(sakura_color2);
  noStroke();
  ellipse(0, size * 0.40, 25, size);
  
  fill(sakura_STcolor);
  noStroke();
  ellipse(0, size * 0.6, 3, size * 0.8);
  
  pop();
 
}

function drawPetalS() {

  for (let p of petals) {

    push();

    translate(p.x, p.y);
    rotate(p.rotation);

    drawPetal(0, 0, p.size);

    pop();
  }
}


function drawSakura(x, y, size) {
  push(); 
  translate(x,y);
  
    for (let i = 0; i <5; i++) {
      push();

      rotate((TWO_PI/5 * i));

      drawPetal(0, -size, size);
      
      pop();
    }
  
  // sakura center
  stroke(sakuraCenter_STcolor);
  strokeWeight(3)
  fill(sakuraCenter_color);
  ellipse(0, 0, size * 0.4);
  
  
  pop();
}