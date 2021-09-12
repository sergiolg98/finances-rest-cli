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
    
  };
  return Role;
};