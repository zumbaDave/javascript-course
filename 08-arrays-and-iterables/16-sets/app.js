const ids = new Set(); // creates an empty set

const ids2 = new Set([1, 2, 3]);  // can pass in any type of iterable
console.log(ids2);
console.log(ids2.has(1));

ids2.add(2);  // will not add another 2
console.log(ids2.has(2));
console.log(ids2);

const ids3 = new Set(['Hi', 'From', 'Set']);

//ids3.entries(any set entries will do that) returns an iterable
for(const entry of ids3.entries()) {
    console.log(entry);
}

// output from above will be
// ["Hi", "Hi"]
// ["From", "From"]
// ["Set", "Set"]
// it does this to be inline with the map method

// you could use .values so it will not double the values as it does with .entries
for(const entry of ids3.values()) {
    console.log(entry);
}

// deleting an entry
ids3.delete('Hi');
console.log(ids3);
