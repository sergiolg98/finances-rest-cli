'use strict';
module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: "roles"
  });
  
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.Permission, {as: "permissions", through: "roles_permissions", foreignKey: "role_id"})

  };
  return Role;
};