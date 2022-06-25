const { DataTypes, Model } = require('sequelize');
class Enterprises extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Enterprises'
        }
        const tableDefinition={
            owner:{
                type:DataTypes.INTEGER,
                allowNull: false,
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
        this.belongsTo(models.Users,{ foreignKey: 'owner',as:'ownership'});
        this.belongsToMany(models.Users, { foreignKey: 'id_enterprise', through: models.Enterprise_users, as: 'contratado' });
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports = {Enterprises};