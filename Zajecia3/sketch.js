var gol;
let width = 1000, height = 1000, w = 12;
let sign = 0;
let radious = 0, wRandom, hRandom, amount=0;

function setUp(w, h) {
    width = w;
    height = h;
    sign=0;
    setup();
}


function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('canvas');
    gol = new GOL();
}

function draw() {
    background(255);

    if (sign > 0) {

        if (mouseIsPressed && mouseX > 0 && mouseY > 0) {
            let X = Math.floor(mouseX / w);
            let Y = Math.floor(mouseY / w);
            if (sign === 1) {
                console.log('init nucleaon')
                gol.initNucleaon(X, Y);
            }

            if (sign === 2) {
                console.log('radious')
                gol.radious(X, Y, radious, amount);
            }
            if (sign === 3) {
                console.log('rownomiernie')
                gol.rownomiernie(wRandom, hRandom);
            }
            if (sign === 4) {
                console.log('random case')
                gol.random(radious);
            }

        }


        gol.display();
    }
    else {
        if (sign === -10) {

            gol.generate();
        }
        if (sign === -11) {
            console.log('potezna bestia')
            gol.generateAbsorbujace();
        }
        gol.display();
    }
}

function markNucleaon() {
    sign = sign > 0 ? 0 : 1;
}

function absorbcyjneInit() {
    sign = sign === 0 ? -11 : 0;
}

function periodyczneInit() {
    sign = sign === 0 ? -10 : 0;

}

function promienInit(promien, ilosc) {

    radious = promien;
    amount = ilosc;
    sign = sign > 0 ? 0 : 2;
}

function rownomiernieInit(w, h) {
    sign = sign > 0 ? 0 : 3;
    wRandom = w;
    hRandom = h;
}

function randomInit(random, ilosc) {
    console.log('in random')
    radious = random;
    ilosc=ilosc;
    sign = sign > 0 ? 0 : 4;
    console.log(sign)

}
