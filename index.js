const express = require('express');
const app = express();

require('./startup/config')();
const { logger,logging } = require('./startup/logging');
logging();
require('./startup/routes')(app);
require('./startup/dbConnect')();










app.set('view engine', 'pug');



const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    logger.info(`listening at port ${PORT}`);
})
