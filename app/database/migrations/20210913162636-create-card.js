'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card: {
        allowNull: false,
        type: Sequelize.STRING
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      currency_symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      processor: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};