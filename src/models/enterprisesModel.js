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
        //this.hasOne(models.Enterprise_users,{ foreignKey: 'id_enterprise',foreignKeyConstraint:true});
        //this.belongsTo(models.Users,{ foreignKey: 'owner',as:'ownership'});
        this.hasOne(models.Teams,{ foreignKey: 'id_enterprise',foreignKeyConstraint:true})
        this.belongsToMany(models.Users, { foreignKey: 'id_enterprise', through: models.Enterprise_users,foreignKeyConstraint:true});
    }
}

module.exports = {Enterprises};