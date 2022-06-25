const { DataTypes, Model } = require('sequelize');
class Times_users extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Times_users'
        }
        const tableDefinition={
            id_user:{
                type:DataTypes.INTEGER,
                references: {
                    model: 'Users',      
                    key: 'id',
                  }
            },
            id_time:{
                type:DataTypes.INTEGER,
                references: {
                    model: 'Times',      
                    key: 'id',
                  }
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

module.exports ={Times_users} ;