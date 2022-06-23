const { DataTypes, Model } = require('sequelize');
const { db } = require('../conf/sequelize');
class Times_users extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Times_users'
}
const tableDefinition={
    id_user:{
        type:DataTypes.INTEGER,
        references: {
            model: Users,      
            key: 'id',
          }
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
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Times_users.init(tableDefinition,tableConfig);
Times_users.sync();
module.exports = { Times_users };