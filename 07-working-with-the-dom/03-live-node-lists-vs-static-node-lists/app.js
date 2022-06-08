const list = document.querySelector('ul');
const listItems = document.querySelectorAll('li'); // static and will not update when changes occur
const listItems2 = list.getElementsByTagName('li'); // one of the older query methods, will give a live list

console.dir(listItems);
console.dir(listItems2);

const newLi = document.createElement('li');
newLi.textContent = 'Item 4';
list.append(newLi);

console.dir(listItems);
console.dir(listItems2);

listItems[0].textContent = 'Item 11';