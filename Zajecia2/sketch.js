var gol;
let width=1000, height=1000, w=4;
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
                gol.handMark(X, Y);
            }
            if(sign===2){
                unchangable(X, Y);
            }
            if(sign===3){
                glider(X, Y);
            }
            if(sign===4){
                oscylator(X, Y);
            }

        }
        gol.display();
    }
    else {
        gol.generate();
        gol.display();
    }
}

function randomInitialization(){
    gol.randomInit();
}

function handInitialization(){
    sign=sign>0?-1: 1;
}

function unchangableInitializaiton(){
    sign=sign>0?-1:2;

}

function gliderInitialization(){
    sign=sign>0?-1: 3;
}
function oscylatorInitialization(){
    sign =sign>0?-1:4;
}

function unchangable(mouseX, mouseY){
    let pointArray=[];
    let X, Y;
    X=mouseX; Y=mouseY+1;pointArray.push({X,Y});
    X=mouseX+1;Y=mouseY; pointArray.push({X,Y});
    X=mouseX+2; pointArray.push({X,Y});
    X=mouseX+1; Y=mouseY+2; pointArray.push({X, Y});
    X=mouseX+2; Y=mouseY+2; pointArray.push({X, Y});
    X=mouseX+3; Y=mouseY+1; pointArray.push({X, Y});
    gol.handInit(pointArray);
}

function glider(mouseX, mouseY){
    let pointArray=[];
    let X, Y;
    X=mouseX; Y=mouseY+1; pointArray.push({X, Y});
    X=mouseX+1; Y=mouseY; pointArray.push({X, Y});
    X=mouseX+1; Y=mouseY+1; pointArray.push({X, Y});
    X=mouseX+2; Y=mouseY; pointArray.push({X, Y});
    X=mouseX+2; Y=mouseY+2; pointArray.push({X, Y});

    gol.handInit(pointArray);

}

function oscylator(mouseX, mouseY){
    let pointArray=[];
    let X, Y;
    X=mouseX; Y=mouseY; pointArray.push({X, Y});
    Y=mouseY+1; pointArray.push({X, Y});
    Y=mouseY+2; pointArray.push({X, Y});
    Y=mouseY+3; pointArray.push({X, Y});

    gol.handInit(pointArray);
}

