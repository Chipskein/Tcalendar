const { DataTypes, Model } = require('sequelize');
class Enterprise_users extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Enterprise_users'
        }
        const tableDefinition={
            id_enterprise:{
                type:DataTypes.INTEGER,
                allowNull: false,
                unique:'compositeIndex',
            },
            id_user:{
                type:DataTypes.INTEGER,
                allowNull: false,
                unique:'compositeIndex',
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue: true
            },
        }
        
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {

    }
}
module.exports = {Enterprise_users};