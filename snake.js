class Snake {
    constructor() {
        this.part = [];
        for (let i = 30; i > 0; i--) {
            this.part.push(new Point(step * i, step * 10))
        }
    }

    addTail(points) {
        this.part.push(points);
    }

    draw() {
        for (let i = 0; i < snake.part.length; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.rect(this.part[i].x, this.part[i].y, box, box);
            ctx.fillStyle = (i < 3) ? "darkgreen" : "limegreen";
            ctx.fill();
            ctx.closePath();
        }
    }
}
