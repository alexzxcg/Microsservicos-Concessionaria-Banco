'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('contas', 'contas_ibfk_1');

    await queryInterface.addConstraint('contas', {
      fields: ['clienteId'],
      type: 'foreign key',
      name: 'contas_clienteId_fkey',
      references: {
        table: 'clientes',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('contas', 'contas_clienteId_fkey');

    await queryInterface.addConstraint('contas', {
      fields: ['clienteId'],
      type: 'foreign key',
      name: 'contas_ibfk_1', // volta ao nome original
      references: {
        table: 'clientes',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
