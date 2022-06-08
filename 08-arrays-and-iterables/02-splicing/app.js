const hobbies = ['Sports', 'Coding'];

// splice are only available only on real arrays, not on array like objects or iterables
// first parameter where to start, second parameter how many elements to delete, and then as many items as you want to add
hobbies.splice(0, 0, 'Good Food');
console.log(hobbies);

hobbies.splice(0, 1);  // remove first element
console.log(hobbies);

hobbies.splice(0); // will delete all items in array splice(1), would delete all elements after the first one
console.log(hobbies);

// note, splice will return removed elements

const hobbies2 = ['Sports', 'Good Food', 'Coding'];
hobbies2.splice(-1, 1);  // will remove last element
console.log(hobbies2);