export function seedRandom(seed) {
    return parseFloat("0." + Math.sin(seed).toString().substring(6));
}

const a = 1664525, c = 1013904223, m = 4294967296;

export function randomLCG(initS = 1) {
    let s = initS;
    return () => (s = (a * s + c) % m) / m;
}

export const fakeRandom = () => {
    let i = -1;
    const arr = [ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ];
    return () => (i = (i + 1) % arr.length, arr[i]);
};
//# sourceMappingURL=random.js.map
