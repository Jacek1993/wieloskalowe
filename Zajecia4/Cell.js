function Cell(x_, y_, w_, _state, condition) {
    this.x = x_;
    this.y = y_;
    this.w = w_;

    this.state = _state;
    if(condition!==undefined) {
        this.c_o_gravity_X = Math.floor(random(this.w));
        this.c_o_gravity_Y = Math.floor(random(this.w));
    }
    this.previous = this.state;

    this.savePrevious = function () {
        this.previous = this.state;
    };

    this.newState = function (s) {
        this.state = s;
    };

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
        if(!condition) {
            if (this.state > 0) {
                r = this.hash1(this.state, 0);
                g = this.hash1(this.state, 1);
                b = this.hash1(this.state, 2);
            }
        }

        fill(r, g, b);
        stroke(0);
        rect(this.x, this.y, this.w, this.w);
        stroke(0);

        if(condition) {
            let x=this.x+this.c_o_gravity_X;
            let y=this.y+this.c_o_gravity_Y;
            if(x >this.x+this.w-2){
                x=this.x+this.w-2;
            }
            else if(x<this.x+2){
                x=this.x+2;
            }
            if(y>this.y+this.w-2){
                y=this.y+this.w-2;
            }
            else if(y<this.y+2){
                y=this.y+2;
            }
            if(this.state===0){
                fill(255, 0, 0);
                circle(x, y, 4)
            }
            if(this.state===1){
                fill(0,255,0)
                circle(x,y,4);
            }
            if(this.state===2){
                fill(0,0,255);
                circle(x,y,4);
            }

        }
    };
}