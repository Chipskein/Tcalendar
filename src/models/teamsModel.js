const { DataTypes, Model } = require('sequelize');
class Teams extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Teams'
        }
        const tableDefinition={
            id_enterprise:{
                type:DataTypes.INTEGER,
                allowNull: false
            },
            admin:{
                type:DataTypes.INTEGER,
                allowNull: false
            },
            name:{
                type:DataTypes.STRING,
                allowNull: false
            },
            description:{
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
        this.belongsTo(models.Users,{foreignKey:'admin'});
        this.belongsTo(models.Enterprises,{foreignKey:'id_enterprise'});
        this.hasMany(models.Schedules,{ foreignKey: 'id_team'})
        this.belongsTo(models.Teams_users,{ foreignKey: 'id_team'});
        this.belongsTo(models.Teams_invite, { foreignKey: 'id_team'});
    }
}
module.exports={Teams};