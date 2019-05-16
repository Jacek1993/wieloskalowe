var gol;
let width=1000, height=1000;

function setup() {
    let canvas=createCanvas(width, height);
    canvas.parent('canvas');
    gol = new GOL();
}

function draw() {
    background(255);
    gol.generate();
    gol.display();
}


