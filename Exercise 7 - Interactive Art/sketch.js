// Exercise 7: Interactive Art !
// extension/update of my Exercise 1: Car ! :>
// will reference this later too for my Exercise 10 ..


function setup() {
  createCanvas(400, 400);
}

let carX = 0;
let steeringAngle = 0;
let carBump = 0; // for car bump animation
let lineOffset = 0; // for road animation

      // background & road colors !
const sky_color = "#97DFF6",
      sky_color2 = "#F89B6B",
      sun_color = "#F9F9C4",
        sun_STcolor = "#FBE68C",
      land_color = "#95AB7D",
      road_color = "#7D7B7B",
      roadLine_color = "#E3C446";
      
      // car colors ! (STcolor = stroke)
const car_color = "#F7C4B6",
        car_STcolor = "#BA827B",
      carWindow_color = "#E1FDFF",
        carWindow_STcolor = "#B2B2B2",
      carLights_color = "#FFFFA8",
        carLights_STcolor = "#C2AE74",
      carBumper_color = "#E2DADA",
        carBumper_STcolor = "#BBA4A4",
      carWheels_color = "#3E3C3C",
      carSW_color = "gray";


function draw() {
  drawSky();
  drawSun();
  drawLand();
  drawRoad();
  drawCar();
  
  carX = mouseX - width / 2;
  carX = constrain(carX, -60, 60);
  steeringAngle = map(mouseX, 0, width, -0.9, 0.9);
  
}  

  // --------------- SKY ---------------
function drawSky() {  
  
  // subtle sky gradient !
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    
    let skyGradient = lerpColor(sky_color, sky_color2, inter);
    
    stroke(skyGradient);
    line(0, y, width, y);
    
    // ^ what this is doing is that lines are drawn on every row of pixel on the canvas (row 0 - 399) with each line/stroke being a different color, which - when put all together - represents the gradient.   
  }
}
  
  // --------------- SUN ---------------
function drawSun() {
  
  fill(sun_color);
  stroke(sun_STcolor);
  strokeWeight(6)
  ellipse(200, 190, 200, 200);
}
  
  // --------------- LAND ---------------  
function drawLand() {
  
  fill(land_color);
  noStroke();
  ellipse(width / 2, height + 10, 1000, 450);
}
  
  // --------------- ROAD ---------------  
function drawRoad() {

  fill(road_color);
  noStroke();
  beginShape();
    vertex(20, height);      // bottom left
    vertex(380, height);     // bottom right
    vertex(260, 187);        // top right

    // curved horizon edge
    bezierVertex(
      220, 186,
      180, 186,
      140, 187
    );
  endShape(CLOSE);
  
//  quad(
//    20, height, // bottom left
//    380, height, // bottom right
//    260, 190, // top right
//    140, 190 // top left
//  );
    
  // road lines animation !
  // made with AI assistance + trial & error :p
  stroke(roadLine_color);
  
  let roadTop = 190;  // top & bottom to declare "mask" of the road
  let roadBottom = height; 
  let spacing = 5;
  
  for (let i = 0; i <8; i++) {  // for loop to draw dashed lines
    let y = roadBottom - ((i * spacing + lineOffset) % (roadBottom - roadTop));

    let dashLength = map(y, roadTop, roadBottom, 10, 35);
    let dashThickness = map(y, roadTop, roadBottom, 4, 10);

    strokeWeight(dashThickness);
    
    line(width/2, y, width/2, y + dashLength);
  
    }
  
  lineOffset +=4; // speed of line animation
}
  
  // --------------- CAR ---------------
  // updated/translated points.
function drawCar() {
  push();
  translate(200 + carX, 220);
  
    // simple car animation !!
  carBump = sin(frameCount * 0.25) * 0.7;
  
  
    // wheels
  fill(carWheels_color);
  noStroke();
  rect(-75, 34, 35, 50,
      12);
  rect(40, 34, 35, 50,
      12);
  
    // body
  fill(car_color);
  stroke(car_STcolor);
  strokeWeight(4);
  
    // side mirrors
    rect(-95, -40 + carBump, 25, 30,
        9, 2, 2, 9);  
    rect(70, -40 + carBump, 25, 30,
        2, 9, 9, 2);
  
  rect(-65, -80 + carBump, 130, 100,
      25, 25, 5, 5);
  
    // windows
    push();
    fill(carWindow_color);
    stroke(carWindow_STcolor);
    rect(-53, -70 + carBump, 105, 45, 
        15, 15, 5, 5);
    pop();
    
    push();
    clip(maskSW);
    drawSW();
    pop();
  
    // hood
  rect(-85, -17 + carBump, 170, 80, 
      20, 20, 10, 10); 
    
    // bumper
  fill(carBumper_color);
  stroke(carBumper_STcolor);
  rect(-89.5, 40 + carBump, 178, 25, 
      8);
  
    // lights
  fill(carLights_color);
  stroke(carLights_STcolor)
  rect(-75, -5 + carBump, 40, 30,
      9);
  rect(35, -5 + carBump, 40, 30,
      9);    
  
  pop();
}

function maskSW() {
  rect(-53, -72 + carBump, 105, 45, 
        15, 15, 5, 5);
}

function drawSW() {
  push();

  translate(20, -34); // in car

  rotate(steeringAngle);

  stroke(carSW_color);
  strokeWeight(4);
  noFill();

  ellipse(0, 0, 25);

  line(-10, 0, 10, 0);
  line(0, -10, 0, 10);

  pop();
}