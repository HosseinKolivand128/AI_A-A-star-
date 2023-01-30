class Stack {
    constructor() {
        this.items = [];
    }

    // add element to the stack
    add(element) {
        return this.items.push(element);
    }

    // remove element from the stack
    remove() {
        if (this.items.length > 0) {
            return this.items.pop();
        }
    }

    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }

    // check if the stack is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // the size of the stack
    size() {
        return this.items.length;
    }

    // empty the stack
    clear() {
        this.items = [];
    }
}


const matrix = [
    [[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0]],
    [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
    [[0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 1, 0], [0, 0, 1, 0, 0]],
    [[0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 1, 0, 0], [0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
    [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0], [0, 1, 0, 1, 0], [0, 0, 1, 1, 0]],
];
const startNode_i = 1, startNode_j = 0;
const endNode_i = 0, endNode_j = 6;
let frontier = new Stack();
frontier.add([startNode_i, startNode_j]);
let neighbors = [], path = [];

search([startNode_i, startNode_j]);
function manhattanDistance(node) {
    let Vertical = 0, Horizontal = 0;
    Vertical = Math.abs(endNode_i - node[0]);
    Horizontal = Math.abs(endNode_j - node[1]);
    return Math.sqrt((Vertical * Vertical) + (Horizontal * Horizontal));
}

function minimumNode() {
    let min = 10;
    let node = [];
    let index;
    for (let i = 0; i < neighbors.length; i++) {
        if (matrix[neighbors[i][0]][neighbors[i][1]][0] < min) {
            min = matrix[neighbors[i][0]][neighbors[i][1]][0];
            node.pop()
            node.push(neighbors[i]);
            index = i;
        }
    }

    if (index > -1) { // only splice array when item is found
        path.push(neighbors.splice(index, 1));// 2nd parameter means remove one item only
    }
    if (min == 0) {
        console.log("SEARCH DONE the path is :");
        console.log(path.length);
        while (path.length > 0)
            console.log(path.pop());
    }
    return node;
}
function search(node) {
    if (endNode_i == node[0] && endNode_j == node[1]) {
        return;
    }
    let currentNode_i = node[0], currentNode_j = node[1];
    const currentNodeValue = matrix[node[0]][node[1]];
    let nextNodeValue;

    //check RIGHT
    if (currentNodeValue[2] == 0) {

        nextNodeValue = matrix[currentNode_i][currentNode_j + 1];
        if (nextNodeValue[4] !== 1) {
            nextNodeValue[0] = manhattanDistance([currentNode_i, currentNode_j + 1]);
            neighbors.push([currentNode_i, currentNode_j + 1])

        }

    }

    //check TOP
    if (currentNodeValue[1] == 0) {

        nextNodeValue = matrix[currentNode_i - 1][currentNode_j];
        if (nextNodeValue[4] !== 1) {
            nextNodeValue[0] = manhattanDistance([currentNode_i - 1, currentNode_j]);
            nextNodeValue[4] = 1;
            neighbors.push([currentNode_i - 1, currentNode_j])
        }
    }


    //check BOTTOM
    if (currentNodeValue[3] == 0) {

        nextNodeValue = matrix[currentNode_i + 1][currentNode_j];
        if (nextNodeValue[4] !== 1) {
            nextNodeValue[0] = manhattanDistance([currentNode_i + 1, currentNode_j]);
            neighbors.push([currentNode_i + 1, currentNode_j])

        }

    }
    let minNode = [...minimumNode()];
    if (minNode[0] == endNode_i && minNode[1] == endNode_j) {
        return;
    } else {
        search(...minNode);
    }
}