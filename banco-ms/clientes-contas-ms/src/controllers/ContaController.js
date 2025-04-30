const Controller = require('./Controller');
const ContaServices = require('../services/ContaServices.js');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO.js');
const ContaInputDTO = require('../dtos/conta-dto/ContaInputDTO.js');
const ContaDadosFinancaimentoDTO = require('../dtos/conta-dto/ContaDadosFinanciamentoDTO.js');
const ContaSaldoDTO = require('../dtos/conta-dto/ContaSaldoDTO.js');
const yup = require('yup');

const contaServices = new ContaServices();

class ContaController extends Controller {
    constructor() {
        super(contaServices);
    }

    async criaRegistro(req, res) {
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
                return res.status(400).json({ mensagens: erro.errors });
            }
            return res.status(500).json({ mensagem: 'Erro interno ao criar conta', erro: erro.message });
        }
    }

    async buscarContaPorNumero(req, res) {
        const numeroDaConta = req.params.numeroDaConta; ;
    
        try {
            const conta = await contaServices.buscarContaPorNumero(numeroDaConta);
            const contaOutputDTO = new ContaOutputDTO(conta);
            if (!conta) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }
            return res.status(200).json(contaOutputDTO);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao buscar conta', erro: erro.message });
        }
    }
    
    async buscaDadosParaFinanciamento(req, res) {
        const contaId = req.params.contaId;
    
        try {
            dadosFinanciamento = await contaServices.buscaDadosParaFinanciamento(contaId);
            contaDadosFinanciamentoDTO = ContaDadosFinancaimentoDTO(dadosParaFinanciamento);
            return res.status(200).json(contaDadosFinanciamentoDTO);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao buscar conta', erro: erro.message });
        }
    }

    async alterarSaldo(req, res) {
        const { contaId } = req.params;
        const { novoSaldo } = req.body;
        saldo = ContaSaldoDTO(novoSaldo);
      
        try {
          const resultado = await contaServices.alterarSaldo(contaId, saldo);
          return res.status(200).json(resultado);
        } catch (erro) {
          return res.status(500).json({ mensagem: 'Erro ao alterar saldo', erro: erro.message });
        }
    }
}

module.exports = ContaController;