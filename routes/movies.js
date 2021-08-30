const express = require('express');
const router = express.Router();
const joi = require('Joi');
const mongoose = require('mongoose');
const { Genre } = require('../models/genres')
const { Movie } = require('../models/movies')





function validateMovie(movie) {
    const schema = joi.object({
        title: joi.string().min(3).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().required(),
        numberInStock: joi.number().required()
    });
    return schema.validate(movie);
}

router.get('/', async (req, res) => {
    const movies = await Movie.find().select('-_id');
    console.log(movies);
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id).select('-_id');
    if (!movie) {
        return res.status(404).send('requested ID not found');
    }
    res.send(movie);
});

router.post('/', async (req, res) => {

    result = validateMovie(req.body);
    if (res.error) {
        return res.error(400).send(res.error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId);

    if (!genre) {
        return res.status(404).send("Invalid Genre");
    }


    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
            code: genre.code
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    try {
        const result = await movie.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
});

router.put('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).send('requested ID not found');
    }

    result = validateMovie(req.body);
    if (res.error) {
        return res.error(400).send(res.error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId);

    if (!genre) {
        return res.status(404).send("Invalid Genre");
    }

    movie.set({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        const result = await movie.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            return res.send(ex.errors[field].message);
        }
    }
});

router.delete('/:id', async (req, res) => {

    result = await Movie.findByIdAndRemove(req.params.id);
    if (!result) {
        return res.status(404).send('requested ID not found');
    }
    res.send("One movie deleted");
})

module.exports = router;