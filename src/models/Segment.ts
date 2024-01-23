import Point from "./Point";

export default class Segment {
    p1: Point;
    p2: Point;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    equals(seg: Segment) {
        return seg.p1.equals(this.p1) && seg.p2.equals(this.p2) || seg.p1.equals(this.p2) && seg.p2.equals(this.p1);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#27f";
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}