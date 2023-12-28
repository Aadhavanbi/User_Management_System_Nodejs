'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class GroupPermission extends Model {
  }

  GroupPermission.init(
    {
    businessId: {type: DataTypes.INTEGER},
    businessGroupId: {type : DataTypes.INTEGER},
    permissionName: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'grouppermissions',
      modelName: 'GroupPermission',
    }
  
  )

  
  return GroupPermission
}

