'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class HistoryRecord  extends Model {
  }

  HistoryRecord .init(
    {
    unKnownId: {type: DataTypes.INTEGER},
    tableName: {type: DataTypes.STRING},
    rowName :{type : DataTypes.STRING},
    oldData : {type: DataTypes.STRING},
    newData  : {type: DataTypes.STRING}, 
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'historyrecord',
      modelName: 'HistoryRecord',
    }
  
  )

  
  return HistoryRecord
}
