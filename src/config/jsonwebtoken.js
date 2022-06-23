const jwt = require('jsonwebtoken');
const Sign = process.env.JWT_SECRET;
module.exports={
    createJWTToken:(data)=>{
        const JWT_CONFIG={
            expiresIn: '30d'
        }
        const token = jwt.sign(data, Sign, JWT_CONFIG);
        return token;
    },
    getDataFromToken:(token)=>{
        const tokenData = jwt.verify(token,Sign);
        return tokenData;
    }
}

