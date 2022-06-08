const personData = [{name: 'Max'}, {name: 'Manuel'}];

// find is only available on real arrays
// argument of find is a function, and that function can be up to 3 arguments
// first argument: single object of that array, eg, person
// second argument: index of that single element, eg, idx
// third element is the full array, eg, persons
// find will execute the passed function on every element of the personData
// note, can use find on any array, does not have to have objects
const manuel = personData.find((person, idx, persons) => {
    return person.name === 'Manuel';  // will stop after first match
});

console.log(manuel);

// note, find returns that object by reference... 
// find does not create a copy
manuel.name = 'Anna';
console.log(manuel, personData);

const maxIndex = personData.findIndex((person, idx, persons) => {
    return person.name === 'Max';  // will stop after first match
});

console.log(maxIndex);






