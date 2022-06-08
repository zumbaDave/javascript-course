const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
    const userId = 'u123';
    const user = {name: 'Dave', age: 30};
    // append to cookies, it does not replace all cookies
    //document.cookie = `uid=${userId}`;
    
    // set a max time cookie will be stored for
    //document.cookie = `uid=${userId}; max-age=2`;  // max time of 2 seconds

    // following expires at a certain date
    //document.cookie = `uid=${userId}; expires=`;  // max time of 2 seconds
    
    document.cookie = `uid=${userId}; max-age=360`;  

    document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener('click', () => {
    console.log(document.cookie);

    const cookieData = document.cookie.split(';');

    const data = cookieData.map(i => {
        return i.trim(); // get rid of excess white space
    });

    console.log(data[1].split('=')[1]);  // user value
});














