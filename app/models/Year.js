'use strict';
module.exports = (sequelize, DataTypes) => {

  const Year = sequelize.define('Year', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          isNumeric: {
            args: true,
            msg: "Solo debe contener números."
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
      }
    },
    color: DataTypes.STRING
  }, {
    tableName: "years"
  });
  
  Year.associate = function(models) {
    // associations can be defined here
    Year.hasMany(models.Month, {as: "months"})
  };

  return Year;
};