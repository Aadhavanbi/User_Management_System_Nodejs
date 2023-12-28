'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class PermissionMaster extends Model {
  }

  PermissionMaster.init(
    {
    permissionName: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'permissionmaster',
      modelName: 'PermissionMaster',
    }
  
  )

  
  return PermissionMaster
}
