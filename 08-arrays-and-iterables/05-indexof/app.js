const testResults = [1, 5.3, 1.5, 10.99, 1.5, -5, 10];

// will return 2, will stop when it finds first item that matches
console.log(testResults.indexOf(1.5));  // second optional argument which is an index where to start
console.log(testResults.lastIndexOf(1.5));

const personData = [{name: 'Max'}, {name: 'Manuel'}];

// following will return -1, as it did not find a match
// that is because objects are references, and therefore is different
console.log(personData.indexOf({name: 'Manuel'}));  // returns -1




