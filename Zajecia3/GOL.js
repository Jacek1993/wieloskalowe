
function GOL() {

    this.w = 12;
    this.columns = Math.floor(width/this.w);
    this.rows = Math.floor(height/this.w);
    this.nucleaons=0;

    // Game of life board
    this.board = new Array(this.columns);
    for (var i = 0; i < this.columns; i++) {
        this.board[i] = new Array(this.rows);
    }

    this.init=function () {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.board[i][j] = new Cell(i*this.w, j*this.w, this.w, 0);
            }
        }
    }
    this.init();

    this.initNucleaon=function(X, Y){
        if(this.board[X][Y].state===0){
            this.board[X][Y].state=this.nucleaons++;
        }
        console.log(this.nucleaons);
    }



    // The process of creating the new generation
    this.generate = function() {
        for ( var i = 0; i < this.columns;i++) {
            for ( var j = 0; j < this.rows;j++) {
                this.board[i][j].savePrevious();
            }
        }

        // Loop through every spot in our 2D array and check spots neighbors
        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {

                // Add up all the states in a 3x3 surrounding grid

                if(this.board[x][y].state===0) {

                    let neighbors = [];
                    for (var i = -1; i <= 1; i++) {
                        for (var j = -1; j <= 1; j++) {
                            if ((i === 0 || j === 0) && (i !== j) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0) {

                                neighbors.push(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous);

                            }

                        }
                    }
                    if(neighbors.length!==0) {
                        neighbors = neighbors.sort((a, b) => a > b);
                        let state = neighbors[0];
                        let iter = 0;
                        for (let i = 1; i < neighbors.length; i++) {
                            if (neighbors[i - 1] === neighbors[i] && iter === 0) {
                                iter++;
                                state = neighbors[i - 1];
                            }
                        }

                        console.log(state);

                        this.board[x][y].state = state;
                    }
                }
                // else do nothing!
            }
        }
    };

    this.generateAbsorbujace=function(){
        for ( var i = 0; i < this.columns;i++) {
            for ( var j = 0; j < this.rows;j++) {
                this.board[i][j].savePrevious();
            }
        }

        // Loop through every spot in our 2D array and check spots neighbors
        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {

                // Add up all the states in a 3x3 surrounding grid

                if(this.board[x][y].state===0) {

                    let neighbors = [];
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if ((i === 0 || j === 0) && (i !== j) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0  ) {
                                console.log('potezny gej');

                                neighbors.push(this.board[x+i][j+y].previous);

                            }

                        }
                    }
                    if(neighbors.length!==0) {
                        neighbors = neighbors.sort((a, b) => a > b);
                        let state = neighbors[0];
                        let iter = 0;
                        for (let i = 1; i < neighbors.length; i++) {
                            if (neighbors[i - 1] === neighbors[i] && iter === 0) {
                                iter++;
                                state = neighbors[i - 1];
                            }
                        }

                        console.log(state);

                        this.board[x][y].state = state;
                    }
                }
                // else do nothing!
            }
        }
    }

    // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
    this.display = function() {
        for ( var i = 0; i < this.columns;i++) {
            for ( var j = 0; j < this.rows;j++) {
                this.board[i][j].display();
            }
        }
    };
}