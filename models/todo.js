'use strict';
module.exports = (sequelize, DataTypes) => {

  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init ({
    title: {
      type: DataTypes.STRING,
      allowNull : false
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
    due_date:{
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty : {
          args: true,
          msg : `cannot be empty`
        },
        isToday (value) {
          console.log(`valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`);        
          let date = new Date ()
          if (new Date(value) <= date) {
            throw new Error(`date nya bos. anda bukan time traveller`)
          }
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {sequelize});

  return Todo;
};