const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Enterprises extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Enterprises'
}
const tableDefinition={
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner:{
        type:DataTypes.INTEGER,
        references: {
            model: Users,      
            key: 'id',
          }
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Enterprises.init(tableDefinition,tableConfig);
Enterprises.sync();
module.exports = { Enterprises };