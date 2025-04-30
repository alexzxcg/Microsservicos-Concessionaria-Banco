const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices');
const ClienteOutputDTO = require('../dtos/cliente-dto/ClienteOutputDTO.js');
const ClienteInputDTO = require('../dtos/cliente-dto/ClienteInputDTO.js');
const ClienteUpdateDTO = require('../dtos/cliente-dto/ClienteUpdateDTO.js');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO.js');
const ContaUpdateDTO = require('../dtos/conta-dto/ContaUpdateDTO.js');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
    constructor() {
        super(clienteServices,
            ClienteInputDTO,
            ClienteOutputDTO,
            ClienteUpdateDTO);
    }

    async buscaContasDoCliente(req, res) {
        const { clienteId, cpf } = req.params;

        try {
            const resultado = clienteId
                ? await clienteServices.buscaContas(Number(clienteId))
                : await clienteServices.buscaContaCorrentePorCpf(cpf);

            const contasDTO = resultado.map(conta => new ContaOutputDTO(conta));

            return res.status(200).json(contasDTO);
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

            const contaDTO = new ContaOutputDTO(resultado.data);

            return res.status(resultado.status).json(contaDTO);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamentos da conta' });
        }
    }

    async atualizaContaDeCliente(req, res) {
        const { clienteId, contaId } = req.params;
        const dadosAtualizados = new ContaUpdateDTO(req.body);
    
        try {
            const resultado = await clienteServices.atualizaContaDeCliente(
                Number(clienteId),
                Number(contaId),
                dadosAtualizados
            );
    
            const contaAtualizadaDTO = new ContaOutputDTO(resultado.data);
    
            return res.status(resultado.status).json(contaAtualizadaDTO);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao atualizar conta' });
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