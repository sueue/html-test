// Spring drawing constants for top bar
var springHeight = 22,
    left = 200,
    right = 20,
    maxHeight = 200,
    minHeight = 100,
    over = false,
    move = false;

// Spring simulation constants
var M = 1.5,  // Mass
    K = 0.2,  // Spring constant
    D = 0.22, // Damping
    R = 150;  // Rest position

// Spring simulation variables
var ps = R,   // Position
    vs = 0.0, // Velocity
    as = 0,   // Acceleration
    f = 0;    // Force

function setup() {
  createCanvas(710, 400);
  rectMode(CORNERS);
  noStroke();
  left = width/2 - 100;
  right = width/2 + 100;
}

function draw() {
  background(102);
  updateSpring();
  drawSpring();
}

function drawSpring() {
  // Draw base
  fill(0,230,40);
  var baseWidth = 0.5 * ps + -8;
  rect(width/2 - baseWidth, ps + springHeight, width/2 + baseWidth, height);

  // Set color and draw top bar
  if (over || move) {
    fill(122,234,454);
  } else {
    fill(204,0,0);
  }

  rect(left, ps, right, ps + springHeight);
}

function updateSpring() {
  // Update the spring position
  if ( !move ) {
    f = -K * ( ps - R ); // f=-ky
    as = f / M;          // Set the acceleration, f=ma == a=f/m
    vs = D * (vs + as);  // Set the velocity
    ps = ps + vs;        // Updated position
  }

  if (abs(vs) < 0.1) {
    vs = 0.0;
  }

  // Test if mouse if over the top bar
  if (mouseX > left && mouseX < right && mouseY > ps && mouseY < ps + springHeight) {
    over = true;
  } else {
    over = false;
  }

  // Set and constrain the position of top bar
  if (move) {
    ps = mouseY - springHeight/2;
    ps = constrain(ps, minHeight, maxHeight);
  }
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}
