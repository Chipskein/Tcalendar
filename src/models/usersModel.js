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
        this.hasOne(models.Teams,{ foreignKey: 'admin',foreignKeyConstraint:true});
        this.hasOne(models.Enterprises,{ foreignKey: 'owner',foreignKeyConstraint:true});
        this.hasOne(models.Schedules,{ foreignKey: 'id_user',foreignKeyConstraint:true})
        
        this.belongsToMany(models.Enterprises, { foreignKey: 'id_user',through: models.Enterprise_users,foreignKeyConstraint:true,as:"getUserEnterprises"});
        this.belongsToMany(models.Teams,{ foreignKey: 'id_user',foreignKeyConstraint:true,through:models.Teams_users,as:"getUserTeams"})
        
        this.hasOne(models.Teams_users, { foreignKey: 'id_user',foreignKeyConstraint:true});
        this.hasOne(models.Teams_invite, { foreignKey: 'id_user',foreignKeyConstraint:true});
    }
}

module.exports={Users};