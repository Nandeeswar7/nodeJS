const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Rental } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().select('-_id');
    res.send(rentals);
});

exports.rentalsRouter = router;

router.get('/:id',async (req,res)=> {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
        return res.status(404).send('requested ID not found');
    }
    res.send(rental);
})

router.post('/', async (req, res) => {
    const customeR = await Customer.findById(req.body.customerId);
    if(!customeR){
        return res.status(400).send("Invalid customer ID");
    }

    const moviE = await Movie.findById(req.body.movieId);
    if(!moviE){
        return res.status(400).send("Invalid movie ID");
    }

    if(moviE.numberInStock===0){
        return res.status(400).send("movie out of stock");
    }

    const rental = new Rental({
        customer:{
            _id:customeR._id,
            name:customeR.name,
            isGold:customeR.isGold,
            phone:customeR.phone
        },
        movie:{
            _id:moviE._id,
            title:moviE.title,
            dailyRentalRate:moviE.dailyRentalRate
        }

    })

    try {
        new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id:moviE._id},{
                $inc:{numberInStock:-1}
            })
            .run()

        res.send(rental);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

exports.rentalsRouter = router;