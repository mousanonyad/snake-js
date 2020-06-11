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

//Disable arrow key scrolling in users browser
window.addEventListener("keydown", function(event) {
    // space and arrow keys
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.key)) {
        event.preventDefault();
    }
}, false);

function restart() {
    location.reload();
}