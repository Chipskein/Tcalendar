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
            id_team:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            id_user:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            date:{
                type:DataTypes.DATE,
                allowNull:false
            },
            duration:{
                type:DataTypes.STRING,
            },
        }
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {
        this.belongsTo(models.Teams,{foreignKey:'id_team'})
        this.belongsTo(models.Users,{foreignKey:'id_user'})
    }
}

module.exports = { Schedules };