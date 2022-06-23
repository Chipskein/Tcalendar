const { DataTypes, Model } = require('sequelize');
const { db } = require('../conf/sequelize');
class Times extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Times'
}
const tableDefinition={
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_enterprise:{
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
    created_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Times.init(tableDefinition,tableConfig);
Times.sync();
module.exports = { Times };