'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('financiamentos', 'conta_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('financiamentos', 'conta_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'contas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
