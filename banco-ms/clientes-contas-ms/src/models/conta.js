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
    }
  }
  Conta.init({
    numero:{
      type:  DataTypes.STRING,
      unique: true
    },
    agencia: DataTypes.STRING,
    tipo: DataTypes.ENUM('corrente', 'poupanca', 'salario'),
    saldo: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00
    },
    ativa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conta',
    tableName: 'contas'
  });
  return Conta;
};