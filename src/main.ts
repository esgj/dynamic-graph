import './style.css';
import Graph from './models/Graph';
import Point from './models/Point';

let canvas = document.createElement('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "#000";

document.querySelector('#app')?.appendChild(canvas);

let ctx = canvas.getContext("2d");

// Create one point starting in the middle of the screen.
let p1 = new Point(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));

// Max distance between points
export const maxDistance = window.innerWidth / 3;

// Create the graph, add points and render it.
let g = new Graph([p1], maxDistance);

// Add new point by clicking on the window
window.addEventListener('click', () => {
    let randX = Math.floor(Math.random() * window.innerWidth);
    let randY = Math.floor(Math.random() * window.innerHeight);
    g.addPoint(new Point(randX, randY));
})

// Add new point by touching on the window
window.addEventListener('touchend', () => {
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