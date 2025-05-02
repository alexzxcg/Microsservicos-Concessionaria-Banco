const Services = require('./Services.js');
const axios = require('axios');

class ClienteServices extends Services {
    constructor() {
        super('Cliente');
    }

    async buscaContas(id) {
        const cliente = await super.buscaUmPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        const listaContas = await cliente.getContas();
        return listaContas;
    }

    async buscaContaCorrentePorCpf(cpf) {
        const cliente = await this.buscaPorCampo('cpf', cpf);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const contas = await cliente.getContas();
        const contaCorrente = contas.find(conta => conta.tipo === 'corrente');

        if (!contaCorrente) {
            throw new Error('Conta corrente não encontrada');
        }

        return { id: contaCorrente.id };
    }

    async buscaContaPorId(clienteId, contaId) {
        try {
            const conta = await this._verificaClienteEConta(clienteId, contaId);
            return { status: 200, data: conta };
        } catch (error) {
            return { status: 404, data: { mensagem: error.message } };
        }
    }

    async buscaContaFinanciamentos(clienteId, contaId) {
        try {
            await this._verificaClienteEConta(clienteId, contaId);

            const response = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos`);
            const financiamentos = response.data;

            return {
                status: 200,
                data: financiamentos.length > 0 ? financiamentos : []
            };
        } catch (error) {
            console.error('Erro ao buscar financiamentos da conta:', error.message);
            return { status: 500, data: { mensagem: 'Erro ao consultar financiamentos da conta' } };
        }
    }

    async buscaContaFinanciamentoPorId(clienteId, contaId, financiamentoId) {
        try {
            await this._verificaClienteEConta(clienteId, contaId);

            const resposta = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos/${financiamentoId}`);
            return resposta.data;
        } catch (erro) {
            if (erro.response && erro.response.status === 404) {
                return { mensagem: 'Financiamento não encontrado para esta conta' };
            }

            console.error('Erro ao buscar financiamento por id:', erro.message || erro);
            throw new Error('Erro ao buscar financiamento por id');
        }
    }

    async atualizaContaDeCliente(clienteId, contaId, dadosAtualizados) {
        try {
            const conta = await this._verificaClienteEConta(clienteId, contaId);
            const contaAtualizada = await conta.update(dadosAtualizados);
            return { status: 200, data: { mensagem: 'Conta atualizada com sucesso', conta: contaAtualizada } };
        } catch (error) {
            return { status: 404, data: { mensagem: error.message } };
        }
    }

    async desativaConta(clienteId, contaId) {
        try {
            const conta = await this._verificaClienteEConta(clienteId, contaId);

            if (!conta.ativa) {
                return { status: 400, data: { mensagem: 'Conta já está desativada' } };
            }

            await conta.update({ ativa: false });
            return { status: 200, data: { mensagem: 'Conta desativada com sucesso' } };
        } catch (error) {
            return { status: 404, data: { mensagem: error.message } };
        }
    }

    async _verificaClienteEConta(clienteId, contaId) {
        const cliente = await this.model.findByPk(clienteId);
        if (!cliente) throw new Error('Cliente não encontrado');

        const contas = await cliente.getContas({ where: { id: contaId } });
        if (!contas || contas.length === 0) throw new Error('Conta não encontrada para este cliente');

        return contas[0];
    }
}

module.exports = ClienteServices;