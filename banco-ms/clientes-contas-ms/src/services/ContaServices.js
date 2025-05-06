const Services = require('./Services.js');
const { Cliente } = require('../models');
const Conta = require('../models').Conta;
const { AppError } = require('../middlewares/erro/errorHandler.js');

class ContaServices extends Services {
    constructor() {
        super('Conta');
    }

    async buscarContaPorNumero(numeroDaConta) {
        const conta = await this.model.findOne({
            where: {
                numero: numeroDaConta,
                ativa: true
            },
            attributes: ['id']
        });

        if (!conta) {
            throw new AppError('Conta não encontrada', 404);
        }

        return conta;
    }

    async buscaDadosParaFinanciamento(contaId) {
        const conta = await Conta.findByPk(contaId, {
            include: {
                model: Cliente,
                as: 'cliente',
                attributes: ['renda_mensal']
            },
            attributes: ['saldo']
        });

        if (!conta) {
            throw new AppError('Conta não encontrada', 404);
        }

        if (!conta.cliente) {
            throw new AppError('Cliente associado à conta não encontrado', 404);
        }

        return {
            saldo: conta.saldo,
            renda_mensal: conta.cliente.renda_mensal
        };
    }

    async alterarSaldo(contaId, novoSaldo) {
        const conta = await Conta.findOne({ where: { id: contaId } });

        if (!conta) {
            throw new AppError('Conta não encontrada', 404);
        }

        try {
            conta.saldo = novoSaldo;
            await conta.save();

            return { mensagem: 'Saldo atualizado com sucesso' };
        } catch (erro) {
            throw new AppError('Erro ao alterar saldo', 500, [erro.message]);
        }
    }
}

module.exports = ContaServices;