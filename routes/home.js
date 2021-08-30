const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('home',{message:"find your favourite genres here",title:"my genre store"});
})

module.exports = router ;

//const express = require('express');
//const router = express.Router();

//router.get('/', (req, res) => {
//    res.render('index', { title: 'My Express App', message: 'Hello there !' });
//});

//module.exports = router;