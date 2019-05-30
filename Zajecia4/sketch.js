let gol;
let width = 1000, height = 1000, w = 12;
let sign = 0;
let counter;
let radius=0,R=0;

function setUp(w, h) {
    width = w;
    height = h;
    setup();
    sign=0;
    radius=0;
}


function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('canvas');
    if(radius===0) {
        gol = new GOL();
    }
    if(radius >0){
        gol=new GOL(true)
    }

}

function draw() {
    background(255);

    if (sign > 0) {

        if (mouseIsPressed && mouseX > 0 && mouseY > 0) {
            let X = Math.floor(mouseX / w);
            let Y = Math.floor(mouseY / w);
            if (sign === 1 ) {

                gol.initNucleaon(X, Y);
            }
            if(sign===2 ){
                gol.radius(X,Y,R)
            }
        }


        gol.display();
    }
    else {
        if (sign === -10) {
            gol.generate(counter);
        }
        gol.display();
    }
}

function markNucleaon() {
    sign = sign > 0 ? 0 : 1;
}

function simulate(v){

    sign=sign>0?-10:0;
    console.log(v)
    counter=v;
}

function radiusSimulate(r){
    sign=sign>0?0:2;
    radius=sign;
    R=r;
}