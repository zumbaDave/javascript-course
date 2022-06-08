const button = document.querySelector('button');
const buttons = document.querySelectorAll('button');

// could do this approach
//button.onclick = function() {
    // code goes here
//};

// Following approach not recommended because can only add one click handler
// and cannot remove handlers
/*
const buttonClickHandler = () => {
    alert('Button was clicked!');
};

const anotherButtonClickHandler = () => {
    console.log('This was clicked');
}

// can only add one event to the button using this approach
button.onclick = anotherButtonClickHandler;
*/

/*
const buttonClickHandler = () => {
    alert('Button was clicked!');
};

const anotherButtonClickHandler = () => {
    console.log('This was clicked');
}

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    // cannot do this if you used an anonymous function above, unless you stored that function in a constant
    // also, will not work if you say buttonClickHandler.bind(this), above, because bind creates a new object, unless you store the bound function in a constant
    button.removeEventListener('click', buttonClickHandler);
}, 2000);
*/

const buttonClickHandler = event => {
    //event.target.disabled = true;
    console.log(event);
};

//button.addEventListener('click', buttonClickHandler);

/*
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', buttonClickHandler);
});

window.addEventListener('scroll', event => {
    console.log(event);
});
*/

/*
let curElementNumber = 0;

function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;

    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}

window.addEventListener('scroll', scrollHandler);
*/

//const form = document.querySelector('form');
//form.addEventListener('submit', event => {
//    event.preventDefault();
//    console.log(event);
//});

const div = document.querySelector('div');

//div.addEventListener('click', event => {
//    console.log('CLICKED DIV');
//    console.log(event);
//}, true);  // setting true to make event listener be part of capturing phase, false is default, bubbling phase

div.addEventListener('click', event => {
    console.log('CLICKED DIV');
    console.log(event);
});  

// note, moveEvents tend not to propagate, so no need to stop propagation on those events
//button.addEventListener('click', event => {
//    event.stopPropagation();
//    //event.stopImmediatePropagation(); // would be useful if you have multiple event listeners are attached to button, and will not continue with them
//    console.log('CLICKED BUTTON');
//    console.log(event);
//});

const listItems = document.querySelectorAll('li');

//cumberson approach and bad for performance and memory issues.
//listItems.forEach(listItem => {
//    listItem.addEventListener('click', event => {
//        event.target.classList.toggle('highlight');
//    });
//});

// better way is to use event delegation
const list = document.querySelector('ul');
const listComplex = document.querySelector('#complex-list');

// only adding one event listeners instead of multiple events listeners above
//list.addEventListener('click', event => {
    // target will be list item not the entire list
//    event.target.classList.toggle('highlight');
//});

// problem with a complex list
// only part of complex list clicked, will get the highlight
//listComplex.addEventListener('click', event => {
    //console.log(event.currentTarget); // will be the entire list, always
//    event.target.classList.toggle('highlight');
//});

// use dom traversing to find closest li
// also, if you click on the list item itself, the closest li will be the list item itself
listComplex.addEventListener('click', event => {
    //console.log(event.currentTarget); // will be the entire list, always
    event.target.closest('li').classList.toggle('highlight');
});

//button.addEventListener('click', event => {
//    event.stopPropagation();
//    //event.stopImmediatePropagation(); // would be useful if you have multiple event listeners are attached to button, and will not continue with them
//    console.log('CLICKED BUTTON');
//    console.log(event);
//    console.log(this);  // arrow function will show window for this
//});

button.addEventListener('click', function(event) {
    event.stopPropagation();
    //event.stopImmediatePropagation(); // would be useful if you have multiple event listeners are attached to button, and will not continue with them
    console.log('CLICKED BUTTON');
    console.log(event);
    console.log(this);  // arrow function will show window for this
});

const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    // regular function, this points to button, if event listener on list is an arrow function
    // but if event listener on list is a normal function as well, this will point to the ul list, the current target of the event
    console.log(event);  
});


// will trigger form submit when we click any list item in list
list.addEventListener('click', event => {
    // target will be list item not the entire list
    event.target.classList.toggle('highlight');
    // following will not actually execute the form event listener, thus the prevent default will not work
    // however, if we said button.click() it would trigger the event listener for that button, with dummy x and y values
    // but it will not trigger the submit event handler for forms
    // if you want to run the event listener for the form, make an event handler for the submit button itself
    // and call click on that
    //form.submit();  // could also call form.click()

    button.click();
});


