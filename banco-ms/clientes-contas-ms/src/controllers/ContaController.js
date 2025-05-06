const Controller = require('./Controller');
const ContaServices = require('../services/ContaServices.js');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO.js');
const ContaInputDTO = require('../dtos/conta-dto/ContaInputDTO.js');
const ContaDadosFinancaimentoDTO = require('../dtos/conta-dto/ContaDadosFinanciamentoDTO.js');
const ContaSaldoDTO = require('../dtos/conta-dto/ContaSaldoDTO.js');
const yup = require('yup');
const { asyncHandler } = require('../middlewares/erro/errorHandler.js');

const contaServices = new ContaServices();

class ContaController extends Controller {
    constructor() {
        super(contaServices, ContaInputDTO, ContaOutputDTO);
    }

    criaRegistro = asyncHandler(async (req, res) => {
        const { clienteId } = req.params;
        
        const dadosParaCriacao = {
            ...req.body,
            clienteId: Number(clienteId)
        };

        try {
            const contaInputDTO = new ContaInputDTO(dadosParaCriacao);
            const novaConta = await contaServices.criaRegistro(contaInputDTO);
            const contaOutputDTO = new ContaOutputDTO(novaConta);

            return res.status(201).json(contaOutputDTO);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                throw new AppError('Erro de validação', 400, erro.errors);
            }
            throw erro; 
        }
    });

    buscarContaPorNumero = asyncHandler(async (req, res) => {
        const numeroDaConta = req.params.numeroDaConta;
        const conta = await contaServices.buscarContaPorNumero(numeroDaConta);
        const contaOutputDTO = new ContaOutputDTO(conta);
        return res.status(200).json(contaOutputDTO);
    });
    
    buscaDadosParaFinanciamento = asyncHandler(async (req, res) => {
        const contaId = req.params.contaId;
        const dadosFinanciamento = await contaServices.buscaDadosParaFinanciamento(contaId);
        
        if (!dadosFinanciamento) {
            throw new AppError('Dados para financiamento não encontrados', 404);
        }
        
        const contaDadosFinanciamentoDTO = new ContaDadosFinancaimentoDTO(dadosFinanciamento);
        return res.status(200).json(contaDadosFinanciamentoDTO);
    });

    alterarSaldo = asyncHandler(async (req, res) => {
        const { contaId } = req.params;
        const { novoSaldo } = req.body;
        const saldo = new ContaSaldoDTO(novoSaldo);
        
        const resultado = await contaServices.alterarSaldo(contaId, saldo);
        return res.status(200).json(resultado);
    });
}

module.exports = ContaController;