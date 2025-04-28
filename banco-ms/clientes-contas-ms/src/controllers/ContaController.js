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

    async buscarContaPorNumero(req, res) {
        const numeroDaConta = req.params.numeroDaConta; ;
    
        try {
            const conta = await contaServices.buscarContaPorNumero(numeroDaConta);
            if (!conta) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }
            return res.status(200).json(conta);
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao buscar conta', erro: erro.message });
        }
    }
    
    async buscaDadosParaFinanciamento(req, res) {
        const contaId = req.params.contaId;
    
        try {
            return res.status(200).json(await contaServices.buscaDadosParaFinanciamento(contaId));
        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao buscar conta', erro: erro.message });
        }
    }

    async alterarSaldo(req, res) {
        const { contaId } = req.params;
        const { novoSaldo } = req.body;
      
        try {
          const resultado = await contaServices.alterarSaldo(contaId, novoSaldo);
          return res.status(200).json(resultado);
        } catch (erro) {
          return res.status(500).json({ mensagem: 'Erro ao alterar saldo', erro: erro.message });
        }
    }
}

module.exports = ContaController;