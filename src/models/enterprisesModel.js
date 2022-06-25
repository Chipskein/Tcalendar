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
        this.belongsTo(models.Users,{ foreignKey: 'owner',as:'ownership'});
        this.belongsToMany(models.Users, { foreignKey: 'id_enterprise', through: models.Enterprise_users, as:"contratado2"});
    }
}

module.exports = {Enterprises};