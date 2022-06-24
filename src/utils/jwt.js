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
        const { genToken,key }=jwtConfig.getInstance()
        const token=genToken(data,key,config);
        return token;
    },
    getDataFromToken:(token)=>{
        const { checkToken,key }=jwtConfig.getInstance();
        const tokenData = checkToken(token,key);
        return tokenData;
    }
}