// Grid/Graph representation
var grid;

function setup() {
  createCanvas(400,400);
  grid = new Grid(width, height, 40);  
}

function draw() {
  background(0);
  grid.step();
  grid.show();
}

// Mouse press updates the square by adding wall, setting start or goal node
function mousePressed() {
  grid.update(mouseX,mouseY);
}

// choose either what is the effect of the mouse click or starts the solve process
// cheat sheet: UP_ARROW: sets next node clicked to goal
//              DOWN_ARROW: sets nexts node clicked to start 
//              LEFT_ARROW: resets clicks to set walls
//              S: starts the solving process
//              T: steps through the search algorithm
//              A: allows nodes to be set again
function keyPressed() {
  grid.setMode(keyCode);
  if (keyCode == 83) grid.solve();
  if (keyCode == 84) grid.step();  // t
  if (keyCode == 65) grid.solving = false;  //a
  
}

