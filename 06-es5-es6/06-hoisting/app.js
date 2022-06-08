let name = 'Max';  // block scope
//let name = 'Anna'; // will not work

var name1 = 'Dave';
//var name1 = 'Anna'; // will work

function greet() {
    let age = 30;
    console.log(name);  // shadowing a variable
    console.log(name, age);
}

//console.log(name, age);  // age cannot be used here
console.log(name); // will work

greet();

var name2 = 'Max';

function greet2() {
    var age = 30;
    var name = 'Manuel';
    console.log(name, age);
}

var name3 = 'Dave';

if(name3 === 'Dave') {
    var hobbies = ['Sports', 'Cooking'];
    let cars = ['Ferrari', 'Rogue'];
}

console.log(hobbies); // will work
//console.log(cars);  // will not work

