"use strict";

console.time("for loop");
const a = new Array(10000000);
for(let n = 0; n < a.length; n++)
{
    a[n] = true;
}
console.timeEnd("for loop");