let person = { name: 'Max' };

// advantage of a weak map is same as a weak set
// if javascript detects that an object in the weak map is not longer referenced, it will be garbage collected

const personData = new WeakMap();
personData.set(person, 'Extra info!');

console.log(personData);

person = null;

