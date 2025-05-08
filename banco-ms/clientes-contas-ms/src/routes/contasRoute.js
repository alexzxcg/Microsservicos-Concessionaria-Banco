const { Router } = require('express');
const ContaController = require('../controllers/ContaController.js');

const contaController = new ContaController();

const router = Router();

router.get('/contas/:contaId/dados-financiamento', contaController.buscaDadosParaFinanciamento);
router.put('/contas/:contaId/alterar-saldo', contaController.alterarSaldo);

router.get('/contas/:numeroDaConta', contaController.buscarContaPorNumero);

module.exports = router;