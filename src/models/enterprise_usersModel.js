const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Enterprise_users extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Enterprise_users'
}
const tableDefinition={
    id_enterprise:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:'compositeIndex',
        references: {
            model: Enterprises,
            key: 'id',
        }
    },
    id_user:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:'compositeIndex',
        references: {
            model: Users,
            key: 'id',
        }
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Enterprise_users.init(tableDefinition,tableConfig);
Enterprise_users.sync();
module.exports = { Enterprise_users };