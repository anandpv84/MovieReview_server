const appmidleware=(req,res,next)=>{
    console.log("inside app midleware")
    next();
}
module.exports=appmidleware;