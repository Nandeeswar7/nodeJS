const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema(
    {
        customer:{
            type : new mongoose.Schema({
                name: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 50
                },
                isGold: {
                    type: String,
                    required: true
                },
                phone: {
                    type: Number,
                    length: 10,
                    required: true
                }
            }),
            required:true
        },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 50
                },
                dailyRentalRate: {
                    type: Number,
                    required: true
                }
            }),
            required:true
        },
        dateOut:{
            type:Date,
            default : Date.now()
        }      
    }
));

exports.Rental = Rental;