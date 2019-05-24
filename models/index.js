"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./users")(sequelize, Sequelize);
db.Comments = require("./comments")(sequelize, Sequelize);
db.Toilet = require("./toilet")(sequelize, Sequelize);

db.Toilet.hasMany(db.Comments, { foreignKey: "toiletId", sourceKey: "id" });
db.Comments.belongsTo(db.Toilet, { foreignKey: "toiletId", targetKey: "id" });
db.User.hasMany(db.Comments, { foreignKey: "userId", sourceKey: "id" });
db.Comments.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
module.exports = db;
