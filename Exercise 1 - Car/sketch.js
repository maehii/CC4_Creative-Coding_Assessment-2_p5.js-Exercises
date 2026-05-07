// Exercise 1: Car !


function setup() {
  createCanvas(400, 400);
}

let lineOffset = 0; // for road animation
let carBump = 0; // for car bump animation

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
      carWheels_color = "#3E3C3C";


function draw() {
  drawSky();
  drawSun();
  drawLand();
  drawRoad();
  drawCar();
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
  ellipse(width / 2, height + 10, 800, 450);
}
  
  // --------------- ROAD ---------------  
function drawRoad() {

  fill(road_color);
  noStroke();
  quad(
    30, height, // bottom left
    370, height, // bottom right
    240, 190, // top right
    160, 190 // top left
  );
    
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
function drawCar() {

    // simple car animation !!
  carBump = sin(frameCount * 0.25) * 0.7;
  
  
    // wheels
  fill(carWheels_color);
  noStroke();
  rect(125, 254, 35, 50,
      12);
  rect(240, 254, 35, 50,
      12);
  
    // body
  fill(car_color);
  stroke(car_STcolor);
  strokeWeight(4);
  
    // side mirrors
    rect(105, 180 + carBump, 25, 30,
        9, 2, 2, 9);  
    rect(270, 180 + carBump, 25, 30,
        2, 9, 9, 2);
  
  rect(135, 140 + carBump, 130, 100, 
      25, 25, 5, 5);
  
    // windows
    push();
    fill(carWindow_color);
    stroke(carWindow_STcolor);
    rect(147, 150 + carBump, 105, 45, 
        15, 15, 5, 5);
    pop();
  
    // hood
  rect(115, 203 + carBump, 170, 80, 
      20, 20, 10, 10); 
    
    // bumper
  fill(carBumper_color);
  stroke(carBumper_STcolor);
  rect(110.5, 260 + carBump, 178, 25, 
      8);
  
    // lights
  fill(carLights_color);
  stroke(carLights_STcolor)
  rect(125, 215 + carBump, 40, 30,
      9);
  rect(235, 215 + carBump, 40, 30,
      9);    
}