import './style.css';
import Graph from './models/Graph';
import Point from './models/Point';

let canvas = document.createElement('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "#000";

document.querySelector('#app')?.appendChild(canvas);

let ctx = canvas.getContext("2d");

// Create one point
let p1 = new Point(100, 100);
let p2 = new Point(200, 200);
let p3 = new Point(500, 200);

// Max distance between points
const maxDistance = window.innerWidth / 5;

// Create the graph, add one point and render it.
let g = new Graph([p1, p2, p3], maxDistance);


// Add new points by clicking on the window
window.addEventListener('click', () => {
    let randX = Math.floor(Math.random() * window.innerWidth);
    let randY = Math.floor(Math.random() * window.innerHeight);
    g.addPoint(new Point(randX, randY));
})

function calcMaxConnections(numberOfPoints: number) {
    if (numberOfPoints == 0) return 0;
    return (numberOfPoints * (numberOfPoints - 1)) / 2;
}

function animate() {
    document.querySelector('#nodes')!.innerHTML = `Nodes: ${g.points.length}`;
    document.querySelector('#connections')!.innerHTML = `Connections: ${g.segments.length}`;
    document.querySelector('#max-connections')!.innerHTML = `Max number of connections possible: ${calcMaxConnections(g.points.length)}`;

    if (ctx) {
        g.render(ctx);
    }

    requestAnimationFrame(animate);
}

animate();