const jwt = require('jsonwebtoken');
const Sign = process.env.JWT_SECRET;
module.exports={
    configSessionJWTToken:(data)=>{
        const JWT_CONFIG={
            expiresIn: '3d'
        }
        return JWT_CONFIG
    },
    configTempJWTToken:(data)=>{
        const JWT_CONFIG={
            expiresIn: '1h'
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

