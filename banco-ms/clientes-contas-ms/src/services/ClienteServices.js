const Services = require('./Services.js');
const axios = require('axios');
const { AppError } = require('../middlewares/erro/errorHandler.js');

class ClienteServices extends Services {
    constructor() {
        super('Cliente');
    }

    async buscaContas(id) {
        const cliente = await super.buscaUmPorId(id);
        if (!cliente) {
            throw new AppError('Cliente não encontrado', 404);
        }
        const listaContas = await cliente.getContas();
        return listaContas;
    }

    async buscaContaCorrentePorCpf(cpf) {
        const cliente = await this.buscaPorCampo('cpf', cpf);
        if (!cliente) {
            throw new AppError('Cliente não encontrado', 404);
        }

        const contas = await cliente.getContas();
        const contaCorrente = contas.find(conta => conta.tipo === 'corrente');

        if (!contaCorrente) {
            throw new AppError('Conta corrente não encontrada', 404);
        }

        return contaCorrente;
    }

    async buscaContaPorId(clienteId, contaId) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);
        return conta;
    }

    async buscaContaFinanciamentos(clienteId, contaId) {
        await this._verificaClienteEConta(clienteId, contaId);

        try {
            const response = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos`);
            return response.data || [];
        } catch (error) {
            console.error('Erro ao buscar financiamentos da conta:', error.message);
            throw new AppError('Erro ao consultar financiamentos da conta', 500);
        }
    }

    async buscaContaFinanciamentoPorId(clienteId, contaId, financiamentoId) {
        await this._verificaClienteEConta(clienteId, contaId);

        try {
            const response = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos/${financiamentoId}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new AppError('Financiamento não encontrado para esta conta', 404);
            }
            
            console.error('Erro ao buscar financiamento por id:', error.message);
            throw new AppError('Erro ao buscar financiamento por id', 500);
        }
    }

    async atualizaContaDeCliente(clienteId, contaId, dadosAtualizados) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);
        
        try {
            const contaAtualizada = await conta.update(dadosAtualizados);
            return contaAtualizada;
        } catch (error) {
            throw new AppError('Erro ao atualizar conta', 500, [error.message]);
        }
    }

    async desativaConta(clienteId, contaId) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);

        if (!conta.ativa) {
            throw new AppError('Conta já está desativada', 400);
        }

        try {
            await conta.update({ ativa: false });
            return { mensagem: 'Conta desativada com sucesso' };
        } catch (error) {
            throw new AppError('Erro ao desativar conta', 500);
        }
    }

    async _verificaClienteEConta(clienteId, contaId) {
        const cliente = await this.model.findByPk(clienteId);
        if (!cliente) throw new AppError('Cliente não encontrado', 404);

        const contas = await cliente.getContas({ where: { id: contaId } });
        if (!contas || contas.length === 0) throw new AppError('Conta não encontrada para este cliente', 404);

        return contas[0];
    }
}

module.exports = ClienteServices;