
function GOL(condition) {

    this.w = 12;
    this.columns = Math.floor(width/this.w);
    this.rows = Math.floor(height/this.w);
    this.nucleaons=0;
    this.pentagonalne=[[-1,1,-1,0],[-1,1,0,1],[0,1,-1,1],[-1,0,-1,1]];
    this.heksagonalne=[[-1,1,1,-1],[-1,-1,1,1]];
    this.myMap=new Map();
    this.middleOfCircle=[];


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
    if(!condition) {
        this.init();
    }

    this.initRadius=function(){
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.board[i][j] = new Cell(i*this.w, j*this.w, this.w, 0,true);
            }
        }
    }
    if(condition){
        this.initRadius();
    }

    this.initNucleaon=function(X, Y){
        if(this.board[X][Y].state===0){
            this.board[X][Y].state=++this.nucleaons;
        }
        console.log(this.nucleaons);

    }

    this.radius=function(X,Y,r){
        let rRows=Math.ceil(r/this.w);
        this.board[X][Y].state=1;
        let x=this.board[X][Y].c_o_gravity_X+X*this.w;
        let y=this.board[X][Y].c_o_gravity_Y+Y*this.w;
        let vector;
        console.log('radius'+x+'  '+y)
        for(let i=-rRows; i<=rRows; i++){
            for(let j=-rRows; j<=rRows; j++){
                if(this.board[(X + i + this.columns) % this.columns][(Y + j + this.rows) % this.rows].state ===0){
                   let x_point=this.board[(X + i + this.columns) % this.columns][(Y + j + this.rows) % this.rows].c_o_gravity_X+((X + i + this.columns) % this.columns)*this.w;
                   let y_point=this.board[(X + i + this.columns) % this.columns][(Y + j + this.rows) % this.rows].c_o_gravity_Y+((Y + j + this.rows) % this.rows)*this.w;
                   vector=Math.sqrt(Math.pow(x_point-x,2)+Math.pow(y_point-y,2));
                    if(vector<=r){
                        console.log('weszlo')
                        this.board[(X + i + this.columns) % this.columns][(Y + j + this.rows) % this.rows].state=2;
                    }
                }
                // this.board[(X + i + this.columns) % this.columns][(Y + j + this.rows) % this.rows].state=2;
            }
        }
    }


    this.vonNeuman=function(x,y){
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if ((i === 0 || j === 0) && (i !== j) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous);

                }
            }
        }

        return this.maxKeyValue();
    }

    this.vonNeumanAbsorbujace=function(x,y){
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if ((i === 0 || j === 0) && (i !== j) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0  ){
                    this.checkMap( this.board[x+i][j+y].previous);

                }
            }
        }

        return this.maxKeyValue();
    }

    this.pentagonalneLosowe=function(x,y){
        let tab=this.pentagonalne[Math.floor(Math.random()*4)];
        for(let i=tab[0]; i<=tab[1]; i++){
            for(let j=tab[2]; j<=tab[3]; j++){
                if ((i === 0 || j === 0) && (i !== j) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous);

                }
            }
        }
        return this.maxKeyValue();
    }
    this.pentagonalneLosoweAbsorbcyjne=function (x,y) {
        let tab=this.pentagonalne[Math.floor(Math.random()*4)];
        for(let i=tab[0]; i<=tab[1]; i++){
            for(let j=tab[2]; j<=tab[3]; j++){
                if ((i === 0 || j === 0) && (i !== j) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0 ){
                    this.checkMap( this.board[x+i][j+y].previous);

                }
            }
        }
        return this.maxKeyValue();
    }

    this.Moore=function(x,y){
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }

        return this.maxKeyValue();
    }

    this.MooreAbsorbcyjne=function(x,y){
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0 ){
                    this.checkMap( this.board[x+i][j+y].previous)
                }
            }
        }

        return this.maxKeyValue();
    }

    this.heksagonalRight=function (x,y) {

        let tab=this.heksagonalne[0];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0 ){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRightAbsorbcyjne=function(x,y){
        let tab=this.heksagonalne[0];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3]) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0 ){
                    this.checkMap( this.board[x+i][j+y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalLeft=function(x,y){
        let tab=this.heksagonalne[1];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0 ){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalLeftAbsorbcyjne=function(x,y){
        let tab=this.heksagonalne[1];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3])  && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0 ){
                    this.checkMap( this.board[x+i][j+y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRandom=function(x,y){
        let tab=this.heksagonalne[Math.floor(Math.random()*2)];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !==0 ){
                    this.checkMap( this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRandomAbsorbcyjne=function(x,y){
        let tab=this.heksagonalne[Math.floor(Math.random()*2)];
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if((i!==0 || j!==0) && (i!==tab[0] || j!==tab[1]) && (i!==tab[2] || j!==tab[3]) && x+i <this.columns && y+j<this.rows && x+i >0 && y+j>0 && this.board[x+i][y+j].previous !==0){
                    this.checkMap( this.board[x+i][j+y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.checkMap=function ( keyString) {
        this.myMap.set(keyString, this.myMap.get(keyString) === undefined ? 1 : this.myMap.get(keyString) + 1);
    }

    this.maxKeyValue=function(){
        let min=0, maxKey=0;
        for(let [key,value] of this.myMap.entries()){
            if(min<value){
                min=value;
                maxKey=key
            }
        }
        this.myMap.clear();
        return maxKey;
    }


    // The process of creating the new generation
    this.generate = function(v) {
        for ( let i = 0; i < this.columns;i++) {
            for ( let j = 0; j < this.rows;j++) {
                this.board[i][j].savePrevious();
            }
        }

        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {

                if(this.board[x][y].state===0) {

                    switch(v){
                        case 1:
                            this.board[x][y].state=this.vonNeuman(x,y);
                            break;
                        case 2:
                            this.board[x][y].state=this.vonNeumanAbsorbujace(x,y);
                            break;
                        case 3:
                            this.board[x][y].state=this.Moore(x,y);
                            break;
                        case 4:
                            this.board[x][y].state=this.MooreAbsorbcyjne(x,y);
                            break;
                        case 5:
                            this.board[x][y].state=this.pentagonalneLosowe(x,y);
                            break;
                        case 6:
                            this.board[x][y].state=this.pentagonalneLosoweAbsorbcyjne(x,y);
                            break;
                        case 7:
                            this.board[x][y].state=this.heksagonalRight(x,y);
                            break;
                        case 8:
                            this.board[x][y].state=this.heksagonalRightAbsorbcyjne(x,y);
                            break;
                        case 9:
                            this.board[x][y].state=this.heksagonalLeft(x,y);
                            break;
                        case 10:
                            this.board[x][y].state=this.heksagonalLeftAbsorbcyjne(x,y);
                            break;
                        case 11:
                            this.board[x][y].state=this.heksagonalRandom(x,y);
                            break;
                        case 12:
                            this.board[x][y].state=this.heksagonalRandomAbsorbcyjne(x,y);
                            break;
                        default:
                            return;
                    }

                }

            }
        }


    };



    // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
    this.display = function(x=0,y=0,r=0) {
        for ( var i = 0; i < this.columns;i++) {
            for ( var j = 0; j < this.rows;j++) {
                this.board[i][j].display();
            }
        }
        if(r>0 && x>0 && y>0){
            this.middleOfCircle.push({x:x, y:y});
            this.middleOfCircle.forEach((E)=>{
                noFill();
                circle(E.x, E.y, r*2)
            })

        }
    };
}