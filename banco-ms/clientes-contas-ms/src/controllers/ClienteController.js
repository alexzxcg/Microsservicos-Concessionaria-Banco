const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices');
const ClienteOutputDTO = require('../dtos/cliente-dto/ClienteOutputDTO.js');
const ClienteInputDTO = require('../dtos/cliente-dto/ClienteInputDTO.js');
const ClienteUpdateDTO = require('../dtos/cliente-dto/ClienteUpdateDTO.js');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO.js');
const ContaUpdateDTO = require('../dtos/conta-dto/ContaUpdateDTO.js');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler.js');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
    constructor() {
        super(clienteServices,
            ClienteInputDTO,
            ClienteOutputDTO,
            ClienteUpdateDTO);
    }

    buscaContasDoCliente = asyncHandler(async (req, res) => {
        const { clienteId } = req.params;
        const resultado = await clienteServices.buscaContas(Number(clienteId));
        const contasDTO = resultado.map(conta => new ContaOutputDTO(conta));
        return res.status(200).json(contasDTO);
    });

    buscaContaPorIdDoCliente = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const resultado = await clienteServices.buscaContaPorId(
            Number(clienteId),
            Number(contaId)
        );
        const contaDTO = new ContaOutputDTO(resultado.data);
        return res.status(resultado.status).json(contaDTO);
    });

    atualizaContaDeCliente = asyncHandler(async (req, res) => {
        const { clienteId, contaId } = req.params;
        const dadosAtualizados = new ContaUpdateDTO(req.body);
        
        const resultado = await clienteServices.atualizaContaDeCliente(
            Number(clienteId),
            Number(contaId),
            dadosAtualizados
        );
        
        const contaAtualizadaDTO = new ContaOutputDTO(resultado.data);
        return res.status(resultado.status).json(contaAtualizadaDTO);
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
        return res.status(resultado.status).json(resultado.data);
    });
}

module.exports = ClienteController;