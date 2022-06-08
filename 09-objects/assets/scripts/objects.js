const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

// empty string means we will not filter
const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');
    
    if(movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = ''; // clear movieList dom object(not ideal way to do it)

    const filteredMovies = !filter 
        ? movies 
        : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        
        // see if a property name is in object
        if('info' in movie) {
            // do something
        }

        // see if a property is not in object
        if(!('info' in movie)) {
            // do something
        }
        // or
        if(movie.info === undefined) {
            // so something
        }
        
        const { info, ...otherProps } = movie;

        console.log(otherProps);  // will only show id because is the only other prop

        //const { title } = info;
        // can user movieTitle instead of title
        //const { title: movieTitle } = info;

        // can also use destructuring on a method inside of an object
        let { getFormattedTitle } = movie;

        //movieEl.textContent = movie.info.title;
        //let text = movie.info.title + ' - ';
        //let text = info.title + ' - ';
        //let text = movie.getFormattedTitle() + ' - ';
        // will not work because the "this" will refer to window object(in non strict mode, or undefined in strict mode)
        // this... even though is in object, refers to what calls the method
        // The following, movie is what calls getFormattedTitle(), so this will work as expected
        //let text = movie.getFormattedTitle();
        // The following, this refers to nothing, because nothing called getFormattedTitle(), so this will be the window or undefined
        //let text = getFormattedTitle() + ' - '; 


        // use bind to getFormattedTitle()
        //getFormattedTitle = getFormattedTitle.bind(movie);  // make this refer to movie
        // let text = getFormattedTitle() + ' - ';

        // instead of bind, you can use call
        // bind stores for future use
        // call executes right away
        // call, like bind, can have an infinite number of parameters
        //let text = getFormattedTitle.call(movie);  // sets this to refer to movie

        // apply is same as call, but only have one optional parameter
        //   which has to be an array
        let text = getFormattedTitle.apply(movie)  + ' - ';

        //for(const key in movie.info) {
        for(const key in info) {
            //if(key !== 'title') {
            // change if statement to also check for _title since we added getter and setters
            if(key !== 'title' && key != '_title') {
                //text = text + `${key}: ${movie.info[key]}`;
                text = text + ` ${key}: ${info[key]}`;
            }
        } 
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    /*
    if(
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }
    */

    /*
    const newMovie = {
        info: {
            title, // short for title: title
            [extraName]: extraValue, // we don't know the value of the extra name which is a key, so in square brackets
        },
        id: Math.random().toString(),
        //getFormattedTitle: function() {
        //    return this.info.title.toUpperCase();
        //}
        // shorter way to write above method
        getFormattedTitle() {
            console.log(this);  // this will refer to whatever called this method
            return this.info.title.toUpperCase();
        }

        // following arrow function, this will refer to the global object(the window)
        // sort of...  if this is bound to something already(other then object window), then an arrow function will not change that binding
        // so if you have a regular function that binds this to something, and then do a nested arrow function inside that function
        //     then the arrow function will not change what the regular function bound this to.
        //getFormattedTitle: () => {
        //    console.log(this);
        //    return this.info.title.toUpperCase(); // error because this is the window object since we are now using an arrow function
        //}
    };
    */

    if(
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }

    // getters and setters on an object
    const newMovie = {
        info: {
            set title(val) {
                if(val.trim() === '') { // can do a check if you want to, can also throw an error if you want to
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = val;
            },
            get title() {  // you can omit the getter if you like and/or omit the setter
                return this._title; 
            },
            [extraName]: extraValue, // we don't know the value of the extra name which is a key, so in square brackets
        },
        id: Math.random().toString(),
        getFormattedTitle() {
            return this.info.title.toUpperCase();
        }
    };

    // using the setter to set to title we got above, gets used like a normal property
    newMovie.info.title = title;

    // using the getter, we can access like a normal property
    console.log(newMovie.info.title);

    movies.push(newMovie);
    renderMovies();
};

// this will refer to button that called this, set in addEventListener
//const searchMovieHandler = function {
//    console.log(this);
//    const filterTerm = document.getElementById('filter-title').value;
//    renderMovies(filterTerm);
//};

// every function has it's own this, makes sure this is bound to something, whatever calls it, or undefined if nothing calls it
// arrow functions don't know what "this" is, so "this" will be the window, strict mode will not change this
const searchMovieHandler = () => {
    console.log(this);
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);


/*
const movieList = document.getElementById('movie-list');
movieList.style.backgroundColor = 'red';

// can also do the following
movieList.style['backgroundColor'] = 'red';
movieList.style['background-color'] = 'red';

// but cannot do this
//movieList.style.background-color = 'red';

movieList.style.display = 'block';

const userChosenKeyName = 'level';

const person = {
    'first name': 'Max',  // can use first name as a key name, if we put them into quotes, but not likely to do it this way
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    [userChosenKeyName]: '...',  // level: '...'
    greet: function() {
        alert('Hi there!');
    },
    1.5: 'hello',  // a key can be a positive number, 0 or higher 
};

delete person.age; // remove age property from person object
// can also say person.age = undefined  ... but we never really should set something to undefined
person.isAdmin = true;

console.log(person);
console.log(person['first name']); // how to get access to property first name
console.log(person[1.5]);  // will work
console.log(person['1.5.']);  // also works

//  can also dynamically access properties in an object
const keyName = 'first name';
console.log(person[keyName]);
*/