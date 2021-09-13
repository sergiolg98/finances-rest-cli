'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.addColumn('expenses', 'card_id', {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "cards",
                key: "id"
              }
            }, { transaction: t }),
            
            queryInterface.addColumn('cards', 'user_id', {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "users",
                key: "id"
              }
            }, { transaction: t }),
              
          ],)
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.removeColumn('expenses', 'card_id', { transaction: t }),
            queryInterface.removeColumn('users', 'user_id', { transaction: t }),
          ])
      })
  }
};