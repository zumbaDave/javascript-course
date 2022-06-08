const numbers = [1, 2, 3];  // best way for performance, also most common way
console.log(numbers);

const moreNumbers = new Array(); // []

const moreNumbers2 = new Array('Hi!', 'Welcome!'); // ['Hi!', 'Welcome!']
console.log(moreNumbers2);

const moreNumbers3 = new Array(1, 5); // [1, 5]
console.log(moreNumbers3);

const moreNumbers4 = new Array(5);  // [undefined, undefined, undefined, undefined, undefined]
console.log(moreNumbers4);

const yetMoreNumbers = Array.of(1, 2);  // [1, 2], niche cases for doing this
console.log(yetMoreNumbers);

// takes in an iterable or array like object, Array.from(1, 5, 7); would produce an error
// converts an iterable or array like object into an actual object
// you can also pass in an array, which does not make sense to do really
const moreNumbers5 = Array.from('Hi!');  // ['H', 'I', '!']
console.log(moreNumbers5);

const listItems = document.querySelectorAll('li'); // returns a NodeList, which is an iterable and an array like object
const arrayListItems = Array.from(listItems) // [li, li, li]
console.log(arrayListItems);

const hobbies = ['Cooking', 'Sports'];
const personalData = [30, 'Max', {moreDetail: []}];
const analyticalData = [[1, 1.6], [-5.4, 2.1]];

for(const data of analyticalData) {
    for(const dataPoint of data) {
        console.log(dataPoint);
    }
}

console.log(personalData[1]);

const hobbies2 = ['Sports', 'Cooking'];
hobbies2.push('Reading'); 
console.log(hobbies2);

hobbies2.unshift('Coding');  // adds to start of array, returns a number which is new length of array
console.log(hobbies2);

hobbies2.pop(); // remove last element, will return the popped value
console.log(hobbies2);

hobbies2.shift(); // remove first element in array
console.log(hobbies2);

// note shift and unshift are slower then push and pop, push and pop are way faster
// shift and unshift will move all elements in the array

hobbies2[1] = 'Coding';
console.log(hobbies2);

hobbies2[5] = 'Reading';  // will add undefined spots for position 2, 3, 4, and then Reading in position 5, rarely used
console.log(hobbies2);








