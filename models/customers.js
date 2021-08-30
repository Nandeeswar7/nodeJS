const mongoose = require('mongoose');
const Joi = require('joi');

function validateCustomer(customer) {
    schema = Joi.object({
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
        phone: Joi.number().required()
    })
    return schema.validate(customer);
}

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        length: 10,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;