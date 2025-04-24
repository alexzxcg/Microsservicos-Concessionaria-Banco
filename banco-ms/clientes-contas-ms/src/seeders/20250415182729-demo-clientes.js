'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [
      {
        nome: 'Ana Silva',
        email: 'ana.silva@example.com',
        cpf: '12345678901',
        data_nascimento: new Date('1990-05-15'),
        telefone: '11987654321',
        rua: 'Rua das Flores',
        numero: '100',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01001-000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@example.com',
        cpf: '98765432100',
        data_nascimento: new Date('1985-11-20'),
        telefone: '21912345678',
        rua: 'Av. Brasil',
        numero: '200',
        bairro: 'Copacabana',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '22060-001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Joana Costa',
        email: 'joana.costa@example.com',
        cpf: '23456789012',
        data_nascimento: new Date('1988-07-22'),
        telefone: '61987654321',
        rua: 'Rua do Lago',
        numero: '150',
        bairro: 'Lago Sul',
        cidade: 'Brasília',
        estado: 'DF',
        cep: '71540-200',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Paulo Souza',
        email: 'paulo.souza@example.com',
        cpf: '34567890123',
        data_nascimento: new Date('1995-02-10'),
        telefone: '31987654321',
        rua: 'Rua do Sol',
        numero: '300',
        bairro: 'Centro',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30123-000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Mariana Oliveira',
        email: 'mariana.oliveira@example.com',
        cpf: '45678901234',
        data_nascimento: new Date('1992-08-05'),
        telefone: '11987654322',
        rua: 'Rua Mar Verde',
        numero: '400',
        bairro: 'Campo Belo',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '04620-030',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ricardo Martins',
        email: 'ricardo.martins@example.com',
        cpf: '56789012345',
        data_nascimento: new Date('1983-03-15'),
        telefone: '21987654322',
        rua: 'Rua das Acácias',
        numero: '500',
        bairro: 'Ipanema',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '22410-001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Gabriela Lima',
        email: 'gabriela.lima@example.com',
        cpf: '67890123456',
        data_nascimento: new Date('1994-06-25'),
        telefone: '31987654322',
        rua: 'Rua das Pedras',
        numero: '600',
        bairro: 'Santa Efigênia',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30230-200',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ricardo Alves',
        email: 'ricardo.alves@example.com',
        cpf: '78901234567',
        data_nascimento: new Date('1990-11-12'),
        telefone: '41987654322',
        rua: 'Rua do Rio',
        numero: '700',
        bairro: 'Centro',
        cidade: 'Curitiba',
        estado: 'PR',
        cep: '80010-300',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fernanda Souza',
        email: 'fernanda.souza@example.com',
        cpf: '89012345678',
        data_nascimento: new Date('1989-12-18'),
        telefone: '61987654322',
        rua: 'Avenida Paulista',
        numero: '800',
        bairro: 'Jardim Paulista',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01311-100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Vinícius Rocha',
        email: 'vinicius.rocha@example.com',
        cpf: '90123456789',
        data_nascimento: new Date('1996-10-25'),
        telefone: '31987654323',
        rua: 'Rua do Comércio',
        numero: '900',
        bairro: 'Savassi',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30140-000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
