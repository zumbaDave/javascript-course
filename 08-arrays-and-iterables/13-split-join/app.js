const data = 'new york;10.99;2000';
// split is a string method
const transformedData = data.split(';');
console.log(transformedData);

const nameFragments = ['Max', 'Schwarz'];
const name = nameFragments.join(' ');  // separator is a blank space, default is a comma
console.log(name);