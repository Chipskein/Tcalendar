const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports={
    genSalt:()=>{
        const salt=bcrypt.genSaltSync(saltRounds);
        return salt
    },
    getInstance:()=>{
        return {
            compare:bcrypt.compareSync,
            hash:bcrypt.hashSync
        }
    }
}