console.log(userName);

var userName = 'Dave';  // will console log undefined, but not cause an error because of hoisting, will pull this declaration to beginning of file, then define it on this line

console.log(userName2);

//let userName2 = 'Max';  // will cause an error, hoisting works, but browser does not set it to undefined