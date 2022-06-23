const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Times_invite extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Times_invite'
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
    status:{
        type:DataTypes.STRING
    }
}
Times_invite.init(tableDefinition,tableConfig);
Times_invite.sync();
module.exports = { Times_invite };