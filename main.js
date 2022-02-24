import { Maze } from "./maze/maze.js"

let maze = new Maze(10,10);
maze.generate();
maze.print_maze();