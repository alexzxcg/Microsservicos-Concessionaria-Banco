'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('clientes', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email'
    });

    await queryInterface.addConstraint('clientes', {
      fields: ['cpf'],
      type: 'unique',
      name: 'unique_cpf'
    });
  },

   async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('clientes', 'unique_email');
    await queryInterface.removeConstraint('clientes', 'unique_cpf');
  }
};
