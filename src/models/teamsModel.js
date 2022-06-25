const { DataTypes, Model } = require('sequelize');
class Times extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Times'
        }
        const tableDefinition={
            id_enterprise:{
                type:DataTypes.INTEGER,
                references: {
                    model: 'Enterprises',      
                    key: 'id',
                  }
            },
            id_user:{
                type:DataTypes.INTEGER,
                references: {
                    model: 'Users',      
                    key: 'id',
                  }
            },
            name:{
                type:DataTypes.STRING,
                allowNull: false
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue: true
            },
        }
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {
        //create associations
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}
module.exports={Times};