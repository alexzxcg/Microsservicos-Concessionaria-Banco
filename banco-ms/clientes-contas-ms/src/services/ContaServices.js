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
                attributes: ['id', 'tipo']
            });
    
            return conta;
        } catch (erro) {
            throw new Error('Erro ao buscar conta: ' + erro.message);
        }
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
    
        if (!conta || !conta.cliente) {
            return null; // deixe o controller tratar
        }
    
        return {
            saldo: conta.saldo,
            renda_mensal: conta.cliente.renda_mensal
        };
    }

    async alterarSaldo(conta_id, novoSaldo) {
        const conta = await Conta.findOne({ where: { id: conta_id } });
    
        if (!conta) {
            throw new Error('Conta não encontrada');
        }
    
        conta.saldo = novoSaldo;
        await conta.save();
    
        return { mensagem: 'Saldo atualizado com sucesso', saldoAtual: conta.saldo };
    }
}

module.exports = ContaServices;