'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class City extends Model {
  }

  City.init(
    {
    cityName: {type: DataTypes.STRING,},
    stateId : {type: DataTypes.INTEGER,},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    },
    {
      sequelize,
      tableName: 'cites',
      modelName: 'City',
    }
  
  )
  return City
}
