export const zip = (...arrays) => {
    const length = Math.min(...arrays.map((arr) => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
};