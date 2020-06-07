window.addEventListener("keydown", switchDirection, false);

const LEFT = "left";
const UP = "up";
const RIGHT = "right";
const DOWN = "down";

let direction = [RIGHT];

function switchDirection(event) {
    let currentDir = direction[direction.length-1];
    if (direction.length > 3) {
        return;
    }
    if (event.key === "ArrowUp" && currentDir !== DOWN) {
        //going up
        direction.push(UP)
    }
    if (event.key === "ArrowDown" && currentDir !== UP) {
        //going down
        direction.push(DOWN)
    }
    if (event.key === "ArrowLeft" && currentDir !== RIGHT) {
        //going left
        direction.push(LEFT)
    }
    if (event.key === "ArrowRight" && currentDir !== LEFT) {
        //going right
        direction.push(RIGHT)
    }
}