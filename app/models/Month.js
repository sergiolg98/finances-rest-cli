'use strict';
module.exports = (sequelize, DataTypes) => {

  const Month = sequelize.define('Month', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          is: {
            args: ["^[a-zA-Z ]*$",'i'],
            msg: "Solo debe contener letras y espacios."
          },
          len: {
            args: [4, 30],
            msg: "El nombre debe tener entre 3 y 45 caracteres."
          }
      }
    }
  }, {
    tableName: "months"
  });

  Month.associate = function(models) {
    // associations can be defined here
    Month.belongsTo(models.Year, {as: "year", foreignKey: "year_id"})
    Month.hasMany(models.Expense, {as: "expenses"})
  };
  
  return Month;
};