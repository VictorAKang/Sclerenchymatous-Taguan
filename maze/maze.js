import { Maze_generator } from "./maze_generator";

export class Maze {

    constructor(width, height) {
        if (width < 0 || height < 0)
            throw new Error("width and height must both be greater than 0");
        let generator = new Maze_generator(width, height);
    }

    generate() {
        this.maze = generator.generate();
    }

    print_maze() {
        console.log("S");
        for (let i = 0; i < this.width; i++) {
            let top_row = " ";
            let bo_row = "";
            for (let j = 0; j < this.height; j++) 
                row += this.maze[i][j].print_cell() + " ";
            console.log(row);
        }
    }
}
