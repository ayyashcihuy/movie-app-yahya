'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Movies", "AuthorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Authors",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete:"cascade"
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Movies", "AuthorId")
  }
};
