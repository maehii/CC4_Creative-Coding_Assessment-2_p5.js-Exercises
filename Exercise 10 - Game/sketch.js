// Exercise 10: Game !


function setup() {
  createCanvas(400, 500);
  
  carX = width/2;
  carY = height - 100;
}

let carX;
let carY;
let laneOffset = 0;
let lanes = [127, 229]; 

let obstacles = [];
let score = 0; 
let speed = 5;
let gameState = "title"; // "title", "play", "gameover"


      // background & road colors !
const sky_color = "#B7F5EF",
      land_color = "#D0F8BE",
      road_color = "#7D7B7B",
      roadLine_color = "#E3C446",
      
      // car colors ! (STcolor = stroke)
      car_color = "#F7C4B6",
        car_STcolor = "#BA827B",
      carWindow_color = "#E1FDFF",
        carWindow_STcolor = "#B2B2B2",
      carLights_color = "#FFFFA8",
        carLights_STcolor = "#C2AE74",
      carBumper_color = "#E2DADA",
        carBumper_STcolor = "#BBA4A4",
      carWheels_color = "#3E3C3C",

      // obstacle colors
      obstacle_color = "#A72222",
        obstacle_STcolor = "#EC4545",
      
      // text colors
      text_color = "white",
        text_STcolor = "#EBAE99";


function preload() {
  font = loadFont("minecraft_font.ttf")
}


function draw() {
  if (gameState === "title") {
    drawGame_play(true);
    drawGame_title();
    return;
  }

  if (gameState === "gameover") {
    drawGame_play(true);
    drawGame_over();
    return;
  }

  // PLAY STATE
  drawGame_play(false);

  moveCar();
  spwnObstacles();
  updObstacles();
  drawCar();

  bumpObstacles();
  drawScore();

  speed += 0.003;
}



function drawScore() {
  fill(text_color);
  stroke(text_STcolor);
  strokeWeight(5);
  textFont(font);
  textSize(20);
  text("Score: " + score, 20, 30);
}

function drawGame_play(blur) {
  push();

  if (blur) {
    drawingContext.filter = "blur(3px)";
  }

  drawBG();
  drawRoad();

  drawingContext.filter = "none";
  pop();
}

function mousePressed() {
  if (gameState === "title") {
    gameState = "play";
  }

  if (gameState === "gameover") {
    resetGame();
    gameState = "play";
  }
}

function drawGame_title() {
  push();
    fill(text_color);
    textFont(font);
    textSize(40);
    stroke(text_STcolor);
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    text("CAR GAME", width / 2, height / 2 - 50);

    textSize(18);
    text("click anywhere to start !", width / 2, height / 2 + 20);
  pop();
}

function drawGame_over(){
  push();
    fill(167, 0, 0, 130);
    rect(0, 0, width, height);

    fill(text_color);
    textAlign(CENTER, CENTER);
    textSize(40);
    stroke(text_STcolor);
    strokeWeight(4);
    text("You Died!", width / 2, height / 2 - 100);

    textSize(20);
    text("Score: " + score, width / 2, height / 2 + 20);
    text("click anywhere to restart ~", width / 2, height / 2 + 60);
  pop();
}

function resetGame() {
  carX = width / 2;
  obstacles = [];
  score = 0;
  speed = 5
  laneOffset = 0;
}

function drawBG() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    
    let skyGradient = lerpColor(sky_color, land_color, inter);
    
    stroke(skyGradient);
    line(0, y, width, y);
  }
}

function drawRoad() {
  fill(road_color);
  noStroke();
  rect(90, 0, 220, 500)
  
  stroke(roadLine_color);
  strokeWeight(6);

  let spacing = 80; // distance between dashes
  let dashHeight = 30;

  for (let y = -50; y < height + 50; y += spacing) {
    rect(width / 2 - 3, y + laneOffset, 6, dashHeight);
  }

  laneOffset += 4;

  if (laneOffset >= spacing) {
    laneOffset = 0;
  }
  
}

function car_hitbox() {
  return {
    x: carX - 30,
    y: 340,
    w: 60,
    h: 75
  };
}

function drawCar() {
  push();
  translate(0 + carX, 340);
  
  // wheels
  fill(carWheels_color);
  noStroke();
  rect(-30, 15, 15, 15,
      3);
  rect(15, 15, 15, 15,
      3);
  rect(-30, 45, 15, 15,
      3);
  rect(15, 45, 15, 15,
      3);
  
  // bumper
  fill(carBumper_color);
  stroke(carBumper_STcolor);
  strokeWeight(4);
  
  rect(-24, 0, 48, 72,
      10);
  
  // lights
  fill(carLights_color);
  stroke(carLights_STcolor);
  strokeWeight(3);
  rect(-16, -3, 10, 7,
      2);
  rect(7, -3, 10, 7,
      2);
  rect(-16, 68, 10, 7,
      2);
  rect(7, 68, 10, 7,
      2);
  
  // body
  fill(car_color);
  stroke(car_STcolor);
  strokeWeight(4)
  rect(-22, 2, 44, 68,
      10);
  rect(-30, 23, 15, 10,
      3);
  rect(15, 23, 15, 10,
      3);
  rect(-20, 14, 40, 45,
      10);
  
  // windows
  fill(carWindow_color);
  stroke(carWindow_STcolor);
  strokeWeight(3);
  rect(-15, 19, 30, 7,
      2);
  rect(-13, 50, 26, 4, 1);
  
  
  pop();
  
  // hitbox indicator (for debugging)
  // let car = car_hitbox();
  // noFill();
  // stroke("lime");
  // rect(car.x, car.y, car.w, car.h);
}

function moveCar() {
  if (keyIsDown(LEFT_ARROW)) {
    carX -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    carX += 5;
  }

  // keep on road
  carX = constrain(carX, 140, width - 140);
}


function spwnObstacles() {
  if (frameCount % 60 === 0) {
    obstacles.push({
      x: random(lanes),
      y: -60,
      w: 45,
      h: 55,
      scored: false
    });
  }
} 

function updObstacles() {
  for (let obs of obstacles) {
    obs.y += speed;

    // DRAW obstacle 
    fill(obstacle_color);
    stroke(obstacle_STcolor);
    strokeWeight(5);
    rect(obs.x, obs.y, obs.w, obs.h);
    
    // hitbox indicator (for debugging)
    // stroke("yellow");
    // noFill();
    // rect(obs.x, obs.y, obs.w, obs.h);

    //
    if (!obs.scored && obs.y > 340) {
      score++;
      obs.scored = true;
    }
  }

  // remove offscreen
  obstacles = obstacles.filter(obs => obs.y < height + 100);
}

function bumpObstacles() {
  let car = car_hitbox();

  for (let obs of obstacles) {

    if (
      car.x < obs.x + obs.w &&
      car.x + car.w > obs.x &&
      car.y < obs.y + obs.h &&
      car.y + car.h > obs.y
    ) {
      gameState = "gameover";
    }
  }
}



