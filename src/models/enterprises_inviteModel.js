const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Enterprise_invite extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Enterprise_invite'
}
const tableDefinition={
    id_user:{
        type:DataTypes.INTEGER,
        references: {
            model: Users,      
            key: 'id',
          }
    },
    id_enterprise:{
        type:DataTypes.INTEGER,
        references: {
            model: Enterprise,      
            key: 'id',
          }
    },
    status:{
        type:DataTypes.STRING
    }
}
Enterprise_invite.init(tableDefinition,tableConfig);
Enterprise_invite.sync();
module.exports = { Enterprise_invite };