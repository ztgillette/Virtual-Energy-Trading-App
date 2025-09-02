"use strict";

function seedRandom(seed) {
    return parseFloat("0." + Math.sin(seed).toString().substring(6));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fakeRandom = exports.randomLCG = exports.seedRandom = void 0, exports.seedRandom = seedRandom;

const a = 1664525, c = 1013904223, m = 4294967296;

function randomLCG(initS = 1) {
    let s = initS;
    return () => (s = (a * s + c) % m) / m;
}

exports.randomLCG = randomLCG;

const fakeRandom = () => {
    let i = -1;
    const arr = [ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ];
    return () => (i = (i + 1) % arr.length, arr[i]);
};

exports.fakeRandom = fakeRandom;
//# sourceMappingURL=random.js.map
