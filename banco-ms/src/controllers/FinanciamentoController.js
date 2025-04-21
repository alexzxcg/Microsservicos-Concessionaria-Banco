const Controller = require('./Controller.js');
const FinanciamentoServices = require('../services/FinanciamentoServices.js');

const financiamentoServices = new FinanciamentoServices();

class FinanciamentoController extends Controller {
    constructor() {
        super(financiamentoServices);
    }

    async buscaTodos(req, res) {
        const { clienteId, contaId } = req.params;

        try {
            const resultado = await financiamentoServices.buscaTodosOsRegistros(
                Number(clienteId),
                Number(contaId)
            );
            return res.status(resultado.status).json(resultado.data);
        } catch (erro) {
            
        }
    }
}

module.exports = FinanciamentoController;