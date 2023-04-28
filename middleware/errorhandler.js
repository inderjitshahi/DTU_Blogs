const errorHandler=(error,req,res,next)=>{
    // console.log("called from errorhandler");
    // console.log(error.message);
    res.render('error',{
        message:error?.message,
    })
    next();
}

export default errorHandler;