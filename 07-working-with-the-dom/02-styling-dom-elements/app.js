const section = document.querySelector('section');
const button = document.querySelector('button');
const list = document.querySelector('ul');
const div = document.querySelector('div');

section.className = 'red-bg';

//section.innerHTML = '<h2>A new title</h2>';

//list.innerHTML = list.innerHTML + '<li>Item 4</li>';  // will re-render entire list, so potentially bad for performance

// div.innerHTML = div.innerHTML + '<p>Something went wrong!</p>';  // any changes in input will be lost
// div.insertAdjacentHTML('beforeend', '<p>Something went wrong!</p>');  // will not re-render the input

const newLi = document.createElement('li');
list.appendChild(newLi);
newLi.textContent = 'Item 4';

list.append('Some Text');  // append does not work in IE

const newLi2 = document.createElement('li');
newLi2.textContent = 'Item 5';

list.prepend(newLi2);  // prepend does not work in IE

const newLi3 = document.createElement('li');
newLi3.textContent = 'Item 6';

list.lastElementChild.before(newLi3);   // before and after will not work on IE and safari

const newLi4 = document.createElement('li');
newLi4.textContent = 'Item 7';

list.firstElementChild.replaceWith(newLi4);

const secondLi = list.children[1];
const newLi5 = document.createElement('li');
newLi5.textContent = 'Item 8';
secondLi.insertAdjacentElement("afterend", newLi5);  // safer way since has better browser support

button.addEventListener('click', () => {
    section.classList.toggle('visible');
    section.classList.toggle('invisible');
});


// cloning dom nodes
const newLi6 = newLi.cloneNode(true);  // boolean determines a deep close or not, true will do a deep clone
list.append(newLi, newLi6);