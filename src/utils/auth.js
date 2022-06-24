module.exports={
    isLogged:async (req,res,next)=>{
        const session=req.session;
        if(session.user!=null) next();
        else return res.redirect('/users/login');
    },
    isNotLogged:(req,res,next)=>{
        const session=req.session;
        if(session.user==null) next();
        else return res.redirect('/users/home');
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}