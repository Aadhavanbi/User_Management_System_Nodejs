'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class UserToGroup extends Model {
  }

  UserToGroup.init(
    {
    businessId: {type: DataTypes.INTEGER},
    groupId:{type: DataTypes.INTEGER,},
    userId: {type: DataTypes.INTEGER,},
    groupPostion: {type: DataTypes.STRING},
    uniqueBusinessKey: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'usertogroups',
      modelName: 'UserToGroup',
    }
  
  )
  return UserToGroup
}
