'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('roles_permissions', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id"
          }
        },
        permission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "permissions",
            key: "id"
          }
        }
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('roles_permissions');
    
  }
};
