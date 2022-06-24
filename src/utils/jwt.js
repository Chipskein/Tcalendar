const jwtConfig=require('../config/jsonwebtoken');
module.exports={
    createJWT:(data,type)=>{
        let config={}
        switch(type){
            case 'temp':
                config=jwtConfig.configTempJWTToken();
                break;
            case 'session':
                config=jwtConfig.configSessionJWTToken();
                break;
        }
        const { jwt,Sign }=jwtConfig.getInstance()
        const token=jwt.verify(data,Sign,config);
        return token;
    },
    getDataFromToken:(token)=>{
        const { jwt,Sign }=jwtConfig.getInstance();
        const tokenData = jwt.verify(token,Sign);
        return tokenData;
    }
}