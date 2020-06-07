const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = 1200;
let height = canvas.height = 880;

const box = 40;

let score = 0;
let levelUp = 0;
let level = 1;

let snake = new Snake();

let food = generateFood();

let timeout = 150;
let game = setInterval(draw, timeout);

let newHead = [];

function draw() {
    let currentDir = direction[0];
    //if not last element in array, delete element which was done
    if (direction.length > 1) {
        direction.shift();
    }

    //food drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    ctx.fill();

    let headX = snake.part[0].x;
    let headY = snake.part[0].y;

    switch (currentDir) {
        case UP:
            headY -= box;
            break;
        case DOWN:
            headY += box;
            break;
        case LEFT:
            headX -= box;
            break;
        case RIGHT:
            headX += box;
            break
    }

    if (isOutOfArea(headX, headY)) {
        gameOver("Dough!");

    } else if (isInSnake(headX, headY)) {
        gameOver("Eat myself..")
    }


    let newHead = new Point(headX, headY);

    if (!isEatFood(headX, headY)) {
        snake.part.pop();
    }

    snake.part.unshift(newHead);
    snake.draw();

    if (score % 5 === 0 && levelUp !== 0) {
        level++;
        levelUp = 0;
        clearInterval(game);
        game = setInterval(draw, timeout -= 10);
        console.log(timeout);
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
    return false
}

function generateFood() {
    let x = Math.floor(Math.random() * 29 + 1) * box;
    let y = Math.floor(Math.random() * 19 + 3) * box;
    if (isInSnake(x, y)) {
        console.log("OUCH!");
        return generateFood();
    } else return {
        x: x,
        y: y
    }
}

function isEatFood(x, y) {
    if (food.x === x && food.y === y) {
        food = generateFood();
        score++;
        levelUp++;
        return true;
    }
}

function gameOver(cause) {
    clearInterval(game);
    location.reload();

    alert("Message: " + cause
        + "\nScore: " + score
        + "\nLevel: " + level);
}

