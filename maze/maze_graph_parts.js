export class Maze_node {
    constructor() {
        this.is_start = false;
        this.is_end = false;
        this.edges = [];
    }

    set_start() {
        this.is_start = true;
        this.is_end = false;
    }

    set_end() {
        this.is_end = true;
        this.is_start = false;
    }

    add_edge(wall) {
        this.edges.push(wall);
    }

    get_edges() {
        return this.edges;
    }

    print_node() {
        if (this.is_start) return "S";
        if (this.is_end) return "E";
        return " ";
    }

    print_edge(neighbour_node) {
        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            if (edge.get_neighbours().includes(neighbour_node))
                return edge.print();
        }
        throw new Error();
    }
}

export class Maze_edge {
    constructor(node_a, node_b) {
        this.neighbours = [node_a, node_b];
        this.is_wall = true;
        node_a.add_edge(this);
        node_b.add_edge(this);
    }

    set_wall(value) {
        this.is_wall = value;
    }

    get_neighbours() {
        return this.neighbours;
    }

    print() {
        if (this.is_wall) return "X";
        return " ";
    }
}