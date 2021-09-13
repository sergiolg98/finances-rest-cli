'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('months', 'year_id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: "years",
                  key: "id"
                }
              }, { transaction: t }),
              
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.removeColumn('months', 'year_id', { transaction: t }),
          ])
      })
  }
};