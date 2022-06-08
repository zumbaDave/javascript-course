const list = document.querySelector('ul');

//list.remove();  // not supported in IE
list.parentElement.removeChild(list);  // will work in IE