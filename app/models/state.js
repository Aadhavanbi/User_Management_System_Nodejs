'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class State extends Model {
  }

  State.init(
    {
    stateName: {type: DataTypes.STRING,},
    countryId: {type: DataTypes.INTEGER,},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    },
    {
      sequelize,
      tableName: 'states',
      modelName: 'State',
    }
  
  )
  return State
}
