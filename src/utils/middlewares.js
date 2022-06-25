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
    isNotInEnterPrise:async (req,res,next)=>{
        const { user }=req.session
        const { enterprise }=user;
        if(!enterprise) next(); 
        else return res.redirect('/users/home');
    },
    isInEnterPrise:async (req,res,next)=>{
        const { user }=req.session
        const { enterprise }=user;
        if(enterprise) next(); 
        else return res.redirect('/users/home');
    },
    isEnterpriseOwner:(req,res,next)=>{
        const { user }=req.session
        const { enterprise }=user;
        if(enterprise.owner==user.id) next(); 
        else return res.redirect('/users/home');
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}