const winston = require('winston');


const logger = winston.createLogger({
    transports:[
        new winston.transports.File({filename:'logfile.log'}),
        new winston.transports.Console()
    ]
});

exports.logging = function(){


    process.on('uncaughtException',(ex)=>{
        logger.log('error',ex.message,ex)
    });
    
    process.on('unhandledRejection',(ex)=>{
        logger.log('error',ex.message,ex)
    });


    //const p = Promise.reject(new Error("some unhandled promise rejection"));

    //p.then(()=>{
    //    console.log("doesnt matter");
    //});

    //throw new Error('something went wrong');
}

exports.logger = logger;