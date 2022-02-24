import { Maze_generator } from "./maze_generator.js";

export class Maze {

    constructor(width, height) {
        if (width < 0 || height < 0)
            throw new Error("width and height must both be greater than 0");
        this.generator = new Maze_generator(width, height);
        this.width = width;
        this.height = height;
    }

    generate() {
        this.maze = this.generator.generate();
    }

    print_maze() {
        for (let i = 0; i < this.width; i++) {
            let top_row = "";
            let bot_row = "";
            for (let j = 0; j < this.height - 1; j++){
                let node = this.maze[i][j];
                top_row += node.print_node() + node.print_edge(this.maze[i][j + 1]);
                if (i < this.width - 1)
                    bot_row += node.print_edge(this.maze[i + 1][j]) + "X";
            }
            top_row += this.maze[i][this.height - 1].print_node();
            if(i < this.width - 1)
                bot_row += this.maze[i][this.height - 1]
                .print_edge(this.maze[i + 1][this.width - 1]);

            console.log(top_row);
            console.log(bot_row);
        }
    }
}
