import { Maze_node, Maze_edge } from "./maze_graph_parts.js";

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

        this.randomized_prim(maze);

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
            var edge = new Maze_edge(node, maze[x - 1][y]);
        

        if (y > 0) 
            var edge = new Maze_edge(node, maze[x][y - 1]);
        
        
        return node;
    }

    /*
    /  Runs Prim's algorithm where all edges weigh the same,
    /  ties are breaked randomly, and selecting the edge for
    /  the spanning tree is done by setting edge to be not a wall
    */
    randomized_prim(maze) {
        let visited = new Set();
        let frontier = new Set();
        visited.add(maze[0][0]);
        maze[0][0].get_edges().forEach((edge) => {
            frontier.add(edge);
        });

        while (visited.size != this.width * this.height) {
            let random_index = Math.floor(Math.random() * frontier.size);
            let edge = Array.from(frontier)[random_index];
            let both_visited = true;
            edge.get_neighbours().forEach((node) => {
                if (!visited.has(node)) {
                    both_visited = false;
                    visited.add(node);
                    node.get_edges().forEach((neighbour_edge) => {
                        frontier.add(neighbour_edge);
                    });
                }
            });

            if (!both_visited) edge.set_wall(false);
            frontier.delete(edge);
        }
    }
}