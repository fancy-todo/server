'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: `Must use valid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        len: {
          args: [5],
          msg: `use 5 characters minimum as password`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: user => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    }
  });

  return User;
};