'use strict';
module.exports = (sequelize, DataTypes) => {
  const toilet = sequelize.define('toilet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey : true
    },

    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
   },
   longitude: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
   },
   address: {
     type: DataTypes.STRING,
     allowNull: true
   },
   rating: {
     type: DataTypes.INTEGER,
     defaultValue: 0,
     allowNull: true
   },
  },
  {
    timestamps: false,
  });


  return toilet;
};


