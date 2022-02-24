import { Maze_node, Maze_edge } from "./maze_graph_parts";

export class Maze_generator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /*
    /  Generates the graph and then generates the maze 
    */
    generate() {
        let maze = [];
        for (let i = 0; i < this.width; i++) {
            let row = [];
            maze.push(row);
            for (let j = 0; j < this.height; j++) {
                let node = this.generate_node(i, j, maze);
                row.push(node);
            }
        }

        randomized_prim(maze);

        return maze;
    }

    /*
    /  Generates a single node and sets it's edges according to 
    /  its position. Edges will not be generated if the nodes that it should
    /  connect have not yet been generated (ie the nodes that are to its right
    /  and/or under it). All other settings of the node are left as default.
    /
    /  Assumes that all nodes are within the maze
    */
    generate_node(x, y, maze) {
        let node = new Maze_node();

        if (x > 0) 
            let edge = new Maze_edge(node, maze[x - 1][y]);
        

        if (y > 0) 
            let edge = new Maze_edge(node, maze[x][y - 1]);
        
        
        return node;
    }

    /*
    /  Runs Prim's algorithm where all edges weigh the same,
    /  ties are breaked randomly, and selecting the edge for
    /  the spanning tree is done by setting edge to be not a wall
    */
    randomized_prim(maze) {
        let visited = [maze[0][0]];
        let frontier = [];
        frontier.push(maze[0][0].get_edges());

        while (visited.length != this.width * this.height) {

        }
    }
}