function hash(param, state){
    let c=20000;
    param = (param<<6&268435455) + state + (state<<14);
    c = param & 266338304;
    param = c!==0?param^c>>21:param;
    return param%256;
}

// console.log(hash(1, 10));
// console.log(hash(1, 11));
// console.log(hash(1, 12));
// console.log(hash(4, 10));
// console.log(hash(2, 13));
// console.log(hash(1, 10000));

let tab=[2,2,3,3];
tab=tab.sort((a,b)=>a>b);
let state=tab[0];
let iter=0;
for(let i=1; i<tab.length; i++)
{
    if(tab[i-1]===tab[i] && iter===0){
        iter++;
        state=tab[i-1];
    }
}

// console.log(state)
number='';
number+=1;






