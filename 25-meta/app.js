// Library Code
//const uid = Symbol('uid'); // passing uid is only useful for logging purposes, just for help as a developer, does not do anything
//technically don't have to add uid in parameter
const uid = Symbol();

console.log(uid);

const user = {
    //id: 'p1',
    //instead of id which can be changed, use the uid Symbol
    [uid]: 'p1',
    name: 'Max',
    age: 30,
    // using a built in symbol
    [Symbol.toStringTag]: 'User' // tweeks what toString prints
};

// App Code

// following is possible with object property, 
// following will change id, but uid will never change
user.id = 'p2'; // symbols would prevent this

// can change uid as well, but if user has no way of knowing about it, they will not
// following will work
user[uid] = 'p3';

console.log(user.toString());

const company = {
    curEmployee: 0,
    employees: ['Max', 'Manu', 'Anna'],
    // an object with a next method is an iterator
    next() {
        if(this.curEmployee >= this.employees.length) {
            return { value: this.curEmployee, done: true };
        }
        const returnValue = { 
            value: this.employees[this.curEmployee], 
            done: false 
        };
        this.curEmployee++;
        return returnValue;
    },
    // value of iterator will be a generator that builds an interator(an object that has a next method)
    // need to do this so we can use a for loop on this object
    [Symbol.iterator]: function* employeeGenerator() {
        // write looping logic here
        //let employee = company.next();
        //while(!employee.done) {
        //    yield employee.value;
        //    employee = company.next();
        //}

        let currentEmployee = 0;
        while(currentEmployee < this.employees.length) {
            // yield acts like return, it returns what follows
            // but yield define returns value of every call to the next method
            //   then pauses, and when runs again, continues where paused
            yield this.employees[currentEmployee];
            currentEmployee++;
        }
    }
};

//console.log(company.next());
//console.log(company.next());
//console.log(company.next());
//console.log(company.next());
//console.log(company.next());


// above next function is useful for the following

/*
let employee = company.next();
while(!employee.done) {
    console.log(employee.value);
    employee = company.next();
}
*/

// can do the following because we added Symbol.iterator to company
for(const employee of company) {
    console.log(employee);
}

// can also now use the spread operator on company
//   because we created the Symbol.iterator
console.log([...company]);

// working with flex api
const course = {
    title: 'Javascript - The Complete Guide'
};

Reflect.setPrototypeOf(course, {
    toString() {
        return this.title
    }
});

// Reflect api is similar to Object api
// Reflect is available with es6, and has some advantages, error handling for example
// Reflect also has other properties that Object API does not have, eg... deleteProperty
//Reflect.deleteProperty(course, 'title');

console.log(course.toString());

// Proxy API
const courseHandler = {
    // a get trap(proxy api uses traps)
    // will run when someone tries to get a value of the object wrapped by the proxy
    get(obj, propertyName) {
        console.log(propertyName);
        if(propertyName === 'length') {
            return 0;
        }
        //return obj[propertyName];
        return obj[propertyName] || 'NOT FOUnD';
    },
    // set trap
    set(obj, propertyName, newValue) {
        // can send data to analytics server
        console.log('Sending data...');
        if(propertyName === 'rating') {
            return;
        }
        // only set property if it is not rating
        obj[propertyName] = newValue; 
    }
};

const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 5;
console.log(pCourse.title);
