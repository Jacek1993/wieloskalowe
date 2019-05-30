
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
            this.board[X][Y].state=++this.nucleaons;
        }
        console.log(this.nucleaons);
    }

    this.radious=function (x, y, radious, ilosc) {

        let r=Math.ceil(radious/this.w);
        let iterationNumber=this.columns*this.rows;
        this.board[x][y].state=++this.nucleaons;
        let sign,X, Y;
        let pickedIlosc=0;
        for(let i=0; i<iterationNumber; i++){
            sign=true;
            for(let j=-r; j<r; j++){
                for(let k=-r; k<r; k++){
                    X=(x+j+this.columns)%this.columns;
                    Y=(y+k+this.rows)%this.rows;
                    if(this.board[X][Y].state!==0){
                        sign=false;
                        break;
                    }
                }
            }

            if(sign){
                this.board[x][y].state=++this.nucleaons;
                pickedIlosc++;
                for(let j=-r; j<r; j++){
                    for(let k=-r; k<r; k++){

                        X=(x+j+this.columns)%this.columns;
                        Y=(y+k+this.rows)%this.rows;
                        if(x!==X && y!==Y) {
                            this.board[X][Y].state = -1;
                        }
                    }
                }
            }
            if(pickedIlosc>=ilosc) break;
            x=Math.floor(random(this.columns));
            y=Math.floor(random(this.rows));

        }
        //todo dodac jakiegos popupa tylko nie wiem jeszcze jak bo sie caly czas kraszuje jak rzuca alerta
        console.log(pickedIlosc)






        // for(let i=-r; i<r; i++){
        //     for(let j=-r; j<r; j++) {
        //         let X=(x + i + this.columns) % this.columns;
        //         let Y=(y + j + this.rows)% this.rows;
        //
        //         let len=Math.floor(Math.sqrt((Math.pow(X-x,2)+Math.pow(Y-y,2))));
        //         if (this.board[X][Y].state === 0 && len <radius) {
        //             this.board[X][Y].state = -1;
        //         }
        //     }
        // }

            // alert('This is tooo mac');

    }


    this.random=function (rand) {
        let licznik=0;
        console.log('random start')
        while(licznik<rand){
            let x=Math.floor(random(this.columns));
            let y=Math.floor(random(this.rows));
            if(this.board[x][y].state===0){
                this.board[x][y].state=++this.nucleaons;
                licznik++;
            }
        }
        console.log('random fisnish')
    }

    this.rownomiernie=function (w, h) {
        let columnStep=Math.ceil(this.columns/w);
        let rowStep=Math.ceil(this.rows/h);
        let x=0, y=0;
        for(let i=1; i<w; i++){
            for(let j=1; j<h; j++){
                this.board[(x+i*columnStep)%this.columns][(y+j*rowStep)%this.rows].state=++this.nucleaons;

            }
        }
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