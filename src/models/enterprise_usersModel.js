const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
const { Enterprises } =require('./enterprisesModel')
const { Users } =require('./usersModel')
class Enterprise_users extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Enterprise_users'
}
const tableDefinition={
    id_enterprise:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:'compositeIndex',
        references: {
            model: Enterprises,
            key: 'id',
        }
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:'compositeIndex',
        references: {
            model: Users,
            key: 'id',
        }
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
}
Enterprise_users.init(tableDefinition,tableConfig);
//Enterprise_users.sync({force:true});
module.exports = { Enterprise_users };