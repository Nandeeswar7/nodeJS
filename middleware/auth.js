const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send("access denied no token found");
    }
    try{
        const decode = jwt.verify(token,config.get('jwtPrivatekey'));
        req.user = decode;
        next();
    }

    catch(ex){
        return res.status(400).send("invalid token");
    }
}