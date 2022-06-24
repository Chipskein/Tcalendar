const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/sequelize');
class Users extends Model {}
const tableConfig={ 
    sequelize: db, 
    schema: 'public',
    modelName: 'Users'
}
const tableDefinition={
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
    created_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}
Users.init(tableDefinition,tableConfig);
//Users.sync({force:true});
module.exports = { Users };