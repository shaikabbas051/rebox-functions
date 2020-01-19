const functions = require('firebase-functions');
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require('cors');
//import routes
const ulb = require('./routes/ulb');
const gc = require('./routes/gc');
const user = require('./routes/user');
const static = require('./routes//static');
//
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use((req, res, next) => {
    console.log(`Requested ${req.path} with method ${req.method} and body`);
    console.log(req.body)
    next();
})
app.use("/ulb", ulb);
app.use('/gc', gc);
app.use('/user', user);
app.use('/static', static);
app.get('/', (req, res) => {
    res.send('Welcome to the Rebox');
})
app.use('*', (req, res) => {
    res.send('Incorrect url request');
})
exports.rebox = functions.https.onRequest((request, response) => {
    console.log(`path:${request.path} ------- method:${request.method}`);
    console.log(request.body);
    return app(request, response)
});
