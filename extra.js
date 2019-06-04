let myMap=new Map();
let keyString='a string';
let keyString1='aString';
function checkMap(keyString) {
    myMap.set(keyString, myMap.get(keyString) === undefined ? 1 : myMap.get(keyString) + 1);
    console.log(myMap.get(keyString))
}

checkMap(keyString);
checkMap(keyString);
checkMap(keyString);
checkMap(keyString1);
checkMap(keyString1);
checkMap(keyString1);
checkMap(keyString);



function maxKeyValue(myMap){
    let min=0, maxKey=0;
    for(let [key,value] of myMap.entries()){
        if(min<value){
            min=value
            maxKey=key
        }
    }
    return maxKey;
}

// console.log(maxKeyValue(myMap)+' my value')
// let pentagonalne=[[-1,1,-1,0],[-1,1,0,1],[0,1,-1,1],[-1,0,-1,1]];
// console.log(pentagonalne[Math.floor(Math.random()*4)]);
// console.log(pentagonalne[Math.floor(Math.random()*4)]);
// console.log(pentagonalne[Math.floor(Math.random()*4)]);
// console.log(pentagonalne[Math.floor(Math.random()*4)]);

// let mySet=new Set();
// mySet.add('free');
// mySet['free']

let myArray=['a','b','c','d','e','g','f'];
console.log(myArray.splice(1,1));
console.log(myArray)
