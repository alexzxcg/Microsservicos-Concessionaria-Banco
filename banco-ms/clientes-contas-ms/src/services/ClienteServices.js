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
        const cliente = await this.model.findOne({ where: { cpf } });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
    
        const contas = await cliente.getContas();
        const contaCorrente = contas.find(conta => conta.tipo === 'corrente');
    
        if (!contaCorrente) {
            throw new Error('Conta corrente não encontrada');
        }
    
        return { id: contaCorrente.id }; // retorna só o id
    }

    async buscaContaPorId(clienteId, contaId) {
        const cliente = await this.buscaUmPorId(clienteId);
        if (!cliente) {
            return { status: 404, data: { mensagem: 'Cliente não encontrado' } };
        }
    
        const contas = await cliente.getContas({
            where: { id: contaId }
        });
    
        if (!contas || contas.length === 0) {
            return { status: 404, data: { mensagem: 'Conta não encontrada para este cliente' } };
        }
    
        return { status: 200, data: contas[0] };
    }

    async buscaContaFinanciamentos(clienteId, contaId) {
        const cliente = await this.buscaUmPorId(clienteId);
        if (!cliente) {
            return { status: 404, data: { mensagem: 'Cliente não encontrado' } };
        }
    
        const contas = await cliente.getContas({ where: { id: contaId } });
        if (!contas || contas.length === 0) {
            return { status: 404, data: { mensagem: 'Conta não encontrada para este cliente' } };
        }
    
        try {
            const response = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos`);
            const financiamentos = response.data;
    
            // Se não tiver financiamentos, retorna array vazio
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
            // Verifica se a conta pertence ao cliente
            const cliente = await this.model.findByPk(clienteId);
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }
    
            const contas = await cliente.getContas({ where: { id: contaId } });
            if (!contas || contas.length === 0) {
                throw new Error('Conta não encontrada para este cliente');
            }
    
            // Faz a requisição ao microsserviço de financiamentos
            const resposta = await axios.get(`http://localhost:3001/contas/${contaId}/financiamentos/${financiamentoId}`);
    
            return resposta.data;
        } catch (erro) {
            if (erro.response && erro.response.status === 404) {
                // Financiamento não encontrado no outro serviço
                return { mensagem: 'Financiamento não encontrado para esta conta' };
            }
    
            console.error('Erro ao buscar financiamento por id:', erro.message || erro);
            throw new Error('Erro ao buscar financiamento por id');
        }
    }

    async atualizaContaDeCliente(clienteId, contaId, dadosAtualizados) {
        const cliente = await this.buscaUmPorId(clienteId);
        if (!cliente) {
            return { status: 404, data: { mensagem: 'Cliente não encontrado' } };
        }

        const contas = await cliente.getContas({ where: { id: contaId } });
        if (!contas || contas.length === 0) {
            return { status: 404, data: { mensagem: 'Conta não encontrada para este cliente' } };
        }

        const conta = contas[0];
        const contaAtualizada = await conta.update(dadosAtualizados);

        return { status: 200, data: { mensagem: 'Conta atualizada com sucesso', conta: contaAtualizada } };
    }

    async desativaConta(clienteId, contaId) {
        const cliente = await this.buscaUmPorId(clienteId);
        if (!cliente) {
            return { status: 404, data: { mensagem: 'Cliente não encontrado' } };
        }
    
        const contas = await cliente.getContas({ where: { id: contaId } });
        if (!contas || contas.length === 0) {
            return { status: 404, data: { mensagem: 'Conta não encontrada para este cliente' } };
        }
    
        const conta = contas[0];
        if (!conta.ativa) {
            return { status: 400, data: { mensagem: 'Conta já está desativada' } };
        }
    
        await conta.update({ ativa: false });
    
        return { status: 200, data: { mensagem: 'Conta desativada com sucesso' } };
    }
}

module.exports = ClienteServices;