const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustedPrices = [];

for(const price of prices) {
    taxAdjustedPrices.push(price * (1 + tax));
}

console.log(taxAdjustedPrices);

// for each takes up to three arguments
// the value
// the index
// the full array
prices.forEach((price, idx, prices) => {  // prices here is a shadow variable with its own scope
    // since we are using a forEach, we can have access to the index if we want
    const priceObj = {index: idx, taxAdjPrice: price * (1 + tax)};
    taxAdjustedPrices.push(priceObj);
});

console.log(taxAdjustedPrices);