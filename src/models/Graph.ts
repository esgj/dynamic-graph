import Point from "./Point";
import Segment from "./Segment";

export default class Graph {
    points: Point[] = [];
    segments: Segment[] = [];
    maxSegmentDistance = Number.MAX_SAFE_INTEGER;
    gravity = false;
    
    constructor(points: Point[], maxSegmentDistance?: number) {
        this.points = points;

        if (maxSegmentDistance) {
            this.maxSegmentDistance = maxSegmentDistance;
        }
    }

    toggleGravity() {
        this.gravity = !this.gravity;
    }

    addPoint(point: Point) {
        this.points.push(point);
    }

    tryAddSegment(seg: Segment) {
        if (!this.doesSegmentExist(seg)) {
            this.segments.push(seg);
        }
    }



    generateSegments() {
        this.removeSegments();

        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points.length; j++) {
                if (i == j) continue;
                if (this.points[i].getDistance(this.points[j]) < this.maxSegmentDistance) {
                    let newSeg = new Segment(this.points[i], this.points[j]);
                    this.tryAddSegment(newSeg);
                }
            }
        }
    }

    removeSegments() {
        for (const seg of this.segments) {
            if (seg.p1.getDistance(seg.p2) > this.maxSegmentDistance) {
                this.segments.splice(this.segments.indexOf(seg));
            }
        }
    }

    doesSegmentExist(seg: Segment) {
        for (const segment of this.segments) {
            if (segment.equals(seg)) {
                return true;
            }
        }

        return false;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.generateSegments();

        for (const point of this.points) {
            point.draw(ctx);
        }

        for (const seg of this.segments) {
            seg.draw(ctx, { gravity: !this.gravity });
        }
    }
}