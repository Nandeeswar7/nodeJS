const express = require('express');
const router = express.Router();
const { Customer,validateCustomer } = require('../models/customers');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const customers = await Customer.find().select('-_id').sort({ name: 1 });
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send('requested ID not found');
    }
    res.send(customer);
})

router.post('/', async (req, res) => {
    result = validateCustomer(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone

    })

    try {
        const result = await customer.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

router.put('/:id', async (req, res) => {

    let customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send('requested ID not found');
    }

    result = validateCustomer(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    customer.set({
        name: req.body.name,
        isGold: req.body.isGold
    });
    try {
        const result = await Customer.save();
        res.send(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

router.delete('/:id', async (req, res) => {

    result = await Customer.findByIdAndRemove(req.params.id);
    if (!result) {
        return res.status(404).send('requested ID not found');
    }
    res.send("One customer deleted");
})

exports.customerRouter = router;