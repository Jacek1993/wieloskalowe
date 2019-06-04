let gol;
let width = 1000, height = 1000, w = 12;
let sign = 0;
let counter, energy=false;
let random;



function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('canvas');
    gol =new GOL()

}

function draw() {
    background(255);
    let X,Y;
    if (sign > 0) {

        if (mouseIsPressed && mouseX > 0 && mouseY > 0) {
            X = Math.floor(mouseX / w);
            Y = Math.floor(mouseY / w);
            if (sign === 1 ) {

                gol.initNucleaon(X, Y);
            }
            if(sign===2){
                gol.initRandom(random);
            }

        }

        gol.display();

    }
    else {
        if (sign === -10) {
            gol.generate(counter);
        }
        if(!energy){
            gol.display();
        }
        else{
            gol.displayEnergy();
        }

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

function randomSimulate(number){
    sign=sign> 0? 0:2;
    random=number;
}


function setUp(w, h) {
    width = w;
    height = h;
    setup()
    sign=0;

}

function toggleEnergy(){
    energy=!energy;
}
