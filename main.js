const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = 880;
let height = canvas.height = 800;

const headerCanvas = document.getElementById("headerCanvas");
const headerCtx = headerCanvas.getContext("2d");
let headerWidth = headerCanvas.width = 880;
let headerHeight = headerCanvas.height = 60;

const box = 40;
let divide = 10;
let step = box / divide;

let score = 0;
let bestScore = getBestScore();
let speedUp = 0;
let speed = 1;

let snake = new Snake();

let food = generateFood();

let timeout = 1000 / 60;
let game = setInterval(draw, timeout);


function draw() {
    ctx.clearRect(0, 0, width, height);
    let currentDir = direction[0];

    let headX = snake.part[0].x;
    let headY = snake.part[0].y;


    switch (currentDir) {
        case UP:
            headY -= step;
            break;
        case DOWN:
            headY += step;
            break;
        case LEFT:
            headX -= step;
            break;
        case RIGHT:
            headX += step;
            break
    }

    if (isOutOfArea(headX, headY)) {
        snake.draw();
        gameOver("Cause: Wall incident.");
        return;
    } else if (isInSnake(headX, headY)) {
        snake.draw();
        gameOver("Cause: Eat myself.");
        return;
    }

    //food drawing
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    ctx.fill();

    let newHead = new Point(headX, headY);

    let preLastPoint = snake.part[snake.part.length - 2];
    let lastPoint = snake.part[snake.part.length - 1];


    if (isEatFood(headX, headY)) {
        if (preLastPoint.x === lastPoint.x) {
            snake.addTail(createTail(lastPoint, 0, step))
        } else if (preLastPoint.y === lastPoint.y) {
            snake.addTail(createTail(lastPoint, step, 0))
        }
    } else {
        snake.part.pop();
    }

    snake.part.unshift(newHead);
    snake.draw();

    isSpeedUp();

    if (newHead.isValidToTurn()) {
        //if not last element in array, delete element which was done
        if (direction.length > 1) {
            direction.shift();
        }
    }

    drawHeader();
}

function drawHeader() {
    headerCtx.beginPath();
    headerCtx.clearRect(0, 0, headerWidth, headerHeight);
    headerCtx.fillStyle = "limegreen";
    headerCtx.font = "35px Permanent Marker";
    headerCtx.fillText("Score: " + score, 10, 50);
    headerCtx.fillText("Speed: " + speed, 190, 50);
    headerCtx.fillText("Best: " + bestScore, 720, 50);
    headerCtx.closePath();
}


function createTail(point, x, y) {
    let stepY = y;
    let stepX = x;
    let tail = [];
    for (let i = 1; i < 7; i++) {
        tail.push(new Point(point.x + stepX * i, point.y + stepY * i));
    }
    return tail;
}

function isSpeedUp() {
    if (score % 5 === 0 && speedUp !== 0) {
        speed++;
        speedUp = 0;
        clearInterval(game);
        game = setInterval(draw, timeout -= 1);
    }
}

function isOutOfArea(x, y) {
    return x > width - box || x < 0 || y > height - box || y < 0;
}

function isInSnake(x, y) {
    for (const snakeElement of snake.part) {
        if (x === snakeElement.x && y === snakeElement.y) {
            return true;
        }
    }
}

function generateFood() {
    let x = Math.round(Math.random() * 21) * box;
    let y = Math.round(Math.random() * 19) * box;
    if (isInSnake(x, y)) {
        console.log("OUCH!");
        return generateFood();
    } else {
        console.log(x + " " + y);
        return {
            x: x,
            y: y
        }
    }
}

function isEatFood(x, y) {
    if (food.x === x && food.y === y) {
        food = generateFood();
        score++;
        speedUp++;
        return true;
    }
}

function getBestScore() {
    let item = localStorage.getItem("bestScore");
    return item !== null ? item : 0;
}

function showHeaderMessage(message) {
    headerCtx.beginPath();
    headerCtx.fillStyle = "red";
    headerCtx.font = "25px Permanent Marker";
    headerCtx.fillText(message, 360, 50);
    headerCtx.closePath();
}

function gameOver(message) {
    clearInterval(game);

    if (score > bestScore)
        localStorage.setItem("bestScore", score);

    ctx.beginPath();

    showHeaderMessage(message);

    ctx.fillStyle = "red";
    ctx.font = "45px Permanent Marker";
    ctx.fillText("Game over!", 315, 440);
    ctx.font = "35px Permanent Marker";
    ctx.fillText("Press any key to restart.", 230, 480);
    ctx.closePath();
    window.addEventListener("keydown", restart, false);
}

