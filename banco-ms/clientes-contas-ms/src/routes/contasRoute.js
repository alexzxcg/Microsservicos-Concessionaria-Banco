const { Router } = require('express');
const ContaController = require('../controllers/ContaController.js');

const contaController = new ContaController();

const router = Router();

router.get('/contas/:numeroDaConta', (req, res) => contaController.buscarContaPorNumero(req, res));
router.get('/contas/:contaId/dados-financiamento', (req, res) => contaController.buscaDadosParaFinanciamento(req, res));
router.put('/contas/:contaId/alterar-saldo', (req, res) => contaController.alterarSaldo(req, res));

module.exports = router;