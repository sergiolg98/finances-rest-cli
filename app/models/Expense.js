'use strict';
module.exports = (sequelize, DataTypes) => {

  const Expense = sequelize.define('Expense', {
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
              msg: "El campo no puede ser nulo."
          }
        }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
            args: true,
            msg: "El campo solo acepta fechas."
        },
        notNull: {
            msg: "El campo no puede ser nulo."
        }
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
            args: true,
            msg: "El campo solo acepta números."
        },
        notNull: {
            msg: "El campo no puede ser nulo."
        }
      }
    }
  }, {
    tableName: "expenses"
  });

  Expense.associate = function(models) {
    // associations can be defined here
    Expense.belongsTo(models.Month, {as: "month", foreignKey: "month_id"})
    Expense.belongsTo(models.Category, {as: "category", foreignKey: "category_id"})
    Expense.belongsTo(models.Card, {as: "card", foreignKey: "card_id"})
  };
  
  return Expense;
};