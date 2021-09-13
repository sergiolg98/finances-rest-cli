'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.addColumn('expenses', 'category_id', {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "categories",
                key: "id"
              }
            }, { transaction: t }),
            
            queryInterface.addColumn('expenses', 'month_id', {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "months",
                key: "id"
              }
            }, { transaction: t }),
              
          ],)
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.removeColumn('expenses', 'category_id', { transaction: t }),
            queryInterface.removeColumn('expenses', 'month_id', { transaction: t }),
          ])
      })
  }
};