const Repository = require('./Repository');
const { Conta, Cliente } = require('../models');

class ContaRepository extends Repository {
    constructor() {
        super(Conta);
    }

    async findByNumero(numero) {
        return await this.model.findOne({
            where: { numero, ativa: true },
            attributes: ['id']
        });
    }

    async findDadosFinanciamento(contaId) {
        return await this.model.findByPk(contaId, {
            include: {
                model: Cliente,
                as: 'cliente',
                attributes: ['renda_mensal']
            },
            attributes: ['saldo']
        });
    }

    async updateSaldo(contaId, novoSaldo) {
        const conta = await this.model.findByPk(contaId);
        if (!conta) return null;
        conta.saldo = novoSaldo;
        await conta.save();
        return conta;
    }
}

module.exports = new ContaRepository();
