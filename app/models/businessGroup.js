'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessGroup extends Model {
  }
  BusinessGroup.init(
    {
    businessId: {type: DataTypes.INTEGER,},
    groupName: {type: DataTypes.STRING},
    uniqueBusinessKey: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'Businessgroups',
      modelName: 'BusinessGroup',
    }
  ) 
  return BusinessGroup
}
