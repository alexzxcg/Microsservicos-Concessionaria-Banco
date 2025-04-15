'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      this.hasMany(models.Conta, {
        foreignKey: 'clienteId',
        as: 'contas'
      });
    }
  }
  Cliente.init({
    nome: DataTypes.STRING,
    
    email: {
     type: DataTypes.STRING,
     unique: true,
    },

    cpf: {
      type: DataTypes.STRING,
      unique: true,
    },
    renda_mensal: DataTypes.DECIMAL(10, 2),
    data_nascimento: DataTypes.DATE,
    telefone: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    cep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes'
  });
  return Cliente;
};