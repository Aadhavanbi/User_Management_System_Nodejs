'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Business extends Model {
  }

  Business.init(
    {
    businessName: {type: DataTypes.STRING,},
    uniqueBusinessKey: {type : DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'business',
      modelName: 'Business',
    }
  
  )
  return Business
}
