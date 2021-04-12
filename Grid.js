/* 
/  main class that stores all info about the grid and graph
/  data:  sideLength:  length of the side of the square (node) on the view
/         x: number of squares (nodes) on the x axis direction
/         y: number of squares (nodes) on the y axis direction
/         
/         clickMode: integer that represents what the next click will set 
/                    0: will set the next node to a wall
/                    1: will set the next node to goal
/                    2: will set the next node to start
/ 
/        goal: stores the coordinates of the goal node 
/              [-1,-1] represents the case in which goal node is not yet set
/        start: stores the coordinates of the start node
/               [-1,-1] represents the case in which the start node is not yet set
/
/        cells: matrix that stores the information about each node
/        
/        graph: stores the graph representation of the grid
/        solving: boolean that informs if the graph is being solved
*/

class Grid {
  
  /*
  /  PARAMETERS: s: sideLength value
  /              w: width of the window
  /              h: height of the window
  /  EFFECTS: initializes all data variables except graph. 
  /           the default values for each is:
  /           s, x, and y: set to values according to parameters
  /           goal and start: [-1,-1] (no start or goal)
  /           cells: generates an array of Cell to represent each node
  /           clickMode: 0 (next node will be a wall)
  /           solving: 0 (not solving at moment)
  */
  constructor(w, h, s) {
    this.sideLength = s;
    this.x = w/this.sideLength;
    this.y = h/this.sideLength;
    
    this.goal = [-1,-1];
    this.start = [-1,-1];
    this.cells = [];
    this.clickMode = 0;
    this.solving = false;
    
    for (var i = 0; i < this.x; i++) {
      var aux = [];
      for (var j = 0; j < this.y; j++) {
        aux.push(new Node(i*this.sideLength,j*this.sideLength,this.sideLength));
      }
      this.cells.push(aux);
    }
  }

  /*
  /  EFFECTS: shows each node as a colored square depending on the status of the node
  /           white: unexplored node
  /           black: wall 
  /           green: start node
  /           red: goal node
  /           blue: path being currently explored
  /           grey: node already explored
  */
  show() {
    for (var i = 0; i < this.x; i++) {
      for (var j = 0; j < this.y; j++) {
        this.cells[i][j].show();
      }
    }
  }
  
  /*
  /  PARAMETERS: mx: x coordinate of the mouse click
  /              my: y coordinate of the mouse click
  /  EFFECTS: updates the clicked node according to clickMode
  /           for goal and start nodes remove the previous one if one was set
  /           if solving == true, will not update node
  */
  update(mx, my) {
    if (this.solving) return
    var x = Math.floor(mx / this.sideLength);
    var y = Math.floor(my / this.sideLength);
    
    this.cells[x][y].updateClick(this.clickMode);
    this.updateSpecialNodes(x,y);
    this.clickMode = 0;
  }
  
  /*
  /  PARAMETERS: key: key pressed
  /  EFFECTS: set clickMode to the proper value according to the pressed key
  */
  setMode(key) {
    if (key == UP_ARROW) 
      this.clickMode = 1;
    else if (key == DOWN_ARROW)
      this.clickMode = 2;
    else if (key == LEFT_ARROW)
      this.clickMode = 0;
  }
  
  /*
  /  PARAMETERS: x and y: indexes of the node
  /  EFFECTS: if node being set is a start or goal node update node variable and remove previous node
  */
  updateSpecialNodes(x, y) {
    if (this.clickMode == 1)
      if (this.goal == [x,y]) this.goal = [-1, -1];
      else {
        if (this.goal[0] != -1 && this.goal[1] != -1)
          this.cells[this.goal[0]][this.goal[1]].updateClick(1);
        this.goal = [x,y];
      }
    
    if (this.clickMode == 2)
      if (this.start == [x,y]) this.start = [-1, -1];
      else {
        if (this.start[0] != -1 && this.start[1] != -1)
          this.cells[this.start[0]][this.start[1]].updateClick(2);
        this.start = [x,y];
      }
  }
  
  /*
  /  EFFECTS: generates graph and sets solving = true
  */
  StartSearch() {
    this.generateGraph();
    this.solving = true;
  }
  
  /*
  /  EFFECTS: generates the graph given the current state of the grid
  */
  generateGraph() {
    
  }
  
  /*
  /  EFFECTS: execute one step of the search 
  */
  solveGraph() {
    
  }
}