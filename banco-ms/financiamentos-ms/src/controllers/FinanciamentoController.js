const FinanciamentoServices = require('../services/FinanciamentoServices.js');
const FinanciamentoOutputDTO = require('../dtos/financiamento-dto/FinanciamentoOutputDTO.js');
const FinanciamentoInputDTO = require('../dtos/financiamento-dto/FinanciamentoInputDTO.js');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler.js');
const yup = require('yup');

const financiamentoServices = new FinanciamentoServices();

class FinanciamentoController {
    buscaTodos = asyncHandler(async (req, res) => {
        const { contaId } = req.params;

        if (isNaN(Number(contaId))) {
            throw new AppError('ID da conta inválido', 400);
        }

        const resultado = await financiamentoServices.buscaTodosOsRegistros(Number(contaId));
        const financiamentosOutputDTO = resultado.map(f => new FinanciamentoOutputDTO(f));
        
        return res.status(200).json(financiamentosOutputDTO);
    });

    criaRegistro = asyncHandler(async (req, res) => {
        try {
            const financiamentoInputDTO = new FinanciamentoInputDTO(req.body);
            const novoFinanciamento = await financiamentoServices.criaRegistro(financiamentoInputDTO);
            const financiamentoOutputDTO = new FinanciamentoOutputDTO(novoFinanciamento);

            return res.status(201).json(financiamentoOutputDTO);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                throw new AppError('Erro de validação', 400, erro.errors);
            }
            throw erro;
        }
    });

    buscaPorId = asyncHandler(async (req, res) => {
        const { contaId, financiamentoId } = req.params;

        if (isNaN(Number(contaId)) || isNaN(Number(financiamentoId))) {
            throw new AppError('IDs inválidos', 400);
        }
        
        const financiamento = await financiamentoServices.buscaUmPorId(contaId, financiamentoId);
        const financiamentoOutputDTO = new FinanciamentoOutputDTO(financiamento);

        return res.status(200).json(financiamentoOutputDTO);
    });

    aprovaFinanciamento = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const resultado = await financiamentoServices.aprovaFinanciamento(id);
        return res.status(200).json(resultado);
    });
}

module.exports = FinanciamentoController;