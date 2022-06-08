/*
const xhr = new XMLHttpRequest();

// following does not open the request
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

// not supported by all browsers.
//xhr.addEventListener()

// if doing this, you don't have to parse JSON to javascript
xhr.responseType = 'json';

xhr.onload = function() {
    //const listOfPosts = JSON.parse(xhr.response);  // convert to javascript object

    // do not need to parse here because responseType is set to JSON above so will automatically convert to javascript object
    const listOfPosts = xhr.response;
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true); // set true for a deep clone
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl);
    }
};

// will send the request
xhr.send();
*/


/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.onload = function() {
            //resolve(xhr.response);
            // const listOfPosts = JSON.parse(xhr.response);

            // check for server side errors
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error('Something went wrong!'));
            }
        };

        // this error will only work if you have a network error, lost internet, etc
        // this error will not kick in if server sends an error code(like 404)
        // but.. 
        // by adding error checking above for server side errors in the onload, then 
        //    this method will kick in for server side errors
        // so now we can wrap the fetchPosts code in a try catch block
        xhr.onerror = function() {
            reject(new Error('Failed to send request!'));
        }

        xhr.send(JSON.stringify(data)); // convert data to JSON
    });

    return promise;
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts'
        );
    
        const listOfPosts = responseData;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    } catch(error) {
        alert(error.message);
    }
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON') {
        // since button is in a list item, closest will give us the li the button is in, which has the id of the item we want to delete
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});
*/




// USING FETCH
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

// sending json data
/*
function sendHttpRequest(method, url, data) {
    // fetch returns a promise
    // default is GET request
    //return fetch(url).then(response => {
    
    return fetch(url, {
        method: method,
        body: JSON.stringify(data), // convert data to json
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.status >= 200 && response.status < 300) {
            // need to call response.json, it returns a promise as well
            return response.json();  // convert response from json to javascript, also returns stream body into a snapshot
            //return response.text();  // return as plain text
            // return response.blob();  // return contents of a file
        } else {
            return response.json().then(errData => {
                console.log(errData);
                return new Error('Something went wrong - server-side');
            });
        }
    }).catch(error => {
        console.log(error);
        throw new Error('Something went wrong!');
    });
}
*/

// sending form data
function sendHttpRequest(method, url, data) {
    // fetch returns a promise
    // default is GET request
    //return fetch(url).then(response => {
    
    return fetch(url, {
        method: method,
        body: data

    }).then(response => {
        if(response.status >= 200 && response.status < 300) {
            // need to call response.json, it returns a promise as well
            return response.json();  // convert response from json to javascript, also returns stream body into a snapshot
            //return response.text();  // return as plain text
            // return response.blob();  // return contents of a file
        } else {
            return response.json().then(errData => {
                console.log(errData);
                return new Error('Something went wrong - server-side');
            });
        }
    }).catch(error => {
        console.log(error);
        throw new Error('Something went wrong!');
    });
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts'
        );
    
        const listOfPosts = responseData;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    } catch(error) {
        alert(error.message);
    }
}


// sending json data
/*
async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}
*/

// sending form data
// form data would be good to use if you are sending a file, et photo.png
// form data is good so you can automatically parse a form
async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    // by passing form to FormData, javasript will try to parse the form to collect the data from the form
    //    for this to work though, in the html, make sure your inputs have a name attribute
    const fd = new FormData(form);
    //fd.append('title', title);
    //fd.append('body', content);
    fd.append('userId', userId);  // can still append to form data

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd);
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON') {
        // since button is in a list item, closest will give us the li the button is in, which has the id of the item we want to delete
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});