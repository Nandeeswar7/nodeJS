const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

function validateUser(user) {
    schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id,username:this.name,isAdmin:this.isAdmin},config.get('jwtPrivatekey'));
}

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validateUser = validateUser;