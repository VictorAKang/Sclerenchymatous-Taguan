/*
/ Data frame to store and compute information related to the search
/ Examples of said data are frontier, currently analyzed path 
/ Examples of functions are working through an entry of the frontier
/ The search method implemented will be BFS
*/
class GraphSearchFrame{
  
  /*
  / PARAMETERS: start: start Node of the search
  / EFFECTS: initializes frontier with a path with start and current with empty start
  */
  constructor (start) {
    this.frontier = [];
    this.frontier.push([start]);
    this.current = [];
  }

  /*
  / PARAMETERS: path: list of Nodes
  / EFFECTS: adds the given list of Nodes to the frontier
  */
  addToFrontier(path) {
    this.frontier.push(path);
  }

  /*
  / EFFECTS: removes the next path to be analyzed from the frontier
  */
  updateCurrent() {
    this.current = this.frontier.shift();
    // print(this.current);
  }

  /*
  / RETURNS: returns the current path
  */
  getCurrent() {
    return this.current;
  }
}