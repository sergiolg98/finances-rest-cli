'use strict';
module.exports = (sequelize, DataTypes) => {

  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING
  }, {
    tableName: "permissions"
  });
  
  Permission.associate = function(models) {
    // associations can be defined here
    Permission.belongsToMany(models.Role, {as: "roles", through: "roles_permissions", foreignKey: "permission_id"})
  };
  
  return Permission;
};