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
        this.hasOne(models.Teams,{ foreignKey: 'admin'});
        this.hasOne(models.Schedules,{ foreignKey: 'id_user'})
        this.belongsToMany(models.Enterprises, { foreignKey: 'id_user',through: models.Enterprise_users,as:"contratado"});
        this.belongsTo(models.Teams_users, { foreignKey: 'id_user'});
        this.belongsTo(models.Teams_invite, { foreignKey: 'id_user'});
    }
}

module.exports={Users};