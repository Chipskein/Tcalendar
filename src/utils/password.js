const bcryptConfig=require('../config/bcrypt');
module.exports={
    verifyPassword:(password,hash)=>{
        const { compare }=bcryptConfig.getInstance();
        return compare(password,hash);
    },
    hashPassword:(password)=>{
        const { hash }=bcryptConfig.getInstance();
        const salt=bcryptConfig.genSalt();
        return hash(password,salt);
    }
}