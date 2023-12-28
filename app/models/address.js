'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Address  extends Model {
  }

  Address .init(
    {
    userId: {type: DataTypes.INTEGER,},
    addressTypeId: {type: DataTypes.STRING},
    cityId : {type: DataTypes.STRING},
    stateId  : {type: DataTypes.STRING},
    countryId :{type : DataTypes.STRING},
    // address :{type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'address',
      modelName: 'Address',
    }
  
  )

  
  return Address 
}
