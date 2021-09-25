'use strict';
module.exports = (sequelize, DataTypes) => {

  const Card = sequelize.define('Card', {
    card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    processor: {
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
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_inter_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "cards"
  });

  Card.associate = function(models) {
    // associations can be defined here
    Card.hasMany(models.Expense, {as: "expenses"})
    Card.belongsTo(models.User, {as: "user", foreignKey: "user_id"})
  };
  
  return Card;
};