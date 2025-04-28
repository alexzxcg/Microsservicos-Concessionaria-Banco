const Controller = require('./Controller.js');
const FinanciamentoServices = require('../services/FinanciamentoServices.js');

const financiamentoServices = new FinanciamentoServices();

class FinanciamentoController extends Controller {
    constructor() {
        super(financiamentoServices);
    }

    async buscaTodos(req, res) {
        const { contaId } = req.params;
    
        try {
            const resultado = await financiamentoServices.buscaTodosOsRegistros(Number(contaId));
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            console.error('Erro no controller ao buscar financiamentos:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao buscar financiamentos.' });
        }
    }

    async criaRegistro(req, res) {
        const dadosDoFinanciamento = req.body;

        try {
            const novoFinanciamento = await financiamentoServices.criaRegistro({
                ...dadosDoFinanciamento
            });

            return res.status(201).json(novoFinanciamento);
        } catch (erro) {
            console.error(erro);
            return res.status(400).json({ mensagem: erro.message });
        }
    }

    async buscaPorId(req, res) {
        const { contaId, financiamentoId } = req.params;
      
        const resultado = await financiamentoServices.buscaUmPorId(contaId, financiamentoId);
        return res.status(resultado.status).json(resultado.data);
    }

    async aprovaFinanciamento(req, res) {
        const { id } = req.params;
    
        try {
          const resultado = await financiamentoServices.aprovaFinanciamento(id);
          return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
          console.error('Erro ao aprovar financiamento:', erro);
          return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    }  
}

module.exports = FinanciamentoController;