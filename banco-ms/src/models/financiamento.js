'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Financiamento extends Model {
    static associate(models) {
      this.belongsTo(models.Conta, {
        foreignKey: 'contaId',
        as: 'conta'
      });
    }
  }
  Financiamento.init({
    valorTotalFinanciamento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    numeroDeParcelas:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    dataTerminoEstimada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('EM_ANALISE', 'APROVADO', 'REJEITADO', 'QUITADO'),
      defaultValue: 'EM_ANALISE',
      allowNull: false
    },
    contaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Financiamento',
    tableName: 'financiamentos'
  });
  return Financiamento;
};