const { Sequelize,QueryTypes } = require('sequelize');
const { DATABASE_URL,DATABASE_CONFIG } =require('./database');
const sequelize = new Sequelize(DATABASE_URL,DATABASE_CONFIG);

module.exports={
    db:sequelize,
    rawQuery:async (query)=>{
        const res=await sequelize.query(query,{
            type: QueryTypes.SELECT,
            raw: true,
        });
        return res;
    }
}