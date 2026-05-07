// Exercise 5: Typography !


let signLines = ["", "", "", ""];
let currentLine = 0;
let maxChars = 15;


function preload() {
  font = loadFont("minecraft_font.ttf");
}

const sign_color = "#F7C4B6",
      sign_color2 = "#D2A39D",
      sign_STcolor = "#BA827B",
      
      text_color = "#3E3C3C",
      
      bg_color = "#B7F5EF",
      bg_color2 = "#D0F8BE";


function setup() {
  createCanvas(500, 400);
}


function draw() {
  drawBG();
  //drawGrid();
  
  drawSign();

}


function drawBG() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    
    let BGgradient = lerpColor(bg_color, bg_color2, inter);
    
    stroke(BGgradient);
    line(0, y, width, y);
  }
}


function drawSign() {
  push();
  translate(width / 2, 150);
  
  
  strokeWeight(7);
  
  
  fill(sign_color2);
  stroke(sign_STcolor);  
  rect(-20, 150, 40, 120);

  fill(sign_color);
  stroke(sign_STcolor);
  rect(-210, -85, 420, 250);
  
  stroke(sign_color2);
  strokeWeight(5);

  line(-205, 0, 205, 0);
  line(-205, 80, 205, 80);  
  
  
  fill(text_color);
  noStroke();
  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);
  
  signType();

  pop();
}

function signType() {
  fill(text_color);
noStroke();
textFont(font);
textSize(28);
textAlign(CENTER, CENTER);

for (let i = 0; i < 4; i++) {
  let displayText = signLines[i];

  // blinking cursor only on active line
  if (i === currentLine && frameCount % 60 < 30) {
    displayText += "_";
  }

  text(displayText, 0, -55 + i * 60);
}
}


function keyTyped() {
  if (
    key.length === 1 &&
    keyCode !== ENTER &&
    signLines[currentLine].length < maxChars
  ) {
    signLines[currentLine] += key;
  }

  return false;
}


function keyPressed() {

  // delete text
  if (keyCode === BACKSPACE) {
    signLines[currentLine] =
      signLines[currentLine].slice(0, -1);
  }

  // move down
  if (keyCode === ENTER || keyCode === DOWN_ARROW) {
    if (currentLine < 3) {
      currentLine++;
    }
  }

  // move up
  if (keyCode === UP_ARROW) {
    if (currentLine > 0) {
      currentLine--;
    }
  }
}

// draw grid function made by a p5.js developer~

function drawGrid() {
  stroke(80);
  strokeWeight(0.5);
  for (let x = 0; x <= 500; x += 50) {
    line(x, 0, x, 500);
  }
  for (let y = 0; y <= 500; y += 50) {
    line(0, y, 500, y);
  }

  for (let x = 0; x <= 500; x += 50) {
    for (let y = 0; y <= 500; y += 50) {
      // dot
      fill(120);
      noStroke();
      circle(x, y, 4);

      fill(180);
      noStroke();
      textSize(8);
      textAlign(LEFT);
      text(x + "," + y, x + 3, y - 3);
    }
  }

  noFill();
  stroke(300);
  strokeWeight(1);
  rect(0, 0, 400, 400);
}