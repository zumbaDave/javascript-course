// pure function
function add(num1, num2) {
    return num1 + num2;
}

console.log(add(1, 5));
console.log(add(12, 15));


// impure function
function addRandom(num1) {
    return num1 + Math.random();
}

console.log(addRandom(5));

let previousResult = 0;

// function with side effects because we change a variable outside of function
function addMoreNumbers(num1, num2) {
    const sum = num1 + num2;
    previousResult = sum;
    return sum;
}

console.log(addMoreNumbers(1, 5));

const hobbies = ['Sports', 'Cooking'];

// function with side effects
function printHobbies(h) {
    h.push('NEW HOBBY');
    console.log(h);
}

printHobbies(hobbies);

// Factory functions are functions that produce other functions

// pure function
/*
function calculateTax(amount, tax) {
    return amount * tax;
}

const valAmount = calculateTax(100, 0.19);
const incomeTax = calculateTax(100, 0.25);
*/

// Factory function
function createTaxCalculator(tax) {
    function calculateTax(amount) {
        return amount * tax;  // can access tax since this function is inside the other one
    }

    return calculateTax;  // just return the pointer to the inner function
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));
console.log(calculateIncomeTaxAmount(100));
console.log(calculateIncomeTaxAmount(200));

// EVERY JAVASCRIPT FUNCTION IS A CLOSURE
// because every function closes over the variables in it's environment, 
// for example, the following example, tax is remembered in createTaxCalculator
//  tax is not thrown away when the createTaxCalculator is done after it is called
// this is not true of all languages

let multiplier = 1.1;

function createTaxCalculator2(tax) {
    function calculateTax(amount) {
        console.log(multiplier);
        return amount * tax * multiplier;  // can access tax since this function is inside the other one
    }

    return calculateTax;  // just return the pointer to the inner function
}

const calculateVatAmount2 = createTaxCalculator2(0.19);
const calculateIncomeTaxAmount2 = createTaxCalculator2(0.25);

multiplier = 1.2;

// at this point, will use 1.2 as multiplier
console.log(calculateVatAmount2(100));
console.log(calculateVatAmount2(200));
console.log(calculateIncomeTaxAmount2(100));
console.log(calculateIncomeTaxAmount2(200));

multiplier = 1.5;

// at this point, will use 1.5 as multiplier
console.log(calculateVatAmount2(100));
console.log(calculateVatAmount2(200));
console.log(calculateIncomeTaxAmount2(100));
console.log(calculateIncomeTaxAmount2(200));

// closures in practice
let userName = 'Max';

// locks in access to userName
function greetUser() {
    console.log('Hi ' + userName);
}

greetUser(); // Hi Max

userName = 'Manuel';

greetUser(); // Hi Manuel

let userName2 = 'Max';

function greetUser2() {
    let name = userName2;
    console.log('Hi ' + name);
}

greetUser2();  // Hi Max

userName2 = 'Manuel';

greetUser2(); // Hi Manuel


let userName3 = 'Max';

function greetUser3() {
    //let name = 'Anna';
    console.log('Hi ' + name);
}

//greetUser3();  // Hi Anna

let name = 'Maximilian';
userName3 = 'Manuel';

greetUser3(); // Hi Maximilian

// RECURSION

// no recrusion
function powerOf(x, n) {
    let result = 1;
    for(let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(powerOf(2, 3));

// recursion
function powerOf2(x, n) {
    if(n === 1) {
        return x;
    }
    return x * powerOf2(x, n - 1);
}

console.log(powerOf2(2, 3));

function powerOf3(x, n) {
    return n === 1 ? x : x * powerOf3(x, n - 1);
}

console.log(powerOf3(2, 3));

// ADVANCED RECURSION

const myself = {
    name: 'Max',
    friends: [
        {
            name: 'Manuel',
            friends: [
                {
                    name: 'Chris',
                    friends: [
                        {
                            name: 'Hari'
                        },
                        {
                            name: 'Amilia'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Julia'
        }
    ]
};

// would be difficult to use a loop here, because we would not know how many nested loops to make
function getFriendNames(person) {
    const collectedNames = [];

    if(!person.friends) {
        return [];
    }

    for(const friend of person.friends) {
        collectedNames.push(friend.name);
        collectedNames.push(...getFriendNames(friend));  // make sure to use spread operator so we add each element of array one by one into collectedArray
    }

    return collectedNames;
}

console.log(getFriendNames(myself));


