const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices');
const ClienteDTO = require('../dtos/clienteOutputDto/ClienteDTO.js');

const clienteServices = new ClienteServices();
const yup = require('yup');


class ClienteController extends Controller {
    constructor() {
        super(clienteServices);
    }

    async buscaContasDoCliente(req, res) {
        const { clienteId, cpf } = req.params;

        try {
            const resultado = clienteId
                ? await clienteServices.buscaContas(Number(clienteId))
                : await clienteServices.buscaContaCorrentePorCpf(cpf);

            return res.status(200).json(resultado);
        } catch (erro) {
            return res.status(404).json({ mensagem: erro.message });
        }
    }

    async buscaContaPorIdDoCliente(req, res) {
        const { clienteId, contaId } = req.params;

        try {
            const resultado = await clienteServices.buscaContaPorId(
                Number(clienteId),
                Number(contaId)
            );
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamentos da conta' });
        }
    }

    async buscaContaFinanciamentos(req, res) {
        const { clienteId, contaId } = req.params;

        try {
            return res.status(200).json(await clienteServices.buscaContaFinanciamentos(
                Number(clienteId),
                Number(contaId)
            ));
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamentos da conta' });
        }
    }

    async buscaContaFinanciamentoPorId(req, res) {
        const { clienteId, contaId, financiamentoId } = req.params;

        try {
            return res.status(200).json(await clienteServices.buscaContaFinanciamentoPorId(
                Number(clienteId),
                Number(contaId),
                Number(financiamentoId)
            ));
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamento por id' });
        }
    }

    async criaRegistro(req, res) {
        const dadosParaCriacao = req.body;
        const clienteDTO = new ClienteDTO(dadosParaCriacao);

        try {
            return res.status(201).json(await clienteServices.criaRegistro(clienteDTO));
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                return res.status(400).json({ mensagens: erro.errors });
            }
            return res.status(500).json({ mensagem: 'Erro interno ao criar cliente', erro: erro.message });
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
            return res.status(500).json({ mensagem: 'Erro interno ao desativar conta' });
        }
    }
}

module.exports = ClienteController;