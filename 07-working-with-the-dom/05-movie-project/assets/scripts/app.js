const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
//const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive'); // could use document.querySelector as well...
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const updateUI = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies) {
        if(movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    //listRoot.removeChild(listRoot.children[movieIndex]);  // more backwards compatible
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');  // use let as part of workaround to remove listener for confirm button

    // part of the work around to remove listener on confirm button
    // do a deep close of the button
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    // if we cancel the deletion modal, then when reopening it, another event listener will be created, memory leeak
    // so we have to remove any previous listeners
    // we can do this with cancel, because it is not using bind.  bind would return a copy of the function(and not the original listener in memory)
    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

    // the confirm Button, it uses bind, so we cannot simply remove the listener as above
    // we have to do a work around to remove the listener


    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating} stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for(const userInput of userInputs) {
        userInput.value = '';
    }
}

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' || 
        imageUrlValue.trim() === '' || 
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 and 5)');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

