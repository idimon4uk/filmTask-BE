var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let { filmsRouter, starsRouter }= require('./routes');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/films',filmsRouter);
app.use('/api/stars',starsRouter);


module.exports = app;
