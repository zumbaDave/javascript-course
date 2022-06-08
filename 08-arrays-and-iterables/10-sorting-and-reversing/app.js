const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

// will not change original array, returns a new array
const taxAdjustedPrices = prices.map((price, idx, prices) => {
    const priceObj = { index: idx, taxAdjPrice: price * (1 + tax) };
    return priceObj;
});

console.log(prices);
console.log(taxAdjustedPrices);

const sortedPrices = prices.sort();  // sort by default converts everything by string, so the prices will not be sorted by numbers
console.log(sortedPrices);

// to sort by numbers
// if you do this for strings, it will only check the first character of a string
const sortedPrices2 = prices.sort((a, b) => {
    if(a > b) {
        return 1;
    } else if(a === b) {
        return 0;
    } else {
        return -1;
    }
});

console.log(sortedPrices2);
console.log(sortedPrices.reverse());