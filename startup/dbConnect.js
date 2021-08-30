const mongoose = require('mongoose');
const { logger } = require('./logging');

module.exports = function(){
    mongoose.connect('mongodb://localhost/genreProject', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info("connected to the database"))
}