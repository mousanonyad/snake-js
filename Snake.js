class Snake {
    constructor() {
        this.part = [
            new Point(box * 4,box * 10),
            new Point(box * 3,box * 10),
            new Point(box * 2,box * 10),
            new Point(box,box * 10)
        ]
    }

    draw() {
        for (let i = 0; i < snake.part.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = (i === 0) ? "darkgreen" : "limegreen";
            ctx.fillRect(this.part[i].x, this.part[i].y, box, box);
            ctx.fill();
            ctx.closePath();
        }
    }
}
