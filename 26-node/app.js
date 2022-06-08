/*
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// do the following to send html to client
app.set('view engine', 'ejs');
app.set('views', 'views');

// use middleware, using bodyParser
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next(); // tells express to move to next middleware in line
});

// use another middleware
app.use((req, res, next) => {
    //let userName = 'Unknown User';
    // can do following because we are using body parser
    const userName = req.body.username || "Unknown User";
    res.render('index', {
        user: userName
    });
});

app.listen(3000);
*/

const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location');

const app = express();


// use middleware, using bodyParser
app.use(bodyParser.json());

// allow cors
// need to allow options because options is a request to see what requests are allowed
// if we don't allow options, we will get a cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(locationRoutes);

app.listen(3000);