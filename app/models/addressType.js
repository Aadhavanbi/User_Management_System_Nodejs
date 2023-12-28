'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class AddressType  extends Model {
  }

  AddressType .init(
    {
    addressType: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'addresstypes',
      modelName: 'AddressType',
    }
  
  )

  
  return AddressType 
}
