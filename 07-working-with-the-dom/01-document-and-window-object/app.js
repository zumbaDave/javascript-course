/* const h1 = document.getElementById('main-title');
h1.textContent = 'Some new title!';
h1.style.color = 'white';
h1.style.backgroundColor = 'black';

const li = document.querySelector('li:last-of-type');
li.textContent = li.textContent + '(Changed!)';

const body = document.body;
body.style.backgroundColor = 'white';

const listItemElements = document.querySelectorAll('li');  // will not give a live list, this just gives a snapshot

const listItemElements2 = document.getElementsByTagName('li');  // will give a live list which reflect changes, eg number of items in list array

for(const listItemEl of listItemElements) {
    console.dir(listItemEl);
}

const ul = document.querySelector('ul');
console.log(ul.children);  // will display all html elements
console.log(ul.childNodes);  // will display all nodes, including text nodes, line breaks and whitespace
console.log(ul.firstElementChild);  // can also use lastChild
console.log(ul.lastElementChild);  

const liFirst = document.querySelector('li');
console.log(liFirst.parentNode);  // can also use parentElement, almost the same

console.log(liFirst.closest('body'));

console.log(ul.previousElementSibling);  // previousElement would give a text node, but element sibling gives us the header
console.log(ul.nextElementSibling); */

const ul = document.body.firstElementChild.nextElementSibling;  // is ul
const firstLi = ul.firstElementChild;

console.log(firstLi);