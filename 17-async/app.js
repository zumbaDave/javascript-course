const button = document.querySelector('button');
const output = document.querySelector('p');

// CALLBACKS

/*
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(posData => {  // success callback
    console.log(posData);
  }, error => { // error callback
    console.log(error);
  },);  // could have a third argument, an object for configuration

  console.log('Getting position...');
}
*/

// following is hard to read, if you have nested callbacks
/*
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(posData => {  // success callback
    console.log(posData);
    setTimeout(() => {
      console.log(posData);
    }, 2000);
  }, error => { // error callback
    console.log(error);
  },);  // could have a third argument, an object for configuration

  console.log('Getting position...');
}*/

/*
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(posData => {  // success callback
    console.log(posData);
    setTimeout(() => {
      console.log(posData);
    }, 2000);
  }, error => { // error callback
    console.log(error);
  });  // could have a third argument, an object for configuration

  setTimeout(() => {
    console.log('Timer done!');  // execute "After" following getting position console log
  }, 0); // so 0, 3000 is not a guaranteed time, it is the minimum time

  console.log('Getting position...');
}
*/

// PROMISES
// setTimeout does not use promises, so you have to put setTimeout inside of promises

/*
const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};
*/

/*
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimer(2000).then(data => {
        console.log(data, posData);
      });
    },
    error => {
      console.log(error);
    }
  );
  console.log('Getting position...');
}
*/

/*
const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimer(2000).then(data => {
        console.log(data, posData);
      });
    },
    error => {
      console.log(error);
    }
  );
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}
*/

// have to use callbacks for getCurrentPosition, there is no promise version of it
/*
const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success);
    },
    error => {
      reject(error);
    }, opts);
  });

  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};
*/

// uses promise chaining
/*
function trackUserHandler() {
  let positionData;
  getPosition().then(posData => {
    positionData = posData;
    // returning means we set setTimer to being pending, so we can use another then block after the first one
    // note: we could return a string, and that string will automatically be wrapped into a promise
    return setTimer(2000);  
  }, err => {
    console.log(err);
  })
  .then(data => {
    console.log(data, positionData);
  });

  setTimer(1000).then(() => {
    console.log('Timer done!');
  });

  console.log('Getting position...');
}
*/

/*
function trackUserHandler() {
  let positionData;
  getPosition().then(posData => {
    positionData = posData;
    // returning means we set setTimer to being pending, so we can use another then block after the first one
    // note: we could return a string, and that string will automatically be wrapped into a promise
    return setTimer(2000);  
  })
  .catch(err => {  // will not catch an error in following then block
    console.log(err);
  })
  .then(data => {
    console.log(data, positionData);
    console.log('On we go...');
  });

  setTimer(1000).then(() => {
    console.log('Timer done!');
  });

  console.log('Getting position...');
}
*/

// error in following, will cancel all execution of following then blocks from where error happened.
/*
function trackUserHandler() {
  let positionData;
  getPosition().then(posData => {
    positionData = posData;
    // returning means we set setTimer to being pending, so we can use another then block after the first one
    // note: we could return a string, and that string will automatically be wrapped into a promise
    return setTimer(2000);  
  })
  .then(data => {
    console.log(data, positionData);
    console.log('On we go...');
  })
  .catch(err => {  // will not catch an error in following then block
    console.log(err);
  });

  setTimer(1000).then(() => {
    console.log('Timer done!');
  });

  console.log('Getting position...');
}
*/

// Async and Await
const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success);
    },
    error => {
      reject(error);
    }, opts);
  });

  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

// with async here, this function automatically returns a promise
// this means you can add a then block to the call of this function if you want to
/*
async function trackUserHandler() {
  const posData = await getPosition();
  const timerData = await setTimer(2000);
  console.log(timerData, posData);
}
*/

// async and await and error handling

// with async here, this function automatically returns a promise
// this means you can add a then block to the call of this function if you want to

async function trackUserHandler() {
  let posData;
  let timerData;

  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch(error) {
    console.log(error);
  };
  
  console.log(timerData, posData);

  // using async await, these will not run right await and will wait until promises are done
  // with .then blocks, this will run right away before promises are done
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });

  console.log('Getting position...');
}


button.addEventListener('click', trackUserHandler);

// want to wait one second, and if did not get position by then, want to do something else
// race will return the promise of the fastest promise
Promise.race([
  getPosition(),
  setTimer(1000)  // timer will finish first
]).then(data => {
  console.log(data);
});

// data here will be combined data of all promises
// if one promise fails, the other promise  is not executed
/*
Promise.all([
  getPosition(),
  setTimer(1000)
]).then(promiseData => {
  console.log(promiseData);
});
*/

// following will either wait for all promises to be successful or all of them to be rejected
Promise.allSettled([
  getPosition(),
  setTimer(3000)
]).then(promiseData => {
  console.log(promiseData);
});