'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {
    static associate(models) {
      this.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente'
      });

      this.hasMany(models.Financiamento, {
        foreignKey: 'contaId',
        as: 'financiamentos'
      });
    }
  }
  Conta.init({
    numero: DataTypes.STRING,
    agencia: DataTypes.STRING,
    tipo: DataTypes.ENUM('corrente', 'poupanca', 'salario'),
    saldo: DataTypes.DECIMAL,
    ativa: DataTypes.BOOLEAN,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conta',
    tableName: 'contas'
  });
  return Conta;
};