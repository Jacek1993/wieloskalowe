function Cell(x_, y_, w_, _state) {
    this.x = x_;
    this.y = y_;
    this.w = w_;

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
            r = this.hash1(this.state, 0);
            g = this.hash1(this.state, 1);
            b = this.hash1(this.state, 2);
        }

        fill(r, g, b);
        stroke(0);
        rect(this.x, this.y, this.w, this.w);
    };
}