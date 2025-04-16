const Services = require('./Services.js');

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