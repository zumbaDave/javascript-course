function randomIntBetween(min, max) { // min = 5, max = 10
    // 10.9999999999999 becomes 10
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(randomIntBetween(1, 10));

function productDescription(strings, productName, productPrice) {
    return 'This is a product';
}


const prodName = 'Javascript Course';
const prodPrice = 29.99;
// following calls the productDescription function
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput);  // returns This is a product

function productDescription2(strings, productName, productPrice) {
    console.log(strings);
    console.log(productName);
    console.log(productPrice);
    return 'This is a product';
}


const prodName2 = 'Javascript Course';
const prodPrice2 = 29.99;
// following calls the productDescription function, is called a tagged template
const productOutput2 = productDescription2`This product (${prodName2}) is ${prodPrice2}.`;
console.log(productOutput2);  // returns This is a product


function productDescription3(strings, productName, productPrice) {
    console.log(strings);
    console.log(productName);
    console.log(productPrice);
    let priceCategory = 'pretty cheap regarding its price';
    if(productPrice > 20) {
        priceCategory = 'fairly priced';
    }
    return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
}


const prodName3 = 'Javascript Course';
const prodPrice3 = 29.99;
// following calls the productDescription function, is called a tagged template
const productOutput3 = productDescription3`This product (${prodName3}) is ${prodPrice3}.`;
console.log(productOutput3);  // returns This is a product

function productDescription4(strings, productName, productPrice) {
    console.log(strings);
    console.log(productName);
    console.log(productPrice);
    let priceCategory = 'pretty cheap regarding its price';
    if(productPrice > 20) {
        priceCategory = 'fairly priced';
    }
    return {
        name: productName,
        price: productPrice
    };
}


const prodName4 = 'Javascript Course';
const prodPrice4 = 29.99;
// following calls the productDescription function, is called a tagged template
const productOutput4 = productDescription4`This product (${prodName4}) is ${prodPrice4}.`;
console.log(productOutput4);  // returns This is a product


// regular expressions
const userInput = 'testtest.com';
const userInput2 = 'test@test.com';
console.log(userInput.includes('@'));

const regex = /^\S+@\S+\.\S+$/;
console.log(regex.test(userInput));
console.log(regex.test(userInput2));

const regex2 = /hello/;
console.log(regex2.test('hello'));  // true
console.log(regex2.test('hi there, hello'));  // true
console.log(regex2.test('hi there, hello ...')); // true
console.log(regex2.test('Hello')); // false

const regex3 = /(h|H)ello/;
console.log(regex3.test('hello'));  // true
console.log(regex3.test('hi - hello ...')); // true
console.log(regex3.test('hi - Hello ...')); // true
console.log(regex3.test('hi - ello ...')); // false

const regex4 = /.ello/;  // find a five character word but don't care what first character is
console.log(regex4.test('hello'));  // true
console.log(regex4.test('jello'));  // true
console.log(regex4.test('ello'));  // false

const emailRegex = /^\S+@\S+\.\S+$/;  // \. is escaping the . same for \S to escape S

console.log(regex4.exec('jello')); // will return an array with information about the regular expression
console.log(regex4.exec('Hi! jello')); // will return an array with information about the regular expression
console.log(regex4.exec('Hi! jello')); // will return an array with information about the regular expression

// following is same as above regex4.exec
console.log('hi jello'.match(regex4));






