import Vector from "./Vector";

export default class Point {
    x: number = 0;
    y: number = 0;
    vector: Vector;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.vector = new Vector(Math.random() * 2, Math.random() * 2);
    }

    equals(point: Point) {
        return this.x == point.x && this.y == point.y;
    }

    getDistance(point: Point) {
        return Math.hypot(this.x - point.x, this.y - point.y);
    }

    calcNewPosition() {
        this.x += this.vector.x;
        this.y += this.vector.y;

        if (this.y >= window.innerHeight) this.vector.y *= -1;
        if (this.x >= window.innerWidth) this.vector.x *= -1;
        if (this.x <= 0) this.vector.x = Math.abs(this.vector.x);
        if (this.y <= 0) this.vector.y = Math.abs(this.vector.y);
    }

    draw(ctx: CanvasRenderingContext2D, options: { size: number } = { size: 15 }) {
        this.calcNewPosition();

        let rad = options.size / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = "#27f";
        ctx.fill();
    }
}