const nameData = ['Max', 'Schwarz', 'Mr', 30];
// ...otherInformation will collect all remaining elements in the array
const [firstName, lastName, ...otherInformation] = nameData;

console.log(firstName, lastName, otherInformation);
