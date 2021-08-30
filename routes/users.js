const express = require('express');
const router = express.Router();
const { User,validateUser } = require('../models/users');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');


router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


router.post('/', async (req, res) => {
    result = validateUser(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send("email ID already exists");
    }

    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    try {
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['name','email']));
    }
    catch (ex) {
        for (field in ex.errors) {
            res.send(ex.errors[field].message);
        }
    }
})

exports.usersRouter = router;