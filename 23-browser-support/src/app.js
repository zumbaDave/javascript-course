// if we use "entry" in webpack config for polyfills
//    then we have to import these here
//    but will make a much larger file because it loads all possible polyfills
//    Is a good option if you don't know all the features(eg, you are using a lot of third party packages where you don't know what is needed)
// if we use "usage" then we don't have to make these imports
//import 'core-js/stable';
//import 'regenerator-runtime/runtime';

const button = document.querySelector('button');
const textParagraph = document.querySelector('p');

button.addEventListener('click', () => {
  const text = textParagraph.textContent;

  // dummy promise to show how polyfills work with babel
  const promise = new Promise();
  console.log(promise);

  if(navigator.clipboard) {
    navigator.clipboard.writeText(text).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  } else {
    alert('Feature not available, please copy manually!');
  }
});