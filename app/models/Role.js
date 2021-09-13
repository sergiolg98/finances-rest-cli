'use strict';
module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
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
    color: DataTypes.STRING,
    description: {
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
  }, {
    tableName: "roles"
  });
  
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.Permission, {as: "permissions", through: "roles_permissions", foreignKey: "role_id"})
    Role.hasMany(models.User, {as: "users"})

  };
  return Role;
};