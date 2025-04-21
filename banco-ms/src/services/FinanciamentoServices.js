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
            const contaResponse = await this.clienteServices.buscaContaPorId(clienteId, contaId);
    
            if (contaResponse.status !== 200) {
                return contaResponse;
            }
    
            const conta = contaResponse.data;
    
            // Recarrega a conta com os financiamentos associados
            const contaComFinanciamentos = await conta.reload({
                include: {
                    model: dataSource.Financiamento,
                    as: 'financiamentos'
                }
            });
    
            if (!contaComFinanciamentos.financiamentos || contaComFinanciamentos.financiamentos.length === 0) {
                return { status: 404, data: { mensagem: 'Nenhum financiamento encontrado para esta conta' } };
            }
    
            return { status: 200, data: contaComFinanciamentos.financiamentos };
        } catch (erro) {
            console.error('Erro ao buscar financiamentos:', erro);
            return { status: 500, data: { mensagem: 'Erro ao buscar financiamentos', erro } };
        }
    }
    
}

module.exports = FinanciamentoServices;