const Controller = require('./Controller');
const ClienteServices = require('../services/ClienteServices');
const ClienteInputDTO = require('../dtos/cliente-dto/ClienteInputDTO');
const ContaUpdateDTO = require('../dtos/conta-dto/ContaUpdateDTO');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
    constructor() {
        super(clienteServices, ClienteInputDTO);
    }

    buscaContasDoCliente = asyncHandler(async (req, res) => {
        const { clienteId } = req.params;
        const contas = await clienteServices.buscaContas(Number(clienteId));
        return res.status(200).json(contas);
    });

    buscaContaPorIdDoCliente = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const resultado = await clienteServices.buscaContaPorId(
            Number(clienteId),
            Number(contaId)
        );
        return res.status(resultado.status).json(resultado.data);
    });

    atualizaContaDeCliente = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const dadosAtualizados = new ContaUpdateDTO(req.body);
        
        const resultado = await clienteServices.atualizaContaDeCliente(
            Number(clienteId),
            Number(contaId),
            dadosAtualizados
        );
        
        return res.status(200).json(resultado);
    });

    buscaContaFinanciamentos = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const resultado = await clienteServices.buscaContaFinanciamentos(
            Number(clienteId),
            Number(contaId)
        );
        return res.status(200).json(resultado);
    });

    buscaContaFinanciamentoPorId = asyncHandler(async (req, res) => {
        const { clienteId, contaId, financiamentoId } = req.params;
        const resultado = await clienteServices.buscaContaFinanciamentoPorId(
            Number(clienteId),
            Number(contaId),
            Number(financiamentoId)
        );
        return res.status(200).json(resultado);
    });

    excluiContaDeCliente = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const resultado = await clienteServices.desativaConta(
            Number(clienteId),
            Number(contaId)
        );
        return res.status(200).json(resultado);
    });
}

module.exports = ClienteController;
