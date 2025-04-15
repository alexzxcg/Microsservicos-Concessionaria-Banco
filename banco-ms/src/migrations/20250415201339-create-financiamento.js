'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('financiamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valorTotalFinanciamento: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      numeroDeParcelas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dataTerminoEstimada: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('EM_ANALISE', 'APROVADO', 'REJEITADO', 'QUITADO'),
        defaultValue: 'EM_ANALISE',
        allowNull: false
      },
      contaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'contas',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('financiamentos');
  }
};