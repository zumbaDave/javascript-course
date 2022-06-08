const testResults = [1, 5.3, 1.5, 10.99, -5, 10];

// copy by value
console.log(testResults.slice());  // slice returns a brand new array, so it copies the original array

// copy by reference
const storedResults = testResults;  // copies by reference, change to one, will change both arrays
testResults.push(5.91);

console.log(storedResults, testResults);

const storedResults2 = testResults.slice(); // store a copy of the testResults, by value

testResults.push(567);

console.log(storedResults2, testResults);

// slice can be used for selecting ranges

const storedResults3 = testResults.slice(0, 2);  // starts at index 0, and goes to index 2(third element, but does not include it)
console.log(storedResults3);

const storedResults4 = testResults.slice(-3, -1);  // will select from the third last element to the last element, last two elements
console.log(storedResults4);

const storedResults5 = testResults.slice(2); // select third element all the way to the end of the array
console.log(storedResults5);