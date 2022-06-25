const { DataTypes, Model } = require('sequelize');
class Users extends Model {
    static init(sequelize) {
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Users'
        }
        const tableDefinition={
            email:{
                type:DataTypes.STRING,
                unique:true,
                allowNull: false
            },
            name:{
                type:DataTypes.STRING,
                allowNull: false
            },
            password:{
                type:DataTypes.STRING,
                allowNull: false
            },
            img:{
                type:DataTypes.STRING,
                defaultValue: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png"
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue: false
            },
        }
        super.init(tableDefinition,tableConfig)
    }
    
    static associate(models) {
        this.hasOne(models.Enterprises,{ foreignKey: 'owner',as:'ownership'});
        this.belongsToMany(models.Enterprises, { foreignKey: 'id_user',through: models.Enterprise_users,as:"contratado"});
        //create associations
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports={Users};