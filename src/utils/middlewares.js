const { getCookie, getUserInfoByToken} = require("./jwt");

module.exports={

    verifyToken:async(req,res,next)=>{
        const cookie = req.headers.cookie;
        const token = getCookie(cookie,'token');
        if (cookie==null||token == '') return res.redirect('/users/login');
        const userInfo=await getUserInfoByToken(token);
        if(userInfo.token_type=='session'){
            req.data=userInfo;
            next();
        } else {
            res.cookie('token','');
            return res.redirect('/users/login');
        }
    },
    verifyHasNoToken:async(req,res,next)=>{
        const cookie = req.headers.cookie;
        const token = getCookie(cookie,'token');
        if (cookie!=null&&token != '') return res.redirect('/users/home');
        next();
    },

    isLogged:async (req,res,next)=>{
        const { data }=req;
        if(data!=null){
            req.data=data;
            next()
        }
        else return res.redirect('/users/login');
    },
    isNotLogged:(req,res,next)=>{
        const { data }=req;
        if(data==null) next();
        else return res.redirect('/users/home');
    },
    isNotInEnterPrise:async (req,res,next)=>{
        const { data }=req;
        const { user }=data;
        const { enterprise }=user;
        if(!enterprise){
            req.data=data;
            next();
        }
        else return res.redirect('/users/home');
    },
    isInEnterPrise:async (req,res,next)=>{
        const { data }=req;
        const { user }=data;
        const { enterprise }=user;
        if(enterprise){
            req.data=data;
            next();
        }
        else return res.redirect('/users/home');
    },
    isEnterpriseOwner:(req,res,next)=>{
        const { data }=req;
        const { user }=data;
        const { enterprise }=user;
        if(enterprise.owner==user.id){
            req.data=data;
            next();
        }
        else return res.redirect('/users/home');
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}