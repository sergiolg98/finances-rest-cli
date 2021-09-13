'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
              args: ["^[a-zA-Z ]*$",'i'],
              msg: "Solo debe contener letras y espacios."
          },
          notNull: {
              msg: "El campo no puede ser nulo."
          }
        }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: "El campo no puede estar vacío."
        },
        is: {
            args: ["^[a-zA-Z ]*$",'i'],
            msg: "Solo debe contener letras y espacios."
        },
      }
    }
  }, {
    tableName: "categories"
  });
  
  Category.associate = function(models) {
    
    Category.belongsTo(models.Type, {as: "type"})
    Category.hasMany(models.Expense, {as: "expenses"})
  };
  return Category;
};