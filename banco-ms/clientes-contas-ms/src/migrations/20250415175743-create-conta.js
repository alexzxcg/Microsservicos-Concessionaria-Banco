'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING
      },
      agencia: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.ENUM('corrente', 'poupanca', 'salario'),
        allowNull: false
      },
      saldo: {
        type: Sequelize.DECIMAL
      },
      ativa: {
        type: Sequelize.BOOLEAN
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contas');
  }
};