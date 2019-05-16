function CA(r, cells, iteration) {
    this.w = 5;
    // An array of 0s and 1s
    this.cells =[];

    this.generation;
    // An array to store the ruleset, for example [0,1,1,0,1,1,0,1]
    this.ruleset = r;

    this.init=function(){

        console.log(cells);
        this.w=width/cells;
        for(let i=0; i<cells; i++){
            this.cells.push(0);
        }
        console.log(this.cells.length);
        this.cells[this.cells.length/2]=1;
        this.generation=0;
    }

    this.init();

    // The process of creating the new generation
    this.generate = function() {


        var nextgen = new Array(this.cells.length);

        for (var i = 1; i < this.cells.length-1; i++) {
            var left = this.cells[i-1];   // Left neighbor state
            var me = this.cells[i];       // Current state
            var right = this.cells[i+1];  // Right neighbor state
            nextgen[i] = this.rules(left, me, right); // Compute next generation state based on ruleset
        }

        this.cells = nextgen;
        this.generation++;
    };


    this.display = function() {
        if(iteration>this.generation) {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i] === 1) fill(200);
                else fill(51);
                noStroke();
                rect(i * this.w, this.generation * this.w, this.w, this.w);
            }
        }
    };

    this.rules = function(a, b, c) {

        if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
        if (a == 1 && b == 1 && c === 0) return this.ruleset[1];
        if (a == 1 && b === 0 && c == 1) return this.ruleset[2];
        if (a == 1 && b === 0 && c === 0) return this.ruleset[3];
        if (a === 0 && b == 1 && c == 1) return this.ruleset[4];
        if (a === 0 && b == 1 && c === 0) return this.ruleset[5];
        if (a === 0 && b === 0 && c == 1) return this.ruleset[6];
        if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
        return 0;
    };

}