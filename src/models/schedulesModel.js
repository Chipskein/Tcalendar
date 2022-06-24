const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Schedules extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Schedules'
}
const tableDefinition={
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_time:{
        type:DataTypes.INTEGER,
        references: {
            model: Times,      
            key: 'id',
          }
    },
    date:{
        type:DataTypes.DATE,
    },
    duration:{
        type:DataTypes.STRING,
    },
    hasEnded:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Schedules.init(tableDefinition,tableConfig);
Schedules.sync();
module.exports = { Schedules };