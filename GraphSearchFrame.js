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

  addToFrontier(path) {
    this.frontier.push(path);
  }

  updateCurrent() {
    this.current = this.frontier.shift();
    // print(this.current);
  }

  getCurrent() {
    return this.current;
  }
}