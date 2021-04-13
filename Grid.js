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
/        searchFrame: stores information and functions related to the search
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
    if (this.solving) return;
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
  / EFFECTS: sets the class to solving mode. create a GraphSearchFrame
  */
  solve() {
    this.solving = true;
    this.setNeighbours();
    var startNode = this.cells[this.start[0]][this.start[1]];
    this.searchFrame = new GraphSearchFrame(startNode);
  }

  /*
  / EFFECTS: does nothing if solving == false
  /          if solving == true, uncolors currently shown path, steps through the search and shows current path
  */
  step() {
    if (!this.solving) return;
    this.disableCurrent();
    this.searchFrame.updateCurrent();
    this.stepSearch();
  }

  /*
  / EFFECTS: steps through the search function, stopping in case it finds the goal node
  */
  stepSearch() {
    var currentPath = this.searchFrame.current;
    var goalNode = this.cells[this.goal[0]][this.goal[1]];
    var frontierNode = currentPath[currentPath.length - 1];

    frontierNode.setExplored();
    for (var i = 0; i < currentPath.length; i++) 
      currentPath[i].setCurrent();

    if (frontierNode == goalNode) {
      this.solving = false;
      return;
    }

    var neighbours = frontierNode.neighbours;
    for (var i = 0; i < neighbours.length; i++) {
      var aux = neighbours[i];

      var cycle = false;
      for (var j = 0; j < currentPath.length; j++) 
        if (currentPath[j] == aux) {
          // print("found cycle");
          cycle = true;
          break;
        }
      
      if (!cycle) {
        var newPath = Array.from(currentPath);
        newPath.push(aux);
        this.searchFrame.addToFrontier(newPath);
      }
    }
  }

  /*
  / EFFECTS: sets all nodes with a list of their neighbours nodes that are not walls
  */
  setNeighbours() {
    for (var i = 0; i < this.x; i++) 
      for (var j = 0; j < this.y; j++) 
        this.cells[i][j].setNeighbours(this.findNeighbours(i,j));
  }

  /*
  / PARAMETERS: i and j: indexes of the cell requesting its neighbours
  / EFFECTS: obtains a list of Nodes that are inbounds and are neighbours of the requested node
  / RETURNS: list of Nodes
  */
  findNeighbours(i, j) {
    var neighbours = [];

    if (i != 0 && !this.cells[i - 1][j].wall) neighbours.push(this.cells[i - 1][j]);
    if (i != this.x - 1 && !this.cells[i + 1][j].wall) neighbours.push(this.cells[i + 1][j]);
    if (j != 0 && !this.cells[i][j - 1].wall) neighbours.push(this.cells[i][j - 1]);
    if (j != this.y - 1 && !this.cells[i][j + 1].wall) neighbours.push(this.cells[i][j + 1]);

    return neighbours;
  }

  /*
  / EFFECTS: uncolors all nodes that are part of the current path being searched
  */
  disableCurrent() {
    var currentPath = this.searchFrame.getCurrent();
    for (var i = 0; i < currentPath.length; i++) 
      currentPath[i].disableCurrent();
  }
}