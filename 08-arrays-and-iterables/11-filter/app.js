const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

// will not change original array, returns a new array
const filteredArray = prices.filter((price, idx, prices) => {
    return price > 6;  // any items with price greater then 6 will be kept
});

// does same thing as above
const filteredArray2 = prices.filter(price => price > 6);

console.log(filteredArray);
console.log(filteredArray2);
