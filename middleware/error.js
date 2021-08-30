const { logger } = require('../startup/logging');

exports.error = function(err,req,res,next){
    logger.log('error',err.message,err);
    res.status(500).send("something failed");
}
