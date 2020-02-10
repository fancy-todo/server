'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'custom_unique_constraint_email'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.removeConstraint('Users', 'custom_unique_constraint_email');
  }
};
