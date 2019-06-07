function GOL(kt) {

    this.w = 8;
    this.columns = Math.floor(width / this.w);
    this.rows = Math.floor(height / this.w);
    this.nucleaons = 0;
    this.pentagonalne = [[-1, 1, -1, 0], [-1, 1, 0, 1], [0, 1, -1, 1], [-1, 0, -1, 1]];
    this.heksagonalne = [[-1, 1, 1, -1], [-1, -1, 1, 1]];
    this.myMap = new Map();
    this.montecarloArray = [];
    this.sign = 0;
    this.kt = document.getElementById('coefficient').value ? document.getElementById('coefficient').value : 0.1;
    this.mcIterations = document.getElementById('mciteration').value ? document.getElementById('mciteration').value : 10;
    this.A = document.getElementById('Acoeffcient').value ? document.getElementById('Acoeffcient').value : 86710969050178.5;
    this.B = document.getElementById('Bcoefficient').value ? document.getElementById('Bcoefficient').value : 9.41268203527779;
    this.timeStart = 0.001;
    this.sign1 = true;
    this.roPrev = 0;
    this.stringToFile='';
    this.roCritical=4215840142323.42/(this.columns*this.rows);
//todo zmienic obliczanie czasu bo tam moze byc blad

    // Game of life board
    this.board = new Array(this.columns);
    this.energy = new Array(this.columns);
    for (var i = 0; i < this.columns; i++) {
        this.board[i] = new Array(this.rows);
        this.energy[i] = new Array(this.rows);
    }

    this.init = function () {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.board[i][j] = new Cell(i * this.w, j * this.w, this.w, 0, 0, false);
                this.energy[i][j] = new Cell(i * this.w, j * this.w, this.w, 0, 0, true);
            }
        }
    }

    this.init();


    this.initNucleaon = function (X, Y) {
        if (this.board[X][Y].state === 0) {
            this.board[X][Y].state = ++this.nucleaons;
        }
        console.log(this.nucleaons);

    }


    this.vonNeuman = function (x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i === 0 || j === 0) && (i !== j) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous);

                }
            }
        }

        return this.maxKeyValue();
    }

    this.vonNeumanAbsorbujace = function (x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i === 0 || j === 0) && (i !== j) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous);

                }
            }
        }

        return this.maxKeyValue();
    }

    this.pentagonalneLosowe = function (x, y) {
        let tab = this.pentagonalne[Math.floor(Math.random() * 4)];
        for (let i = tab[0]; i <= tab[1]; i++) {
            for (let j = tab[2]; j <= tab[3]; j++) {
                if ((i === 0 || j === 0) && (i !== j) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous);

                }
            }
        }
        return this.maxKeyValue();
    }
    this.pentagonalneLosoweAbsorbcyjne = function (x, y) {
        let tab = this.pentagonalne[Math.floor(Math.random() * 4)];
        for (let i = tab[0]; i <= tab[1]; i++) {
            for (let j = tab[2]; j <= tab[3]; j++) {
                if ((i === 0 || j === 0) && (i !== j) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous);

                }
            }
        }
        return this.maxKeyValue();
    }

    this.Moore = function (x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }

        return this.maxKeyValue();
    }

    this.MooreAbsorbcyjne = function (x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous)
                }
            }
        }

        return this.maxKeyValue();
    }

    this.heksagonalRight = function (x, y) {

        let tab = this.heksagonalne[0];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRightAbsorbcyjne = function (x, y) {
        let tab = this.heksagonalne[0];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalLeft = function (x, y) {
        let tab = this.heksagonalne[1];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalLeftAbsorbcyjne = function (x, y) {
        let tab = this.heksagonalne[1];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRandom = function (x, y) {
        let tab = this.heksagonalne[Math.floor(Math.random() * 2)];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous !== 0) {
                    this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.heksagonalRandomAbsorbcyjne = function (x, y) {
        let tab = this.heksagonalne[Math.floor(Math.random() * 2)];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i !== 0 || j !== 0) && (i !== tab[0] || j !== tab[1]) && (i !== tab[2] || j !== tab[3]) && x + i < this.columns && y + j < this.rows && x + i > 0 && y + j > 0 && this.board[x + i][y + j].previous !== 0) {
                    this.checkMap(this.board[x + i][j + y].previous)
                }
            }
        }
        return this.maxKeyValue();
    }

    this.checkMap = function (keyString) {
        this.myMap.set(keyString, this.myMap.get(keyString) === undefined ? 1 : this.myMap.get(keyString) + 1);
    }

    this.maxKeyValue = function () {
        let min = 0, maxKey = 0;
        for (let [key, value] of this.myMap.entries()) {
            if (min < value) {
                min = value;
                maxKey = key
            }
        }
        this.myMap.clear();
        return maxKey;
    }


    this.maxValueValue = function () {
        let min = 0;
        for (let value of this.myMap.values()) {
            if (min < value) {
                min = value;
            }
        }
        this.myMap.clear();
        return min;
    }


    // The process of creating the new generation
    this.generate = function (v) {
        this.sign++;
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.board[i][j].savePrevious();
            }
        }

        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {

                if (this.board[x][y].state === 0) {
                    this.sign = 0;
                    switch (v) {
                        case 1:
                            this.board[x][y].state = this.vonNeuman(x, y);
                            break;
                        case 2:
                            this.board[x][y].state = this.vonNeumanAbsorbujace(x, y);
                            break;
                        case 3:
                            this.board[x][y].state = this.Moore(x, y);
                            break;
                        case 4:
                            this.board[x][y].state = this.MooreAbsorbcyjne(x, y);
                            break;
                        case 5:
                            this.board[x][y].state = this.pentagonalneLosowe(x, y);
                            break;
                        case 6:
                            this.board[x][y].state = this.pentagonalneLosoweAbsorbcyjne(x, y);
                            break;
                        case 7:
                            this.board[x][y].state = this.heksagonalRight(x, y);
                            break;
                        case 8:
                            this.board[x][y].state = this.heksagonalRightAbsorbcyjne(x, y);
                            break;
                        case 9:
                            this.board[x][y].state = this.heksagonalLeft(x, y);
                            break;
                        case 10:
                            this.board[x][y].state = this.heksagonalLeftAbsorbcyjne(x, y);
                            break;
                        case 11:
                            this.board[x][y].state = this.heksagonalRandom(x, y);
                            break;
                        case 12:
                            this.board[x][y].state = this.heksagonalRandomAbsorbcyjne(x, y);
                            break;
                        default:
                            return;
                    }

                }

            }
        }
        if (this.sign > 0 && this.sign < this.mcIterations) {
            this.checkIfInGrain();
            let index;
            let tab = [];
            while (this.montecarloArray.length > 0) {
                index = Math.floor(Math.random() * this.montecarloArray.length);
                let e = this.montecarloArray.splice(index, 1);

                this.countEnergy(e, tab);

                this.myMap.clear();
                tab.length = 0;

            }
        }
        if (this.sign > this.mcIterations) {
            this.dynamicRecrystallization();
        }

    };

    this.initRandom = function (number) {
        let counter = 0, x, y;
        while (counter < number) {
            x = Math.floor(Math.random() * this.columns);
            y = Math.floor(Math.random() * this.rows);
            if (this.board[x][y].state === 0) {
                this.board[x][y].state = ++this.nucleaons;
                counter++;
            }
        }
    }

    this.checkIfGrainOnTheEdge = function (x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                this.checkMap(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].state)

            }
        }
    }

    this.checkIfInGrain = function () {

        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {

                this.checkIfGrainOnTheEdge(x, y);

                if (this.maxValueValue() < 9) {

                    this.montecarloArray.push({x: x, y: y});
                }
                else {
                    this.energy[x][y].state = 8;
                }
            }
        }
    }

    this.countEnergy = function (e, tab) {

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                this.checkMap(this.board[(e[0].x + i + this.columns) % this.columns][(e[0].y + j + this.rows) % this.rows].state)

            }
        }
        let EB = 9 - this.myMap.get(this.board[e[0].x][e[0].y].state);

        for (let key of this.myMap.keys()) {
            tab.push(key);
        }
        let randState = Math.floor(Math.random() * tab.length);
        this.checkMap(tab[randState]);

        let EA = 9 - this.myMap.get(tab[randState]);

        let dif = EA - EB;
        if (dif <= 0) {
            this.board[e[0].x][e[0].y].state = tab[randState];
        }
        else {
            let p = Math.exp(-(dif / this.kt))
            let likelihood = Math.random();
            if (likelihood <= p) {
                this.board[e[0].x][e[0].y].state = tab[randState];
            }
        }
        this.energy[e[0].x][e[0].y].state = dif;


    }

    this.dynamicRecrystallization = function () {

        // console.log(time);
        let ro = (this.A / this.B) + (1 - this.A / this.B) * Math.exp(-this.B * this.timeStart);
        // console.log(ro)
        let deltaRo = ro - this.roPrev;
        this.stringToFile+=this.timeStart+'   '+deltaRo+'\n';
        let avDeltaRo = deltaRo / (this.columns * this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j].dislocation += 0.3 * avDeltaRo;
                this.energy[i][j].dislocation+=0.3*avDeltaRo;
                deltaRo -= 0.3 * avDeltaRo;
            }
        }
        this.giveAwayRestOfPackage(deltaRo, avDeltaRo);
        this.checkIfRoCritical();
        console.log(this.stringToFile)
        this.timeStart+=0.001;
        if(this.timeStart >0.01 && this.timeStart <0.011) {
            this.popUpDownloadFile(this.stringToFile)
        }
    }

    this.giveAwayRestOfPackage = function (deltaRo, avDeltaRo) {
        let x, y, rand;
        while (deltaRo > 0) {
            x = Math.floor(Math.random() * this.columns);
            y = Math.floor(Math.random() * this.rows);
            this.checkIfGrainOnTheEdge(x, y);
            rand = Math.random();
            if (this.maxValueValue() < 9) {
                if (rand <= 0.2) {
                    this.board[x][y].dislocation += 0.001 * avDeltaRo;
                    this.energy[x][y].dislocation+=0.001*avDeltaRo;
                    deltaRo -= 0.01 * avDeltaRo;
                }
            }
            else {
                if (rand <= 0.8) {
                    this.board[x][y].dislocation += 0.001 * avDeltaRo;
                    this.energy[x][y].dislocation+=0.001*avDeltaRo;
                    deltaRo -= 0.01 * avDeltaRo;
                }
            }
            this.myMap.clear();
        }
    }

    this.checkIfRoCritical=function(){
        for(let x=0; x<this.columns; x++){
            for(let y=0; y<this.rows; y++){

                let rx=false, maxDislocation=true;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if ((i === 0 || j === 0) && (i !== j) ) {
                           if(this.board[x][y].dislocation < this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].dislocation){
                               maxDislocation=false;
                           }
                           if(this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].recrystal){
                               rx=true;
                           }
                        }
                    }
                }
                if(rx && maxDislocation) {
                    this.board[x][y].dislocation = 0;
                    this.energy[x][y].dislocation = 0;
                    this.board[x][y].recrystal = true;
                }

                this.checkIfGrainOnTheEdge(x,y);
                if(this.maxValueValue() <9 && this.board[x][y].dislocation>this.roCritical){
                    this.board[x][y].dislocation=0;
                    this.energy[x][y].dislocation=0;
                    this.board[x][y].recrystal=true;
                }
                this.myMap.clear();
            }
        }
    }



    this.makeTextFile=function(text){
        var textFile = null;
        var data = new Blob([text], {type: 'text/plain'});
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    this.popUpDownloadFile=function (string) {
        var link = document.createElement('a');
        link.setAttribute('download', 'info.txt');

        link.href = this.makeTextFile(string);
        document.body.appendChild(link);

        window.requestAnimationFrame(function () {
            var event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });
    }


    this.display = function () {

        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.board[i][j].display();
            }
        }
    };

    this.displayEnergy = function () {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.energy[i][j].display();
            }
        }

    }
}