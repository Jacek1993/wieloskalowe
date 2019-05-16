var gol;
let width=1000, height=1000, w=12;
let sign=-1;

function setUp(w, h){
    width=w;
    height=h;
    setup();
}



function setup() {
    let canvas=createCanvas(width, height);
    canvas.parent('canvas');
    gol = new GOL();
}

function draw() {
    background(255);

    if(sign >0){

        if(mouseIsPressed && mouseX>0 && mouseY>0){
            let X=Math.floor(mouseX/w);
            let Y=Math.floor(mouseY/w);
          if(sign===1){
              gol.initNucleaon(X, Y);
          }

        }
        gol.display();
    }
    else {
        if(sign ===-10) {

            gol.generate();
        }
        if(sign===-11){
            console.log('potezna bestia')
            gol.generateAbsorbujace();
        }
        gol.display();
    }
}

function markNucleaon(){
    sign=sign>0?-1:1;
}

function absorbcyjneInit(){
   sign=sign<0?-11:sign;
}

function periodyczneInit(){
    sign=sign<0?-10: sign;

}
