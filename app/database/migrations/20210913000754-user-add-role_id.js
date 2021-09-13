'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('users', 'role_id', {
                type: Sequelize.INTEGER,
                defaultValue: 2,
                allowNull: false,
                references: {
                  model: "roles",
                  key: "id"
                }
              }, { transaction: t }),
              
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.removeColumn('users', 'role_id', { transaction: t }),
          ])
      })
  }
};