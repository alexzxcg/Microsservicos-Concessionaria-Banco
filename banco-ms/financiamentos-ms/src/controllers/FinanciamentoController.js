const FinanciamentoServices = require('../services/FinanciamentoServices.js');
const FinanciamentoOutputDTO = require('../dtos/financiamento-dto/FinanciamentoOutputDTO.js');
const FinanciamentoInputDTO = require('../dtos/financiamento-dto/FinanciamentoInputDTO.js');
const yup = require('yup');

const financiamentoServices = new FinanciamentoServices();

class FinanciamentoController {

    async buscaTodos(req, res) {
        const { contaId } = req.params;

        try {
            if (isNaN(Number(contaId))) {
                return res.status(400).json({ mensagem: 'ID da conta inválido.' });
            }

            const resultado = await financiamentoServices.buscaTodosOsRegistros(Number(contaId));
            const financiamentosOutputDTO = resultado.map(f => new FinanciamentoOutputDTO(f));
            
            return res.status(200).json(financiamentosOutputDTO);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamentos.' });
        }
    }

    async criaRegistro(req, res) {
        const dadosDoFinanciamento = req.body;
        const financiamentoInputDTO = new FinanciamentoInputDTO(dadosDoFinanciamento);

        try {
            const novoFinanciamento = await financiamentoServices.criaRegistro(financiamentoInputDTO);
            const financiamentosOutputDTO = new FinanciamentoOutputDTO(novoFinanciamento);

            return res.status(201).json(financiamentosOutputDTO);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                return res.status(400).json({ mensagens: erro.errors });
            }
            return res.status(400).json({ mensagem: erro.message });
        }
    }

    async buscaPorId(req, res) {
        const { contaId, financiamentoId } = req.params;

        try {
            if (isNaN(Number(contaId)) || isNaN(Number(financiamentoId))) {
                return res.status(400).json({ mensagem: 'IDs inválidos.' });
            }
            
            const resultado = await financiamentoServices.buscaUmPorId(contaId, financiamentoId);
            if (resultado.status === 404) {
                return res.status(404).json(resultado.data);
            }
            const financiamentoInputDTO = new FinanciamentoOutputDTO(resultado);

            return res.status(200).json(financiamentoInputDTO);
        } catch (erro) {
            console.error('Erro ao buscar financiamento:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamento.' });
        }
    }  

    async aprovaFinanciamento(req, res) {
        const { id } = req.params;

        try {
            const resultado = await financiamentoServices.aprovaFinanciamento(id);
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    }
}

module.exports = FinanciamentoController;