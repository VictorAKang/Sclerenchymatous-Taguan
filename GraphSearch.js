/*
/  
/  nodes are going to be stored in the grid structure 
/  data: frontier: list of paths that are at the frontier
*/
class GraphSearch{
  
  constructor(grid, algo, start) {
    
    for (var i = 0; i < grid.length; i++) 
      for (var j = 0; j < grid[i].length; j++) 
        if (!grid[i][j].isWall()) 
          this.findNeighbours(grid, i, j);
    
    this.frontier = [];
    this.frontier.push(start);
//     switch (algo) {
//       case "DFS":
//         break;
//       default:
//         this.frontier = [];
//     }
  } 
}