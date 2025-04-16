const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
    constructor() {
        super(clienteServices);
    }

    async buscaContas(req, res) {
        const { clienteId } = req.params;
        try {
            const listaContas = await clienteServices.buscaContas(Number(clienteId));
            return res.status(200).json(listaContas);
        } catch (erro) {
            
        }
    }

    async buscaContaPorId(req, res) {
        const { clienteId, contaId } = req.params;
    
        try {
            const resultado = await clienteServices.buscaContaPorId(
                Number(clienteId),
                Number(contaId)
            );
    
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            console.error('Erro ao buscar conta do cliente:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao buscar conta' });
        }
    }

    async atualizaContaDeCliente(req, res) {
        const { clienteId, contaId } = req.params;
        const dadosAtualizados = req.body;

        try {
            const resultado = await clienteServices.atualizaContaDeCliente(
                Number(clienteId),
                Number(contaId),
                dadosAtualizados
            );

            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            console.error('Erro ao atualizar conta:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao atualizar conta' });
        }
    }

    async excluiContaDeCliente(req, res) {
        const { clienteId, contaId } = req.params;
    
        try {
            const resultado = await clienteServices.desativaConta(
                Number(clienteId),
                Number(contaId)
            );
    
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            console.error('Erro ao desativar conta:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao desativar conta' });
        }
    }
}

module.exports = ClienteController;