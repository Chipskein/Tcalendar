const { DataTypes, Model } = require('sequelize');
class Schedules extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
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
            id_user:{
                type:DataTypes.INTEGER,
                references: {
                    model: Users,      
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
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {
        //create associations
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports = {Schedules};