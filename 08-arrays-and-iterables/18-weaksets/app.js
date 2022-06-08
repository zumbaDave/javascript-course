let person = { name: 'Max' };

// weak sets have to be object data types
// weak sets don't have all methods that sets have, for example there is not entries method
const persons = new WeakSet();
persons.add(person);

console.log(persons);

// weak set is useful because if javascript detects person is no longer needed, eg person = null
// it will eventually remove that person from the weak set
// however, this is not the case for a regular set, because set still holds a reference to it
// so if you forgot to delete this person in a set, then you will have a memory leak

