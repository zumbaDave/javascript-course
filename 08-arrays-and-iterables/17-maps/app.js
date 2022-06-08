const person1 = {name: 'Max'};
const person2 = {name: 'Manuel'};

// using an array inside of array to initialize
// const personData = new Map([['key', 'some value']]);

// maps can have anything for a key, including an object
const personData = new Map([[person1, [{date: 'yesterday', price: 10}]]]);

console.log(personData);

console.log(personData.get(person1));  // person1 is a key, it will know that it is not a copy of person1, but is actual person1

// adding data to a map
personData.set(person2, [{date: 'two weeks ago', price: 100}]);
console.log(personData);

for(const entry of personData.entries()) {
    console.log(entry);
}

// using destructuring
for( const [key, value] of personData.entries()) {
    console.log(key, value);
}

for(const key of personData.keys()) {
    console.log(key);
}
for(const value of personData.values()) {
    console.log(value);
}

console.log(personData.size);