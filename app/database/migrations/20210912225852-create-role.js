'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      }
    });
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};