module.exports=(req,res,next)=>{
    if(!req.user){
        //return to stop the processing of the request and dont pass to other middlewares
        return res.status(401).send({error:"You must Login!"});
    }
    next();
}