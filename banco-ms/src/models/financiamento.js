'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Financiamento extends Model {
    static associate(models) {
      this.belongsTo(models.Conta, {
        foreignKey: 'conta_id',
        as: 'conta'
      });
    }
  }

  Financiamento.init({
    valor_total_financiamento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    numero_de_parcelas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    valor_parcela: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },

    data_termino_estimada: {
      type: DataTypes.DATE,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('EM_ANALISE', 'APROVADO', 'REJEITADO', 'QUITADO'),
      allowNull: false,
      defaultValue: 'EM_ANALISE'
    },

    tipo_financiamento: {
      type: DataTypes.ENUM('TOTAL', 'PARCIAL'),
      allowNull: false,
      defaultValue: 'TOTAL'
    },

    valor_entrada: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    conta_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Financiamento',
    tableName: 'financiamentos',
    underscored: true
  });

  return Financiamento;
};
