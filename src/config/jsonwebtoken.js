const jwt = require('jsonwebtoken');
const Sign = process.env.JWT_SECRET;
module.exports={
    configSessionJWTToken:(data)=>{
        const JWT_CONFIG={
            expiresIn: '30d'
        }
        return JWT_CONFIG
    },
    configTempJWTToken:(data)=>{
        const JWT_CONFIG={
            expiresIn: '3h'
        }
        return JWT_CONFIG
    },
    getInstance:()=>{
        return {
                checkToken:jwt.verify,
                genToken:jwt.sign,
                key:Sign
        };
        
    }
}

