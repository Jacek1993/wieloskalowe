let ca;

let width=1000, height=1000;

function setup(width, height, rule, cell, iteration) {
    let canvas=createCanvas(width, height);
    canvas.parent('canvas');
    background(51);
    let cells=cell? cell: 100;
    // An initial rule system
    let ruleset=generate(rule);

    ca = new CA(ruleset, cells);

}

function draw() {
    // Draw the CA
    ca.display();
    ca.generate();

}


function generate(x) {
   let rulset=[];
   for(let i=0; i<8; i++){
       rulset[i]=Math.floor(x%2);
       x/=2;
   }

   return rulset.reverse();
}