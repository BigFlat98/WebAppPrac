const Sequelize = require('sequelize');
const Users = require('./model_Users.js');
const Comments = require('./model_Comments.js');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

//create table
db.Users = Users;
Users.initiate(sequelize);
db.Comments = Comments;
Comments.initiate(sequelize);

//associate (관계 설정)
db.Users.hasMany(db.Comments,{foreignKey:'commenter', sourceKey:'id'});
db.Comments.belongsTo(db.Users,{foreignKey:'commenter', targetKey:'id'});

module.exports = db;