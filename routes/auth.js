const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const asyncMiddleware = require('../middleware/asyncMiddleware');

function validate(user){
    schema = Joi.object(
        {
            email:Joi.string().min(5).max(255).email().required(),
            password:Joi.string().min(5).max(255).required()
        }
    );
    return schema.validate(user);
}


router.post('/',asyncMiddleware(async (req,res) => {
    const result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send("Invalid email ID or password");
    }

    const validatePassword = await bcrypt.compare(req.body.password,user.password)

    if(!validatePassword){
        return res.status(400).send("Invalid email ID or password");
    }

    const token = user.generateAuthToken();

    res.send(token)
}));




exports.login = router;