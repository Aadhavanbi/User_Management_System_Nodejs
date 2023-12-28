'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
  }

  User.init(
    {
    businessId: {type: DataTypes.INTEGER}, 
    userName: {type: DataTypes.STRING},
    email:{ type: DataTypes.STRING},
    gender:{ type: DataTypes.STRING},
    mobileNumber: {type: DataTypes.STRING,validate: {len: [1, 10],isNumeric: true,},},    
    dateOfBirth: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    password:{ type:DataTypes.STRING},
    role: {type: DataTypes.STRING },
    uniqueBusinessKey: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: true,},
    createdBy: {type: DataTypes.STRING,},
    createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    updatedBy: {type: DataTypes.STRING,},
    updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW,},
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  
  )

  
  return User
}







// date_of_birth:{ type:DataTypes.STRING,validate: {is: {args: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
// msg: 'Invalid date format. Use DD/MM/YYYY or YYYY-MM-DD.'
// }
// }},













/*
module.exports = (sequelize, DataType) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    senha: {
      type: DataType.STRING,
      allowNull: false
    },
    id_funcao: {
      type: DataType.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataType.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  })

  return Usuario
}
*/