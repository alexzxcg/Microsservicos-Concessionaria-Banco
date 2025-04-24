'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('financiamentos', 'valorTotalFinanciamento', 'valor_total_financiamento');
    await queryInterface.renameColumn('financiamentos', 'numeroDeParcelas', 'numero_de_parcelas');
    await queryInterface.renameColumn('financiamentos', 'valorParcela', 'valor_parcela');
    await queryInterface.renameColumn('financiamentos', 'dataTerminoEstimada', 'data_termino_estimada');
    await queryInterface.renameColumn('financiamentos', 'contaId', 'conta_id');

    await queryInterface.addColumn('financiamentos', 'tipo_financiamento', {
      type: Sequelize.ENUM('TOTAL', 'PARCIAL'),
      allowNull: false,
      defaultValue: 'TOTAL'
    });

    await queryInterface.addColumn('financiamentos', 'valor_entrada', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('financiamentos', 'valor_total_financiamento', 'valorTotalFinanciamento');
    await queryInterface.renameColumn('financiamentos', 'numero_de_parcelas', 'numeroDeParcelas');
    await queryInterface.renameColumn('financiamentos', 'valor_parcela', 'valorParcela');
    await queryInterface.renameColumn('financiamentos', 'data_termino_estimada', 'dataTerminoEstimada');
    await queryInterface.renameColumn('financiamentos', 'conta_id', 'contaId');

    await queryInterface.removeColumn('financiamentos', 'tipo_financiamento');
    await queryInterface.removeColumn('financiamentos', 'valor_entrada');
  }
};
