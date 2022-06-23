const { DataTypes, Model } = require('sequelize');
const { db } = require('../conf/sequelize');
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
    created_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
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