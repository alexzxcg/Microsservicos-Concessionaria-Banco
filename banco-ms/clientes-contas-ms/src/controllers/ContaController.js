const Controller = require('./Controller');
const ContaServices = require('../services/ContaServices.js');

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
            const novaConta = await this.entidadeService.criaRegistro(dadosParaCriacao);
            return res.status(201).json(novaConta);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao criar conta', erro: erro.message });
        }
    }
}

module.exports = ContaController;