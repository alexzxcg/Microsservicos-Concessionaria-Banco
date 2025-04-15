'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('contas', [
      {
        numero: '12345-6',
        agencia: '0001',
        tipo: 'corrente',
        saldo: 2500.00,
        ativa: true,
        clienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '65432-1',
        agencia: '0002',
        tipo: 'poupanca',
        saldo: 5000.00,
        ativa: true,
        clienteId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '11223-4',
        agencia: '0003',
        tipo: 'salario',
        saldo: 1200.00,
        ativa: true,
        clienteId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '44556-7',
        agencia: '0004',
        tipo: 'corrente',
        saldo: 3500.00,
        ativa: true,
        clienteId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '77889-0',
        agencia: '0005',
        tipo: 'poupanca',
        saldo: 8000.00,
        ativa: true,
        clienteId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '99887-6',
        agencia: '0006',
        tipo: 'salario',
        saldo: 1500.00,
        ativa: true,
        clienteId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '22334-5',
        agencia: '0007',
        tipo: 'corrente',
        saldo: 7000.00,
        ativa: true,
        clienteId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '33445-6',
        agencia: '0008',
        tipo: 'poupanca',
        saldo: 5000.00,
        ativa: false,
        clienteId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '55667-8',
        agencia: '0009',
        tipo: 'salario',
        saldo: 2200.00,
        ativa: true,
        clienteId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: '66788-9',
        agencia: '0010',
        tipo: 'corrente',
        saldo: 1800.00,
        ativa: true,
        clienteId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contas', null, {});
  }
};
