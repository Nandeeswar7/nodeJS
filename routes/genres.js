const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/asyncMiddleware');

function validateInput(genre) {
    schema = Joi.object({
        name: Joi.string().min(3).required(),
        code: Joi.string().length(3).required()
    })
    return schema.validate(genre);
}


router.get('/', asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().select('-_id').sort({ name: 1 });
    res.send(genres);
}));

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('requested ID not found');
    }
    res.send(genre);
})

router.post('/',auth, async (req, res) => {

    result = validateInput(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const genre = new Genre({
        name: req.body.name,
        code: req.body.code
    })

    try {
        const result = await genre.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

router.put('/:id', async (req, res) => {

    let genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('requested ID not found');
    }

    result = validateInput(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    genre.set({
        name: req.body.name,
        code: req.body.code
    });
    try {
        const result = await genre.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

router.delete('/:id',[auth,admin], async (req, res) => {

    result = await Genre.findByIdAndRemove(req.params.id);
    if (!result) {
        return res.status(404).send('requested ID not found');
    }
    res.send("One genre deleted");
})

exports.genresRouter = router;