const Services = require('./Services.js');
const ClienteServices = require('./ClienteServices.js');
const dataSource = require('../models');

class FinanciamentoServices extends Services {
    constructor() {
        super('Financiamento');
        this.clienteServices = new ClienteServices();
    }

    async buscaTodosOsRegistros(clienteId, contaId) {
        try {
            // Verifica se a conta pertence ao cliente
            const conta = await this.clienteServices.buscaContaPorId(clienteId, contaId);

            if (conta.status !== 200) {
                return conta; // retorna erro encontrado no serviço de cliente
            }

            // Busca os financiamentos vinculados à conta
            const financiamentos = await dataSource.Conta.findByPk(contaId, {
                include: {
                    model: dataSource.Financiamento,
                    as: 'financiamentos'
                }
            });

            if (!financiamentos) {
                return { status: 404, data: { mensagem: 'Nenhum financiamento encontrado para esta conta' } };
            }

            return { status: 200, data: financiamentos.financiamentos };
        } catch (erro) {
            console.error(erro);
            return { status: 500, data: { mensagem: 'Erro ao buscar financiamentos', erro } };
        }
    }
}

module.exports = FinanciamentoServices;