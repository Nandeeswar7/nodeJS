const config = require('config');
const { logger } = require('./logging');


module.exports = function(){
    if(!config.get('jwtPrivatekey')){
        logger.error('FATAL ERROR....jwt private key not defined');
        process.exit(1);
    }
}