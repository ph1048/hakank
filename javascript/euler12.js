/* 

  Euler #12 in JavaScript.

  Problem 12
  """
  The sequence of triangle numbers is generated by adding the natural numbers. 
  So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. 
  The first ten terms would be:

  1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

  Let us list the factors of the first seven triangle numbers:

       1: 1
       3: 1,3
       6: 1,2,3,6
      10: 1,2,5,10
      15: 1,3,5,15
      21: 1,3,7,21
      28: 1,2,4,7,14,28

  We can see that the 7th triangle number, 28, is the first triangle number 
  to have over five divisors.

  Which is the first triangle number to have over five-hundred divisors?")
  """

  This JavaScript program was created by Hakan Kjellerstrand, hakank@gmail.com
  See also my JavaScript page: http://www.hakank.org/javascript/

*/

'use strict';
var {all_divisors,all_divisors2,factors,collect,prime_divisors,isPrime,prod,timing2} = require('./js_utils.js');

//
// This is basically factors + collect together so it's not general
// enought for placing in js_utils.js...
//
var factors_map = function(n) {
    if (n === 1) {
        return {1:1};
    }
    var m = {};
    while (n % 2 === 0) {
        if (m[2] === undefined) {
            m[2] = 0;
        }
        m[2] += 1;
        n /= 2;
    }
    var t = 3;
    while (n > 1 && t < Math.ceil(Math.sqrt(n))) {
        while (n % t === 0) {
            if (m[t] === undefined) {
                m[t] = 0;
            }            
            m[t] += 1
            n /= t;
        }
        t += 2
    }
    if (n > 1) {
        if (m[n] === undefined) {
            m[n] = 0;
        }
        m[n] += 1;
    }
    return m;
}


// Brute force: This is way too slow... 553920ms (553.9s)
// var euler12a = function() {
//     var len = 0;
//     var i = 0;
//     var tnum = 0;
//     while (len <= 500) {
//         i++;
//         tnum += i;
//         var divs = all_divisors(tnum);
//         len = divs.length;
//         // console.log([i,tnum,len]);
//         if (i % 1000 === 0) {
//             console.log([i,tnum,len]);
//         }
//     }
//     console.log([i,tnum,len]);
//     return tnum;
// }

// 60ms
var euler12b = function() {
    var len = 0;
    var i = 0;
    var tnum = 0;
    while (len <= 500) {
        i++;
        tnum += i;
        var f = factors_map(tnum);
        len = prod(Object.values(f).map(i=>i+1));
    }
    return tnum;
}

//  47ms
var euler12c = function() {
    var len = 0;
    var i = 0;
    var tnum = 0;
    while (len <= 500) {
        i++;
        tnum += i;  
        len = prod(Object.values(collect(factors(tnum))).map(j=>j+1))
    }
    return tnum;
}


// timing2(euler12a); // too slow
// timing2(euler12b);
timing2(euler12c);
