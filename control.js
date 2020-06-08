window.addEventListener("keydown", switchDirection, false);

const LEFT = "left";
const UP = "up";
const RIGHT = "right";
const DOWN = "down";

let direction = [RIGHT];

function switchDirection(event) {
    let currentDir = direction[direction.length - 1];
    if (direction.length > 3) {
        return;
    }
    if (event.key === "ArrowUp" && currentDir !== DOWN) {
        direction.push(UP)
    }
    if (event.key === "ArrowDown" && currentDir !== UP) {
        direction.push(DOWN)
    }
    if (event.key === "ArrowLeft" && currentDir !== RIGHT) {
        direction.push(LEFT)
    }
    if (event.key === "ArrowRight" && currentDir !== LEFT) {
        direction.push(RIGHT)
    }
}

function restart() {
    location.reload();
}