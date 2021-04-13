/*
/  class that stores information about a node and all information necessary for visual representation
/  data: x: x coordinate of the upper left corner of the node
/        y: y coordinate of the upper left corner of the node
/        sideLength: side length of the square representing the node
/        goal: boolean that indicates if the node is the goal node
/        start: boolean that indicates if the node is the start node
/        wall: boolean that indicates if the node is a wall (not part of the graph)
/        explored: boolean that indicates if the node has been explored 
/        current: boolean that indicates if the node is the currently explored path
/        neighbours: array of adjacent nodes
*/
class Node{
  
  /*
  /  PARAMETERS: x and y: coordinates of the node
  /              s: side length of the square
  /  EFFECTS: initializes data variables
  /           default values: 
  /           x, y, and sideLength: set according to parameters
  /           goal, start, wall, explored, current: all set to false
  */
   constructor(x, y, s) {
     this.x = x;
     this.y = y;
     this.sideLength = s;
     this.goal = false;
     this.start = false;
     this.wall = false;
     this.explored = false;
     this.current = false;
   }
  
  /*
  /  EFFECTS: shows node as a colored square depending on the status of the node
  /           white: unexplored node
  /           black: wall 
  /           green: start node
  /           red: goal node
  /           blue: path being currently explored
  /           grey: node already explored
  */
  show() {
    strokeWeight(1);
    if (this.goal) fill (255, 0, 0);
    else if (this.start) fill (0, 255, 0);
    else if (this.wall) fill(0);
    else if (this.current) fill(0, 0, 255);
    else if (this.explored) fill(200);
    else fill(255);
    square(this.x, this.y, this.sideLength);
  }
  
  /*
  /  PARAMETERS: clickMode: integer value that indicates what the node is being updated to
  /  EFFECTS: update the properties of the node according to clickMode            
  /           0: set/unset wall
  /           1: set/unset goal node
  /           2: set/unset start node
  */
  updateClick(clickMode) {
    if (clickMode == 0) 
      this.wall = !this.wall;
    else if (clickMode == 1) 
      this.goal = !this.goal;
    else if (clickMode == 2)
      this.start = !this.start;
    this.disableOthers(clickMode);
  }
  
  /*
  /  PARAMETERS: clickMode: which mode the node is being set to
  /  EFFECTS: sets all other setable properties (wall, goal, start) to false except the property set by clickMode
  */
  disableOthers(clickMode) {
    if (clickMode != 0) this.wall = false;
    if (clickMode != 1) this.goal = false;
    if (clickMode != 2) this.start = false;
  }
  
  setExplored() {
    this.explored = true;
  }

  setCurrent() {
    this.current = true;
  }

  disableCurrent() {
    this.current = false;
  }

  setNeighbours(neighbours) {
    this.neighbours = neighbours;
  }
}