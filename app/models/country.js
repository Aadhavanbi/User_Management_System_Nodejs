'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Country extends Model {
  }

  Country.init(
    {
    sortName: {type : DataTypes.STRING},
    countryName: {type: DataTypes.STRING,},
    phoneCode : {type : DataTypes.INTEGER},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    },
    {
      sequelize,
      tableName: 'countries',
      modelName: 'Country',
    }
  
  )
  return Country
}
