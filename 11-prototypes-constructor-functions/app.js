class AgedPerson {
    printAge() {
        console.log(this.age);
    }
}


class Person extends AgedPerson {
    name = 'Max';

    constructor() {
        super();
        this.age = 30;
    }

    // method shorthand, javascript will add this to the prototype of the object, not in the object directly
    greet() {
        console.log('Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.');
    }
}

const p = new Person();
const p2 = new Person();
// prototype of p is the exact same object of prototype in p2
// the greet method is created and in the prototype of each, thus both of these objects use the very same greet method
// Javascript does this for us when we define Person as a class.
// however if we use function constructors to make a Person Object, we would have to manually add the greet method in the prototype ourselves
// but......
// if we defined greet above as a property function
// greet = function () 
    //console log(......);
//}
// or as a property arrow function
// greet = () => { console.log(...);}
// Then the greet function would not be in the prototype, and be part of the original object.
// meaning it would be re-created every time a new Person object is made
// so the way it is currently defined, is more optimized as javascript adds it to prototype for us
// but if you define the method as an arrow function, we get the benefit of this referring to the class itself 
console.log(p.__proto__ === p2.__proto__);

// changing prototypes
// create a course object with the literal object notation
const course = {
    title: 'Javascript - The Complete Guide',
    rating: 5
};

// getPrototypeOf, can do this instead of __proto__, which is not really the way you are supposed to get prototype
console.log(Object.getPrototypeOf(course));

// following completely changed the prototype
// all other default functions from prototype are gone as we do not copy them over.
Object.setPrototypeOf(course, {
    // if you want to keep all default prototype methods, add this spread operator
    ...Object.getPrototypeOf(course),  // but will be it's own prototype
    printRating: function() {
        console.log(`${this.rating}/5`);
    }
});

console.log(Object.getPrototypeOf(course));

course.printRating();

// another way to create an object
// but object we pass as the parameter is the prototype, not the object itself
const student = Object.create({
    printProgress: function() {
        console.log(this.progress);
    }
});

console.log(student);

// if you want to add to the student object, you do so with the dot notation
student.name = 'Max';

// or the defineProperty method
Object.defineProperty(student, 'progress', {
    configurable: true,
    enumerable: true,
    value: 0.8,
    writeable: false
});

console.log(student);

// another way of adding properties 
const student2 = Object.create({
    printProgress: function() {
        console.log(this.progress);
    }
}, {
    name: {
        configurable: true,
        enumerable: true,
        value: 'Dave',
        writeable: true
    }
});

console.log(student2);

/*
// Behind the scenes, classes are converted to constructor functions
function Person() {
    this.age = 30;
    this.name = 'Max';
    this.greet = function() {
        console.log('Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.');
    };
}

// add a static function
Person.describe = function() {
    console.log('Creating persons...')
}

console.dir(Person);

// after doing this, this printAge function will become the value of __proto__
//Person.prototype = {
//    printAge() {
//        console.log(this.age);
//    }
//};

Person.prototype.printAge = function() {
    console.log(this.age);
};

// Person will not return anything unless we call return
const p = new Person();
p.greet();
p.printAge();
console.log(p.toString());  // toString is in prototype of Person 
console.log(p.__proto__);
console.dir(Object);
console.dir(Object.prototype);
*/