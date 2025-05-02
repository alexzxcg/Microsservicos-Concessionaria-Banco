const Services = require('./Services.js');
const { Cliente } = require('../models');
const Conta = require('../models').Conta;

class ContaServices extends Services {
    constructor() {
        super('Conta');
    }

    async buscarContaPorNumero(numeroDaConta) {
        try {
            const conta = await this.model.findOne({
                where: {
                    numero: numeroDaConta,
                    ativa: true
                },
                attributes: ['id']
            });
            if (!conta) {
                throw new Error('Conta não encontrada');
            }
            return conta;
        } catch (erro) {
            throw new Error('Erro ao buscar conta: ' + erro.message);
        }
    }

    async buscaDadosParaFinanciamento(contaId) {
        try {
            const conta = await Conta.findByPk(contaId, {
                include: {
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['renda_mensal']
                },
                attributes: ['saldo']
            });

            if (!conta || !conta.cliente) {
                return null; 
            }

            return {
                saldo: conta.saldo,
                renda_mensal: conta.cliente.renda_mensal
            };
        } catch (erro) {
            throw new Error('Erro ao buscar dados de financiamento: ' + erro.message);
        }
    }

    async alterarSaldo(contaId, novoSaldo) {
        try {
            const conta = await Conta.findOne({ where: { id: contaId } });

            if (!conta) {
                throw new Error('Conta não encontrada');
            }

            conta.saldo = novoSaldo;
            await conta.save();

            return { mensagem: 'Saldo atualizado com sucesso' };
        } catch (erro) {
            throw new Error('Erro ao alterar saldo: ' + erro.message);
        }
    }
}

module.exports = ContaServices;