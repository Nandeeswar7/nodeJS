module.exports = function(req,res,next){
    console.log("ok");
    if(!req.user.isAdmin){
        return res.status(403).send("access denied");
    }
    next();
}