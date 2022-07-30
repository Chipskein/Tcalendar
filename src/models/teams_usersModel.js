const { DataTypes, Model } = require('sequelize');
class Teams_users extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Teams_users'
        }
        const tableDefinition={
            id_user:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            id_team:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue: true
            }
        }
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {
        this.hasMany(models.Users,{foreignKey:'id'});
        this.hasMany(models.Teams,{foreignKey:'id'});
    }
}

module.exports ={Teams_users} ;