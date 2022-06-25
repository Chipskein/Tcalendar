const { db }=require('../config/sequelize')

const { Users } = require("./usersModel");
const { Teams } = require("./teamsModel");
const { Enterprises } = require("./enterprisesModel");
const { Schedules } = require("./schedulesModel");
const { Teams_invite } = require("./teams_inviteModel");
const { Teams_users } = require("./teams_usersModel");
const { Enterprise_users } = require("./enterprise_usersModel");


Users.init(db)
Enterprises.init(db)
Enterprise_users.init(db)


Users.associate(db.models);
Enterprises.associate(db.models);
Enterprise_users.associate(db.models);
/*
Teams.init(db)
Schedules.init(db)
Teams_invite.init(db)
Teams_users.init(db)
*/

//(async ()=>await db.sync({force:true}))();


