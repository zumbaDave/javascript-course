const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

// sum up the values of each value in the prices array
let sum = 0;
prices.forEach((price) => {
    sum += price;
});

console.log(sum);

// using a reducer
// first parameter or reduce is a function which can take 4 parameters
// second parameter of reduce is 
const sum2 = prices.reduce((prevValue, curValue, curIndex, prices) => {
    return prevValue + curValue;
}, 0);  // 0 is optional second parameter, is starting value of what gets returned
// for first iteration of reduce, curValue is first element in array, and prevValue is 0(because we just set the initial value to 0, otherwise it would be undefined)

console.log(sum2);

const sum3 = prices.reduce((prevValue, curValue) => prevValue + curValue, 0);
console.log(sum3);