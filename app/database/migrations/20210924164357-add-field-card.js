'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.addColumn('cards', 'bank', {
              type: Sequelize.STRING,
              allowNull: false,
            }, { transaction: t }),
            
            queryInterface.addColumn('cards', 'bank_account', {
              type: Sequelize.STRING,
              allowNull: false,
            }, { transaction: t }),

            queryInterface.addColumn('cards', 'bank_inter_account', {
              type: Sequelize.STRING,
              allowNull: false,
            }, { transaction: t }),
              
          ],)
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.removeColumn('cards', 'bank', { transaction: t }),
            queryInterface.removeColumn('cards', 'bank_account', { transaction: t }),
            queryInterface.removeColumn('cards', 'bank_inter_account', { transaction: t }),
          ])
      })
  }
};