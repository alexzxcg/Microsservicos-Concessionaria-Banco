const Controller = require('./Controller');
const ContaServices = require('../services/ContaServices');
const ContaInputDTO = require('../dtos/conta-dto/ContaInputDTO');
const ContaDadosFinancaimentoDTO = require('../dtos/conta-dto/ContaDadosFinanciamentoDTO');
const ContaSaldoDTO = require('../dtos/conta-dto/ContaSaldoDTO');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler.js');

const contaServices = new ContaServices();

class ContaController extends Controller {
    constructor() {
        super(contaServices, ContaInputDTO);
    }

    buscarContaPorNumero = asyncHandler(async (req, res) => {
        const conta = await contaServices.buscarContaPorNumero(req.params.numeroDaConta);
        return res.status(200).json(conta);
    });

    buscaDadosParaFinanciamento = asyncHandler(async (req, res) => {
        const dados = await contaServices.buscaDadosParaFinanciamento(req.params.contaId);
        return res.status(200).json(new ContaDadosFinancaimentoDTO(dados));
    });

    alterarSaldo = asyncHandler(async (req, res) => {
        const saldoDTO = new ContaSaldoDTO(req.body.saldo);
        const resultado = await contaServices.alterarSaldo(req.params.contaId, saldoDTO.saldo);
        return res.status(200).json(resultado);
    });
}

module.exports = ContaController;
