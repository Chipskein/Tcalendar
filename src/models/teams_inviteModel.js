const { DataTypes, Model } = require('sequelize');
class Teams_invite extends Model {
    static init(sequelize){
        const tableConfig={ 
            sequelize, 
            schema: 'public',
            modelName: 'Teams_invite'
        }
        const tableDefinition={
            id_user:{
                type:DataTypes.INTEGER,
                allowNull: false
            },
            id_team:{
                type:DataTypes.INTEGER,
                allowNull: false
            },
            status:{
                type:DataTypes.STRING,
                defaultValue:"waiting"
            },
            response_date:{
                type:DataTypes.DATE
            }
        }
        super.init(tableDefinition,tableConfig);
    }
    static associate(models) {
        this.hasMany(models.Users,{foreignKey:'id'});
        this.hasMany(models.Teams,{foreignKey:'id'});
    }
}
module.exports = { Teams_invite };