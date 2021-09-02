'use strict';
module.exports = (sequelize, DataTypes) => {

  const Type = sequelize.define('Type', {
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
            args: [3, 45],
            msg: "El nombre debe tener entre 3 y 45 caracteres."
          }
      }
    }
  }, {
    tableName: "types"
  });
  
  Type.associate = function(models) {
    //No pongo el foreignKey porque en la config de database ya está para aceptar un snake_case
    Type.hasMany(models.Category, {as: "categories"})
  };
  return Type;
};