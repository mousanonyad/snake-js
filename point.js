class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isValidToTurn() {
        return this.x % box === 0 && this.y % box === 0;
    }
}