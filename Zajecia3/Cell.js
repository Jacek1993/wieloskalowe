
function Cell(x_, y_, w_, _state) {
    this.x = x_;
    this.y = y_;
    this.w = w_;

    this.state=_state ;
    this.previous = this.state;

    this.savePrevious = function() {
        this.previous = this.state;
    };

    this.newState = function(s) {
        this.state = s;
    };

    this.hash=function(param, state) {



        let c = 20000;
        param = (param << 6 & 268435455) + state + (state << 14);
        c = param & 266338304;
        param = c !== 0 ? param ^ c >> 21 : param;
        return param % 256;

    }
        this.display = function() {
        let r=255,g=255,b=255;

        if(this.state!==0){
            r=this.hash(this.state, 10);
            g=this.hash(this.state, 100);
            b=this.hash(this.state,1000);
        }

        fill(r,g,b);
        stroke(0);
        rect(this.x, this.y, this.w, this.w);
    };
}