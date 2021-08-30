const { error } = require('../middleware/error');
const { genresRouter } = require('../routes/genres');
const moviesRouter = require('../routes/movies');
const home = require('../routes/home');
const { customerRouter } = require('../routes/customers');
const { rentalsRouter } = require('../routes/rentals');
const { usersRouter } = require('../routes/users');
const { login } = require('../routes/auth');
const express = require('express');

module.exports = function(app){
    app.use(express.json());
    app.use('/',home)
    app.use('/api/genres', genresRouter);
    app.use('/api/movies', moviesRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/rentals', rentalsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/login', login)
    app.use('/', home);
    app.use(error);
}