
function Cell(x_, y_, w_, _state, dislocation, energy) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.dislocation=dislocation;
    this.energy=energy
    this.recrystal=false;

    this.state = _state;
    this.previous = this.state;

    this.savePrevious = function () {
        this.previous = this.state;
    };

    this.newState = function (s) {
        this.state = s;
    };

    this.hash = function (param, state) {


        let c = 20000;
        param = (param << 6 & 268435455) + state + (state << 14);
        c = param & 266338304;
        param = c !== 0 ? param ^ c >> 21 : param;
        return param % 256;

    }

    this.hash1 = function (number, location) {
        let counter = 0;
        let final = '';
        while (counter < 8) {
            final += (number % 2) ? 1 : 0;
            number = Math.floor(number / 2);
            counter++;
        }

        switch(location){
            case 0:
                return parseInt(final,2);
            case 1:
                return parseInt(final.split('').reverse().join(''),2);
            case 2:
                return 255 -parseInt(final, 2);
        }

    }
    this.display = function () {
        let r = 255, g = 255, b = 255;

        if (this.state > 0) {
            r=0;
            g=this.hash1(this.state,2)
            b = this.hash1(this.state, 0);
            if(this.recrystal){
                r=this.hash1(this.state,2);
                g=0;
                b=0;
            }
        }

        if(this.energy){
            r=0; g=153; b=153;
            if(this.dislocation <50000000){
                r=0; g=0; b=255;
            }
            else if(this.dislocation <900000000){
                r=0; g=255; b=0;
            }
           else{
                r=255; g=0; b=0;
            }
            fill(r,g,b);
            stroke(0);
            rect(this.x, this.y, this.w, this.w);
        }
        else{
            fill(r, g, b);
            stroke(0);
            rect(this.x, this.y, this.w, this.w);
        }


    };
}
