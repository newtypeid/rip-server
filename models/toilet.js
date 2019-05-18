'use strict';
module.exports = (sequelize, DataTypes) => {
  const toilet = sequelize.define('toilet', {
    lat: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
   },
   lon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
   },
   address: {
     type: DataTypes.STRING,
     allowNull: true
   },
   description: {
     type: DataTypes.STRING,
     allowNull: true
   },
  },
  {
    timestamps: true,
  });

  return toilet;
};