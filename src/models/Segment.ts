import Point from "./Point";
import { maxDistance } from "../main";
import Vector from "./Vector";

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

    draw(ctx: CanvasRenderingContext2D, options: { gravity: boolean } = { gravity: false }) {
        if (options.gravity) {
            this.calcGravity();
        }

        let colorCode = 0x2277ffff;
        let w = this.mapNumRange(this.p1.getDistance(this.p2), maxDistance, 0xfa);
        ctx.strokeStyle = `#${(colorCode - w).toString(16)}`;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }

    calcGravity() {
        let strength = 5 - this.mapNumRange(this.p1.getDistance(this.p2), maxDistance, 5);
        let g1 = new Vector(this.p1.x - this.p2.x, this.p1.y - this.p2.y);
        let g2 = new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        g1.x *= 0.0001 * strength;
        g1.y *= 0.0001 * strength;
        g2.x *= 0.0001 * strength;
        g2.y *= 0.0001 * strength;
        
        this.p1.vector.addVector(g2);
        this.p2.vector.addVector(g1);
    }

    mapNumRange(x1: number, y1: number, max: number) {
        return Math.floor((x1 / y1) * max);
    }
}