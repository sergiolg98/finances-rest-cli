'use strict';
module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    role: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    tableName: "roles"
  });

  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.User, {as: "users", through: "user_role", foreignKey: "role_id"})

  };
  return Role;
};