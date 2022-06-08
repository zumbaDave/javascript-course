const nameFragments = ['Max', 'Schwarz'];

// makes a copy of the array
const copiedNameFragments = [...nameFragments];
nameFragments.push('Mr');
console.log(nameFragments, copiedNameFragments);

const prices = [10.99, 5.99, 3.99, 6.59];

// Math.min does not take an array, but instead takes stand alone values, spread operator gets those values out of the array
console.log(Math.min(...prices));

const persons = [{name: 'Max', age: 30}, {name: 'Manuel', age: 31}];
const copiedPersons = [...persons];
persons.push({name: 'Anna', age: 29});

console.log(persons, copiedPersons);

// when copying objects with the spread operator, yes the new array is copied by value, but...
// the objects inside that array are copied by reference...  
// So you can push a new object into the original array, and it will not show up in the copied array.
// but.... if you make changes to objects in original array, those changes will be reflected in copied array, and vice versa

persons[0].age = 31;
console.log(persons, copiedPersons);

// if you do not want to copy the objects by reference, you can use the map method
// however if there is another array or object nested inside, then those inner objects and arrays will be copied by reference, and you would have to write similar code to copy by value
// we are just returning an object, so to keep javascript from thinking it is opening and closing brackets, surround them with round brackets
const copiedPersons2 = persons.map(person => ({name: person.name, age: person.age}));  // copy objects by value
persons[0].hobbies = "Driving";

console.log(persons, copiedPersons2);