
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    nickname : {
      type : DataTypes.STRING(20),
      allowNull: false
    },
    email : {
      type : DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    password : {
      type : DataTypes.STRING,
      allowNull: false,
    },
  },
  {
      timestamps: true,
    })
  return users;
};